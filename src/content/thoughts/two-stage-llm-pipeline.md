---
title: "Classify Cheap, Extract Expensive: a Two-Stage LLM Pipeline for Noisy Financial Text"
description: "Only ~2–5% of messages in an active trading channel contain a real recommendation. The other 95% is why our LLM bill stayed sane: we never showed them to the expensive model."
date: "2026-07-14"
tags: "llm, openai, pipelines, cost-optimization"
system: "realtime-ingestion"
---

**The short version:** when you run LLM extraction over a high-volume, low-signal stream, split
the work in two. A cheap, short-prompt classifier answers one question — *is there a
recommendation in this message?* — and only the few percent that pass get the expensive
structured-extraction call. The design cut both cost **and** hallucination, because the
extraction model stopped seeing noise.

## The firehose

Saras ingested trading recommendations from Telegram channels, PDF research reports, X, YouTube
live streams, and news — 200K+ raw messages on a normal day, spiking hard around market open,
when an active day could produce ~10K messages in the first hour.

Here's the thing about a busy trading channel: almost none of it is trades. Greetings, memes,
price commentary, "did you book profit?", forwarded news — in our data only **~2–5% of messages
contained an actual recommendation**.

Running structured extraction over everything would have meant paying full price to parse
"good morning traders 🙏" a hundred thousand times.

## Stage 1: the cheap gate

Every captured message first hits a small classification call with a short prompt and a binary
answer: recommendation or not. Short prompt, tiny output, minimal tokens — this is the only
stage that sees the full firehose, so it's the stage that must stay cheap.

Everything that fails the gate stops here. Everything that passes moves on.

## Stage 2: extraction, only for the survivors

The ~2–5% that pass get the real call: extract ticker, entry, target(s), stoploss, period,
position into a standardized trade schema. Two parses turned out to be genuinely hard:

- **Ticker hallucination.** Company names vs. ticker symbols — the model would confidently
  "correct" one into the other.
- **Options instruments.** Every advisor formats them differently (CE/PE at the end, in the
  middle, strike and expiry mashed together). Extracting **strike price + expiry** reliably was
  the single hardest parse in the system.

One structural detail that mattered: a single recommendation can carry **multiple targets**, so
extraction outputs an array, and a fan-out step expands it into one trade per target before
anything downstream sees it. Downstream systems get one shape, always.

## Humans in the loop, feeding the loop

We never pretended the pipeline was perfect. An analyst dashboard showed the raw message next
to the extracted fields, with approve / edit / reject actions. Two properties made it more than
a safety net:

1. **Corrections wrote straight to the source of truth**, and the live tracking engine
   re-evaluated the corrected trade retroactively — so a fixed parse behaved as if it had been
   right all along.
2. **Corrections became new few-shot examples** (a team effort on the prompt side), so the
   extraction quality compounded over time.

The honest cost note: token spend *grows* under this design, because the example set grows.
That was a conscious trade — accuracy was the top priority, cost the managed constraint.

## Failure is a first-class input

When the LLM API failed (it does), affected messages didn't vanish — they were backfilled into
the trade collection once the API recovered, and the execution layer's hindsight-matching
brought their state current. Design assumption: *any* stage can fail; no stage may lose data.

## Takeaways

- **Gate expensive models with cheap ones.** The 95% you filter out is pure savings — and less
  noise into extraction means less malformed output, not just a smaller bill.
- **Normalize early, fan out early.** One standardized schema after extraction meant every
  downstream system — execution, analytics, notifications — stayed simple.
- **Build the correction loop on day one.** Human review that feeds back into examples is the
  cheapest model improvement you'll ever ship.
