import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function EyBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[5] opacity-[0.18]"
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(ellipse 50% 32% at 50% 0%, rgba(0, 212, 255, 0.03), transparent 52%),
          linear-gradient(rgba(148,163,184,0.015) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148,163,184,0.015) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 64px 64px, 64px 64px',
      }}
    />
  );
}

export function EySection({
  id,
  title,
  children,
  className = '',
}: {
  id: string;
  title?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 py-12 md:py-14 ${className}`}>
      <div className="mx-auto max-w-[1000px] px-5 sm:px-6 lg:px-8">
        {title ? (
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/55">{title}</h2>
        ) : null}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className={title ? 'mt-7 md:mt-8' : ''}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function EyCard({
  children,
  className = '',
  highlight = false,
}: {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border bg-white/[0.015] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.09] hover:bg-white/[0.02] ${
        highlight
          ? 'border-accent/14 shadow-[0_0_36px_-24px_rgba(0,212,255,0.12)]'
          : 'border-white/[0.06]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function EyPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[11px] text-white/48">
      {children}
    </span>
  );
}
