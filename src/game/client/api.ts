/**
 * Network configuration + seat-token storage for the Foursight client.
 *
 * Local play: `npx wrangler dev` inside game/worker serves localhost:8787.
 * Production default is the deployed Worker (verified live 2026-08-05);
 * VITE_FOURSIGHT_API overrides it at build time if the backend ever moves.
 */

export const HTTP_BASE: string | null =
  (import.meta.env.VITE_FOURSIGHT_API as string | undefined) ??
  (import.meta.env.DEV ? 'http://localhost:8787' : 'https://foursight-api.swapniltripathi2905.workers.dev');

export const WS_BASE = HTTP_BASE?.replace(/^http/, 'ws') ?? null;

export const NO_SERVER_MSG = 'The game server is not live yet — check back soon.';

const TOKENS_KEY = 'foursight.tokens.v1';

/**
 * Seat tokens per room code — the private credential for reclaiming a seat.
 * playerIds are broadcast to the whole room, so the token (minted by the
 * server, sent only to this player's socket) is what actually proves identity.
 */
export function getRoomToken(code: string): string {
  try {
    const map = JSON.parse(localStorage.getItem(TOKENS_KEY) ?? '{}') as Record<string, string>;
    return map[code] ?? '';
  } catch {
    return '';
  }
}

export function saveRoomToken(code: string, token: string): void {
  try {
    const map = JSON.parse(localStorage.getItem(TOKENS_KEY) ?? '{}') as Record<string, string>;
    map[code] = token;
    localStorage.setItem(TOKENS_KEY, JSON.stringify(map));
  } catch {
    /* private mode — reconnects within this tab still work via memory */
  }
}
