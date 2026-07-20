import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { RteIcon } from './RteIcons';
import { RteGlassPanel, RteSectionShell } from './RtePrimitives';

const tickSteps = [
  'Tick received from websocket',
  'Active ticker check against Redis pool',
  'Fetch active trades for symbol',
  'Match engine evaluates entry / SL / TP / expiry',
  'Update Redis execution snapshot',
  'Persist transition to MongoDB',
  'Emit downstream events',
];

const recoverySteps = [
  'Websocket disconnect',
  'Provider failure',
  'Matching paused',
  'Trigger hindsight recovery',
  'Detect gap range',
  'Fetch missing historical prices',
  'Re-run matching logic',
  'Reconcile Redis + Mongo',
  'Resume realtime stream',
];

const wsLifecycle = [
  { t: 'Trade ingestion', d: 'New recommendation allocates symbol interest.' },
  { t: 'Ticker deduplication', d: 'Collapse duplicate advisor requests per symbol.' },
  { t: 'Subscription add', d: 'Open channel only if pool count transitions 0→1.' },
  { t: 'Tick streaming', d: 'Fan-out ticks to subscribed worker queues.' },
  { t: 'Subscription retention', d: 'Keep channel while any trade references symbol.' },
  { t: 'Subscription remove', d: 'Tear down when last trade closes.' },
];

const SYNC_DETAIL =
  'Writes finalize in MongoDB; watch streams push deltas into Redis. Periodic reconciliation jobs heal drift if a worker crashes mid-flight.';

export function RteTickProcessing() {
  return (
    <RteSectionShell title="Tick Processing Flow">
      <RteGlassPanel className="p-5 sm:p-6">
        <ol className="space-y-3">
          {tickSteps.map((s, i) => (
            <motion.li
              key={s}
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex gap-3 text-sm leading-relaxed text-white/60"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-accent/20 bg-accent/[0.06] text-xs font-semibold text-accent">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </motion.li>
          ))}
        </ol>
      </RteGlassPanel>
    </RteSectionShell>
  );
}

export function RteRecoveryFlow() {
  const [pulse, setPulse] = useState(0);
  const n = recoverySteps.length;

  useEffect(() => {
    if (n <= 0) return undefined;
    const t = window.setInterval(() => {
      setPulse((p) => (p + 1) % n);
    }, 1800);
    return () => window.clearInterval(t);
  }, [n]);

  return (
    <RteSectionShell title="Recovery Flow / Hindsight Engine">
      <RteGlassPanel className="relative p-5 sm:p-6">
        <div className="space-y-2">
          {recoverySteps.map((s, i) => (
            <motion.div
              key={s}
              animate={{
                opacity: pulse === i ? 1 : 0.55,
                boxShadow:
                  pulse === i
                    ? '0 0 16px rgba(0,212,255,0.12)'
                    : '0 0 0 rgba(0,0,0,0)',
              }}
              transition={{ duration: 0.35 }}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5"
            >
              <span className="text-xs font-medium text-accent/50">
                {i + 1}
              </span>
              <span className="flex-1 text-sm leading-relaxed text-white/60">
                {s}
              </span>
            </motion.div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {['Automatic', 'Reliable', 'Low-latency'].map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-accent/15 bg-accent/[0.05] px-2 py-0.5 text-xs text-accent/70"
            >
              {tag}
            </span>
          ))}
        </div>
      </RteGlassPanel>
    </RteSectionShell>
  );
}

export function RteRedisMongoSync() {
  return (
    <RteSectionShell title="Redis + MongoDB Synchronization">
      <div className="grid gap-4 lg:grid-cols-2">
        <RteGlassPanel className="p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-2 text-rose-300/90">
            <RteIcon name="database" className="h-4 w-4" />
            <span className="text-sm font-semibold">Redis</span>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-white/55">
            <li>Active trades</li>
            <li>Trade states</li>
            <li>In-memory indexes</li>
          </ul>
        </RteGlassPanel>
        <RteGlassPanel className="p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-2 text-emerald-300/90">
            <RteIcon name="hard-drive" className="h-4 w-4" />
            <span className="text-sm font-semibold">MongoDB</span>
          </div>
          <ul className="space-y-2 text-sm leading-relaxed text-white/55">
            <li>All trades</li>
            <li>Trade history</li>
            <li>Audit log</li>
          </ul>
        </RteGlassPanel>
      </div>
      <div className="mt-4 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/45">
          Sync mechanism
        </p>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          <span className="font-medium text-white/70">
            Change streams propagate authoritative documents; workers read Redis first, Mongo for recovery and analytics.{' '}
          </span>
          {SYNC_DETAIL}
        </p>
      </div>
    </RteSectionShell>
  );
}

export function RteWebsocketLifecycle() {
  return (
    <RteSectionShell title="Websocket Subscription Lifecycle">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-stretch lg:gap-0">
        {wsLifecycle.map((step, i) => (
          <div key={step.t} className="flex flex-1 items-center lg:flex-row">
            <div className="flex-1">
              <RteGlassPanel className="h-full p-4 sm:p-5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04]">
                  <RteIcon name="waves" className="h-4 w-4 text-accent/60" />
                </div>
                <h3 className="text-sm font-semibold text-white">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/55">
                  {step.d}
                </p>
              </RteGlassPanel>
            </div>
            {i < wsLifecycle.length - 1 ? (
              <div className="hidden px-1 text-accent/25 lg:block">→</div>
            ) : null}
          </div>
        ))}
      </div>
    </RteSectionShell>
  );
}

const challenges = [
  'Handling ~1000 websocket ticks/sec without subscribing to the full market.',
  'Replacing interval-based Lambda matching with persistent low-latency workers.',
  'Maintaining synchronized execution state across Redis and MongoDB.',
  'Designing automatic hindsight recovery after websocket/provider outages.',
  'Managing dynamic ticker subscription pools at scale.',
];

const decisions = [
  'Why persistent workers replaced cron/Lambda',
  'Why Redis became the execution state layer',
  'Why MongoDB remained source of truth',
  'Why hindsight matching is fallback-only after gaps',
  'Why ticker subscription pooling mattered at scale',
];

const outcomes = [
  'Real-time trade visibility',
  'Reduced execution latency',
  'Stable high-volume tick processing',
  'Automatic recovery & reconciliation',
  'Strong Redis/Mongo consistency',
  'Operational reliability at scale',
];

export function RteFooterTriad() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <RteSectionShell title="Key Engineering Challenges">
        <ul className="space-y-2">
          {challenges.map((c) => (
            <li key={c}>
              <div className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm leading-relaxed text-white/60">
                {c}
              </div>
            </li>
          ))}
        </ul>
      </RteSectionShell>
      <RteSectionShell title="Key Design Decisions">
        <ul className="space-y-2">
          {decisions.map((c) => (
            <li key={c}>
              <div className="w-full rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm leading-relaxed text-white/60">
                {c}
              </div>
            </li>
          ))}
        </ul>
      </RteSectionShell>
      <RteSectionShell title="Outcomes">
        <ul className="space-y-2">
          {outcomes.map((c) => (
            <li key={c}>
              <div className="flex w-full items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm leading-relaxed text-white/65">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                {c}
              </div>
            </li>
          ))}
        </ul>
      </RteSectionShell>
    </div>
  );
}
