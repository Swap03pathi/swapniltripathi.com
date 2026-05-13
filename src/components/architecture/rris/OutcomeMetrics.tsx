import { motion } from 'framer-motion';
import { RrisGlassPanel } from './RrisPrimitives';
import { RrisIcon } from './RrisIcons';

export function OutcomeMetrics({
  items,
}: {
  items: readonly string[] | string[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((t, i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <RrisGlassPanel className="flex items-center gap-3 p-4" glow="subtle">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/[0.06]">
              <RrisIcon name="sparkles" className="h-4 w-4 text-accent/70" />
            </span>
            <span className="text-sm text-white/65">{t}</span>
          </RrisGlassPanel>
        </motion.div>
      ))}
    </div>
  );
}
