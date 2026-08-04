import { buildDeck, shuffle } from './deck';
import {
  abilityForValue,
  DEFAULT_RULES,
  type Action,
  type ActionResult,
  type Card,
  type EngineEvent,
  type GameState,
  type PlayerState,
  type RuleConfig,
} from './types';

// ---------------------------------------------------------------------------
// Match / round setup
// ---------------------------------------------------------------------------

export function createMatch(playerIds: string[], seed: number, rules: Partial<RuleConfig> = {}): GameState {
  if (playerIds.length < 2 || playerIds.length > 5) {
    throw new Error('Foursight supports 2–5 players');
  }
  if (new Set(playerIds).size !== playerIds.length) {
    throw new Error('Duplicate player ids');
  }
  const fullRules = { ...DEFAULT_RULES, ...rules };
  const players: PlayerState[] = playerIds.map((id, seat) => ({
    id,
    seat,
    hand: [],
    score: 0,
    memorized: false,
    matchClaimedThisTurn: false,
    tookFinalTurn: false,
  }));
  const state: GameState = {
    rules: fullRules,
    phase: 'memorize',
    round: 1,
    players,
    drawPile: [],
    discardPile: [],
    currentSeat: 0,
    turnStage: 'awaitingMain',
    heldCard: null,
    callerId: null,
    consecutiveTimeouts: 0,
    rngState: seed | 0,
    matchWinnerIds: [],
  };
  dealRound(state);
  return state;
}

/** Mutates: fresh deck, deal hands, flip first discard, enter memorize phase. */
function dealRound(state: GameState): void {
  const shuffled = shuffle(buildDeck(state.rules), state.rngState);
  state.rngState = shuffled.rngState;
  // Relabel ids AFTER shuffling: build order is value-major, so pre-shuffle ids
  // would deterministically encode values (id "c17" ⇒ value 4) — any snapshot
  // that kept ids while stripping values would leak every hidden card.
  const deck = shuffled.cards.map((c, i) => ({ id: `c${i}`, value: c.value }));
  for (const p of state.players) {
    p.hand = deck.splice(0, state.rules.cardsPerPlayer);
    p.memorized = false;
    p.matchClaimedThisTurn = false;
    p.tookFinalTurn = false;
  }
  state.discardPile = [deck.pop() as Card];
  state.drawPile = deck;
  state.phase = 'memorize';
  state.currentSeat = (state.round - 1) % state.players.length;
  state.turnStage = 'awaitingMain';
  state.heldCard = null;
  state.callerId = null;
  state.consecutiveTimeouts = 0;
}

export function roundStartedEvent(state: GameState): EngineEvent {
  return {
    scope: 'public',
    type: 'ROUND_STARTED',
    round: state.round,
    startingSeat: state.currentSeat,
    discardTop: state.discardPile[state.discardPile.length - 1],
  };
}

// ---------------------------------------------------------------------------
// Action entry point
// ---------------------------------------------------------------------------

export function applyAction(prev: GameState, action: Action): ActionResult {
  const state = structuredClone(prev);
  const events: EngineEvent[] = [];
  try {
    switch (action.type) {
      case 'MEMORIZE':
        doMemorize(state, events, action.playerId, action.slots);
        break;
      case 'DRAW':
        requireTurn(state, action.playerId, 'awaitingMain');
        doDraw(state, events, action.playerId);
        break;
      case 'TAKE_DISCARD':
        requireTurn(state, action.playerId, 'awaitingMain');
        doTakeDiscard(state, events, action.playerId);
        break;
      case 'REPLACE':
        requireTurn(state, action.playerId, 'holdingDrawn', 'holdingDiscard');
        doReplace(state, events, action.playerId, action.slot);
        break;
      case 'DISCARD_DRAWN':
        requireTurn(state, action.playerId, 'holdingDrawn');
        doDiscardDrawn(state, events, action.playerId);
        break;
      case 'USE_ABILITY':
        requireTurn(state, action.playerId, 'holdingDrawn');
        doUseAbility(state, events, action);
        break;
      case 'MATCH_CLAIM':
        requireTurn(state, action.playerId, 'awaitingMain');
        doMatchClaim(state, events, action.playerId, action.slots);
        break;
      case 'CALL':
        requireTurn(state, action.playerId, 'awaitingMain');
        doCall(state, events, action.playerId);
        break;
      case 'TIMEOUT':
        doTimeout(state, events);
        break;
      case 'NEXT_ROUND':
        doNextRound(state, events);
        break;
      default:
        return { ok: false, error: 'Unknown action' };
    }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  }
  // Any successful human action proves the table is alive.
  if (action.type !== 'TIMEOUT' && action.type !== 'NEXT_ROUND') state.consecutiveTimeouts = 0;
  return { ok: true, state, events };
}

// ---------------------------------------------------------------------------
// Guards & lookups
// ---------------------------------------------------------------------------

function player(state: GameState, id: string): PlayerState {
  const p = state.players.find((x) => x.id === id);
  if (!p) throw new Error('Unknown player');
  return p;
}

function currentPlayer(state: GameState): PlayerState {
  return state.players[state.currentSeat];
}

function requireTurn(state: GameState, playerId: string, ...stages: GameState['turnStage'][]): void {
  if (state.phase !== 'turn' && state.phase !== 'finalTurns') throw new Error('Not in a turn phase');
  if (currentPlayer(state).id !== playerId) throw new Error('Not your turn');
  if (!stages.includes(state.turnStage)) throw new Error(`Invalid at stage ${state.turnStage}`);
}

function requireSlot(p: PlayerState, slot: number | undefined): asserts slot is number {
  if (
    slot === undefined ||
    !Number.isInteger(slot) ||
    slot < 0 ||
    slot >= p.hand.length ||
    p.hand[slot] === null
  ) {
    throw new Error('Invalid card slot');
  }
}

// ---------------------------------------------------------------------------
// Memorize phase
// ---------------------------------------------------------------------------

function doMemorize(state: GameState, events: EngineEvent[], playerId: string, slots: number[]): void {
  if (state.phase !== 'memorize') throw new Error('Not in memorize phase');
  const p = player(state, playerId);
  if (p.memorized) throw new Error('Already memorized');
  const unique = [...new Set(slots)];
  if (unique.length !== state.rules.memorizeCount) {
    throw new Error(`Choose exactly ${state.rules.memorizeCount} distinct cards`);
  }
  for (const s of unique) requireSlot(p, s);
  p.memorized = true;
  events.push({
    scope: 'private',
    playerId,
    type: 'MEMORIZE_RESULT',
    slots: unique,
    cards: unique.map((s) => p.hand[s] as Card),
  });
  events.push({ scope: 'public', type: 'PLAYER_MEMORIZED', playerId });
  maybeStartTurns(state, events);
}

function maybeStartTurns(state: GameState, events: EngineEvent[]): void {
  if (state.players.every((p) => p.memorized)) {
    state.phase = 'turn';
    state.turnStage = 'awaitingMain';
    events.push({ scope: 'public', type: 'TURN_STARTED', playerId: currentPlayer(state).id, phase: state.phase });
  }
}

// ---------------------------------------------------------------------------
// Main actions
// ---------------------------------------------------------------------------

function doDraw(state: GameState, events: EngineEvent[], playerId: string): void {
  if (state.drawPile.length === 0) reshuffleDiscard(state, events);
  if (state.drawPile.length === 0) {
    // Nothing left to draw anywhere: end the round where it stands.
    revealRound(state, events);
    return;
  }
  const card = state.drawPile.pop() as Card;
  state.heldCard = card;
  state.turnStage = 'holdingDrawn';
  events.push({ scope: 'public', type: 'DREW_FROM_DECK', playerId, deckRemaining: state.drawPile.length });
  events.push({ scope: 'private', playerId, type: 'DRAWN_CARD', card });
}

function reshuffleDiscard(state: GameState, events: EngineEvent[]): void {
  if (state.discardPile.length <= 1) return;
  const top = state.discardPile.pop() as Card;
  const shuffled = shuffle(state.discardPile, state.rngState);
  state.rngState = shuffled.rngState;
  state.drawPile = shuffled.cards;
  state.discardPile = [top];
  events.push({ scope: 'public', type: 'DECK_RESHUFFLED', deckRemaining: state.drawPile.length });
}

function doTakeDiscard(state: GameState, events: EngineEvent[], playerId: string): void {
  const p = player(state, playerId);
  if (state.discardPile.length === 0) throw new Error('Discard pile is empty');
  if (!p.hand.some((c) => c !== null)) throw new Error('No cards to replace');
  const card = state.discardPile.pop() as Card;
  state.heldCard = card;
  state.turnStage = 'holdingDiscard';
  events.push({ scope: 'public', type: 'TOOK_DISCARD', playerId, card });
}

function doReplace(state: GameState, events: EngineEvent[], playerId: string, slot: number): void {
  const p = player(state, playerId);
  requireSlot(p, slot);
  const outgoing = p.hand[slot] as Card;
  p.hand[slot] = state.heldCard;
  state.discardPile.push(outgoing);
  events.push({ scope: 'public', type: 'REPLACED', playerId, slot, discarded: outgoing });
  endTurn(state, events);
}

function doDiscardDrawn(state: GameState, events: EngineEvent[], playerId: string): void {
  const card = state.heldCard as Card;
  state.discardPile.push(card);
  events.push({ scope: 'public', type: 'DISCARDED_DRAWN', playerId, card });
  endTurn(state, events);
}

function doUseAbility(
  state: GameState,
  events: EngineEvent[],
  action: Extract<Action, { type: 'USE_ABILITY' }>,
): void {
  const p = player(state, action.playerId);
  const card = state.heldCard as Card;
  const ability = abilityForValue(card.value, state.rules);
  if (!ability) throw new Error('That card has no ability');

  // The ability card is spent to the discard pile first — it is public.
  state.discardPile.push(card);

  if (ability === 'peek') {
    requireSlot(p, action.ownSlot);
    events.push({
      scope: 'public',
      type: 'ABILITY_USED',
      playerId: p.id,
      ability,
      card,
      ownSlot: action.ownSlot,
    });
    events.push({
      scope: 'private',
      playerId: p.id,
      type: 'PEEK_RESULT',
      slot: action.ownSlot,
      card: p.hand[action.ownSlot] as Card,
    });
  } else if (ability === 'spy') {
    if (!action.targetPlayerId || action.targetPlayerId === p.id) throw new Error('Spy targets an opponent');
    const target = player(state, action.targetPlayerId);
    requireSlot(target, action.targetSlot);
    events.push({
      scope: 'public',
      type: 'ABILITY_USED',
      playerId: p.id,
      ability,
      card,
      targetPlayerId: target.id,
      targetSlot: action.targetSlot,
    });
    events.push({
      scope: 'private',
      playerId: p.id,
      type: 'SPY_RESULT',
      targetPlayerId: target.id,
      slot: action.targetSlot,
      card: target.hand[action.targetSlot] as Card,
    });
  } else {
    // swap — blind: neither card is revealed to anyone.
    if (!action.targetPlayerId || action.targetPlayerId === p.id) throw new Error('Swap targets an opponent');
    const target = player(state, action.targetPlayerId);
    requireSlot(p, action.ownSlot);
    requireSlot(target, action.targetSlot);
    const mine = p.hand[action.ownSlot] as Card;
    p.hand[action.ownSlot] = target.hand[action.targetSlot];
    target.hand[action.targetSlot] = mine;
    events.push({
      scope: 'public',
      type: 'ABILITY_USED',
      playerId: p.id,
      ability,
      card,
      ownSlot: action.ownSlot,
      targetPlayerId: target.id,
      targetSlot: action.targetSlot,
    });
  }
  endTurn(state, events);
}

function doMatchClaim(state: GameState, events: EngineEvent[], playerId: string, slots: number[]): void {
  if (!state.rules.matchingEnabled) throw new Error('Matching is disabled');
  const p = player(state, playerId);
  if (p.matchClaimedThisTurn) throw new Error('Already claimed this turn');
  const unique = [...new Set(slots)];
  if (unique.length < 2 || unique.length > 4 || unique.length !== slots.length) {
    throw new Error('Claim 2–4 distinct cards');
  }
  for (const s of unique) requireSlot(p, s);
  p.matchClaimedThisTurn = true;

  const cards = unique.map((s) => p.hand[s] as Card);
  const success = cards.every((c) => c.value === cards[0].value);
  if (success) {
    for (const s of unique) p.hand[s] = null;
    state.discardPile.push(...cards);
    events.push({ scope: 'public', type: 'MATCH_RESULT', playerId, slots: unique, success: true, cards });
    // Turn continues — the claim is a bonus, not the main action.
  } else {
    // Failure: nothing is revealed; the turn is forfeited.
    events.push({ scope: 'public', type: 'MATCH_RESULT', playerId, slots: unique, success: false });
    endTurn(state, events);
  }
}

function doCall(state: GameState, events: EngineEvent[], playerId: string): void {
  if (state.phase !== 'turn') throw new Error('The round has already been called');
  if (state.callerId !== null) throw new Error('The round has already been called');
  const p = player(state, playerId);
  state.callerId = p.id;
  state.phase = 'finalTurns';
  p.tookFinalTurn = true;
  events.push({ scope: 'public', type: 'CALLED', playerId });
  endTurn(state, events);
}

// ---------------------------------------------------------------------------
// Turn rotation & round end
// ---------------------------------------------------------------------------

function endTurn(state: GameState, events: EngineEvent[]): void {
  const p = currentPlayer(state);
  state.heldCard = null;
  p.matchClaimedThisTurn = false;
  state.turnStage = 'awaitingMain';

  if (state.phase === 'finalTurns') {
    p.tookFinalTurn = true;
    const n = state.players.length;
    for (let step = 1; step <= n; step++) {
      const candidate = state.players[(state.currentSeat + step) % n];
      if (!candidate.tookFinalTurn) {
        state.currentSeat = candidate.seat;
        events.push({ scope: 'public', type: 'TURN_STARTED', playerId: candidate.id, phase: state.phase });
        return;
      }
    }
    revealRound(state, events);
    return;
  }

  state.currentSeat = (state.currentSeat + 1) % state.players.length;
  events.push({ scope: 'public', type: 'TURN_STARTED', playerId: currentPlayer(state).id, phase: state.phase });
}

function revealRound(state: GameState, events: EngineEvent[]): void {
  const totals = state.players.map((p) => ({
    p,
    total: p.hand.reduce((sum, c) => sum + (c ? c.value : 0), 0),
  }));
  const minTotal = Math.min(...totals.map((t) => t.total));
  const caller = state.callerId ? totals.find((t) => t.p.id === state.callerId) : undefined;
  const falseCall = caller !== undefined && caller.total > minTotal;

  // Caller wins ties; otherwise everyone at the minimum shares the win.
  const roundWinnerIds =
    caller && !falseCall ? [caller.p.id] : totals.filter((t) => t.total === minTotal).map((t) => t.p.id);

  const hands = totals.map(({ p, total }) => {
    let roundScore: number;
    if (roundWinnerIds.includes(p.id)) roundScore = 0;
    else if (falseCall && caller && p.id === caller.p.id) roundScore = total + state.rules.callPenalty;
    else roundScore = total;
    p.score += roundScore;
    return { playerId: p.id, cards: p.hand, total, roundScore };
  });

  state.phase = 'roundEnd';
  events.push({
    scope: 'public',
    type: 'ROUND_REVEALED',
    hands,
    callerId: state.callerId,
    falseCall,
    roundWinnerIds,
    cumulative: state.players.map((p) => ({ playerId: p.id, score: p.score })),
  });

  const roundLimitHit = state.rules.maxRounds > 0 && state.round >= state.rules.maxRounds;
  if (roundLimitHit || state.players.some((p) => p.score >= state.rules.targetScore)) {
    const best = Math.min(...state.players.map((p) => p.score));
    state.matchWinnerIds = state.players.filter((p) => p.score === best).map((p) => p.id);
    state.phase = 'matchEnd';
    events.push({
      scope: 'public',
      type: 'MATCH_ENDED',
      winnerIds: state.matchWinnerIds,
      standings: [...state.players]
        .sort((a, b) => a.score - b.score)
        .map((p) => ({ playerId: p.id, score: p.score })),
    });
  }
}

function doNextRound(state: GameState, events: EngineEvent[]): void {
  if (state.phase !== 'roundEnd') throw new Error('Round is not over');
  state.round += 1;
  dealRound(state);
  events.push(roundStartedEvent(state));
}

// ---------------------------------------------------------------------------
// Timeouts (server-issued when a timer expires)
// ---------------------------------------------------------------------------

function doTimeout(state: GameState, events: EngineEvent[]): void {
  if (state.phase === 'memorize') {
    // The memorize window closed: auto-pick the first cards for stragglers.
    for (const p of state.players) {
      if (p.memorized) continue;
      const slots: number[] = [];
      for (let s = 0; s < p.hand.length && slots.length < state.rules.memorizeCount; s++) {
        if (p.hand[s] !== null) slots.push(s);
      }
      p.memorized = true;
      events.push({
        scope: 'private',
        playerId: p.id,
        type: 'MEMORIZE_RESULT',
        slots,
        cards: slots.map((s) => p.hand[s] as Card),
      });
      events.push({ scope: 'public', type: 'PLAYER_MEMORIZED', playerId: p.id });
    }
    maybeStartTurns(state, events);
    return;
  }

  if (state.phase !== 'turn' && state.phase !== 'finalTurns') throw new Error('Nothing to time out');
  const p = currentPlayer(state);
  events.push({ scope: 'public', type: 'TIMED_OUT', playerId: p.id });

  // Only CALL ends a round; a table where every seat keeps timing out would
  // cycle forever. After a full lap × 3 of nothing but timeouts, force reveal.
  state.consecutiveTimeouts += 1;
  if (state.consecutiveTimeouts >= state.players.length * 3) {
    revealRound(state, events);
    return;
  }

  if (state.turnStage === 'awaitingMain') {
    doDraw(state, events, p.id);
    // doDraw may have ended the round (exhausted deck edge case) — re-read the
    // mutated stage; the cast defeats TS narrowing, which doesn't see the mutation.
    if ((state.turnStage as GameState['turnStage']) === 'holdingDrawn') {
      doDiscardDrawn(state, events, p.id);
    }
    return;
  }
  if (state.turnStage === 'holdingDrawn') {
    doDiscardDrawn(state, events, p.id);
    return;
  }
  // holdingDiscard: forced replace into the first occupied slot.
  const slot = p.hand.findIndex((c) => c !== null);
  doReplace(state, events, p.id, slot);
}
