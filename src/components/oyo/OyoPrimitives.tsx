import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export function OyoBackdrop() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-[5] opacity-20"
      aria-hidden
      style={{
        backgroundImage: `radial-gradient(ellipse 45% 30% at 50% 0%, rgba(0, 212, 255, 0.025), transparent 55%)`,
      }}
    />
  );
}

export function OyoSection({
  id,
  title,
  titleIcon: TitleIcon,
  children,
  className = '',
}: {
  id: string;
  title?: string;
  titleIcon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-28 py-12 md:py-14 lg:py-16 ${className}`}>
      <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
        {title ? (
          <div className="flex items-center gap-2.5">
            {TitleIcon ? <TitleIcon className="h-4 w-4 text-accent/55" strokeWidth={1.5} /> : null}
            <h2 className="text-base font-semibold text-white/90 md:text-lg">{title}</h2>
          </div>
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

export function OyoCard({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/[0.06] bg-white/[0.015] transition-all duration-200 hover:-translate-y-0.5 hover:border-white/[0.09] hover:bg-white/[0.02] ${className}`}
    >
      {children}
    </div>
  );
}

export function OyoPill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1 text-[11px] text-white/50">
      {children}
    </span>
  );
}

export function OyoNoteBox({
  icon: Icon,
  children,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  children: ReactNode;
}) {
  return (
    <div className="mt-5 flex gap-2.5 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3.5 py-3">
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/45" strokeWidth={1.5} />
      <p className="text-xs leading-relaxed text-white/40 italic">{children}</p>
    </div>
  );
}
