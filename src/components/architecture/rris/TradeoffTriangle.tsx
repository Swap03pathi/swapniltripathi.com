import { motion } from 'framer-motion';
import { RrisGlassPanel } from './RrisPrimitives';

function Vertex({
  title,
  subtitle,
  variant,
}: {
  title: string;
  subtitle: string;
  variant: 'top' | 'left' | 'right';
}) {
  const ring =
    variant === 'top'
      ? 'border-violet-400/25 bg-violet-500/[0.08]'
      : 'border-white/[0.1] bg-white/[0.03]';
  return (
    <RrisGlassPanel
      className={`p-4 text-center sm:p-5 ${variant === 'top' ? 'sm:max-w-xs' : ''}`}
      glow={variant === 'top' ? 'violet' : 'subtle'}
    >
      <div className={`rounded-lg border px-3 py-1.5 ${ring}`}>
        <p className="text-sm font-semibold text-white/90">{title}</p>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-white/45">{subtitle}</p>
    </RrisGlassPanel>
  );
}

/**
 * Accuracy / Latency / Cost tradeoff — three vertices + rationale (no oversized SVG).
 */
export function TradeoffTriangle() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <p className="text-center text-xs text-white/40">
        Early-scale priority: push the triangle toward accuracy and latency first;
        cost followed once ingestion volume stabilized.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        <div className="sm:col-span-2 sm:flex sm:justify-center">
          <div className="w-full sm:max-w-sm">
            <Vertex
              variant="top"
              title="Accuracy"
              subtitle="Correct extraction, instrument disambiguation, and hallucination controls before anything hits the trade queue."
            />
          </div>
        </div>
        <Vertex
          variant="left"
          title="Latency"
          subtitle="Telegram and livestream paths stay hot: classify fast, queue fairly, avoid blocking the realtime fan-out."
        />
        <Vertex
          variant="right"
          title="Cost"
          subtitle="Two-stage LLM flow and deduplication so expensive prompts only run on real recommendation traffic."
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <RrisGlassPanel className="p-5 text-center sm:p-6" glow="violet">
          <p className="text-sm leading-relaxed text-white/65">
            The system optimized for{' '}
            <span className="font-medium text-violet-200/95">accuracy</span> and{' '}
            <span className="font-medium text-accent/90">latency</span> during early
            scale because execution realism mattered more than infrastructure cost.
          </p>
        </RrisGlassPanel>
      </motion.div>
    </div>
  );
}
