/**
 * Foursight rules engine — shared types.
 * Pure data; no I/O. The engine runs authoritatively in the Durable Object and
 * (for rendering/replay of public events) on the client.
 */

export interface RuleConfig {
  /** Cards dealt to each player at round start. */
  cardsPerPlayer: number;
  /** How many of their own cards a player may memorize at round start. */
  memorizeCount: number;
  /** Deck: values 0..maxValue, `copies` of each. */
  maxValue: number;
  copies: number;
  /** Cumulative score that ends the match once reached or exceeded (>=). */
  targetScore: number;
  /** If > 0, the match also ends after this many rounds (Quick Match). 0 = unlimited. */
  maxRounds: number;
  /** Penalty added to a caller's hand total when someone else is strictly lower. */
  callPenalty: number;
  abilitiesEnabled: boolean;
  matchingEnabled: boolean;
}

export const DEFAULT_RULES: RuleConfig = {
  cardsPerPlayer: 4,
  memorizeCount: 2,
  maxValue: 12,
  copies: 4,
  targetScore: 100,
  maxRounds: 0,
  callPenalty: 5,
  abilitiesEnabled: true,
  matchingEnabled: true,
};

export type VariantKey = 'classic' | 'quick' | 'beginner' | 'custom';
export const VARIANT_KEYS: readonly VariantKey[] = ['classic', 'quick', 'beginner', 'custom'];

/** GDD variant profiles, expressed as rule overrides. */
export const VARIANTS: Record<VariantKey, { label: string; description: string; rules: Partial<RuleConfig> }> = {
  classic: {
    label: 'Classic',
    description: 'See 2 of your 4 cards, all abilities, play to 100.',
    rules: {},
  },
  quick: {
    label: 'Quick Match',
    description: 'Exactly 5 rounds — lowest cumulative score wins.',
    rules: { maxRounds: 5, targetScore: Number.MAX_SAFE_INTEGER },
  },
  beginner: {
    label: 'Beginner',
    description: 'See all 4 starting cards, no abilities, short game to 50.',
    rules: { memorizeCount: 4, abilitiesEnabled: false, matchingEnabled: false, targetScore: 50 },
  },
  custom: {
    label: 'Custom',
    description: 'Tune every rule yourself.',
    rules: {},
  },
};

export type Ability = 'peek' | 'spy' | 'swap';

/** 7/8 peek own · 9/10 spy opponent · 11/12 blind swap. */
export function abilityForValue(value: number, rules: RuleConfig): Ability | null {
  if (!rules.abilitiesEnabled) return null;
  if (value === 7 || value === 8) return 'peek';
  if (value === 9 || value === 10) return 'spy';
  if (value === 11 || value === 12) return 'swap';
  return null;
}

export interface Card {
  /** Unique per physical card within a round (e.g. "c17"). */
  id: string;
  value: number;
}

export type Phase =
  | 'memorize' // players privately viewing their starting cards
  | 'turn' // normal play
  | 'finalTurns' // someone called; remaining players get one turn each
  | 'roundEnd' // revealed; waiting for server to start next round
  | 'matchEnd';

export type TurnStage =
  | 'awaitingMain' // may DRAW / TAKE_DISCARD / CALL / MATCH_CLAIM
  | 'holdingDrawn' // drew from deck; may REPLACE / DISCARD_DRAWN / USE_ABILITY
  | 'holdingDiscard'; // took discard; must REPLACE

export interface PlayerState {
  id: string;
  /** Fixed seat order index. */
  seat: number;
  /** Face-down slots; null = emptied by a successful match claim. */
  hand: (Card | null)[];
  /** Cumulative score across completed rounds. */
  score: number;
  /** Memorize phase bookkeeping. */
  memorized: boolean;
  /** One match claim allowed per turn. */
  matchClaimedThisTurn: boolean;
  /** Set during finalTurns once this player has had their last turn. */
  tookFinalTurn: boolean;
  /**
   * Dropped by table vote after going inactive. Round-scoped: their hand sits
   * inert (unspyable, unswappable), their seat is skipped, and at reveal they
   * score the round's highest score instead of their hand. Cleared on deal.
   */
  droppedForRound: boolean;
}

export interface GameState {
  rules: RuleConfig;
  phase: Phase;
  round: number; // 1-based
  players: PlayerState[];
  drawPile: Card[];
  discardPile: Card[]; // last element = top (visible)
  /** Seat index of the player whose turn it is (valid in turn/finalTurns). */
  currentSeat: number;
  turnStage: TurnStage;
  /** Card held after DRAW / TAKE_DISCARD, visible only to the actor.
   * (turnStage distinguishes deck draws from discard takes.) */
  heldCard: Card | null;
  /** Player id that called to end the round, if any. */
  callerId: string | null;
  /**
   * Consecutive turn-phase TIMEOUTs with no human action in between. CALL is
   * the only player-driven round terminator, so a fully abandoned table would
   * otherwise loop draw-and-discard forever; at players×3 the round force-ends.
   */
  consecutiveTimeouts: number;
  /**
   * Mulberry32 state for deterministic shuffles.
   * NEVER send to clients — with it, all future deals and reshuffles are
   * predictable. redactFor() strips it; keep raw GameState server-side only.
   */
  rngState: number;
  /** Winner ids once phase === 'matchEnd'. */
  matchWinnerIds: string[];
}

// ---------------------------------------------------------------------------
// Actions (client → engine, validated against acting player)
// ---------------------------------------------------------------------------

export type Action =
  | { type: 'MEMORIZE'; playerId: string; slots: number[] }
  | { type: 'DRAW'; playerId: string }
  | { type: 'TAKE_DISCARD'; playerId: string }
  | { type: 'REPLACE'; playerId: string; slot: number }
  | { type: 'DISCARD_DRAWN'; playerId: string }
  | {
      type: 'USE_ABILITY';
      playerId: string;
      /** peek: { ownSlot } · spy: { targetPlayerId, targetSlot } · swap: { ownSlot, targetPlayerId, targetSlot } */
      ownSlot?: number;
      targetPlayerId?: string;
      targetSlot?: number;
    }
  | { type: 'MATCH_CLAIM'; playerId: string; slots: number[] }
  | { type: 'CALL'; playerId: string }
  /** Server-issued when the acting player's timer expires. */
  | { type: 'TIMEOUT' }
  /** Server-issued when the table votes to drop an inactive player. */
  | { type: 'DROP_PLAYER'; playerId: string }
  /** Server-issued to begin the next round after roundEnd. */
  | { type: 'NEXT_ROUND' };

// ---------------------------------------------------------------------------
// Events (engine → server). `scope` controls socket routing: 'public' events
// go to everyone; 'private' events go only to `playerId`'s socket. Hidden card
// values only ever appear in private events or in the roundEnd reveal.
// ---------------------------------------------------------------------------

export type EngineEvent =
  | { scope: 'public'; type: 'ROUND_STARTED'; round: number; startingSeat: number; discardTop: Card }
  | { scope: 'private'; playerId: string; type: 'MEMORIZE_RESULT'; slots: number[]; cards: Card[] }
  | { scope: 'public'; type: 'PLAYER_MEMORIZED'; playerId: string }
  | { scope: 'public'; type: 'TURN_STARTED'; playerId: string; phase: Phase }
  | { scope: 'public'; type: 'DREW_FROM_DECK'; playerId: string; deckRemaining: number }
  | { scope: 'private'; playerId: string; type: 'DRAWN_CARD'; card: Card }
  | { scope: 'public'; type: 'TOOK_DISCARD'; playerId: string; card: Card }
  | { scope: 'public'; type: 'REPLACED'; playerId: string; slot: number; discarded: Card }
  | { scope: 'public'; type: 'DISCARDED_DRAWN'; playerId: string; card: Card }
  | {
      scope: 'public';
      type: 'ABILITY_USED';
      playerId: string;
      ability: Ability;
      card: Card; // the discarded ability card (public once discarded)
      ownSlot?: number;
      targetPlayerId?: string;
      targetSlot?: number;
    }
  | { scope: 'private'; playerId: string; type: 'PEEK_RESULT'; slot: number; card: Card }
  | { scope: 'private'; playerId: string; type: 'SPY_RESULT'; targetPlayerId: string; slot: number; card: Card }
  | {
      scope: 'public';
      type: 'MATCH_RESULT';
      playerId: string;
      slots: number[];
      success: boolean;
      /** Revealed only on success (the discarded matched cards). */
      cards?: Card[];
    }
  | { scope: 'public'; type: 'CALLED'; playerId: string }
  | { scope: 'public'; type: 'PLAYER_DROPPED'; playerId: string }
  | { scope: 'public'; type: 'DECK_RESHUFFLED'; deckRemaining: number }
  | { scope: 'public'; type: 'TIMED_OUT'; playerId: string }
  | {
      scope: 'public';
      type: 'ROUND_REVEALED';
      hands: { playerId: string; cards: (Card | null)[]; total: number; roundScore: number; dropped: boolean }[];
      callerId: string | null;
      falseCall: boolean;
      roundWinnerIds: string[];
      cumulative: { playerId: string; score: number }[];
    }
  | { scope: 'public'; type: 'MATCH_ENDED'; winnerIds: string[]; standings: { playerId: string; score: number }[] };

export type ActionResult =
  | { ok: true; state: GameState; events: EngineEvent[] }
  | { ok: false; error: string };
