import { motion } from 'framer-motion';
import { rrisEngineeringPriorities, rrisTradeoffQuote } from '../../../data/rrisArchitectureCopy';

const accentRing: Record<
  (typeof rrisEngineeringPriorities)[number]['accent'],
  string
> = {
  emerald:
    'border-emerald-400/35 shadow-[0_0_32px_-10px_rgba(52,211,153,0.4)] bg-emerald-500/[0.07]',
  amber:
    'border-amber-400/32 shadow-[0_0_26px_-12px_rgba(251,191,36,0.32)] bg-amber-500/[0.06]',
  sky: 'border-sky-400/32 shadow-[0_0_22px_-12px_rgba(56,189,248,0.28)] bg-sky-500/[0.05]',
};

const tierColor: Record<(typeof rrisEngineeringPriorities)[number]['accent'], string> = {
  emerald: 'text-emerald-200/90',
  amber: 'text-amber-200/85',
  sky: 'text-sky-200/85',
};

type Variant = 'standalone' | 'column';

/** Three weighted priority cards — no radar chart. */
export function RrisEngineeringPriorities({ variant = 'standalone' }: { variant?: Variant }) {
  const isColumn = variant === 'column';
  return (
    <div className={isColumn ? 'space-y-3' : 'mx-auto max-w-md space-y-4'}>
      {rrisEngineeringPriorities.map((p, i) => {
        const scale =
          !isColumn && p.title === 'Accuracy' ? 1 : !isColumn && p.title === 'Latency' ? 0.985 : !isColumn ? 0.97 : 1;
        const py = p.title === 'Accuracy' ? 'py-5' : 'py-4';
        const num = i + 1;
        return (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.45 }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            style={
              !isColumn
                ? { transform: `scale(${scale})`, transformOrigin: 'top center' }
                : undefined
            }
            className="relative"
          >
            <div
              className={`rounded-xl border backdrop-blur-sm ${accentRing[p.accent]} ${isColumn ? 'px-4 py-4' : `${py} px-5`}`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] text-[10px] font-bold text-white/45">
                  {num}
                </span>
                <div className="min-w-0 flex-1 text-right">
                  <span
                    className={`text-[9px] font-semibold uppercase tracking-wider ${tierColor[p.accent]}`}
                  >
                    {p.tier}
                  </span>
                </div>
              </div>
              <h3
                className={`mt-2 font-bold tracking-tight text-white ${isColumn ? 'text-base' : 'text-lg'}`}
              >
                {p.title}
              </h3>
              <ul
                className={`mt-3 space-y-1.5 leading-snug text-white/55 ${isColumn ? 'text-[11px]' : 'text-[12px]'}`}
              >
                {p.bullets.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/25" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        );
      })}
      <p
        className={`leading-relaxed text-white/38 ${isColumn ? 'pt-1 text-[10px]' : 'pt-2 text-center text-[11px]'}`}
      >
        {rrisTradeoffQuote}
      </p>
    </div>
  );
}
