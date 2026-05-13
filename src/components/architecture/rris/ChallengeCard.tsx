import { motion } from 'framer-motion';
import { RrisGlassPanel } from './RrisPrimitives';

export function ChallengeCard({ title }: { title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.35 }}
    >
      <RrisGlassPanel className="h-full p-4" glow="subtle">
        <p className="text-sm leading-relaxed text-white/60">{title}</p>
      </RrisGlassPanel>
    </motion.div>
  );
}
