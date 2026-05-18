import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function SarasBackdrop() {
  return (
    <motion.div
      className="pointer-events-none fixed inset-0 -z-[5] opacity-40"
      aria-hidden
      animate={{ opacity: [0.32, 0.42, 0.32] }}
      transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      style={{
        backgroundImage: `
          radial-gradient(ellipse 70% 45% at 12% 8%, rgba(0, 212, 255, 0.07), transparent 55%),
          radial-gradient(ellipse 55% 40% at 88% 18%, rgba(16, 185, 129, 0.05), transparent 50%),
          linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)
        `,
        backgroundSize: 'auto, auto, 48px 48px, 48px 48px',
      }}
    />
  );
}

export function SarasSection({
  id,
  eyebrow,
  title,
  description,
  children,
  className = '',
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative isolate scroll-mt-28 overflow-x-clip py-16 md:py-20 lg:py-24 ${className}`}
    >
      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/55">{eyebrow}</p>
        ) : null}
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl lg:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/45 md:text-base">{description}</p>
        ) : null}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.45 }}
          className="relative mt-10 md:mt-12"
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}

export function SarasCard({
  children,
  className = '',
  hover = false,
  subtle = false,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  subtle?: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-sm ${
        hover ? 'transition-colors hover:border-accent/15 hover:bg-white/[0.035]' : ''
      } ${className}`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent ${
          subtle ? 'from-accent/[0.01] to-transparent' : 'from-accent/[0.02] to-emerald-500/[0.02]'
        }`}
        aria-hidden
      />
      <div className="relative">{children}</div>
    </div>
  );
}

export function SarasPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs text-white/55">
      {children}
    </span>
  );
}
