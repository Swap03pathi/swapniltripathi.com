import { m } from 'framer-motion';
import type { ReactNode } from 'react';

export function MmieSectionShell({
  number,
  eyebrow,
  title,
  children,
  framed = true,
  compact = false,
  className = '',
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  children: ReactNode;
  framed?: boolean;
  /** Tighter padding + smaller title — outcomes, tech stack */
  compact?: boolean;
  className?: string;
}) {
  const pad = compact ? 'p-4 sm:p-5 md:p-6' : 'p-5 sm:p-6 md:p-8';
  const headerPb = compact ? 'pb-4' : 'pb-5 md:pb-6';
  const numberCls = compact
    ? 'font-mono text-lg font-bold leading-none text-cyan-500/30 md:text-xl'
    : 'font-mono text-xl font-bold leading-none text-cyan-500/30 md:text-2xl';
  const eyebrowCls = compact
    ? 'text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500'
    : 'text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 md:text-[13px]';
  const titleCls = compact
    ? 'mt-0.5 text-xl font-bold leading-snug tracking-tight text-white md:text-2xl'
    : 'mt-1 text-2xl font-bold leading-snug tracking-tight text-white md:text-3xl';

  const body = (
    <>
      <header className={`flex flex-col gap-2 border-b border-white/[0.06] ${headerPb} md:flex-row md:items-start md:gap-5`}>
        {number ? <span className={numberCls}>{number}</span> : null}
        <div className="min-w-0 flex-1">
          {eyebrow ? <p className={eyebrowCls}>{eyebrow}</p> : null}
          <h2 className={titleCls}>{title}</h2>
        </div>
      </header>
      <div className={compact ? 'pt-4 md:pt-5' : 'pt-5 md:pt-6'}>{children}</div>
    </>
  );

  if (framed) {
    return (
      <section
        className={`relative rounded-2xl border border-white/[0.07] bg-[#020617]/92 shadow-[0_0_0_1px_rgba(255,255,255,0.02),0_16px_48px_-32px_rgba(0,0,0,0.75)] backdrop-blur-md ${pad} ${className}`}
      >
        {body}
      </section>
    );
  }

  return <section className={`relative ${className}`}>{body}</section>;
}

export function MmieGlassPanel({
  children,
  className = '',
  glow = 'subtle' as 'subtle' | 'cyan' | 'violet',
}: {
  children: ReactNode;
  className?: string;
  glow?: 'subtle' | 'cyan' | 'violet';
}) {
  const glowCls =
    glow === 'cyan'
      ? 'border-cyan-500/15 shadow-[0_0_0_1px_rgba(34,211,238,0.06)]'
      : glow === 'violet'
        ? 'border-violet-500/15 shadow-[0_0_0_1px_rgba(139,92,246,0.06)]'
        : 'border-white/[0.07] shadow-none';

  return (
    <m.div
      whileHover={{ transition: { duration: 0.18 } }}
      className={`relative overflow-hidden rounded-xl border bg-slate-950/50 backdrop-blur-sm ${glowCls} ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/[0.02] via-transparent to-violet-500/[0.02]" />
      <div className="relative">{children}</div>
    </m.div>
  );
}

/** 12-column page grid — max readable width, horizontal rhythm */
export function MmieLayoutGrid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] xl:max-w-[1240px] ${className}`}>
      <div className="grid grid-cols-12 gap-x-5 gap-y-10 md:gap-y-12">{children}</div>
    </div>
  );
}

export function MmieSpan12({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`col-span-12 ${className}`}>{children}</div>;
}
