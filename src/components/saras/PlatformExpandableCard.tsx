import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { SarasCard } from './SarasPrimitives';

export default function PlatformExpandableCard({
  title,
  items,
  paragraphs,
  defaultOpen = false,
}: {
  title: string;
  items: readonly string[];
  paragraphs: readonly string[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SarasCard className="overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 p-5 text-left md:p-6"
        aria-expanded={open}
      >
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <ul className="mt-4 space-y-2">
            {items.map((item) => (
              <li key={item} className="text-sm text-white/45">
                · {item}
              </li>
            ))}
          </ul>
        </div>
        <span className="mt-1 flex shrink-0 items-center gap-1.5 text-sm font-medium text-accent/65">
          {open ? 'Close' : 'Explore'}
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
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
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/[0.06] px-5 pb-5 pt-4 md:px-6 md:pb-6">
              {paragraphs.map((p) => (
                <p key={p.slice(0, 48)} className="text-sm leading-relaxed text-white/45 md:text-base">
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
