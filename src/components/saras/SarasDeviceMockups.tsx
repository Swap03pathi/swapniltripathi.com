import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

function PhoneFrame({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`relative w-[140px] shrink-0 rounded-[1.25rem] border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-1.5 shadow-[0_24px_48px_-24px_rgba(0,0,0,0.8)] sm:w-[156px] ${className}`}
    >
      <div className="aspect-[9/19] overflow-hidden rounded-[1rem] border border-white/[0.06] bg-[#0a0a0a]">
        {children}
      </div>
    </motion.div>
  );
}

function MockScreen({ variant }: { variant: 'feed' | 'chart' | 'card' }) {
  if (variant === 'chart') {
    return (
      <div className="flex h-full flex-col p-2">
        <div className="h-1.5 w-8 rounded bg-white/20" />
        <div className="mt-3 flex flex-1 items-end gap-0.5 px-1">
          {[40, 65, 45, 80, 55, 70].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-accent/30" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (variant === 'card') {
    return (
      <div className="space-y-2 p-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-md border border-white/[0.06] bg-white/[0.03] p-2">
            <div className="h-1 w-12 rounded bg-emerald-400/40" />
            <div className="mt-1.5 h-1 w-full rounded bg-white/10" />
            <div className="mt-1 h-1 w-2/3 rounded bg-white/5" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="space-y-2 p-2">
      <div className="h-6 rounded-md bg-accent/10" />
      {[1, 2, 4].map((i) => (
        <div key={i} className="h-8 rounded-md border border-white/[0.05] bg-white/[0.02]" />
      ))}
    </div>
  );
}

export default function SarasDeviceMockups() {
  return (
    <div className="relative mx-auto flex min-h-[320px] max-w-lg items-end justify-center lg:mx-0 lg:max-w-none lg:justify-end">
      <PhoneFrame className="absolute left-0 top-8 z-10 -rotate-6" delay={0.1}>
        <MockScreen variant="feed" />
      </PhoneFrame>
      <PhoneFrame className="relative z-20" delay={0.2}>
        <MockScreen variant="card" />
      </PhoneFrame>
      <PhoneFrame className="absolute right-0 top-4 z-10 rotate-6" delay={0.3}>
        <MockScreen variant="chart" />
      </PhoneFrame>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.35 }}
        className="absolute -bottom-2 left-1/2 z-0 hidden w-[280px] -translate-x-1/2 rounded-lg border border-white/[0.08] bg-white/[0.02] p-3 sm:block lg:left-auto lg:right-4 lg:translate-x-0"
      >
        <div className="flex gap-2">
          <div className="h-16 flex-1 rounded bg-white/[0.04]" />
          <div className="h-16 flex-1 rounded bg-accent/10" />
          <div className="h-16 flex-1 rounded bg-white/[0.04]" />
        </div>
        <p className="mt-2 text-center text-[10px] text-white/30">Web dashboard · PWA</p>
      </motion.div>
    </div>
  );
}
