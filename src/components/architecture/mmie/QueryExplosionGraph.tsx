import { motion } from 'framer-motion';
import { Database } from 'lucide-react';
import { mmieQueryDimensions } from '../../../data/mmieArchitectureCopy';
import { QueryDimensionNode } from './QueryDimensionNode';
import { MmieGlassPanel } from './MmiePrimitives';

/** Convergence: dimensions → paths → orchestrator (hero visual). */
export function QueryExplosionGraph() {
  return (
    <div className="relative mt-8 border-t border-white/[0.06] pt-8 md:mt-9 md:pt-9">
      <div className="grid grid-cols-12 gap-x-4 gap-y-3">
        <div className="col-span-12">
          <p className="font-mono text-lg font-bold text-cyan-500/25 md:text-xl">01</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Query explosion</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
            Nine dimensions compound combinatorially — each permutation is a new aggregation path under live prices.
          </p>
        </div>

        <div className="col-span-12 mt-5">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9">
            {mmieQueryDimensions.map((d, i) => (
              <QueryDimensionNode key={d.id} label={d.label} values={d.values} delay={i * 0.02} />
            ))}
          </div>
        </div>

        <div className="col-span-12 mt-8 flex flex-col items-center gap-3">
          <div className="relative flex h-7 w-px overflow-visible bg-gradient-to-b from-cyan-500/15 to-violet-500/15">
            <motion.span
              className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 rounded-full bg-cyan-400/70"
              animate={{ y: [0, 22, 0], opacity: [0.35, 0.85, 0.35] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md"
          >
            <MmieGlassPanel className="px-4 py-3 text-center md:px-5" glow="violet">
              <p className="text-sm font-semibold uppercase tracking-[0.1em] text-violet-200/90 md:text-base">
                Millions of possible query paths
              </p>
            </MmieGlassPanel>
          </motion.div>
          <div className="relative flex h-6 w-px bg-gradient-to-b from-violet-500/15 to-cyan-500/15">
            <motion.span
              className="absolute bottom-0 left-1/2 h-0.5 w-0.5 -translate-x-1/2 rounded-full bg-violet-400/60"
              animate={{ opacity: [0.25, 0.7, 0.25] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full max-w-md"
          >
            <MmieGlassPanel className="flex items-center justify-center gap-2.5 px-4 py-3 md:gap-3" glow="cyan">
              <Database className="h-5 w-5 shrink-0 text-cyan-200/90" strokeWidth={1.25} />
              <span className="text-sm font-semibold text-cyan-50 md:text-base">Redis query orchestrator</span>
            </MmieGlassPanel>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
