import { m } from 'framer-motion';
import { Bell, Cog, RefreshCw } from 'lucide-react';
import { rrisFollowUpDetection } from '../../../data/rrisArchitectureCopy';
import { RrisGlassPanel } from './RrisPrimitives';

function titleCaseSignal(s: string) {
  return s
    .split(' ')
    .map((w) => (w ? w.charAt(0).toUpperCase() + w.slice(1).toLowerCase() : ''))
    .join(' ');
}

/** Row-major 2×3 grid matching reference: rows (Target, SL), (Exit, Mods), (Time, New). */
const SIGNAL_GRID_ORDER = [0, 1, 2, 4, 3, 5] as const;

/** Vertical animated connector between operational flow steps. */
function OperationalConnector() {
  return (
    <div className="relative flex h-7 shrink-0 justify-center py-0.5" aria-hidden>
      <div className="relative h-full w-px overflow-visible bg-gradient-to-b from-cyan-400/25 via-violet-400/35 to-teal-400/20">
        <m.div
          className="absolute inset-x-0 top-0 h-1/2 w-full bg-gradient-to-b from-cyan-300/50 to-transparent"
          animate={{ top: ['-50%', '100%'] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <m.span
        className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-cyan-300/80 shadow-[0_0_8px_2px_rgba(34,211,238,0.35)]"
        animate={{ y: [-10, 10, -10], opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

/** Animated bridge between detection (left) and operational flow (right). */
function ColumnSignalBridge({ orientation }: { orientation: 'vertical' | 'horizontal' }) {
  if (orientation === 'horizontal') {
    return (
      <div className="relative flex h-8 w-full shrink-0 items-center lg:hidden" aria-hidden>
        <div className="relative h-px w-full overflow-hidden rounded-full bg-gradient-to-r from-transparent via-cyan-400/35 to-transparent">
          <m.div
            className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
            animate={{ x: ['-30%', '130%'] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        <m.span
          className="absolute left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-300/75"
          animate={{ x: [-48, 48, -48], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative hidden w-12 shrink-0 flex-col items-center justify-center self-stretch py-2 lg:flex"
      aria-hidden
    >
      <div className="absolute inset-y-6 w-px bg-gradient-to-b from-transparent via-white/12 to-transparent" />
      <div className="relative h-full min-h-[120px] w-px overflow-visible bg-gradient-to-b from-cyan-400/20 via-violet-400/30 to-teal-400/20">
        <m.div
          className="absolute inset-x-0 top-0 h-1/3 w-full bg-gradient-to-b from-cyan-400/45 to-transparent"
          animate={{ top: ['-20%', '100%'] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'linear' }}
        />
      </div>
      <m.span
        className="absolute h-1.5 w-1.5 rounded-full bg-cyan-300/85 shadow-[0_0_10px_2px_rgba(34,211,238,0.25)]"
        style={{ top: '18%' }}
        animate={{ top: ['18%', '82%', '18%'], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

const operationalSteps = [
  { label: 'Trade update applied', tone: 'text-white/85' as const },
  {
    label: 'Execution engine sync',
    icon: (
      <m.span
        className="inline-flex text-teal-300/90"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        <RefreshCw className="h-4 w-4" strokeWidth={1.35} />
      </m.span>
    ),
  },
  {
    label: 'User notification (if enabled)',
    icon: <Bell className="h-4 w-4 text-amber-200/85" strokeWidth={1.35} />,
  },
] as const;

/** Follow-up: 2-column architecture — detection signal grid | operational flow + animated bridges. */
export function RrisFollowUpTracking() {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/55">
          Continuity
        </p>
        <h3 className="mt-1 text-[11px] font-bold uppercase tracking-[0.14em] text-white/88 sm:text-xs">
          Follow-up tracking &amp; user notifications
        </h3>
        <p className="mt-2 max-w-3xl text-[11px] leading-relaxed text-white/42">
          The system continuously tracked follow-up updates from advisors across multiple sources —
          evolving trade intelligence, not one-shot captures.
        </p>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
        {/* LEFT — Follow-up Detection Engine */}
        <m.div
          className="min-w-0 flex-1 lg:max-w-none"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-32px' }}
          transition={{ duration: 0.4 }}
        >
          <RrisGlassPanel className="relative h-full overflow-visible p-4 sm:p-5" glow="violet">
            <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-br from-cyan-500/10 via-transparent to-violet-500/10 opacity-70" />
            <div className="relative">
              <div className="flex items-start gap-3">
                <m.span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-500/[0.1] text-cyan-200/90 shadow-[0_0_20px_-8px_rgba(34,211,238,0.35)]"
                  animate={{ opacity: [0.85, 1, 0.85] }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <Cog className="h-4 w-4" strokeWidth={1.35} />
                </m.span>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/88">
                    Follow-up Detection Engine
                  </p>
                  <p className="mt-1 text-[10px] leading-relaxed text-white/45">
                    Correlates advisor deltas against open positions and pending trades.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-1.5">
                {SIGNAL_GRID_ORDER.map((idx, i) => {
                  const t = rrisFollowUpDetection[idx];
                  return (
                  <m.div
                    key={t}
                    initial={{ opacity: 0, y: 4 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: '0 0 18px -6px rgba(34,211,238,0.2)',
                    }}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 text-center text-[9px] font-medium leading-tight text-white/65 sm:text-[10px]"
                  >
                    {titleCaseSignal(t)}
                  </m.div>
                  );
                })}
              </div>
            </div>
          </RrisGlassPanel>
        </m.div>

        <ColumnSignalBridge orientation="horizontal" />
        <ColumnSignalBridge orientation="vertical" />

        {/* RIGHT — Operational Update Flow */}
        <m.div
          className="min-w-0 flex-1 lg:max-w-none"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-32px' }}
          transition={{ duration: 0.4, delay: 0.06 }}
        >
          <RrisGlassPanel className="relative h-full overflow-visible p-4 sm:p-5" glow="violet">
            <div className="pointer-events-none absolute -inset-px rounded-xl bg-gradient-to-bl from-teal-500/8 via-transparent to-violet-500/8 opacity-80" />
            <div className="relative">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/88">
                Operational Update Flow
              </p>
              <p className="mt-1 text-[10px] leading-relaxed text-white/40">
                Realtime propagation from applied trade state to clients.
              </p>

              <div className="mt-4 flex flex-col">
                {operationalSteps.map((row, idx) => (
                  <div key={row.label}>
                    {idx > 0 ? <OperationalConnector /> : null}
                    <m.div
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <RrisGlassPanel
                        className="border-teal-400/12 px-3 py-2.5 shadow-[0_0_24px_-16px_rgba(45,212,191,0.12)]"
                        glow="subtle"
                      >
                        <div className="flex items-center gap-2.5">
                          {'icon' in row && row.icon ? row.icon : null}
                          <p
                            className={`text-[11px] font-medium sm:text-xs ${'tone' in row && row.tone ? row.tone : 'text-white/72'}`}
                          >
                            {row.label}
                          </p>
                        </div>
                      </RrisGlassPanel>
                    </m.div>
                  </div>
                ))}
              </div>
            </div>
          </RrisGlassPanel>
        </m.div>
      </div>
    </div>
  );
}
