/**
 * Pure reduction of engine events into what the table renders: the log feed,
 * timed private reveals, and the round/match summaries. No React, no clocks,
 * no I/O — fully unit-testable.
 */
import type { Card, EngineEvent } from '../engine/types';

/** A card value this player is currently entitled to see, with an expiry. */
export interface Reveal {
  key: string; // `${ownerId}:${slot}`
  ownerId: string;
  slot: number;
  card: Card;
  until: number; // epoch ms (client clock)
}

export interface EventDigest {
  reveals: Reveal[];
  log: string[];
  lastReveal: Extract<EngineEvent, { type: 'ROUND_REVEALED' }> | null;
  matchEnd: Extract<EngineEvent, { type: 'MATCH_ENDED' }> | null;
}

export const EMPTY_DIGEST: EventDigest = { reveals: [], log: [], lastReveal: null, matchEnd: null };

/** How long a peeked/spied card stays visible. Memorize gets the full window. */
export const PEEK_MS = 6_000;
export const MEMORIZE_REVEAL_MS = 15_000;
const LOG_CAP = 60;

export interface DigestContext {
  /** This player's id — private reveals are keyed against it. */
  you: string;
  /** Display-name lookup for log lines. */
  nameOf: (playerId: string) => string;
  /** Client clock (epoch ms) — reveal expiries are client-relative on purpose:
   * server deadlines live on a different clock and skew could hide cards. */
  now: number;
}

export function reduceEvents(prev: EventDigest, events: EngineEvent[], ctx: DigestContext): EventDigest {
  const { you, nameOf, now } = ctx;
  let { reveals, lastReveal, matchEnd } = prev;
  const log = [...prev.log];
  const push = (line: string) => log.push(line);

  for (const e of events) {
    switch (e.type) {
      case 'ROUND_STARTED':
        reveals = [];
        lastReveal = null;
        push(`— Round ${e.round} —`);
        break;
      case 'MEMORIZE_RESULT':
        reveals = [
          ...reveals,
          ...e.slots.map((slot, i) => ({
            key: `${you}:${slot}`,
            ownerId: you,
            slot,
            card: e.cards[i],
            until: now + MEMORIZE_REVEAL_MS,
          })),
        ];
        break;
      case 'TURN_STARTED':
        push(`${nameOf(e.playerId)} to play${e.phase === 'finalTurns' ? ' (final turn)' : ''}`);
        break;
      case 'DREW_FROM_DECK':
        push(`${nameOf(e.playerId)} drew from the deck`);
        break;
      case 'TOOK_DISCARD':
        push(`${nameOf(e.playerId)} took the ${e.card.value} from the discard`);
        break;
      case 'REPLACED':
        push(`${nameOf(e.playerId)} swapped a card, discarding a ${e.discarded.value}`);
        // Whatever anyone saw in that slot is now stale.
        reveals = reveals.filter((r) => !(r.ownerId === e.playerId && r.slot === e.slot));
        break;
      case 'DISCARDED_DRAWN':
        push(`${nameOf(e.playerId)} discarded a drawn ${e.card.value}`);
        break;
      case 'ABILITY_USED': {
        const what =
          e.ability === 'peek'
            ? 'peeked at one of their own cards'
            : e.ability === 'spy'
              ? `spied on ${nameOf(e.targetPlayerId ?? '')}`
              : `blind-swapped a card with ${nameOf(e.targetPlayerId ?? '')}`;
        push(`${nameOf(e.playerId)} played the ${e.card.value} — ${what}`);
        if (e.ability === 'swap') {
          // Both slots changed hands; drop any stale reveals on them.
          reveals = reveals.filter(
            (r) =>
              !(r.ownerId === e.playerId && r.slot === e.ownSlot) &&
              !(r.ownerId === e.targetPlayerId && r.slot === e.targetSlot),
          );
        }
        break;
      }
      case 'PEEK_RESULT':
        reveals = [...reveals, { key: `${you}:${e.slot}`, ownerId: you, slot: e.slot, card: e.card, until: now + PEEK_MS }];
        break;
      case 'SPY_RESULT':
        reveals = [
          ...reveals,
          { key: `${e.targetPlayerId}:${e.slot}`, ownerId: e.targetPlayerId, slot: e.slot, card: e.card, until: now + PEEK_MS },
        ];
        break;
      case 'MATCH_RESULT':
        push(
          e.success
            ? `${nameOf(e.playerId)} matched ${e.cards?.length} × ${e.cards?.[0]?.value} and shed them!`
            : `${nameOf(e.playerId)} claimed a match — wrong! Turn forfeited.`,
        );
        break;
      case 'CALLED':
        push(`${nameOf(e.playerId)} called FOURSIGHT!`);
        break;
      case 'PLAYER_DROPPED':
        push(`${nameOf(e.playerId)} was dropped for this round — they score the round's highest total`);
        break;
      case 'DECK_RESHUFFLED':
        push('Discards shuffled into a fresh draw pile');
        break;
      case 'TIMED_OUT':
        push(`${nameOf(e.playerId)} ran out of time`);
        break;
      case 'ROUND_REVEALED':
        lastReveal = e;
        push(e.falseCall ? 'False call! +5 penalty.' : 'Round over.');
        break;
      case 'MATCH_ENDED':
        matchEnd = e;
        break;
    }
  }
  return { reveals, log: log.slice(-LOG_CAP), lastReveal, matchEnd };
}

/** Drop reveals whose time has passed; returns the same object when nothing expired. */
export function expireReveals(digest: EventDigest, now: number): EventDigest {
  if (!digest.reveals.some((r) => r.until <= now)) return digest;
  return { ...digest, reveals: digest.reveals.filter((r) => r.until > now) };
}
