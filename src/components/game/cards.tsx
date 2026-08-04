/* eslint-disable react-refresh/only-export-components -- ABILITY_ICON is a
   trivial icon lookup that belongs beside the card visuals it styles. */
import { ArrowLeftRight, Eye, Search } from 'lucide-react';
import type { Card } from '../../game/engine/types';

/** The one place card dimensions live — shared by faces, backs, and piles. */
export const CARD_SIZE = { sm: 'h-14 w-10', lg: 'h-24 w-[4.25rem]' } as const;

export function EmptySlot({ small }: { small?: boolean }) {
  return <div className={`rounded-lg border border-dashed border-white/10 ${small ? CARD_SIZE.sm : CARD_SIZE.lg}`} />;
}

/** 7/8 peek · 9/10 spy · 11/12 swap — mirrors abilityForValue in the engine. */
export const ABILITY_ICON = (value: number) =>
  value === 7 || value === 8 ? Eye : value === 9 || value === 10 ? Search : value >= 11 ? ArrowLeftRight : null;

/**
 * Original card design system — purely typographic/geometric, in the site's
 * language. Every band is visually self-explaining: power cards carry their
 * icon AND their name, so nobody memorizes which values do what.
 *   0        → emerald (the card you want)
 *   1–6      → neutral numbers
 *   7/8 PEEK → accent cyan · 9/10 SPY → violet · 11/12 SWAP → amber
 */
function band(value: number) {
  if (value === 0)
    return {
      numeral: 'text-emerald-300',
      border: 'border-emerald-300/30',
      tint: 'from-emerald-400/10',
      label: 'ZERO',
      labelClass: 'text-emerald-300/80',
      Icon: null,
    };
  if (value <= 6)
    return {
      numeral: 'text-white',
      border: 'border-white/20',
      tint: 'from-white/[0.07]',
      label: null,
      labelClass: '',
      Icon: null,
    };
  if (value <= 8)
    return {
      numeral: 'text-accent',
      border: 'border-accent/35',
      tint: 'from-accent/10',
      label: 'PEEK',
      labelClass: 'text-accent/85',
      Icon: Eye,
    };
  if (value <= 10)
    return {
      numeral: 'text-violet-300',
      border: 'border-violet-300/35',
      tint: 'from-violet-400/10',
      label: 'SPY',
      labelClass: 'text-violet-300/85',
      Icon: Search,
    };
  return {
    numeral: 'text-amber-300',
    border: 'border-amber-300/35',
    tint: 'from-amber-400/10',
    label: 'SWAP',
    labelClass: 'text-amber-300/85',
    Icon: ArrowLeftRight,
  };
}

export function CardFace({ card, glow, small }: { card: Card; glow?: boolean; small?: boolean }) {
  const b = band(card.value);
  return (
    <div
      className={`relative flex flex-col items-center justify-center overflow-hidden rounded-lg border bg-[#101216] bg-gradient-to-b ${b.tint} to-transparent ${
        small ? CARD_SIZE.sm : CARD_SIZE.lg
      } ${glow ? 'border-accent/50 shadow-[0_0_24px_-6px_rgba(0,212,255,0.4)]' : b.border}`}
    >
      {/* Corner index — glanceable like a real card; omitted at mini size. */}
      {!small && (
        <span className={`absolute left-1.5 top-1 text-[10px] font-bold ${b.numeral} opacity-70`}>{card.value}</span>
      )}
      <span className={`font-bold ${b.numeral} ${small ? 'text-base' : 'text-2xl'}`}>{card.value}</span>
      {b.Icon && <b.Icon className={`mt-0.5 ${b.labelClass} ${small ? 'h-3 w-3' : 'h-4 w-4'}`} strokeWidth={2} />}
      {b.label && !small && (
        <span className={`mt-0.5 text-[8px] font-bold uppercase tracking-[0.2em] ${b.labelClass}`}>{b.label}</span>
      )}
    </div>
  );
}

export function CardBack({
  present,
  reveal,
  onClick,
  selected,
  highlight,
  small,
  ownerLabel = 'Your',
  slot = 0,
  slotCount = 4,
}: {
  present: boolean;
  reveal?: Card;
  onClick?: () => void;
  selected?: boolean;
  highlight?: boolean;
  small?: boolean;
  ownerLabel?: string;
  slot?: number;
  slotCount?: number;
}) {
  if (!present) return <EmptySlot small={small} />;
  const label = `${ownerLabel} card ${slot + 1} of ${slotCount}${reveal ? `, showing ${reveal.value}` : ', face down'}`;
  // Revealed cards stay buttons: selection modes (memorize, match) must remain
  // clickable and announceable while a value is temporarily visible.
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      aria-label={label}
      aria-pressed={selected ?? false}
      className={`group/card relative rounded-lg border transition-all ${small ? CARD_SIZE.sm : CARD_SIZE.lg} ${
        reveal
          ? 'border-transparent p-0'
          : `bg-[radial-gradient(circle_at_30%_20%,rgba(0,212,255,0.12),transparent_60%),linear-gradient(to_bottom,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] ${
              selected
                ? 'border-accent shadow-[0_0_16px_-4px_rgba(0,212,255,0.5)]'
                : highlight
                  ? 'cursor-pointer border-accent/40 hover:border-accent'
                  : 'border-white/15'
            }`
      }`}
    >
      {reveal ? (
        <CardFace card={reveal} small={small} glow />
      ) : (
        // Original back motif: a 2×2 dot grid — four cards, four dots.
        <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className={`grid grid-cols-2 ${small ? 'gap-1' : 'gap-1.5'}`}>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={`rounded-full bg-white/15 ${small ? 'h-1 w-1' : 'h-1.5 w-1.5'}`} />
            ))}
          </span>
        </span>
      )}
    </button>
  );
}
