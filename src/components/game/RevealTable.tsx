import type { EngineEvent } from '../../game/engine/types';
import { CardFace, EmptySlot } from './cards';

type RoundReveal = Extract<EngineEvent, { type: 'ROUND_REVEALED' }>;

/** End-of-round hands, totals, and scores — used by both overlays. */
export default function RevealTable({
  reveal,
  nameOf,
}: {
  reveal: RoundReveal;
  nameOf: (playerId: string) => string;
}) {
  return (
    <div className="space-y-3">
      {reveal.hands.map((h) => (
        <div key={h.playerId} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className={reveal.roundWinnerIds.includes(h.playerId) ? 'font-semibold text-accent' : 'text-white/70'}>
              {nameOf(h.playerId)}
              {reveal.callerId === h.playerId && ' · called'}
              {h.dropped && (
                <span className="ml-1.5 rounded bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-medium text-white/60">
                  dropped — scores round high
                </span>
              )}
            </span>
            <span className="text-white/60">
              {h.total} on the table → +{h.roundScore}
            </span>
          </div>
          <div className="flex gap-1.5">
            {h.cards.map((c, i) =>
              c ? (
                <CardFace key={c.id} card={c} small />
              ) : (
                <EmptySlot key={`empty-${i}`} small />
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
