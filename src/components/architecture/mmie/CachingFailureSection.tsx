import { motion } from 'framer-motion';
import {
  mmieCachingFilterFlow,
  mmieCachingImpacts,
  mmieCachingPriceFlow,
} from '../../../data/mmieArchitectureCopy';
import { MmieGlassPanel, MmieSectionShell } from './MmiePrimitives';

function VerticalPath({
  title,
  steps,
  tone,
}: {
  title: string;
  steps: readonly string[];
  tone: 'rose' | 'violet';
}) {
  const ring = tone === 'rose' ? 'border-rose-500/12 bg-rose-950/[0.12]' : 'border-violet-500/12 bg-violet-950/[0.1]';
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">{title}</p>
      <div className={`rounded-xl border ${ring} p-4 md:p-5`}>
        <div className="space-y-0">
          {steps.map((s, i) => (
            <div key={s}>
              {i > 0 ? (
                <div className="py-1.5 pl-0.5 font-mono text-xs text-slate-600" aria-hidden>
                  ↓
                </div>
              ) : null}
              <p className="text-sm leading-snug text-slate-200 md:text-base">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CachingFailureSection() {
  return (
    <MmieSectionShell number="02" eyebrow="Failure mode" title="Why traditional caching failed">
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
        Static keys break when <span className="text-slate-200">filters × live prices</span> explode into unrelated
        aggregation paths — the pivot from cache-first to computation-first.
      </p>

      <MmieGlassPanel className="p-4 md:p-6" glow="subtle">
        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <VerticalPath title="Filter change" steps={mmieCachingFilterFlow} tone="rose" />
          <VerticalPath title="Market mutation" steps={mmieCachingPriceFlow} tone="violet" />
        </div>
        <ul className="mt-8 grid gap-2 border-t border-white/[0.06] pt-6 sm:grid-cols-2">
          {mmieCachingImpacts.map((t, i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 4 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="flex gap-2.5 text-sm leading-relaxed text-slate-400"
            >
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-amber-500/50" />
              {t}
            </motion.li>
          ))}
        </ul>
      </MmieGlassPanel>
    </MmieSectionShell>
  );
}
