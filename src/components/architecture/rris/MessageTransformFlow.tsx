import { motion } from 'framer-motion';
import { RrisGlassPanel } from './RrisPrimitives';
import {
  rrisMessageJson,
  rrisMessageRaw,
  rrisNormalizedObjectLines,
} from '../../../data/rrisArchitectureCopy';

export function MessageTransformFlow() {
  return (
    <div className="mx-auto w-full max-w-6xl grid gap-4 lg:grid-cols-3 lg:gap-0">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="lg:pr-4"
      >
        <RrisGlassPanel className="h-full p-4 sm:p-5" glow="subtle">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-white/35">
            Raw message
          </p>
          <pre className="mt-3 whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-white/55 sm:text-[11px]">
            {rrisMessageRaw}
          </pre>
        </RrisGlassPanel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.06 }}
        className="relative lg:border-x lg:border-white/[0.06] lg:px-4"
      >
        <RrisGlassPanel className="h-full p-4 sm:p-5" glow="violet">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-violet-300/60">
            AI extraction (JSON)
          </p>
          <pre className="mt-3 whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-emerald-200/75 sm:text-[11px]">
            {rrisMessageJson}
          </pre>
        </RrisGlassPanel>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12 }}
        className="lg:pl-4"
      >
        <RrisGlassPanel className="h-full p-4 sm:p-5" glow="subtle">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent/50">
            Normalized trade object
          </p>
          <ul className="mt-3 space-y-1 font-mono text-[10px] leading-relaxed text-white/58 sm:text-[11px]">
            {rrisNormalizedObjectLines.map((row) => (
              <li key={row.k}>
                <span className="text-violet-300/55">{row.k}</span>
                <span className="text-white/25">: </span>
                <span>{row.v}</span>
              </li>
            ))}
          </ul>
        </RrisGlassPanel>
      </motion.div>
    </div>
  );
}
