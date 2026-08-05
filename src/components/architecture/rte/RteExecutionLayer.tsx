import { m } from 'framer-motion';
import type { RteIconName } from './RteIcons';
import { RteIcon } from './RteIcons';
import {
  RteConnectorH,
  RteConnectorV,
  RteGlassPanel,
  RteSectionShell,
  type RteExpandApi,
} from './RtePrimitives';

const MATCHING_WORKER_BODY =
  'Persistent Node.js workers evaluate ticks against entry, target, stoploss, and expiry. Stateful processes replace cron/Lambda intervals for lower tail latency and fewer duplicate evaluations.';

const MONGO_BODY =
  'Every transition that must survive restarts is durable in MongoDB. Workers write audited state; reads for heavy analytics stay off the hot path.';

const MONGO_WATCH_BODY =
  'Change streams propagate authoritative writes back into Redis, trimming ghost keys and aligning in-memory snapshots with persisted documents.';

const MONITORING_BODY =
  'Grafana + Prometheus watch SLO-style signals: lag, error budgets, provider health. Paging hooks for disconnect storms or reconciliation backlog.';

const HINDSIGHT_BODY =
  'When gaps are detected, historical bars replay through the same rules engine, reconcile against live-advanced state, then hand control back to the websocket path.';

type Props = { expand: RteExpandApi };

function Mini({
  id,
  title,
  subtitle,
  icon,
  bullets,
  detail,
  expand,
  accent = 'default' as 'default' | 'rose' | 'emerald' | 'amber',
}: {
  id: string;
  title: string;
  subtitle?: string;
  icon: RteIconName;
  bullets: string[];
  detail: string;
  expand: RteExpandApi;
  accent?: 'default' | 'rose' | 'emerald' | 'amber';
}) {
  const open = expand.expandedId === id;
  const ring =
    accent === 'rose'
      ? 'hover:border-rose-400/25 hover:shadow-[0_0_24px_-8px_rgba(251,113,133,0.15)]'
      : accent === 'emerald'
        ? 'hover:border-emerald-400/20 hover:shadow-[0_0_24px_-8px_rgba(52,211,153,0.12)]'
        : accent === 'amber'
          ? 'hover:border-amber-400/20 hover:shadow-[0_0_24px_-8px_rgba(251,191,36,0.12)]'
          : 'hover:border-accent/25 hover:shadow-[0_0_24px_-8px_rgba(0,212,255,0.12)]';
  return (
    <button
      type="button"
      onClick={() => expand.toggleExpand(id)}
      className={`flex h-full w-full flex-col rounded-2xl text-left transition-colors ${ring}`}
    >
      <RteGlassPanel className="h-full p-3 sm:p-4" glow="subtle">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent/80">
            <RteIcon name={icon} className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white/90">{title}</h3>
            {subtitle ? (
              <p className="text-xs text-white/40">{subtitle}</p>
            ) : null}
          </div>
        </div>
        <ul className="space-y-1.5 text-sm leading-relaxed text-white/50">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-[10px] uppercase tracking-wider text-accent/40">
          {open ? 'Tap to collapse' : 'Tap for detail'}
        </p>
        {open ? (
          <m.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className="mt-3 border-t border-white/[0.08] pt-3 text-sm leading-relaxed text-white/55"
          >
            {detail}
          </m.div>
        ) : null}
      </RteGlassPanel>
    </button>
  );
}

function DataPlaneCard({
  title,
  subtitle,
  icon,
  bullets,
  body,
}: {
  title: string;
  subtitle?: string;
  icon: RteIconName;
  bullets: string[];
  body: string;
}) {
  return (
    <div className="flex h-full w-full flex-col">
      <RteGlassPanel className="h-full flex-1 p-4 sm:p-5" glow="subtle">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent/80">
            <RteIcon name={icon} className="h-4 w-4" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white/90">{title}</h3>
            {subtitle ? (
              <p className="text-xs text-white/40">{subtitle}</p>
            ) : null}
          </div>
        </div>
        <ul className="space-y-1.5 text-sm leading-relaxed text-white/50">
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent/40" />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-4 border-t border-white/[0.06] pt-3 text-sm leading-relaxed text-white/55">
          {body}
        </p>
      </RteGlassPanel>
    </div>
  );
}

export function RteExecutionLayer({ expand }: Props) {
  return (
    <RteSectionShell
      eyebrow="Execution plane"
      title="Real-Time Execution Layer"
      className="rounded-2xl border border-white/[0.07] bg-dark-light/30 p-5 sm:p-8"
    >
      <div className="mb-8 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
        <Mini
          id="exec-ingestion"
          title="Trade Ingestion Service"
          icon="server"
          bullets={[
            'Advisor recommendations normalized into structured trade objects',
            'Trade state initialized in MongoDB',
            'Active execution state synced into Redis',
          ]}
          detail="Ingestion is the boundary from unstructured advisor output to executable trade objects. Writes seed MongoDB for durability, then hydrates Redis for the hot matching path."
          expand={expand}
        />
        <Mini
          id="exec-redis"
          title="Redis Active Trade Store"
          subtitle="In-memory state"
          icon="database"
          accent="rose"
          bullets={[
            'Active trades',
            'Trade states',
            'In-memory indexes',
            'Dynamic ticker pools',
            'Ultra-fast matching state',
          ]}
          detail="Redis holds the working set for sub-millisecond reads during tick storms. TTL and key layout prevent unbounded growth; pools mirror which symbols currently require websocket coverage."
          expand={expand}
        />
        <Mini
          id="exec-ticker"
          title="Ticker Subscription Manager"
          icon="radio"
          bullets={[
            'Unique active ticker pool',
            'Dynamic websocket subscriptions',
            'Deduplicates subscriptions across advisors',
          ]}
          detail="Instead of fanning out to the whole market, a deduplicated pool tracks only symbols with live exposure. Adds and removes subscriptions as trades open and close."
          expand={expand}
        />
        <Mini
          id="exec-ws-ticks"
          title="Websocket Tick Stream"
          subtitle="~1000 ticks/sec active symbols"
          icon="waves"
          bullets={[
            'High-volume market ticks',
            '~1000 ticks/sec on active symbols',
            'Streams routed into matching workers',
          ]}
          detail="Ticks are pushed to worker queues with minimal copying. Backpressure and coalescing strategies avoid overwhelming workers when a single symbol spikes."
          expand={expand}
        />
      </div>

      <div className="mb-2 flex flex-wrap items-center gap-2">
        <span className="text-xs uppercase tracking-wider text-white/35">
          Matching workers
        </span>
        <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {['Matching Worker 1', 'Matching Worker 2', 'Matching Worker N'].map(
          (label) => (
            <m.div
              key={label}
              whileHover={{ scale: 1.01 }}
              className="text-left"
            >
              <RteGlassPanel className="p-4 sm:p-5" glow="accent">
                <div className="flex items-center gap-2">
                  <RteIcon name="cpu" className="h-4 w-4 text-accent/70" />
                  <span className="text-sm font-semibold text-white">
                    {label}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/50">
                  Entry / target / SL / expiry evaluation on every relevant tick.
                </p>
                <p className="mt-3 text-sm leading-relaxed text-white/55">
                  {MATCHING_WORKER_BODY}
                </p>
              </RteGlassPanel>
            </m.div>
          ),
        )}
      </div>

      <div className="grid items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <DataPlaneCard
          title="MongoDB"
          subtitle="Source of truth"
          icon="hard-drive"
          bullets={[
            'Source of truth',
            'Trade history',
            'State transitions',
            'Durable persistence',
          ]}
          body={MONGO_BODY}
        />
        <DataPlaneCard
          title="Mongo Watch Streams"
          icon="activity"
          bullets={[
            'Synchronizes Redis state',
            'Detects updates',
            'Removes stale execution state',
          ]}
          body={MONGO_WATCH_BODY}
        />
        <DataPlaneCard
          title="Monitoring & Alerts"
          icon="bell"
          bullets={[
            'Latency alerts',
            'Provider failures',
            'Websocket disconnects',
            'System health monitoring',
          ]}
          body={MONITORING_BODY}
        />
        <DataPlaneCard
          title="Hindsight Recovery Engine"
          icon="refresh-cw"
          bullets={[
            'Detects outages',
            'Fetches missing historical prices',
            'Re-runs matching logic',
            'Reconciles state',
            'Restores realtime execution',
          ]}
          body={HINDSIGHT_BODY}
        />
      </div>
    </RteSectionShell>
  );
}

const INPUT_IDS = ['input-recs', 'input-hist', 'input-providers'] as const;

export function RteInputSources({ expand }: Props) {
  const items = [
    {
      title: 'Trade Recommendations',
      sub: 'Structured & unstructured',
      icon: 'line-chart' as const,
      body: 'Ingested advisor calls flow from upstream parsers into normalized trade objects ready for execution scheduling.',
    },
    {
      title: 'Historical Price APIs',
      sub: 'Reconciliation & hindsight',
      icon: 'history' as const,
      body: 'Used when websocket gaps occur — fetch missing intervals, replay logic, and converge Redis + Mongo state.',
    },
    {
      title: 'Market Data Providers',
      sub: 'Live ticks & metadata',
      icon: 'zap' as const,
      body: 'Low-latency vendor feeds supply websocket ticks; health checks rotate or pause unhealthy endpoints.',
    },
  ];
  return (
    <RteSectionShell eyebrow="Inputs" title="Input Sources">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch">
        {items.map((it, i) => {
          const id = INPUT_IDS[i]!;
          const open = expand.expandedId === id;
          return (
            <div
              key={it.title}
              className="flex flex-1 items-center gap-0 lg:flex-row"
            >
              <div className="flex-1">
                <button
                  type="button"
                  className="w-full text-left"
                  onClick={() => expand.toggleExpand(id)}
                >
                  <RteGlassPanel className="h-full p-4" glow="subtle">
                    <RteIcon
                      name={it.icon}
                      className="mb-3 h-5 w-5 text-accent/60"
                    />
                    <h3 className="text-sm font-semibold text-white">
                      {it.title}
                    </h3>
                    <p className="mt-1 text-xs text-white/40">{it.sub}</p>
                    <p className="mt-2 text-[10px] uppercase tracking-wider text-accent/40">
                      {open ? 'Tap to collapse' : 'Tap for detail'}
                    </p>
                    {open ? (
                      <m.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 border-t border-white/[0.08] pt-3 text-sm leading-relaxed text-white/55"
                      >
                        {it.body}
                      </m.p>
                    ) : null}
                  </RteGlassPanel>
                </button>
              </div>
              {i < items.length - 1 ? (
                <div className="hidden shrink-0 lg:block">
                  <RteConnectorH />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex justify-center lg:hidden">
        <RteConnectorV />
      </div>
    </RteSectionShell>
  );
}
