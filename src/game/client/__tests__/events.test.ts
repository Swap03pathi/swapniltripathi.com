import { describe, expect, it } from 'vitest';
import type { EngineEvent } from '../../engine/types';
import { EMPTY_DIGEST, MEMORIZE_REVEAL_MS, PEEK_MS, expireReveals, reduceEvents } from '../events';

const ctx = { you: 'me', nameOf: (id: string) => (id === 'me' ? 'You' : id), now: 1_000_000 };

const card = (id: string, value: number) => ({ id, value });

describe('reduceEvents', () => {
  it('memorize and peek create timed reveals for the right owner and slot', () => {
    const events: EngineEvent[] = [
      { scope: 'private', playerId: 'me', type: 'MEMORIZE_RESULT', slots: [1, 3], cards: [card('a', 4), card('b', 9)] },
      { scope: 'private', playerId: 'me', type: 'PEEK_RESULT', slot: 0, card: card('c', 2) },
      { scope: 'private', playerId: 'me', type: 'SPY_RESULT', targetPlayerId: 'bob', slot: 2, card: card('d', 7) },
    ];
    const d = reduceEvents(EMPTY_DIGEST, events, ctx);
    expect(d.reveals.map((r) => r.key).sort()).toEqual(['bob:2', 'me:0', 'me:1', 'me:3']);
    expect(d.reveals.find((r) => r.key === 'me:1')?.until).toBe(ctx.now + MEMORIZE_REVEAL_MS);
    expect(d.reveals.find((r) => r.key === 'bob:2')?.until).toBe(ctx.now + PEEK_MS);
  });

  it('a blind swap invalidates reveals on both affected slots only', () => {
    let d = reduceEvents(
      EMPTY_DIGEST,
      [
        { scope: 'private', playerId: 'me', type: 'MEMORIZE_RESULT', slots: [0, 1], cards: [card('a', 4), card('b', 9)] },
        { scope: 'private', playerId: 'me', type: 'SPY_RESULT', targetPlayerId: 'bob', slot: 2, card: card('d', 7) },
      ],
      ctx,
    );
    d = reduceEvents(
      d,
      [
        {
          scope: 'public',
          type: 'ABILITY_USED',
          playerId: 'me',
          ability: 'swap',
          card: card('s', 11),
          ownSlot: 0,
          targetPlayerId: 'bob',
          targetSlot: 2,
        },
      ],
      ctx,
    );
    expect(d.reveals.map((r) => r.key)).toEqual(['me:1']);
  });

  it('a replace invalidates only that slot; a new round clears everything', () => {
    let d = reduceEvents(
      EMPTY_DIGEST,
      [{ scope: 'private', playerId: 'me', type: 'MEMORIZE_RESULT', slots: [0, 1], cards: [card('a', 4), card('b', 9)] }],
      ctx,
    );
    d = reduceEvents(d, [{ scope: 'public', type: 'REPLACED', playerId: 'me', slot: 0, discarded: card('a', 4) }], ctx);
    expect(d.reveals.map((r) => r.key)).toEqual(['me:1']);
    d = reduceEvents(d, [{ scope: 'public', type: 'ROUND_STARTED', round: 2, startingSeat: 1, discardTop: card('x', 3) }], ctx);
    expect(d.reveals).toEqual([]);
    expect(d.lastReveal).toBeNull();
  });

  it('log lines are capped and human-readable', () => {
    const spam: EngineEvent[] = Array.from({ length: 80 }, () => ({
      scope: 'public' as const,
      type: 'DREW_FROM_DECK' as const,
      playerId: 'bob',
      deckRemaining: 10,
    }));
    const d = reduceEvents(EMPTY_DIGEST, spam, ctx);
    expect(d.log.length).toBe(60);
    expect(d.log[0]).toBe('bob drew from the deck');
  });

  it('expireReveals drops only past-due reveals and is identity when none expire', () => {
    const d = reduceEvents(
      EMPTY_DIGEST,
      [
        { scope: 'private', playerId: 'me', type: 'PEEK_RESULT', slot: 0, card: card('c', 2) },
        { scope: 'private', playerId: 'me', type: 'MEMORIZE_RESULT', slots: [1], cards: [card('a', 4)] },
      ],
      ctx,
    );
    expect(expireReveals(d, ctx.now + 1000)).toBe(d); // nothing due — same object
    const later = expireReveals(d, ctx.now + PEEK_MS + 1);
    expect(later.reveals.map((r) => r.key)).toEqual(['me:1']); // peek gone, memorize stays
  });
});
