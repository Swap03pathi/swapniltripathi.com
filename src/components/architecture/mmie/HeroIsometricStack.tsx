import { motion } from 'framer-motion';

const LAYERS = [
  { label: 'Live prices', from: 'from-emerald-400/35', to: 'to-emerald-950/30', border: 'border-emerald-500/20' },
  { label: 'Trade universe', from: 'from-sky-400/35', to: 'to-sky-950/30', border: 'border-sky-500/20' },
  { label: 'Ranking computation', from: 'from-amber-400/35', to: 'to-amber-950/30', border: 'border-amber-500/20' },
  { label: 'Advisor intelligence', from: 'from-violet-400/35', to: 'to-violet-950/30', border: 'border-violet-500/20' },
  { label: 'Query orchestrator', from: 'from-cyan-400/35', to: 'to-cyan-950/30', border: 'border-cyan-500/22' },
] as const;

/** Isometric-style stack — restrained glow */
export function HeroIsometricStack() {
  return (
    <div className="relative mx-auto flex max-w-[260px] flex-col items-center justify-end lg:mx-0 lg:ml-auto lg:max-w-[300px]">
      <div
        className="relative flex w-full flex-col items-center gap-0 perspective-[800px]"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {LAYERS.map((layer, i) => (
          <motion.div
            key={layer.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06 * i }}
            className="relative w-[86%]"
            style={{
              zIndex: LAYERS.length - i,
              transform: `translateY(${i * -9}px) rotateX(52deg) skewX(-8deg) scale(${1 - i * 0.018})`,
              transformOrigin: '50% 100%',
            }}
          >
            <div
              className={`rounded-lg border bg-gradient-to-br px-3 py-2.5 shadow-md ${layer.border} ${layer.from} ${layer.to}`}
            >
              <p className="text-center text-sm font-medium text-white/90">{layer.label}</p>
            </div>
            {i < LAYERS.length - 1 ? (
              <div className="pointer-events-none absolute -top-2.5 left-1/2 h-2.5 w-px -translate-x-1/2 bg-gradient-to-t from-white/10 to-transparent" />
            ) : null}
          </motion.div>
        ))}
      </div>
      <div className="pointer-events-none absolute -inset-6 rounded-full bg-cyan-500/[0.03] blur-2xl" aria-hidden />
    </div>
  );
}
