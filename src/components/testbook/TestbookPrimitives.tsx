import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function TestbookBackdrop() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-[5] opacity-25"
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(ellipse 50% 35% at 50% 0%, rgba(0, 212, 255, 0.035), transparent 50%)
        `,
      }}
    />
  );
}

export function TestbookSection({
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
    <section id={id} className={`scroll-mt-28 py-14 md:py-16 lg:py-20 ${className}`}>
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {title ? (
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/60">{title}</h2>
        ) : null}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.4 }}
          className={title ? 'mt-8 md:mt-10' : ''}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function TestbookCard({
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
      className={`rounded-2xl border bg-white/[0.02] backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.1] hover:bg-white/[0.03] hover:shadow-[0_12px_40px_-28px_rgba(0,0,0,0.6)] ${
        highlight ? 'border-accent/18 shadow-[0_0_40px_-24px_rgba(0,212,255,0.1)]' : 'border-white/[0.07]'
      } ${className}`}
    >
      {children}
    </div>
  );
}

export function TestbookPill({
  children,
  tone = 'neutral',
}: {
  children: ReactNode;
  tone?: 'neutral' | 'accent' | 'violet' | 'emerald';
}) {
  const tones = {
    neutral: 'border-white/[0.08] bg-white/[0.03] text-white/55',
    accent: 'border-accent/20 bg-accent/[0.06] text-accent/80',
    violet: 'border-violet-400/20 bg-violet-500/[0.06] text-violet-300/80',
    emerald: 'border-emerald-400/20 bg-emerald-500/[0.06] text-emerald-300/80',
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] leading-none ${tones[tone]}`}
    >
      {children}
    </span>
  );
}

export const testbookAccentStyles = {
  accent: {
    icon: 'border-accent/20 bg-accent/[0.08] text-accent/75',
    label: 'text-accent/55',
  },
  violet: {
    icon: 'border-violet-400/20 bg-violet-500/[0.08] text-violet-300/80',
    label: 'text-violet-300/55',
  },
  emerald: {
    icon: 'border-emerald-400/20 bg-emerald-500/[0.08] text-emerald-300/80',
    label: 'text-emerald-300/55',
  },
} as const;
