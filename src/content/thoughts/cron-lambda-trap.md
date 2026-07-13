---
title: "The Cron+Lambda Trap: Our \"Real-Time\" System That Wasn't"
description: "The first version of our virtual-execution engine ran on cron and Lambda. It was cheap, it was serverless, and every few weeks it broke — because interval polling can't pretend to be real time."
date: "2026-07-14"
tags: "aws, lambda, websockets, real-time, node"
system: "realtime-execution"
---

**The short version:** interval-based schedulers cannot give you real-time semantics, no matter
how short the interval. If your domain is "react to a price the moment it happens," you need a
persistent process holding a live connection — plus a recovery path for when that process dies.
We learned this by running the wrong architecture first.

## What the system had to do

Saras tracked advisor recommendations and *virtually executed* them against live market prices:
wait for the entry price to be hit, mark the trade entered, then watch for target, stoploss,
time exit, or expiry — across every live trade, simultaneously, all day.

## Version 1: cron + Lambda

The first build polled on an interval: every couple of minutes, a scheduled Lambda fetched
prices and checked open trades. It looked reasonable on a whiteboard — serverless, no servers
to babysit, pay per invocation. In production it failed in ways that were all the same failure:

- **A 2-minute interval is not real time.** Users saw trades appear only *after* entry, at
  prices that had already moved.
- **Parallelizing made it worse.** More parallel checks meant more API requests, which meant
  timeouts, which meant slower runs.
- **Runs overlapped.** When one interval's run hadn't finished before the next started, both
  opened Mongo connections and pushed duplicate updates.
- **It broke every few weeks**, and every breakage meant hindsight-matching over the *entire*
  trade set to figure out what had been missed.

The deep problem: polling turns a stream of events into a series of snapshots, and everything
between snapshots is invisible until you reconstruct it.

## Version 2: a persistent engine

I re-architected it as a set of long-running Node.js worker processes on an always-on server,
consuming a **WebSocket price feed** — every tick, as it happens. Two Redis instances carry the
hot state: one is the **ticker registry** (which symbols we need prices for), the other holds
**active trade details** keyed for fast matching, with the work queue managed in Redis itself —
no separate broker. MongoDB stays the durable source of truth, kept in sync through change
streams, with trade updates flowing back as documents change.

Every tick is checked against the active trades for that ticker; on a match, the trade's state
transitions and the document updates. No snapshots, no reconstruction — the event *is* the
input.

## The constraints that shaped it

Real systems are shaped by their ugliest constraints, and this one had three good ones:

- **Hot tickers emit up to ~1,000 ticks per second.** Matching had to be in-memory-fast, which
  is why trade state lives in Redis, not behind a query.
- **Our price vendor capped us at 3,000 concurrently subscribed tickers** — and more than
  10,000 tickers are active daily. Subscribing to everything was impossible by contract, not
  just wasteful. So the engine maintains a pool of *currently relevant* tickers (those with
  live trades) and subscribes only to those.
- **Subscribing to a new ticker takes time** (seconds, provider-dependent). During that gap the
  engine pools the missed prices and back-matches them, so an entry or stoploss that happened
  mid-subscription is never silently lost.

## Designing for the crash

The part I'm most proud of isn't the happy path — it's that failure became boring. Any outage
triggers a **hindsight-matching pass**: check whether any trade condition was hit during the
downtime window, sync the results back, resume. Recovery time scales with the number of active
trades, not with luck. Duplicates are handled idempotently by trade ID, and an hourly full sync
against MongoDB clears any stale state that survived. No manual backfills — ever. That was a
design requirement, not an outcome.

## Takeaways

- **Name your latency honestly.** If users act on price movement, a 2-minute snapshot cadence
  isn't "near real time" — it's a different product.
- **Serverless is a great default and a poor fit for persistent-connection workloads.** The
  trap isn't Lambda; it's using interval invocations to simulate a stream.
- **Vendor limits are architecture.** The 3,000-ticker cap did more to shape the subscription
  design than any internal preference.
- **Build recovery as a feature.** A system that reconciles itself after a crash "like nothing
  happened" is what real-time reliability actually means.
