import { motion } from 'framer-motion';
import { Frown, Sparkles } from 'lucide-react';
import {
  mmieAdvisorCategories,
  mmieAdvisorNew,
  mmieAdvisorOld,
  mmieDeltaUpdatesNote,
  mmieRollingWindows,
} from '../../../data/mmieArchitectureCopy';
import { MmieGlassPanel, MmieSectionShell } from './MmiePrimitives';

export function AdvisorIntelligenceSection() {
  return (
    <MmieSectionShell number="05" eyebrow="Scoring" title="Realtime advisor intelligence engine">
      <div className="grid gap-4 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <MmieGlassPanel className="h-full border-rose-500/10 p-5 md:p-6" glow="subtle">
            <div className="mb-3 flex items-center gap-2 text-rose-300/95">
              <Frown className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-semibold uppercase tracking-wider">{mmieAdvisorOld.title}</span>
            </div>
            <code className="block rounded-lg border border-white/[0.06] bg-black/25 px-3 py-2.5 font-mono text-base text-rose-100/85">
              {mmieAdvisorOld.formula}
            </code>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-400">
              {mmieAdvisorOld.problems.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-rose-400/50">×</span>
                  {p}
                </li>
              ))}
            </ul>
          </MmieGlassPanel>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
        >
          <MmieGlassPanel className="h-full border-emerald-500/12 p-5 md:p-6" glow="subtle">
            <div className="mb-3 flex items-center gap-2 text-emerald-200/95">
              <Sparkles className="h-5 w-5 shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-semibold uppercase tracking-wider">{mmieAdvisorNew.title}</span>
            </div>
            <ul className="space-y-2 text-sm leading-relaxed text-slate-300">
              {mmieAdvisorNew.parts.map((p) => (
                <li key={p} className="flex gap-2">
                  <span className="text-emerald-400/55">+</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </MmieGlassPanel>
        </motion.div>
      </div>

      <MmieGlassPanel className="mt-4 p-4 md:p-5" glow="subtle">
        <div className="grid gap-6 md:grid-cols-3 md:gap-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Rolling windows</p>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {mmieRollingWindows.map((w) => (
                <span
                  key={w}
                  className="rounded border border-cyan-500/12 bg-cyan-500/[0.04] px-2 py-0.5 font-mono text-sm text-cyan-100/80"
                >
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Category segmentation</p>
            <ul className="mt-2 space-y-1 text-sm text-slate-400">
              {mmieAdvisorCategories.map((c) => (
                <li key={c}>· {c}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Incremental updates</p>
            <p className="mt-2 text-sm text-slate-400">
              <span className="font-mono text-cyan-200/80">per-event delta</span>
              <span className="mx-1.5 text-slate-600">{'>'}</span>
              <span className="font-mono text-slate-500">full recompute</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-500">{mmieDeltaUpdatesNote}</p>
          </div>
        </div>
      </MmieGlassPanel>
    </MmieSectionShell>
  );
}
