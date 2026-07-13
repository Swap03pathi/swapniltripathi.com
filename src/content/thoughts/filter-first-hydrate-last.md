---
title: "Filter First, Hydrate Last: How I Turned Redis Into a Query Engine"
description: "Mongo aggregations were out-scaling our autoscaler. The fix: answer every filter combination with Redis set intersections, paginate on IDs, and never touch a full object until the final page."
date: "2026-07-14"
tags: "redis, mongodb, architecture, real-time"
system: "market-intelligence"
---

**The short version:** if your product needs multidimensional filtering over data that changes
every second, stop caching query results and stop aggregating in your database. Keep IDs in
Redis sets and sorted sets, intersect them to answer any filter combination, paginate on IDs,
and only then fetch the ~20 objects you actually render. **IDs are cheap. Objects are
expensive.**

## The product problem

At Saras we tracked trading recommendations captured from public sources — Telegram channels,
PDF research reports, X, YouTube live streams, news — and *virtually executed* them against
live market prices, so users could judge any advisor by their real track record.

The discovery surface let users slice every trade across roughly nine dimensions: period
(intraday, swing, BTST…), category (equity, index options, stock futures…), position, source,
open/closed status, date range, minimum profit potential, advisor accuracy, and a sort order.
Almost every dimension was multi-select.

The raw numbers sound manageable — a few hundred concurrently live trades distilled from 200K+
raw messages a day. The trap is one field: **profit potential** — `(target − live_price) /
live_price` — which changes on every tick, and hot tickers tick up to ~1,000 times per second.
It was also our most-used sort.

## Three designs that failed

**1. Cache query results.** Multi-select across nine dimensions is a combinatorial explosion of
filter permutations. Cache hit rates collapsed, and even a *hit* was wrong within seconds
because the most popular sort depends on the live price.

**2. Aggregate in MongoDB per request.** Hot queries spiked CPU so fast that autoscaling
couldn't bring up a new node before the current one choked. If your scaling story is "the
autoscaler will save us," you don't have a scaling story.

**3. Recompute on every update (our first draft's real sin).** One trade update re-ran the full
aggregation. Worse: multi-target recommendations were stored as separate documents sharing one
stoploss — so a single stoploss hit fanned out into simultaneous recomputes across all of them,
piling up Mongo CPU and connections.

## The flip: treat Redis as the query engine

We rebuilt the read path around one idea — *never touch a full object until you know it's on
the page the user is looking at.* Redis holds five kinds of keys:

1. **Live prices** — `price:{ticker}` hashes. Socket updates write here and *only* here.
2. **Trade objects** — `trade:{tradeId}` hashes, the render payload.
3. **Filter sets** — one plain set per filter value: `trade:open`, `trade:source:telegram`,
   `trade:category:index_option`, `trade:period:intraday`, `trade:advisor:{id}`…
4. **Ranking ZSETs** — `trade:rank:upside`, `trade:rank:recent`, `trade:rank:accuracy`.
5. **Advisor intelligence** — `advisor:perf:{id}` hashes with rolling-window accuracy
   (1d/7d/30d/90d), segmented by category and period.

## Answering an arbitrary filter in four steps

    SINTER trade:open trade:source:telegram trade:category:index_option ...
    → temp set of candidate trade IDs

    ZINTERSTORE temp:ranked 2 temp:candidates trade:rank:upside
    → candidates overlaid with the requested sort's scores

    ZREVRANGE temp:ranked 0 19
    → the 20 IDs on page one — and nothing else

    HMGET trade:{id} ...   (×20)
    → hydrate only what the user will actually see

Any combination of filters is just a different `SINTER` argument list — the permutation
explosion stops mattering because we never precompute permutations at all. Temp keys get TTLs
the moment they're created; "temporary" keys without expiry are how Redis memory dies.

## The live-sort problem

Upside changes every tick, so a global, always-fresh `trade:rank:upside` is a lie — keeping it
perfectly current would mean recomputing every dependent trade on every tick of every ticker.
We never did that. Ticks write only `price:{ticker}`. Upside is recomputed *lazily*, for the
filtered, paginated candidates only — recompute twenty values, re-sort twenty values, respond.
Pagination isn't just UX; it's what bounds the live computation.

## Deltas, not recomputes

The same discipline applied to advisor scores: instead of recomputing an advisor from all their
trades on every event, each event (open, close, target hit, stoploss hit) increments or
decrements counters on `advisor:perf:{id}`. Rolling windows and per-category/per-period
segmentation ride on those counters. MongoDB stays the source of truth, with change streams
propagating authoritative updates and periodic reconciliation healing any drift.

## What I'd tell past me

- **The unit of scale is the query shape, not the row count.** A few hundred live objects
  under combinatorial filters and per-tick mutation is a harder problem than millions of static
  rows.
- **If the autoscaler is your answer, you don't have an answer.**
- **Put a TTL on everything temporary the day you create it.**
- **Cost is a design dimension.** Filtering on Redis instead of running Mongo aggregations on
  ECS CPU wasn't just faster — it was materially cheaper, and cloud pricing punishes moving
  data around.
