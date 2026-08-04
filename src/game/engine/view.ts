import type { Card, GameState, Phase, RuleConfig, TurnStage } from './types';

/**
 * Per-viewer redacted snapshot — the ONLY shape of game state that may leave
 * the server. Hidden hands become occupancy flags (no ids, no values); the
 * draw pile becomes a count; rngState is dropped entirely. Everything here is
 * information the viewer is entitled to: public knowledge plus their own held
 * card. What a player privately learned (memorize/peek/spy) arrives once via
 * private events and is theirs to remember — it is deliberately NOT in the
 * snapshot, so reconnecting mid-round genuinely costs you your memory.
 */
export interface ClientPlayerView {
  id: string;
  seat: number;
  score: number;
  /** true = slot holds a face-down card; false = emptied by a match claim. */
  handSlots: boolean[];
  memorized: boolean;
  tookFinalTurn: boolean;
  /** Public knowledge (claims are announced) — lets the UI hide a spent button. */
  matchClaimedThisTurn: boolean;
  /** Dropped by table vote for the rest of this round. */
  droppedForRound: boolean;
}

export interface ClientView {
  rules: RuleConfig;
  phase: Phase;
  round: number;
  players: ClientPlayerView[];
  drawCount: number;
  /** Full discard history — every card here was publicly played. */
  discardPile: Card[];
  currentSeat: number;
  turnStage: TurnStage;
  /** The card you are holding (drawn or taken); null unless you are the actor. */
  heldCard: Card | null;
  /** Whether the current player is holding a card (public knowledge). */
  currentHolds: boolean;
  callerId: string | null;
  matchWinnerIds: string[];
}

export function redactFor(state: GameState, viewerId: string | null): ClientView {
  const isActor = viewerId !== null && state.players[state.currentSeat]?.id === viewerId;
  return {
    rules: state.rules,
    phase: state.phase,
    round: state.round,
    players: state.players.map((p) => ({
      id: p.id,
      seat: p.seat,
      score: p.score,
      handSlots: p.hand.map((c) => c !== null),
      memorized: p.memorized,
      tookFinalTurn: p.tookFinalTurn,
      matchClaimedThisTurn: p.matchClaimedThisTurn,
      droppedForRound: p.droppedForRound,
    })),
    drawCount: state.drawPile.length,
    discardPile: state.discardPile,
    currentSeat: state.currentSeat,
    turnStage: state.turnStage,
    heldCard: isActor ? state.heldCard : null,
    currentHolds: state.heldCard !== null,
    callerId: state.callerId,
    matchWinnerIds: state.matchWinnerIds,
  };
}
