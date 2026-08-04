import { describe, expect, it } from 'vitest';
import { buildDeck, shuffle } from '../deck';
import { applyAction, createMatch } from '../engine';
import { redactFor } from '../view';
import { DEFAULT_RULES, type Action, type Card, type EngineEvent, type GameState } from '../types';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Apply an action that must succeed; returns new state, collects events. */
function ok(state: GameState, action: Action, sink?: EngineEvent[]): GameState {
  const res = applyAction(state, action);
  if (!res.ok) throw new Error(`Expected ok, got: ${res.error} (action ${action.type})`);
  sink?.push(...res.events);
  return res.state;
}

function fail(state: GameState, action: Action): string {
  const res = applyAction(state, action);
  if (res.ok) throw new Error(`Expected failure for ${action.type}`);
  return res.error;
}

function memorizeAll(state: GameState): GameState {
  for (const p of state.players) state = ok(state, { type: 'MEMORIZE', playerId: p.id, slots: [0, 1] });
  return state;
}

function cur(state: GameState): string {
  return state.players[state.currentSeat].id;
}

/** Move a card of `value` from within the draw pile to its top (keeps conservation). */
function rigTopCard(state: GameState, value: number): GameState {
  const s = structuredClone(state);
  const idx = s.drawPile.findIndex((c) => c.value === value);
  if (idx === -1) throw new Error(`No card of value ${value} left in draw pile`);
  const [card] = s.drawPile.splice(idx, 1);
  s.drawPile.push(card);
  return s;
}

function allCards(state: GameState): Card[] {
  return [
    ...state.players.flatMap((p) => p.hand.filter((c): c is Card => c !== null)),
    ...state.drawPile,
    ...state.discardPile,
    ...(state.heldCard ? [state.heldCard] : []),
  ];
}

function newGame(n = 3, seed = 42, rules = {}): GameState {
  const ids = ['anna', 'bob', 'chris', 'dana', 'eve'].slice(0, n);
  return createMatch(ids, seed, rules);
}

// ---------------------------------------------------------------------------
// Deck
// ---------------------------------------------------------------------------

describe('deck', () => {
  it('builds 52 cards: values 0–12, four of each', () => {
    const deck = buildDeck(DEFAULT_RULES);
    expect(deck).toHaveLength(52);
    for (let v = 0; v <= 12; v++) {
      expect(deck.filter((c) => c.value === v)).toHaveLength(4);
    }
    expect(new Set(deck.map((c) => c.id)).size).toBe(52);
  });

  it('dealt card ids do not encode values (review finding: pre-shuffle ids leaked)', () => {
    // With value-major pre-shuffle ids, value === floor(idNumber / copies) for
    // every card. Post-shuffle relabeling must break that correlation.
    const s = newGame(3, 1234);
    const encoded = allCards(s).every((c) => c.value === Math.floor(parseInt(c.id.slice(1), 10) / 4));
    expect(encoded).toBe(false);
  });

  it('shuffles deterministically per seed', () => {
    const deck = buildDeck(DEFAULT_RULES);
    const a = shuffle(deck, 123).cards.map((c) => c.id).join(',');
    const b = shuffle(deck, 123).cards.map((c) => c.id).join(',');
    const c = shuffle(deck, 456).cards.map((c) => c.id).join(',');
    expect(a).toBe(b);
    expect(a).not.toBe(c);
  });
});

// ---------------------------------------------------------------------------
// Setup & memorize
// ---------------------------------------------------------------------------

describe('setup', () => {
  it('rejects invalid player counts and duplicate ids', () => {
    expect(() => createMatch(['a'], 1)).toThrow();
    expect(() => createMatch(['a', 'b', 'c', 'd', 'e', 'f'], 1)).toThrow();
    expect(() => createMatch(['a', 'a'], 1)).toThrow();
  });

  it('deals 4 per player, one discard, rest in draw pile', () => {
    const s = newGame(3);
    expect(s.phase).toBe('memorize');
    for (const p of s.players) expect(p.hand).toHaveLength(4);
    expect(s.discardPile).toHaveLength(1);
    expect(s.drawPile).toHaveLength(52 - 12 - 1);
    expect(allCards(s)).toHaveLength(52);
  });

  it('memorize: exactly 2 distinct slots, once, privately', () => {
    let s = newGame(2);
    const events: EngineEvent[] = [];
    expect(fail(s, { type: 'MEMORIZE', playerId: 'anna', slots: [0] })).toMatch(/distinct/);
    expect(fail(s, { type: 'MEMORIZE', playerId: 'anna', slots: [0, 0] })).toMatch(/distinct/);
    expect(fail(s, { type: 'MEMORIZE', playerId: 'anna', slots: [0, 9] })).toMatch(/slot/);
    s = ok(s, { type: 'MEMORIZE', playerId: 'anna', slots: [2, 3] }, events);
    expect(fail(s, { type: 'MEMORIZE', playerId: 'anna', slots: [0, 1] })).toMatch(/Already/);
    const priv = events.find((e) => e.type === 'MEMORIZE_RESULT');
    expect(priv && priv.scope === 'private' && priv.playerId === 'anna').toBe(true);
    expect(s.phase).toBe('memorize'); // bob hasn't looked yet
    s = ok(s, { type: 'MEMORIZE', playerId: 'bob', slots: [0, 1] });
    expect(s.phase).toBe('turn');
  });
});

// ---------------------------------------------------------------------------
// Draw / replace / discard
// ---------------------------------------------------------------------------

describe('draw flow', () => {
  it('draw → replace puts old card on discard', () => {
    let s = memorizeAll(newGame(2));
    const actor = cur(s);
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'DRAW', playerId: actor }, events);
    expect(s.turnStage).toBe('holdingDrawn');
    const drawn = events.find((e) => e.type === 'DRAWN_CARD');
    expect(drawn && drawn.scope === 'private').toBe(true);
    const held = s.heldCard as Card;
    const oldCard = s.players.find((p) => p.id === actor)!.hand[1] as Card;
    s = ok(s, { type: 'REPLACE', playerId: actor, slot: 1 }, events);
    expect(s.players.find((p) => p.id === actor)!.hand[1]!.id).toBe(held.id);
    expect(s.discardPile[s.discardPile.length - 1].id).toBe(oldCard.id);
    expect(cur(s)).not.toBe(actor);
    expect(allCards(s)).toHaveLength(52);
  });

  it('draw → discard without using', () => {
    let s = memorizeAll(newGame(2));
    const actor = cur(s);
    s = ok(s, { type: 'DRAW', playerId: actor });
    const held = s.heldCard as Card;
    s = ok(s, { type: 'DISCARD_DRAWN', playerId: actor });
    expect(s.discardPile[s.discardPile.length - 1].id).toBe(held.id);
    expect(cur(s)).not.toBe(actor);
  });

  it('rejects out-of-turn and out-of-stage actions', () => {
    let s = memorizeAll(newGame(3));
    const other = s.players.find((p) => p.id !== cur(s))!.id;
    expect(fail(s, { type: 'DRAW', playerId: other })).toMatch(/Not your turn/);
    expect(fail(s, { type: 'REPLACE', playerId: cur(s), slot: 0 })).toMatch(/stage/);
    expect(fail(s, { type: 'DISCARD_DRAWN', playerId: cur(s) })).toMatch(/stage/);
    s = ok(s, { type: 'DRAW', playerId: cur(s) });
    expect(fail(s, { type: 'DRAW', playerId: cur(s) })).toMatch(/stage/);
    expect(fail(s, { type: 'CALL', playerId: cur(s) })).toMatch(/stage/);
  });
});

describe('take discard', () => {
  it('must replace — cannot discard it back or use its ability', () => {
    let s = memorizeAll(newGame(2));
    const actor = cur(s);
    const top = s.discardPile[s.discardPile.length - 1];
    s = ok(s, { type: 'TAKE_DISCARD', playerId: actor });
    expect(s.turnStage).toBe('holdingDiscard');
    expect(fail(s, { type: 'DISCARD_DRAWN', playerId: actor })).toMatch(/stage/);
    expect(fail(s, { type: 'USE_ABILITY', playerId: actor, ownSlot: 0 })).toMatch(/stage/);
    s = ok(s, { type: 'REPLACE', playerId: actor, slot: 0 });
    expect(s.players.find((p) => p.id === actor)!.hand[0]!.id).toBe(top.id);
  });
});

// ---------------------------------------------------------------------------
// Abilities
// ---------------------------------------------------------------------------

describe('abilities', () => {
  function drawRigged(value: number, n = 2): { s: GameState; actor: string; events: EngineEvent[] } {
    let s = memorizeAll(newGame(n));
    s = rigTopCard(s, value);
    const actor = cur(s);
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'DRAW', playerId: actor }, events);
    expect((s.heldCard as Card).value).toBe(value);
    return { s, actor, events };
  }

  it('7/8 peek own card privately', () => {
    const { s, actor, events } = drawRigged(7);
    const expected = s.players.find((p) => p.id === actor)!.hand[2] as Card;
    const after = ok(s, { type: 'USE_ABILITY', playerId: actor, ownSlot: 2 }, events);
    const peek = events.find((e) => e.type === 'PEEK_RESULT');
    expect(peek && peek.scope === 'private' && peek.type === 'PEEK_RESULT' && peek.card.id === expected.id).toBe(true);
    expect(peek && peek.scope === 'private' && peek.playerId === actor, 'peek routed to the peeker').toBe(true);
    expect(after.discardPile[after.discardPile.length - 1].value).toBe(7);
    expect(cur(after)).not.toBe(actor);
  });

  it('9/10 spy an opponent card privately; cannot spy self', () => {
    const { s, actor, events } = drawRigged(9);
    expect(applyAction(s, { type: 'USE_ABILITY', playerId: actor, targetPlayerId: actor, targetSlot: 0 }).ok).toBe(false);
    const target = s.players.find((p) => p.id !== actor)!;
    const expected = target.hand[3] as Card;
    ok(s, { type: 'USE_ABILITY', playerId: actor, targetPlayerId: target.id, targetSlot: 3 }, events);
    const spy = events.find((e) => e.type === 'SPY_RESULT');
    expect(spy && spy.scope === 'private' && spy.type === 'SPY_RESULT' && spy.card.id === expected.id).toBe(true);
    // Routed to the SPY, never to the victim — a swap of these ids would hand
    // the spied value to the wrong socket.
    expect(spy && spy.scope === 'private' && spy.playerId === actor, 'spy routed to the spy').toBe(true);
  });

  it('11/12 blind swap moves cards without revealing values', () => {
    const { s, actor, events } = drawRigged(11);
    const target = s.players.find((p) => p.id !== actor)!;
    const mine = s.players.find((p) => p.id === actor)!.hand[0] as Card;
    const theirs = target.hand[1] as Card;
    const after = ok(s, { type: 'USE_ABILITY', playerId: actor, ownSlot: 0, targetPlayerId: target.id, targetSlot: 1 }, events);
    expect(after.players.find((p) => p.id === actor)!.hand[0]!.id).toBe(theirs.id);
    expect(after.players.find((p) => p.id === target.id)!.hand[1]!.id).toBe(mine.id);
    const used = events.find((e) => e.type === 'ABILITY_USED');
    expect(used && used.scope === 'public').toBe(true);
    expect(allCards(after)).toHaveLength(52);
  });

  it('number cards without abilities cannot be used; abilities can be disabled', () => {
    const { s, actor } = drawRigged(3);
    expect(fail(s, { type: 'USE_ABILITY', playerId: actor, ownSlot: 0 })).toMatch(/no ability/);
    let s2 = memorizeAll(newGame(2, 7, { abilitiesEnabled: false }));
    s2 = rigTopCard(s2, 7);
    const a2 = cur(s2);
    s2 = ok(s2, { type: 'DRAW', playerId: a2 });
    expect(fail(s2, { type: 'USE_ABILITY', playerId: a2, ownSlot: 0 })).toMatch(/no ability/);
  });
});

// ---------------------------------------------------------------------------
// Matching
// ---------------------------------------------------------------------------

describe('matching', () => {
  /** Force actor's hand to contain a known pair (swapped in from elsewhere, conserving cards). */
  function withPair(s: GameState, actorId: string): GameState {
    const st = structuredClone(s);
    const p = st.players.find((x) => x.id === actorId)!;
    const v = (p.hand[0] as Card).value;
    const i = st.drawPile.findIndex((c) => c.value === v);
    if (i === -1) throw new Error('rig failed');
    const tmp = st.drawPile[i];
    st.drawPile[i] = p.hand[1] as Card;
    p.hand[1] = tmp;
    return st;
  }

  it('correct claim discards the pair and the turn continues', () => {
    let s = memorizeAll(newGame(2, 11));
    const actor = cur(s);
    s = withPair(s, actor);
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'MATCH_CLAIM', playerId: actor, slots: [0, 1] }, events);
    const res = events.find((e) => e.type === 'MATCH_RESULT');
    expect(res && res.type === 'MATCH_RESULT' && res.success && res.cards?.length === 2).toBe(true);
    const hand = s.players.find((p) => p.id === actor)!.hand;
    expect(hand[0]).toBeNull();
    expect(hand[1]).toBeNull();
    expect(cur(s)).toBe(actor); // turn continues
    expect(fail(s, { type: 'MATCH_CLAIM', playerId: actor, slots: [2, 3] })).toMatch(/Already claimed/);
    s = ok(s, { type: 'DRAW', playerId: actor });
    s = ok(s, { type: 'DISCARD_DRAWN', playerId: actor });
    expect(allCards(s)).toHaveLength(52);
  });

  it('wrong claim reveals nothing and forfeits the turn', () => {
    let s = memorizeAll(newGame(2, 5));
    const actor = cur(s);
    const p = s.players.find((x) => x.id === actor)!;
    // Ensure slots 0/1 differ (rig if the deal happened to pair them).
    if ((p.hand[0] as Card).value === (p.hand[1] as Card).value) {
      const st = structuredClone(s);
      const pp = st.players.find((x) => x.id === actor)!;
      const i = st.drawPile.findIndex((c) => c.value !== (pp.hand[0] as Card).value);
      const tmp = st.drawPile[i];
      st.drawPile[i] = pp.hand[1] as Card;
      pp.hand[1] = tmp;
      s = st;
    }
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'MATCH_CLAIM', playerId: actor, slots: [0, 1] }, events);
    const res = events.find((e) => e.type === 'MATCH_RESULT');
    expect(res && res.type === 'MATCH_RESULT' && !res.success && res.cards === undefined).toBe(true);
    expect(s.players.find((x) => x.id === actor)!.hand[0]).not.toBeNull();
    expect(cur(s)).not.toBe(actor); // turn lost
  });

  it('is rejected when disabled or malformed', () => {
    let s = memorizeAll(newGame(2, 9, { matchingEnabled: false }));
    expect(fail(s, { type: 'MATCH_CLAIM', playerId: cur(s), slots: [0, 1] })).toMatch(/disabled/);
    s = memorizeAll(newGame(2, 9));
    expect(fail(s, { type: 'MATCH_CLAIM', playerId: cur(s), slots: [0] })).toMatch(/2–4/);
    expect(fail(s, { type: 'MATCH_CLAIM', playerId: cur(s), slots: [0, 0] })).toMatch(/2–4/);
    // Upper bound holds even when a custom room deals bigger hands.
    let s6 = createMatch(['anna', 'bob'], 3, { cardsPerPlayer: 6 });
    for (const p of s6.players) s6 = ok(s6, { type: 'MEMORIZE', playerId: p.id, slots: [0, 1] });
    expect(fail(s6, { type: 'MATCH_CLAIM', playerId: cur(s6), slots: [0, 1, 2, 3, 4] })).toMatch(/2–4/);
  });
});

// ---------------------------------------------------------------------------
// Call, final turns, scoring
// ---------------------------------------------------------------------------

describe('call and scoring', () => {
  function setHands(s: GameState, values: Record<string, number[]>): GameState {
    // White-box: directly assign hand values for scoring tests (ids kept unique).
    const st = structuredClone(s);
    let n = 100;
    for (const p of st.players) {
      const vals = values[p.id];
      p.hand = vals.map((v) => ({ id: `t${n++}`, value: v }));
    }
    return st;
  }

  it('caller with lowest scores 0; others score totals', () => {
    let s = memorizeAll(newGame(3, 21));
    s = setHands(s, { anna: [0, 1, 0, 1], bob: [5, 5, 5, 5], chris: [12, 12, 0, 0] });
    while (cur(s) !== 'anna') s = ok(s, { type: 'TIMEOUT' });
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'CALL', playerId: 'anna' }, events);
    expect(s.phase).toBe('finalTurns');
    // bob and chris each get exactly one turn (auto via timeout)
    s = ok(s, { type: 'TIMEOUT' }, events);
    s = ok(s, { type: 'TIMEOUT' }, events);
    const reveal = events.find((e) => e.type === 'ROUND_REVEALED');
    expect(reveal && reveal.type === 'ROUND_REVEALED').toBe(true);
    if (reveal && reveal.type === 'ROUND_REVEALED') {
      expect(reveal.falseCall).toBe(false);
      expect(reveal.roundWinnerIds).toEqual(['anna']);
      const anna = reveal.hands.find((h) => h.playerId === 'anna')!;
      expect(anna.roundScore).toBe(0);
      // bob/chris scores reflect their post-final-turn hands (timeout = draw+discard, hand unchanged)
      const bob = reveal.hands.find((h) => h.playerId === 'bob')!;
      expect(bob.roundScore).toBe(bob.total);
    }
    expect(s.phase).toBe('roundEnd');
  });

  it('false call: caller pays hand total + penalty; true lowest scores 0', () => {
    let s = memorizeAll(newGame(2, 33));
    s = setHands(s, { anna: [5, 5, 5, 5], bob: [0, 0, 1, 0] });
    while (cur(s) !== 'anna') s = ok(s, { type: 'TIMEOUT' });
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'CALL', playerId: 'anna' }, events);
    s = ok(s, { type: 'TIMEOUT' }, events); // bob's final turn
    const reveal = events.find((e) => e.type === 'ROUND_REVEALED');
    if (reveal && reveal.type === 'ROUND_REVEALED') {
      expect(reveal.falseCall).toBe(true);
      expect(reveal.roundWinnerIds).toEqual(['bob']);
      const anna = reveal.hands.find((h) => h.playerId === 'anna')!;
      expect(anna.roundScore).toBe(anna.total + 5);
      expect(reveal.hands.find((h) => h.playerId === 'bob')!.roundScore).toBe(0);
    }
  });

  it('caller wins ties; tied non-callers share the win when caller misses', () => {
    // Tie between caller and opponent → caller wins.
    let s = memorizeAll(newGame(2, 55));
    s = setHands(s, { anna: [1, 1, 1, 1], bob: [2, 2, 0, 0] });
    while (cur(s) !== 'anna') s = ok(s, { type: 'TIMEOUT' });
    let events: EngineEvent[] = [];
    s = ok(s, { type: 'CALL', playerId: 'anna' }, events);
    s = ok(s, { type: 'TIMEOUT' }, events);
    let reveal = events.find((e) => e.type === 'ROUND_REVEALED');
    if (reveal && reveal.type === 'ROUND_REVEALED') {
      expect(reveal.falseCall).toBe(false);
      expect(reveal.roundWinnerIds).toEqual(['anna']);
      expect(reveal.hands.find((h) => h.playerId === 'bob')!.roundScore).toBe(4);
    }
    // Caller misses; two others tie at the minimum → both score 0.
    let s2 = memorizeAll(newGame(3, 56));
    s2 = setHands(s2, { anna: [9, 9, 9, 9], bob: [1, 1, 0, 0], chris: [2, 0, 0, 0] });
    while (cur(s2) !== 'anna') s2 = ok(s2, { type: 'TIMEOUT' });
    events = [];
    s2 = ok(s2, { type: 'CALL', playerId: 'anna' }, events);
    s2 = ok(s2, { type: 'TIMEOUT' }, events);
    s2 = ok(s2, { type: 'TIMEOUT' }, events);
    reveal = events.find((e) => e.type === 'ROUND_REVEALED');
    if (reveal && reveal.type === 'ROUND_REVEALED') {
      expect(reveal.falseCall).toBe(true);
      expect([...reveal.roundWinnerIds].sort()).toEqual(['bob', 'chris']);
      expect(reveal.hands.find((h) => h.playerId === 'anna')!.roundScore).toBe(36 + 5);
    }
  });

  it('cannot call twice or during final turns', () => {
    let s = memorizeAll(newGame(3, 77));
    const first = cur(s);
    s = ok(s, { type: 'CALL', playerId: first });
    expect(fail(s, { type: 'CALL', playerId: cur(s) })).toMatch(/already been called/);
  });

  it('match ends when cumulative crosses target; lowest cumulative wins', () => {
    let s = memorizeAll(newGame(2, 88, { targetScore: 10 }));
    s = setHands(s, { anna: [0, 0, 0, 0], bob: [5, 5, 1, 1] });
    while (cur(s) !== 'anna') s = ok(s, { type: 'TIMEOUT' });
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'CALL', playerId: 'anna' }, events);
    s = ok(s, { type: 'TIMEOUT' }, events);
    expect(s.phase).toBe('matchEnd');
    const end = events.find((e) => e.type === 'MATCH_ENDED');
    if (end && end.type === 'MATCH_ENDED') {
      expect(end.winnerIds).toEqual(['anna']);
      expect(end.standings[0]).toEqual({ playerId: 'anna', score: 0 });
    }
    expect(fail(s, { type: 'NEXT_ROUND' })).toMatch(/not over/);
  });

  it('NEXT_ROUND redeals and rotates the starting seat', () => {
    let s = memorizeAll(newGame(3, 99));
    s = ok(s, { type: 'CALL', playerId: cur(s) });
    s = ok(s, { type: 'TIMEOUT' });
    s = ok(s, { type: 'TIMEOUT' });
    expect(s.phase).toBe('roundEnd');
    s = ok(s, { type: 'NEXT_ROUND' });
    expect(s.phase).toBe('memorize');
    expect(s.round).toBe(2);
    expect(s.currentSeat).toBe(1); // rotated
    expect(allCards(s)).toHaveLength(52);
    for (const p of s.players) expect(p.hand.every((c) => c !== null)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Timeouts
// ---------------------------------------------------------------------------

describe('variants and redaction', () => {
  it('Quick Match: maxRounds ends the match regardless of score', () => {
    let s = memorizeAll(newGame(2, 61, { maxRounds: 1, targetScore: Number.MAX_SAFE_INTEGER }));
    s = ok(s, { type: 'CALL', playerId: cur(s) });
    s = ok(s, { type: 'TIMEOUT' });
    expect(s.phase).toBe('matchEnd');
    expect(s.matchWinnerIds.length).toBeGreaterThan(0);
  });

  it('Beginner: memorizeCount 4 shows the whole starting hand', () => {
    const s = newGame(2, 62, { memorizeCount: 4, abilitiesEnabled: false });
    const events: EngineEvent[] = [];
    ok(s, { type: 'MEMORIZE', playerId: 'anna', slots: [0, 1, 2, 3] }, events);
    const priv = events.find((e) => e.type === 'MEMORIZE_RESULT');
    expect(priv && priv.type === 'MEMORIZE_RESULT' && priv.cards).toHaveLength(4);
  });

  it('redactFor: hidden hands become flags; rng and draw pile never leave', () => {
    let s = memorizeAll(newGame(3, 63));
    const actor = cur(s);
    s = ok(s, { type: 'DRAW', playerId: actor });
    const mine = redactFor(s, actor);
    const theirs = redactFor(s, s.players.find((p) => p.id !== actor)!.id);
    const spectator = redactFor(s, null);
    // Actor sees their held card; nobody else does — but everyone knows it's held.
    expect(mine.heldCard).not.toBeNull();
    expect(theirs.heldCard).toBeNull();
    expect(spectator.heldCard).toBeNull();
    expect(theirs.currentHolds).toBe(true);
    for (const view of [mine, theirs, spectator]) {
      const json = JSON.stringify(view);
      expect(json.includes('rngState')).toBe(false);
      expect(view.drawCount).toBeGreaterThan(0);
      // The only Card objects in a view are the public discard pile + own held card.
      for (const p of view.players) {
        expect(p.handSlots.every((b) => typeof b === 'boolean')).toBe(true);
      }
      expect((json.match(/"value"/g) ?? []).length).toBe(
        view.discardPile.length + (view.heldCard ? 1 : 0),
      );
    }
  });
});

describe('timeouts', () => {
  it('an abandoned table force-reveals after players×3 consecutive timeouts', () => {
    let s = memorizeAll(newGame(2, 71));
    for (let i = 0; i < 5; i++) {
      s = ok(s, { type: 'TIMEOUT' });
      expect(s.phase).toBe('turn');
    }
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'TIMEOUT' }, events); // 6th = 2 players × 3
    expect(s.phase === 'roundEnd' || s.phase === 'matchEnd').toBe(true);
    const reveal = events.find((e) => e.type === 'ROUND_REVEALED');
    expect(reveal && reveal.type === 'ROUND_REVEALED' && reveal.callerId === null).toBe(true);
  });

  it('any human action resets the abandonment counter', () => {
    let s = memorizeAll(newGame(2, 72));
    for (let i = 0; i < 5; i++) s = ok(s, { type: 'TIMEOUT' });
    const actor = cur(s);
    s = ok(s, { type: 'DRAW', playerId: actor });
    s = ok(s, { type: 'DISCARD_DRAWN', playerId: actor });
    expect(s.consecutiveTimeouts).toBe(0);
    for (let i = 0; i < 5; i++) {
      s = ok(s, { type: 'TIMEOUT' });
      expect(s.phase).toBe('turn');
    }
  });

  it('memorize timeout auto-picks for stragglers and starts play', () => {
    let s = newGame(3);
    s = ok(s, { type: 'MEMORIZE', playerId: 'anna', slots: [0, 1] });
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'TIMEOUT' }, events);
    expect(s.phase).toBe('turn');
    expect(events.filter((e) => e.type === 'MEMORIZE_RESULT')).toHaveLength(2);
  });

  it('awaitingMain timeout draws and discards; holdingDiscard timeout force-replaces', () => {
    let s = memorizeAll(newGame(2));
    const actor = cur(s);
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'TIMEOUT' }, events);
    expect(events.some((e) => e.type === 'TIMED_OUT')).toBe(true);
    expect(events.some((e) => e.type === 'DISCARDED_DRAWN')).toBe(true);
    expect(cur(s)).not.toBe(actor);

    const actor2 = cur(s);
    s = ok(s, { type: 'TAKE_DISCARD', playerId: actor2 });
    const top = s.heldCard as Card;
    s = ok(s, { type: 'TIMEOUT' });
    expect(s.players.find((p) => p.id === actor2)!.hand[0]!.id).toBe(top.id);
  });
});

// ---------------------------------------------------------------------------
// Information hygiene & full-game fuzz
// ---------------------------------------------------------------------------

/** Public event types allowed to carry card values (they describe public cards). */
const PUBLIC_VALUE_OK = new Set([
  'TOOK_DISCARD', // top of discard is public
  'REPLACED', // the discarded card becomes public
  'DISCARDED_DRAWN',
  'ABILITY_USED', // the spent ability card is on the discard pile
  'MATCH_RESULT', // successful matches are revealed by rule
  'ROUND_STARTED', // initial discard flip
  'ROUND_REVEALED', // end-of-round reveal
]);

function assertNoHiddenLeaks(events: EngineEvent[]): void {
  for (const e of events) {
    if (e.scope === 'private') {
      // Private card knowledge must be routed to the player who earned it.
      if (e.type === 'DRAWN_CARD' || e.type === 'PEEK_RESULT' || e.type === 'MEMORIZE_RESULT') {
        expect(e.playerId, `${e.type} routed to a player`).toBeTruthy();
      }
      continue;
    }
    if (PUBLIC_VALUE_OK.has(e.type)) continue;
    const json = JSON.stringify(e);
    // Neither values nor card ids may ride along on other public events —
    // ids must stay opaque, and nothing hidden may be publicly addressable.
    expect(json.includes('"value"'), `public ${e.type} leaks a card value: ${json}`).toBe(false);
    expect(json.includes('"id":"c'), `public ${e.type} leaks a card id: ${json}`).toBe(false);
  }
}

describe('fuzz: full random games hold invariants', () => {
  function mulberry(seed: number) {
    let s = seed | 0;
    return () => {
      s = (s + 0x6d2b79f5) | 0;
      let t = Math.imul(s ^ (s >>> 15), 1 | s);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  it('plays 20 seeded games to completion without violating invariants', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const rnd = mulberry(seed * 7919);
      const n = 2 + Math.floor(rnd() * 4);
      let s = newGame(n, seed, { targetScore: 25 });
      const allEvents: EngineEvent[] = [];
      let steps = 0;
      while (s.phase !== 'matchEnd' && steps++ < 5000) {
        let action: Action;
        if (s.phase === 'memorize') {
          action = { type: 'TIMEOUT' };
        } else if (s.phase === 'roundEnd') {
          action = { type: 'NEXT_ROUND' };
        } else {
          const actor = cur(s);
          const p = s.players[s.currentSeat];
          const roll = rnd();
          if (s.turnStage === 'holdingDiscard') {
            const slot = p.hand.findIndex((c) => c !== null);
            action = { type: 'REPLACE', playerId: actor, slot };
          } else if (s.turnStage === 'holdingDrawn') {
            const held = s.heldCard as Card;
            const target = s.players.find((x) => x.id !== actor)!;
            const mySlot = p.hand.findIndex((c) => c !== null);
            const theirSlot = target.hand.findIndex((c) => c !== null);
            if (roll < 0.3 && mySlot >= 0) action = { type: 'REPLACE', playerId: actor, slot: mySlot };
            else if (roll < 0.5 && held.value >= 7 && mySlot >= 0 && theirSlot >= 0) {
              action =
                held.value <= 8
                  ? { type: 'USE_ABILITY', playerId: actor, ownSlot: mySlot }
                  : held.value <= 10
                    ? { type: 'USE_ABILITY', playerId: actor, targetPlayerId: target.id, targetSlot: theirSlot }
                    : { type: 'USE_ABILITY', playerId: actor, ownSlot: mySlot, targetPlayerId: target.id, targetSlot: theirSlot };
            } else action = { type: 'DISCARD_DRAWN', playerId: actor };
          } else {
            const occupied = p.hand.map((c, i) => (c ? i : -1)).filter((i) => i >= 0);
            if (roll < 0.06 && s.phase === 'turn') action = { type: 'CALL', playerId: actor };
            else if (roll < 0.12 && occupied.length >= 2 && !p.matchClaimedThisTurn)
              action = { type: 'MATCH_CLAIM', playerId: actor, slots: occupied.slice(0, 2) };
            else if (roll < 0.3 && occupied.length > 0) action = { type: 'TAKE_DISCARD', playerId: actor };
            else if (roll < 0.4) action = { type: 'TIMEOUT' };
            else action = { type: 'DRAW', playerId: actor };
          }
        }
        const res = applyAction(s, action);
        if (!res.ok) throw new Error(`seed ${seed} step ${steps}: ${action.type} → ${res.error}`);
        s = res.state;
        allEvents.push(...res.events);

        // Invariants: card conservation + unique ids + sane scores.
        const cards = allCards(s);
        if (s.phase !== 'roundEnd' && s.phase !== 'matchEnd') {
          expect(cards, `seed ${seed} step ${steps}`).toHaveLength(52);
          expect(new Set(cards.map((c) => c.id)).size).toBe(52);
        }
        for (const p of s.players) expect(p.score).toBeGreaterThanOrEqual(0);
      }
      expect(s.phase, `seed ${seed} never finished`).toBe('matchEnd');
      expect(s.matchWinnerIds.length).toBeGreaterThan(0);
      assertNoHiddenLeaks(allEvents);
    }
  });
});
