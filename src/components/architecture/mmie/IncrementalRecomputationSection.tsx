import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Cog, Database, LineChart } from 'lucide-react';
import {
  mmieIncrementalNotes,
  mmieIncrementalQuote,
  mmieIncrementalSteps,
} from '../../../data/mmieArchitectureCopy';
import { MmieGlassPanel, MmieSectionShell } from './MmiePrimitives';

const icons = [Calendar, Cog, Database, LineChart] as const;

export function IncrementalRecomputationSection() {
  return (
    <MmieSectionShell number="06" eyebrow="Delta" title="Incremental recomputation system">
      <MmieGlassPanel className="p-4 md:p-5" glow="subtle">
        <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-center md:gap-x-0 md:gap-y-2">
          {mmieIncrementalSteps.map((s, i) => {
            const Icon = icons[i] ?? Cog;
            return (
              <Fragment key={s}>
                {i > 0 ? (
                  <motion.span
                    className="hidden px-1 text-center text-sm text-slate-600 md:inline"
                    animate={{ opacity: [0.35, 0.7, 0.35] }}
                    transition={{ duration: 2.4, delay: i * 0.12, repeat: Infinity }}
                    aria-hidden
                  >
                    →
                  </motion.span>
                ) : null}
                <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 md:border-0 md:bg-transparent md:px-2">
                  <Icon className="h-4 w-4 shrink-0 text-cyan-400/65" strokeWidth={1.35} />
                  <span className="text-sm font-medium text-slate-200 md:text-base">{s}</span>
                </div>
              </Fragment>
            );
          })}
        </div>
        <p className="mt-5 border-t border-white/[0.06] pt-4 text-center text-sm font-medium italic text-cyan-200/80 md:text-base">
          “{mmieIncrementalQuote}”
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-3">
          {mmieIncrementalNotes.map((n, i) => (
            <motion.li
              key={n}
              initial={{ opacity: 0, y: 3 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="text-center text-sm leading-snug text-slate-500"
            >
              {n}
            </motion.li>
          ))}
        </ul>
      </MmieGlassPanel>
    </MmieSectionShell>
  );
}
