import { ROOM_CODE_ALPHABET, ROOM_CODE_LENGTH, isValidRoomCode } from '../../../src/game/protocol';
export { GameRoom } from './room';

export interface Env {
  GAME_ROOM: DurableObjectNamespace;
}

const ALLOWED_ORIGINS = new Set([
  'https://swapniltripathi.com',
  'https://www.swapniltripathi.com',
  'http://localhost:5173',
  'http://localhost:4173',
]);

function corsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') ?? '';
  return {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.has(origin) ? origin : 'https://swapniltripathi.com',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

function json(request: Request, status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...corsHeaders(request) },
  });
}

function randomCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(ROOM_CODE_LENGTH));
  return [...bytes].map((b) => ROOM_CODE_ALPHABET[b % ROOM_CODE_ALPHABET.length]).join('');
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (request.method === 'OPTIONS') return new Response(null, { headers: corsHeaders(request) });

    // CORS does not apply to WebSockets — enforce Origin ourselves. Requests
    // without an Origin header (curl, native clients, same-agent tests) pass;
    // browser requests from foreign origins do not.
    const origin = request.headers.get('Origin');
    if (origin && !ALLOWED_ORIGINS.has(origin)) {
      return json(request, 403, { error: 'Origin not allowed' });
    }

    // POST /rooms — create a room, return its join code.
    if (request.method === 'POST' && url.pathname === '/rooms') {
      for (let attempt = 0; attempt < 5; attempt++) {
        const code = randomCode();
        const stub = env.GAME_ROOM.get(env.GAME_ROOM.idFromName(code));
        const res = await stub.fetch('https://do/claim', { method: 'POST', body: code });
        if (res.status === 200) return json(request, 200, { code });
      }
      return json(request, 500, { error: 'Could not allocate a room code' });
    }

    // GET /rooms/:code/ws?playerId=&name= — WebSocket upgrade, forwarded to the room DO.
    const wsMatch = url.pathname.match(/^\/rooms\/([A-Z0-9]+)\/ws$/i);
    if (wsMatch) {
      const code = wsMatch[1].toUpperCase();
      if (!isValidRoomCode(code)) return json(request, 400, { error: 'Invalid room code' });
      if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
        return json(request, 426, { error: 'WebSocket upgrade required' });
      }
      const stub = env.GAME_ROOM.get(env.GAME_ROOM.idFromName(code));
      return stub.fetch(request);
    }

    if (url.pathname === '/health') return json(request, 200, { ok: true });
    return json(request, 404, { error: 'Not found' });
  },
};
