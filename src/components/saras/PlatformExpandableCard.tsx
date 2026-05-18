import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SarasCard } from './SarasPrimitives';

export default function PlatformExpandableCard({
  title,
  items,
  paragraphs,
  defaultOpen = false,
  cardClassName = '',
}: {
  title: string;
  items: readonly string[];
  paragraphs: readonly string[];
  defaultOpen?: boolean;
  cardClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SarasCard subtle className={`overflow-hidden ${cardClassName}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-medium text-white/85">{title}</h3>
          <ul className="mt-3 space-y-1.5">
            {items.map((item) => (
              <li key={item} className="text-xs leading-relaxed text-white/38">
                · {item}
              </li>
            ))}
          </ul>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1.5 text-xs font-medium text-white/40">
          {open ? 'Close' : 'Explore'}
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
            strokeWidth={2}
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-3 border-t border-white/[0.05] px-5 pb-5 pt-4 md:px-6 md:pb-6">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="text-xs leading-relaxed text-white/40">
                  {p}
                </p>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SarasCard>
  );
}
