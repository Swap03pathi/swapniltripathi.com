/**
 * Foursight wire protocol — shared by the site client and the Cloudflare
 * Worker (game/worker). JSON messages over WebSocket.
 */
import type { EngineEvent, RuleConfig } from './engine/types';
import type { ClientView } from './engine/view';

export type { VariantKey } from './engine/types';
import type { VariantKey } from './engine/types';

export interface RoomSettings {
  variant: VariantKey;
  maxPlayers: number; // 2–5
  /** Seconds per turn; 0 = unlimited. */
  turnTimerSec: number;
  /** Fully resolved rules (variant profile + custom overrides). */
  rules: RuleConfig;
}

export interface RoomMember {
  playerId: string;
  name: string;
  connected: boolean;
  isHost: boolean;
}

export interface RoomView {
  code: string;
  status: 'waiting' | 'playing';
  members: RoomMember[];
  settings: RoomSettings;
}

/**
 * Actions a client may request. The server injects the sender's playerId from
 * the socket — a client can never act as someone else — and TIMEOUT /
 * NEXT_ROUND are server-only.
 */
export type PlayerActionInput =
  | { type: 'MEMORIZE'; slots: number[] }
  | { type: 'DRAW' }
  | { type: 'TAKE_DISCARD' }
  | { type: 'REPLACE'; slot: number }
  | { type: 'DISCARD_DRAWN' }
  | { type: 'USE_ABILITY'; ownSlot?: number; targetPlayerId?: string; targetSlot?: number }
  | { type: 'MATCH_CLAIM'; slots: number[] }
  | { type: 'CALL' };

export type ClientMsg =
  | { t: 'setName'; name: string }
  | { t: 'configure'; variant?: VariantKey; maxPlayers?: number; turnTimerSec?: number; rules?: Partial<RuleConfig> }
  | { t: 'start' }
  | { t: 'action'; action: PlayerActionInput }
  | { t: 'playAgain' };

export type ServerMsg =
  /**
   * Sent once to a socket right after it is accepted. `token` is this seat's
   * private credential: playerIds are broadcast to the whole room, so rejoining
   * an existing seat requires presenting the matching token (?token= on the
   * upgrade URL). Never shown to other players.
   */
  | { t: 'welcome'; token: string }
  | { t: 'room'; room: RoomView; you: string }
  | { t: 'state'; view: ClientView; deadline: number | null }
  /** Public events plus only the recipient's own private events. */
  | { t: 'events'; events: EngineEvent[] }
  | { t: 'error'; message: string };

/** Room codes: 5 chars, no ambiguous glyphs (0/O, 1/I/L). */
export const ROOM_CODE_ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
export const ROOM_CODE_LENGTH = 5;

export function isValidRoomCode(code: string): boolean {
  return code.length === ROOM_CODE_LENGTH && [...code].every((c) => ROOM_CODE_ALPHABET.includes(c));
}

/**
 * WebSocket close codes — the shared contract between room server and client.
 * 4000: this seat opened a newer connection (another tab) — old socket dropped.
 * 4003: join rejected (seat taken without token / room full / match running).
 * 4004: room or player identity not found.
 */
export const WS_CLOSE_REPLACED = 4000;
export const WS_CLOSE_REJECTED = 4003;
export const WS_CLOSE_NOT_FOUND = 4004;
