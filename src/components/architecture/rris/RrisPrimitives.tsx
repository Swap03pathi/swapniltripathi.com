import { m } from 'framer-motion';
import type { ReactNode } from 'react';

export function RrisSectionShell({
  eyebrow,
  title,
  children,
  className = '',
}: {
  eyebrow?: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative ${className}`}>
      {eyebrow ? (
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mb-6 text-sm font-semibold tracking-tight text-slate-100">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function RrisGlassPanel({
  children,
  className = '',
  glow = 'subtle' as 'subtle' | 'violet',
}: {
  children: ReactNode;
  className?: string;
  glow?: 'subtle' | 'violet';
}) {
  return (
    <m.div
      whileHover={{ y: -1, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl border bg-white/[0.02] backdrop-blur-sm ${
        glow === 'violet'
          ? 'border-violet-400/15 shadow-[0_0_0_1px_rgba(167,139,250,0.08),0_12px_40px_-20px_rgba(139,92,246,0.12)]'
          : 'border-white/[0.08] shadow-[0_8px_32px_-16px_rgba(0,0,0,0.5)]'
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/[0.03] via-transparent to-accent/[0.02] opacity-80" />
      <div className="relative">{children}</div>
    </m.div>
  );
}
