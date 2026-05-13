import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { RrisGlassPanel } from './RrisPrimitives';
import type { RrisIconName } from './RrisIcons';
import { RrisIcon } from './RrisIcons';

type Props = {
  label: string;
  icon: RrisIconName;
  children?: ReactNode;
  size?: 'sm' | 'md';
  className?: string;
};

export function SourceNode({
  label,
  icon,
  children,
  size = 'sm',
  className = '',
}: Props) {
  const pad = size === 'md' ? 'p-4 sm:p-5' : 'p-3';
  return (
    <RrisGlassPanel className={`${pad} ${className}`} glow="subtle">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-violet-300/90">
          <RrisIcon name={icon} className="h-4 w-4" />
        </span>
        <span className="text-xs font-semibold text-white/85">{label}</span>
      </div>
      {children ? <div className="mt-3 border-t border-white/[0.06] pt-3">{children}</div> : null}
    </RrisGlassPanel>
  );
}

export function SourceNodeCompact({
  label,
  icon,
  pulse = false,
}: {
  label: string;
  icon: RrisIconName;
  pulse?: boolean;
}) {
  return (
    <motion.div
      animate={
        pulse
          ? { opacity: [0.75, 1, 0.75], scale: [1, 1.02, 1] }
          : undefined
      }
      transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
    >
      <RrisGlassPanel className="px-3 py-2.5 sm:px-4 sm:py-3" glow="violet">
        <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2 sm:text-left">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-violet-400/20 bg-violet-500/[0.06] text-violet-200/90">
            <RrisIcon name={icon} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </span>
          <span className="text-[10px] font-semibold leading-tight text-white/80 sm:text-xs">
            {label}
          </span>
        </div>
      </RrisGlassPanel>
    </motion.div>
  );
}
