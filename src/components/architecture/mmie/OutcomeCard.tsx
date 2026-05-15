import { motion } from 'framer-motion';

export function OutcomeCard({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="flex gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 md:px-4 md:py-3"
    >
      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-500/35" aria-hidden />
      <p className="text-sm leading-snug text-slate-300 md:text-[15px]">{text}</p>
    </motion.div>
  );
}
