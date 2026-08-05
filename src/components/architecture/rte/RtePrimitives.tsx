import { m } from 'framer-motion';
import type { ReactNode } from 'react';

export type RteExpandApi = {
  expandedId: string | null;
  toggleExpand: (id: string) => void;
};

export function RteSectionShell({
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
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-accent/45">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mb-6 text-sm font-semibold tracking-tight text-white/90">
        {title}
      </h2>
      {children}
    </section>
  );
}

export function RteGlassPanel({
  children,
  className = '',
  glow = 'subtle' as 'subtle' | 'accent',
}: {
  children: ReactNode;
  className?: string;
  glow?: 'subtle' | 'accent';
}) {
  return (
    <m.div
      whileHover={{ y: -1, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-xl border bg-white/[0.02] backdrop-blur-sm ${
        glow === 'accent'
          ? 'border-accent/20 shadow-[0_0_0_1px_rgba(0,212,255,0.06),0_12px_40px_-20px_rgba(0,212,255,0.12)]'
          : 'border-white/[0.08] shadow-[0_8px_32px_-16px_rgba(0,0,0,0.5)]'
      } ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-70" />
      <div className="relative">{children}</div>
    </m.div>
  );
}

export function RteConnectorH({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex h-6 shrink-0 items-center justify-center text-accent/25 ${className}`}
      aria-hidden
    >
      <svg width="28" height="8" viewBox="0 0 28 8" className="overflow-visible">
        <path
          d="M0 4h22"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="4 3"
          className="opacity-60"
        />
        <path
          d="M22 1l4 3-4 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export function RteConnectorV({ className = '' }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center py-1 text-accent/25 ${className}`}
      aria-hidden
    >
      <svg width="10" height="24" viewBox="0 0 10 24" className="overflow-visible">
        <path
          d="M5 0v18"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="3 3"
          className="opacity-55"
        />
        <path
          d="M2 18l3 4 3-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
