import { useEffect, useState } from 'react';

export function ActionBtn({
  children,
  onClick,
  accent,
  disabled,
}: {
  children: React.ReactNode;
  onClick: () => void;
  accent?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex min-h-11 touch-manipulation items-center gap-1.5 rounded-lg border px-4 py-2.5 text-[13px] font-semibold transition-colors disabled:opacity-40 sm:min-h-0 sm:px-3.5 sm:py-2 sm:text-xs ${
        accent
          ? 'border-accent/25 bg-accent/15 text-accent enabled:hover:bg-accent/25'
          : 'border-white/10 text-white/65 enabled:hover:border-white/25 enabled:hover:text-white'
      }`}
    >
      {children}
    </button>
  );
}

export function TimerBar({ deadline }: { deadline: number | null }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!deadline) return;
    setNow(Date.now()); // fresh tick immediately — never render a stale value
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [deadline]);
  if (!deadline) return null;
  const secs = Math.ceil(Math.max(0, deadline - now) / 1000);
  return (
    <span
      className={`rounded-md px-2 py-1 font-mono text-xs font-semibold ${
        secs <= 5 ? 'bg-red-400/15 text-red-300' : 'bg-white/[0.05] text-white/60'
      }`}
    >
      {secs}s
    </span>
  );
}

/** Site-standard section eyebrow — one tracking value, one accent tint. */
export function Eyebrow({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.2em] text-accent/75 ${className}`}>{children}</p>
  );
}

export function Overlay({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] backdrop-blur-sm">
      <div className="max-h-[85dvh] w-full max-w-lg overflow-y-auto overscroll-contain rounded-2xl border border-white/10 bg-dark-light p-4 sm:p-6">
        <h3 className="mb-4 text-center text-xl font-bold text-white">{title}</h3>
        {children}
      </div>
    </div>
  );
}
