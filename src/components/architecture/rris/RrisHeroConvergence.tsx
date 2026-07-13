import { motion } from 'framer-motion';
import {
  Activity,
  ArrowRightLeft,
  Bell,
  Database,
  UserCheck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { rrisPreviewSources, rrisHero } from '../../../data/rrisArchitectureCopy';
import { RrisIcon } from './RrisIcons';
import type { RrisIconName } from './RrisIcons';

const layers: { n: string; label: string; glow: string }[] = [
  {
    n: '01',
    label: 'Classification Layer',
    glow: 'shadow-[0_0_32px_-8px_rgba(59,130,246,0.55)] border-sky-400/40 bg-sky-500/[0.04]',
  },
  {
    n: '02',
    label: 'Extraction Layer',
    glow: 'shadow-[0_0_32px_-8px_rgba(167,139,250,0.55)] border-violet-400/45 bg-violet-500/[0.05]',
  },
  {
    n: '03',
    label: 'Normalization Layer',
    glow: 'shadow-[0_0_32px_-8px_rgba(45,212,191,0.5)] border-teal-400/40 bg-teal-500/[0.04]',
  },
];

const sourceRing: string[] = [
  'border-sky-400/60 shadow-[0_0_20px_-4px_rgba(56,189,248,0.5)]',
  'border-amber-400/60 shadow-[0_0_20px_-4px_rgba(251,191,36,0.45)]',
  'border-rose-400/55 shadow-[0_0_20px_-4px_rgba(251,113,133,0.4)]',
  'border-violet-400/60 shadow-[0_0_20px_-4px_rgba(167,139,250,0.5)]',
  'border-emerald-400/60 shadow-[0_0_20px_-4px_rgba(52,211,153,0.45)]',
  'border-cyan-400/60 shadow-[0_0_20px_-4px_rgba(34,211,238,0.45)]',
];

const pathStrokes = ['#38bdf8', '#fb923c', '#fb7185', '#a78bfa', '#34d399', '#22d3ee'];

const ops: {
  title: string;
  sub?: string;
  Icon: LucideIcon;
}[] = [
  {
    title: 'Human Moderation & Verification',
    sub: 'Approve · Edit · Reject · Editorial pick — human-supervised intelligence, not schema-only checks.',
    Icon: UserCheck,
  },
  {
    title: 'Operational Tools & Monitoring',
    sub: 'Queues, replay, and diff views for live operations.',
    Icon: Activity,
  },
  {
    title: 'Recovery & Reprocessing',
    sub: 'Idempotent windows for backfills and connector fixes.',
    Icon: ArrowRightLeft,
  },
  {
    title: 'Downstream Systems',
    sub: 'Execution engines, collections sync, and client surfaces.',
    Icon: Bell,
  },
];

function ConvergenceFlowSvg({ className = '' }: { className?: string }) {
  const h = 292;
  const ys = [22, 66, 110, 154, 198, 242];
  const targets = [44, 44, 102, 102, 160, 160];
  return (
    <svg
      className={`pointer-events-none ${className}`}
      viewBox={`0 0 120 ${h}`}
      fill="none"
      aria-hidden
    >
      <defs>
        {pathStrokes.map((c, i) => (
          <linearGradient key={i} id={`rris-flow-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={c} stopOpacity="0.15" />
            <stop offset="100%" stopColor={c} stopOpacity="0.85" />
          </linearGradient>
        ))}
      </defs>
      {ys.map((y, i) => {
        const t = targets[i];
        const d = `M 4 ${y} C 48 ${y} 52 ${t} 108 ${t}`;
        return (
          <path
            key={i}
            d={d}
            stroke={`url(#rris-flow-${i})`}
            strokeWidth="1"
            vectorEffect="nonScalingStroke"
            className="opacity-80"
          />
        );
      })}
      {ys.map((y, i) => (
        <circle key={`dot-${i}`} cx="4" cy={y} r="2.5" fill={pathStrokes[i]} fillOpacity="0.85" />
      ))}
    </svg>
  );
}

function OpsColumn({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {ops.map((op, i) => (
        <motion.div
          key={op.title}
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 + i * 0.05 }}
          whileHover={{ y: -1 }}
          className="rounded-lg border border-slate-800/90 bg-slate-950/70 px-3 py-2.5 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
        >
          <div className="flex items-start gap-2.5">
            <op.Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-500" strokeWidth={1.35} />
            <div className="min-w-0">
              <p className="text-[11px] font-semibold leading-snug text-slate-200">{op.title}</p>
              {op.sub ? (
                <p className="mt-1 text-[9px] leading-relaxed text-slate-500">{op.sub}</p>
              ) : null}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/** Hero + convergence diagram aligned to reference layout. */
export function RrisHeroConvergence() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-[#050912]/95 p-6 shadow-[0_0_100px_-48px_rgba(59,130,246,0.22)] backdrop-blur-xl sm:p-8 lg:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(circle at 15% 25%, rgba(56,189,248,0.06), transparent 42%),
            radial-gradient(circle at 88% 12%, rgba(139,92,246,0.08), transparent 38%),
            radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.1), transparent),
            radial-gradient(1px 1px at 70% 60%, rgba(255,255,255,0.06), transparent),
            linear-gradient(rgba(148,163,184,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.04) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, auto, 100% 100%, 100% 100%, 48px 48px, 48px 48px',
        }}
      />

      <div className="relative grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <h1 className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl xl:text-[2rem]">
            {rrisHero.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-[0.9375rem]">
            {rrisHero.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-3 py-1 text-[11px] font-medium text-emerald-100/95">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {rrisHero.badgeLive}
            </span>
            <span className="rounded-full border border-sky-500/35 bg-sky-500/[0.07] px-3 py-1 text-[11px] font-medium text-sky-100/90">
              {rrisHero.badgeProd}
            </span>
          </div>
        </div>

        <div className="lg:col-span-8">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-500">
            Multi-source convergence architecture
          </p>

          <div className="relative mt-5 flex min-h-[260px] flex-col gap-8 lg:min-h-[300px] lg:flex-row lg:items-stretch lg:gap-0">
            <div className="relative z-10 flex shrink-0 flex-row flex-wrap justify-center gap-3 lg:w-[4.75rem] lg:flex-col lg:flex-nowrap lg:justify-between lg:gap-3 lg:py-1">
              <ConvergenceFlowSvg className="pointer-events-none absolute left-full top-2 z-0 hidden h-[280px] w-[5.5rem] -translate-x-2 overflow-visible lg:block" />
              {rrisPreviewSources.map((s, i) => (
                <motion.div
                  key={s.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 bg-[#030712]/90 ${sourceRing[i]}`}
                  title={s.label}
                >
                  <RrisIcon name={s.icon as RrisIconName} className="h-4 w-4 text-white/95" />
                </motion.div>
              ))}
            </div>

            <div className="relative z-10 mx-auto flex w-full max-w-[300px] flex-1 flex-col justify-center gap-0 lg:mx-0 lg:max-w-none lg:px-4">
              {layers.map((L, i) => (
                <motion.div
                  key={L.label}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.05 * i }}
                >
                  <div
                    className={`rounded-xl border bg-slate-950/50 px-3.5 py-3 backdrop-blur-sm ${L.glow}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.06] text-[11px] font-bold text-slate-400">
                        {L.n}
                      </span>
                      <span className="text-xs font-semibold text-white sm:text-sm">{L.label}</span>
                    </div>
                  </div>
                  {i < layers.length - 1 ? (
                    <div className="flex justify-center py-1">
                      <div className="h-3 w-px bg-gradient-to-b from-white/25 to-white/5" />
                    </div>
                  ) : null}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-3"
              >
                <div className="flex items-center justify-center gap-2.5 rounded-xl border border-amber-400/35 bg-amber-500/[0.08] px-4 py-3.5 shadow-[0_0_36px_-10px_rgba(251,191,36,0.4)]">
                  <Database className="h-7 w-7 text-amber-200" strokeWidth={1.2} />
                  <span className="text-xs font-semibold text-amber-50 sm:text-sm">
                    Unified Trade State
                  </span>
                </div>
              </motion.div>
            </div>

            <div className="hidden shrink-0 lg:flex">
              <div
                className="mx-5 w-px self-stretch border-l border-dashed border-slate-600/70"
                aria-hidden
              />
              <OpsColumn className="min-w-[12.5rem] max-w-[15rem]" />
            </div>
          </div>

          <OpsColumn className="mt-2 lg:hidden" />
        </div>
      </div>
    </div>
  );
}
