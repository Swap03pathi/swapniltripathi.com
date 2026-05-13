import { motion } from 'framer-motion';
import { rrisPreviewSources } from '../../../data/rrisArchitectureCopy';
import { PipelineConnector } from './PipelineConnector';
import { SourceNodeCompact } from './SourceNode';
import { RrisGlassPanel } from './RrisPrimitives';

const layers = [
  'Classification layer',
  'Extraction layer',
  'Normalization layer',
  'Trade collection',
] as const;

/** Hero convergence: multi-source inputs funnel into pipeline stack. */
export function RrisConvergenceMap() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.07] bg-gradient-to-b from-violet-950/[0.25] via-dark-light/40 to-transparent p-6 sm:p-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139,92,246,0.15), transparent),
            radial-gradient(ellipse 60% 40% at 80% 60%, rgba(0,212,255,0.06), transparent)`,
        }}
      />
      {/* subtle particles */}
      {[...Array(12)].map((_, i) => (
        <motion.span
          key={i}
          className="pointer-events-none absolute h-0.5 w-0.5 rounded-full bg-white/30"
          style={{
            left: `${8 + (i * 7) % 84}%`,
            top: `${10 + (i * 11) % 70}%`,
          }}
          animate={{ opacity: [0.2, 0.6, 0.2], y: [0, -12, 0] }}
          transition={{
            duration: 4 + (i % 4),
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        />
      ))}

      <p className="relative mb-8 text-center text-[10px] font-medium uppercase tracking-[0.25em] text-violet-300/55">
        Multi-source convergence
      </p>

      <div className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 md:gap-3 lg:grid-cols-6">
        {rrisPreviewSources.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <SourceNodeCompact label={s.label} icon={s.icon} pulse />
          </motion.div>
        ))}
      </div>

      <div className="relative mx-auto mt-4 max-w-xs">
        <PipelineConnector orientation="vertical" />
        <motion.div
          className="flex justify-center"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="h-px w-3/4 max-w-xs bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </motion.div>
        <PipelineConnector orientation="vertical" delay={0.1} />
      </div>

      <div className="relative mx-auto mt-2 max-w-md space-y-2">
        {layers.map((label, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 + i * 0.08 }}
          >
            <RrisGlassPanel
              className="px-4 py-3 text-center text-sm font-medium text-white/80"
              glow={i === layers.length - 1 ? 'violet' : 'subtle'}
            >
              {label}
            </RrisGlassPanel>
            {i < layers.length - 1 ? (
              <div className="py-1">
                <PipelineConnector orientation="vertical" delay={0.05 * i} />
              </div>
            ) : null}
          </motion.div>
        ))}
      </div>

      <p className="relative mt-8 text-center text-xs text-white/35">
        Messy human communication → AI orchestration → execution-ready state
      </p>
    </div>
  );
}
