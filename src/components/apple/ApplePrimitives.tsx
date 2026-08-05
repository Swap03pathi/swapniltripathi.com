import { m } from 'framer-motion';
import type { ReactNode } from 'react';

/** Subtle grid — calmer than Saras backdrop. */
export function AppleBackdrop() {
  return (
    <m.div
      className="pointer-events-none fixed inset-0 -z-[5] opacity-30"
      aria-hidden
      style={{
        backgroundImage: `
          radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0, 212, 255, 0.04), transparent 55%),
          linear-gradient(rgba(148,163,184,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148,163,184,0.02) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, 56px 56px, 56px 56px',
      }}
    />
  );
}

/** Centered section label with flanking lines — matches design reference. */
export function AppleSectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="mb-10 flex items-center gap-4 md:mb-12">
      <span className="h-px flex-1 bg-white/[0.06]" aria-hidden />
      <p className="shrink-0 text-xs font-semibold uppercase tracking-[0.22em] text-accent/60">
        {children}
      </p>
      <span className="h-px flex-1 bg-white/[0.06]" aria-hidden />
    </div>
  );
}

export function AppleSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
  centered = false,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  centered?: boolean;
}) {
  const hasHeader = Boolean(eyebrow || title || description);

  return (
    <section
      id={id}
      className={`relative scroll-mt-28 py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {hasHeader && !centered ? (
          <>
            {eyebrow ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/55">{eyebrow}</p>
            ) : null}
            {title ? (
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">{title}</h2>
            ) : null}
            {description ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">
                {description}
              </p>
            ) : null}
          </>
        ) : null}
        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className={hasHeader && !centered ? 'mt-10 md:mt-12' : ''}
        >
          {children}
        </m.div>
      </div>
    </section>
  );
}

export function AppleCard({
  children,
  className = '',
  highlight = false,
  hover = false,
}: {
  children: ReactNode;
  className?: string;
  highlight?: boolean;
  hover?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-white/[0.02] backdrop-blur-sm transition-colors duration-200 ${
        highlight
          ? 'border-accent/15 bg-white/[0.025] shadow-[0_0_48px_-28px_rgba(0,212,255,0.08)]'
          : 'border-white/[0.07]'
      } ${hover ? 'hover:border-white/[0.1] hover:bg-white/[0.03]' : ''} ${className}`}
    >
      <m.div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent ${
          highlight ? 'from-accent/[0.03] to-transparent' : 'from-accent/[0.015] to-transparent'
        }`}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function ApplePill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/55">
      {children}
    </span>
  );
}
