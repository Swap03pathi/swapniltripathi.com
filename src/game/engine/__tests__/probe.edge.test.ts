/** TEMPORARY probe file for edge-case review — delete after run. */
import { describe, expect, it } from 'vitest';
import { applyAction, createMatch } from '../engine';
import type { Action, Card, EngineEvent, GameState } from '../types';

function ok(state: GameState, action: Action, sink?: EngineEvent[]): GameState {
  const res = applyAction(state, action);
  if (!res.ok) throw new Error(`Expected ok, got: ${res.error} (action ${action.type})`);
  sink?.push(...res.events);
  return res.state;
}

function cur(state: GameState): string {
  return state.players[state.currentSeat].id;
}

describe('probes', () => {
  it('P1: tiny-deck config — deal shortfall & undefined discard flip', () => {
    // deck = (maxValue+1)*copies = 3*2 = 6 cards; 2 players x 4 = 8 needed + 1 flip
    const s = createMatch(['a', 'b'], 1, { maxValue: 2, copies: 2 });
    console.log('P1 hands:', s.players.map((p) => p.hand.length));
    console.log('P1 discardPile:', JSON.stringify(s.discardPile));
    console.log('P1 drawPile:', s.drawPile.length);
    expect(true).toBe(true);
  });

  it('P1b: tiny-deck NaN corruption chain via TAKE_DISCARD of undefined', () => {
    let s = createMatch(['a', 'b'], 1, { maxValue: 2, copies: 3 });
    // deck = 9 cards; 8 dealt + 1 flip => drawPile 0, discardPile 1 real card. OK-ish.
    console.log('P1b drawPile:', s.drawPile.length, 'discard:', s.discardPile.length);
    s = ok(s, { type: 'MEMORIZE', playerId: 'a', slots: [0, 1] });
    s = ok(s, { type: 'MEMORIZE', playerId: 'b', slots: [0, 1] });
    // First player draws with empty draw pile + single discard -> reveal path?
    const events: EngineEvent[] = [];
    const s2 = ok(s, { type: 'DRAW', playerId: cur(s) }, events);
    console.log('P1b after DRAW phase:', s2.phase, 'turnStage:', s2.turnStage, 'held:', s2.heldCard);
    console.log('P1b events:', events.map((e) => e.type).join(','));
    const reveal = events.find((e) => e.type === 'ROUND_REVEALED');
    if (reveal && reveal.type === 'ROUND_REVEALED') {
      console.log('P1b reveal:', JSON.stringify({ winners: reveal.roundWinnerIds, falseCall: reveal.falseCall, callerId: reveal.callerId, totals: reveal.hands.map((h) => h.total) }));
    }
    // can endTurn/further actions run after this reveal?
    const after = applyAction(s2, { type: 'DRAW', playerId: cur(s2) });
    console.log('P1b DRAW after reveal ok?', after.ok, !after.ok ? after.error : '');
    const to = applyAction(s2, { type: 'TIMEOUT' });
    console.log('P1b TIMEOUT after reveal ok?', to.ok, !to.ok ? to.error : '');
  });

  it('P2: TIMEOUT-driven draw when deck exhausts mid-timeout (custom rules)', () => {
    let s = createMatch(['a', 'b'], 1, { maxValue: 2, copies: 3 });
    s = ok(s, { type: 'TIMEOUT' }); // memorize all
    expect(s.phase).toBe('turn');
    const events: EngineEvent[] = [];
    const s2 = ok(s, { type: 'TIMEOUT' }, events); // awaitingMain timeout -> doDraw -> reveal
    console.log('P2 phase:', s2.phase, 'turnStage:', s2.turnStage, 'held:', s2.heldCard);
    console.log('P2 events:', events.map((e) => e.type).join(','));
  });

  /** Give current player four-of-a-kind of whatever value has 4 copies in hand+drawPile. */
  function rigQuad(s0: GameState): GameState {
    const st = structuredClone(s0);
    const p = st.players[st.currentSeat];
    const pool = [...st.drawPile, ...(p.hand as Card[])];
    const byValue = new Map<number, Card[]>();
    for (const c of pool) {
      const arr = byValue.get(c.value) ?? [];
      arr.push(c);
      byValue.set(c.value, arr);
    }
    const quadEntry = [...byValue.entries()].find(([, arr]) => arr.length >= 4);
    if (!quadEntry) throw new Error('no quad available');
    const quad = quadEntry[1].slice(0, 4);
    const quadIds = new Set(quad.map((c) => c.id));
    p.hand = quad;
    st.drawPile = pool.filter((c) => !quadIds.has(c.id));
    return st;
  }

  it('P3: match all four -> empty hand -> turn continues -> CALL -> caller wins with 0', () => {
    // Build a state where current player holds four of a kind by white-box rigging.
    let s = createMatch(['a', 'b'], 5, {});
    s = ok(s, { type: 'TIMEOUT' }); // memorize
    s = rigQuad(s);
    const p = s.players[s.currentSeat];
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'MATCH_CLAIM', playerId: p.id, slots: [0, 1, 2, 3] }, events);
    console.log('P3 hand after claim:', JSON.stringify(s.players[s.currentSeat].hand));
    console.log('P3 still my turn?', cur(s) === p.id, 'stage:', s.turnStage);
    // empty-hand guards
    const td = applyAction(s, { type: 'TAKE_DISCARD', playerId: p.id });
    console.log('P3 TAKE_DISCARD with empty hand ok?', td.ok, !td.ok ? td.error : '');
    s = ok(s, { type: 'CALL', playerId: p.id }, events);
    console.log('P3 phase after call:', s.phase);
    s = ok(s, { type: 'TIMEOUT' }, events); // b's final turn
    const reveal = events.find((e) => e.type === 'ROUND_REVEALED');
    if (reveal && reveal.type === 'ROUND_REVEALED') {
      console.log('P3 reveal winners:', reveal.roundWinnerIds, 'caller:', reveal.callerId, 'falseCall:', reveal.falseCall);
      console.log('P3 totals:', JSON.stringify(reveal.hands.map((h) => ({ id: h.playerId, t: h.total, rs: h.roundScore }))));
    }
    console.log('P3 phase:', s.phase);
    // NEXT_ROUND redeals full hands?
    if (s.phase === 'roundEnd') {
      const s3 = ok(s, { type: 'NEXT_ROUND' });
      console.log('P3 next round hands full?', s3.players.every((pp) => pp.hand.length === 4 && pp.hand.every((c) => c !== null)));
    }
  });

  it('P4: empty-hand player mid-round: draw->replace fails, discard ok, timeout ok', () => {
    let s = createMatch(['a', 'b'], 5, {});
    s = ok(s, { type: 'TIMEOUT' });
    s = rigQuad(s);
    const p = s.players[s.currentSeat];
    s = ok(s, { type: 'MATCH_CLAIM', playerId: p.id, slots: [0, 1, 2, 3] });
    // don't call: draw instead
    s = ok(s, { type: 'DRAW', playerId: p.id });
    const rep = applyAction(s, { type: 'REPLACE', playerId: p.id, slot: 0 });
    console.log('P4 REPLACE into null slot ok?', rep.ok, !rep.ok ? rep.error : '');
    s = ok(s, { type: 'DISCARD_DRAWN', playerId: p.id });
    console.log('P4 turn passed to:', cur(s));
    // b's turn; b timeouts; back to empty-handed a; TIMEOUT for a:
    s = ok(s, { type: 'TIMEOUT' });
    expect(cur(s)).toBe(p.id);
    const s2 = ok(s, { type: 'TIMEOUT' });
    console.log('P4 empty-hand TIMEOUT survived, now:', cur(s2), s2.phase);
  });

  it('P5: five-player finalTurns wraparound from middle seat', () => {
    let s = createMatch(['a', 'b', 'c', 'd', 'e'], 9, {});
    s = ok(s, { type: 'TIMEOUT' });
    // advance to seat 2 (player c)
    while (s.currentSeat !== 2) s = ok(s, { type: 'TIMEOUT' });
    const events: EngineEvent[] = [];
    s = ok(s, { type: 'CALL', playerId: 'c' }, events);
    const turnOrder: string[] = [];
    let guard = 0;
    while (s.phase === 'finalTurns' && guard++ < 10) {
      turnOrder.push(cur(s));
      s = ok(s, { type: 'TIMEOUT' }, events);
    }
    console.log('P5 final turn order:', turnOrder.join(','), 'end phase:', s.phase);
    expect(turnOrder).toEqual(['d', 'e', 'a', 'b']);
  });

  it('P6: TAKE_DISCARD can transiently empty the discard pile right after round start', () => {
    let s = createMatch(['a', 'b'], 13, {});
    s = ok(s, { type: 'TIMEOUT' });
    expect(s.discardPile.length).toBe(1);
    s = ok(s, { type: 'TAKE_DISCARD', playerId: cur(s) });
    console.log('P6 discard during holdingDiscard:', s.discardPile.length, 'held:', !!s.heldCard);
    // timeout force-replace works with empty discard
    const s2 = ok(s, { type: 'TIMEOUT' });
    console.log('P6 discard after forced replace:', s2.discardPile.length);
  });

  it('P7: TIMEOUT rejected in roundEnd/matchEnd; NEXT_ROUND rejected in matchEnd', () => {
    let s = createMatch(['a', 'b'], 33, { targetScore: 1 });
    s = ok(s, { type: 'TIMEOUT' });
    s = ok(s, { type: 'CALL', playerId: cur(s) });
    s = ok(s, { type: 'TIMEOUT' });
    console.log('P7 phase:', s.phase);
    const to = applyAction(s, { type: 'TIMEOUT' });
    console.log('P7 TIMEOUT at', s.phase, 'ok?', to.ok, !to.ok ? to.error : '');
    const nr = applyAction(s, { type: 'NEXT_ROUND' });
    console.log('P7 NEXT_ROUND at', s.phase, 'ok?', nr.ok, !nr.ok ? nr.error : '');
  });

  it('P8: MATCH_CLAIM upper bound — 5-of-a-kind claim allowed with custom rules', () => {
    let s = createMatch(['a', 'b'], 3, { cardsPerPlayer: 6, copies: 5 });
    s = ok(s, { type: 'TIMEOUT' });
    const st = structuredClone(s);
    const p = st.players[st.currentSeat];
    const fives: Card[] = [];
    const rest: Card[] = [];
    for (const c of [...st.drawPile, ...(p.hand as Card[])]) {
      if (c.value === 3 && fives.length < 5) fives.push(c);
      else rest.push(c);
    }
    if (fives.length === 5) {
      p.hand = [...fives, rest.pop() as Card];
      st.drawPile = rest;
      const res = applyAction(st, { type: 'MATCH_CLAIM', playerId: p.id, slots: [0, 1, 2, 3, 4] });
      console.log('P8 5-card claim ok?', res.ok, res.ok ? 'accepted (spec says 2-4)' : res.error);
    } else {
      console.log('P8 rig failed, skip');
    }
  });

  it('P9: stale TIMEOUT while holdingDrawn force-discards an active player', () => {
    let s = createMatch(['a', 'b'], 77, {});
    s = ok(s, { type: 'TIMEOUT' });
    const actor = cur(s);
    s = ok(s, { type: 'DRAW', playerId: actor });
    expect(s.turnStage).toBe('holdingDrawn');
    // engine cannot tell this TIMEOUT was armed for the previous stage
    const res = applyAction(s, { type: 'TIMEOUT' });
    console.log('P9 stale TIMEOUT accepted?', res.ok, res.ok ? `turn now: ${cur(res.state)}` : '');
  });
});
