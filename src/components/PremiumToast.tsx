import { AnimatePresence, m } from 'framer-motion';
import { useEffect } from 'react';

export default function PremiumToast({
  message,
  visible,
  onDismiss,
  durationMs = 4000,
}: {
  message: string;
  visible: boolean;
  onDismiss: () => void;
  durationMs?: number;
}) {
  useEffect(() => {
    if (!visible) return undefined;
    const t = window.setTimeout(onDismiss, durationMs);
    return () => window.clearTimeout(t);
  }, [visible, durationMs, onDismiss]);

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          role="status"
          aria-live="polite"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="pointer-events-none fixed bottom-20 left-1/2 z-[55] w-[min(100%,22rem)] -translate-x-1/2 px-4 sm:bottom-8 sm:left-auto sm:right-6 sm:translate-x-0"
        >
          <div className="rounded-lg border border-white/[0.08] bg-dark/85 px-4 py-3 text-center shadow-[0_12px_40px_-16px_rgba(0,0,0,0.85)] backdrop-blur-md sm:text-left">
            <p className="border-l-2 border-accent/40 pl-3 text-xs leading-relaxed text-white/55 sm:text-[13px]">
              {message}
            </p>
          </div>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
