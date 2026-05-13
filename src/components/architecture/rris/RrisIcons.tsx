import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Newspaper,
  Sparkles,
  Youtube,
} from 'lucide-react';

/** Simple Icons — Telegram brand (https://simpleicons.org/?q=telegram) */
function SiTelegram({ className }: { className?: string }) {
  return (
    <img
      src="https://cdn.simpleicons.org/telegram/26A5E4"
      alt=""
      className={['object-contain', className].filter(Boolean).join(' ')}
      loading="lazy"
      decoding="async"
      aria-hidden
    />
  );
}

/** X (formerly Twitter) — Simple Icons */
function SiX({ className }: { className?: string }) {
  return (
    <img
      src="https://cdn.simpleicons.org/x/ffffff"
      alt=""
      className={['object-contain', className].filter(Boolean).join(' ')}
      loading="lazy"
      decoding="async"
      aria-hidden
    />
  );
}

type Glyph = LucideIcon | ComponentType<{ className?: string }>;

const map = {
  /** @deprecated use `telegram` — alias for Telegram SI */
  'message-circle': SiTelegram,
  telegram: SiTelegram,
  /** @deprecated use `x` — alias for X SI */
  twitter: SiX,
  x: SiX,
  'file-text': FileText,
  youtube: Youtube,
  newspaper: Newspaper,
  sparkles: Sparkles,
  'chevron-down': ChevronDown,
  'chevron-right': ChevronRight,
} as const satisfies Record<string, Glyph>;

export type RrisIconName = keyof typeof map;

export function RrisIcon({
  name,
  className,
}: {
  name: RrisIconName;
  className?: string;
}) {
  const C = map[name];
  return <C className={className} aria-hidden />;
}
