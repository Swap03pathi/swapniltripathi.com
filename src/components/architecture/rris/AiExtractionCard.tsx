import { motion } from 'framer-motion';
import { RrisGlassPanel } from './RrisPrimitives';

export function AiExtractionCard({
  step,
  title,
  subtitle,
  bullets,
  highlight,
  compact = false,
}: {
  step: string;
  title: string;
  subtitle: string;
  bullets: string[];
  highlight?: string;
  /** Denser typography and padding for horizontal side-by-side layouts. */
  compact?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className="h-full"
    >
      <RrisGlassPanel
        className={`flex h-full flex-col ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6'}`}
        glow="violet"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/70">
          {step}
        </p>
        <h3 className={`mt-2 font-semibold text-white ${compact ? 'text-sm sm:text-base' : 'text-base'}`}>
          {title}
        </h3>
        <p className={`mt-2 italic text-white/45 ${compact ? 'text-xs leading-snug' : 'text-sm'}`}>
          &ldquo;{subtitle}&rdquo;
        </p>
        {highlight ? (
          <p
            className={`mt-3 rounded-lg border border-accent/15 bg-accent/[0.06] leading-relaxed text-accent/90 ${compact ? 'px-2.5 py-1.5 text-[11px]' : 'px-3 py-2 text-xs'}`}
          >
            {highlight}
          </p>
        ) : null}
        <ul
          className={`flex-1 space-y-1.5 text-white/55 sm:space-y-2 ${compact ? 'mt-3 text-xs leading-snug' : 'mt-4 text-sm'}`}
        >
          {bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-violet-400/50" />
              {b}
            </li>
          ))}
        </ul>
      </RrisGlassPanel>
    </motion.div>
  );
}
