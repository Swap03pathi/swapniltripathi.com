import { motion } from 'framer-motion';

type Orientation = 'vertical' | 'horizontal';

export function PipelineConnector({
  orientation = 'vertical',
  className = '',
  delay = 0,
}: {
  orientation?: Orientation;
  className?: string;
  delay?: number;
}) {
  if (orientation === 'horizontal') {
    return (
      <div className={`relative flex min-h-[1.5rem] items-center ${className}`} aria-hidden>
        <motion.div
          className="h-px w-full bg-gradient-to-r from-transparent via-violet-400/35 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ originX: 0 }}
        />
        <motion.span
          className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/50"
          animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    );
  }
  return (
    <div className={`relative flex justify-center py-0.5 ${className}`} aria-hidden>
      <div className="relative h-10 w-px sm:h-14">
        <motion.div
          className="absolute inset-0 w-px bg-gradient-to-b from-violet-400/20 via-accent/35 to-violet-400/20"
          initial={{ scaleY: 0, opacity: 0 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
        />
        <motion.span
          className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent/45"
          animate={{ y: [0, -28, 0], opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
