import { motion } from 'framer-motion';
import { Check, Server } from 'lucide-react';
import { rrisPipelineOutcomes, rrisPreviewSources } from '../../../data/rrisArchitectureCopy';
import { RrisIcon } from './RrisIcons';
import type { RrisIconName } from './RrisIcons';

/** Checklist above orbiting sources (reference: outcomes column, graphic below). */
export function RrisPipelineOutcomesHub() {
  const orbit = [...rrisPreviewSources];
  const r = 82;
  return (
    <div className="flex flex-col gap-8">
      <ul className="space-y-2">
        {rrisPipelineOutcomes.map((t, i) => (
          <motion.li
            key={t}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-2.5 rounded-lg border border-slate-800/80 bg-slate-900/40 px-2.5 py-2"
          >
            <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border border-emerald-400/30 bg-emerald-500/[0.12]">
              <Check className="h-2.5 w-2.5 text-emerald-300" strokeWidth={3} />
            </span>
            <span className="text-[12px] leading-snug text-slate-300">{t}</span>
          </motion.li>
        ))}
      </ul>

      <div className="relative mx-auto flex h-[200px] w-[200px] shrink-0 items-center justify-center sm:h-[220px] sm:w-[220px]">
        <div className="pointer-events-none absolute inset-6 rounded-full border border-sky-500/15" />
        <div className="pointer-events-none absolute inset-3 rounded-full border border-dashed border-white/[0.07]" />

        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          {orbit.map((s, idx) => {
            const deg = (idx / orbit.length) * 360;
            return (
              <div
                key={s.id}
                className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 sm:h-9 sm:w-9"
                style={{
                  transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-${r}px)`,
                }}
              >
                <motion.span
                  className="flex h-full w-full items-center justify-center rounded-lg border border-white/10 bg-[#070b14]/95 text-violet-200/90 shadow-[0_0_16px_-6px_rgba(56,189,248,0.35)]"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
                >
                  <RrisIcon name={s.icon as RrisIconName} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </motion.span>
              </div>
            );
          })}
        </motion.div>

        <motion.div
          className="relative z-[1] flex flex-col items-center gap-1.5 rounded-2xl border border-sky-400/25 bg-sky-500/[0.08] px-5 py-4 shadow-[0_0_36px_-10px_rgba(56,189,248,0.45)]"
          animate={{
            boxShadow: [
              '0 0 28px -10px rgba(56,189,248,0.35)',
              '0 0 40px -8px rgba(139,92,246,0.25)',
              '0 0 28px -10px rgba(56,189,248,0.35)',
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Server className="h-7 w-7 text-sky-200" strokeWidth={1.15} />
          <span className="text-center text-[9px] font-semibold uppercase tracking-widest text-slate-400">
            Ingestion
            <br />
            core
          </span>
        </motion.div>
      </div>
    </div>
  );
}
