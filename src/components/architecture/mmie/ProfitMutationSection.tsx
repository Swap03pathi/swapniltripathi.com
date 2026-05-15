import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';
import { mmieProfitExplain, mmieProfitQuote, mmieProfitSteps } from '../../../data/mmieArchitectureCopy';
import { MmieGlassPanel, MmieSectionShell } from './MmiePrimitives';

export function ProfitMutationSection() {
  return (
    <MmieSectionShell number="07" eyebrow="Ticks" title="Live profit potential mutation">
      <MmieGlassPanel className="p-4 md:p-5" glow="subtle">
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-0">
          {mmieProfitSteps.map((s, i) => (
            <Fragment key={s}>
              {i > 0 ? (
                <motion.span
                  className="hidden px-1.5 text-sm text-amber-600/45 md:inline"
                  animate={{ opacity: [0.35, 0.8, 0.35] }}
                  transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                  aria-hidden
                >
                  ↓
                </motion.span>
              ) : null}
              <span className="rounded-lg border border-amber-500/10 bg-amber-950/15 px-3 py-2 text-sm font-medium text-amber-100/90 md:border-0 md:bg-transparent md:px-2 md:text-base">
                {s}
              </span>
            </Fragment>
          ))}
        </div>
        <div className="mt-5 flex flex-col items-center gap-2 border-t border-white/[0.06] pt-4 sm:flex-row sm:justify-center sm:gap-3">
          <Activity className="h-4 w-4 text-amber-500/45" strokeWidth={1.5} aria-hidden />
          <p className="text-center text-sm font-semibold text-amber-200/90 md:text-base">“{mmieProfitQuote}”</p>
        </div>
      </MmieGlassPanel>

      <ul className="mt-4 space-y-2">
        {mmieProfitExplain.map((e, i) => (
          <motion.li
            key={e}
            initial={{ opacity: 0, x: -4 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="text-sm leading-relaxed text-slate-500 md:text-base"
          >
            <span className="mr-2 text-amber-500/30">—</span>
            {e}
          </motion.li>
        ))}
      </ul>
    </MmieSectionShell>
  );
}
