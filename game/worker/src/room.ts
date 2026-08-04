import {
  applyAction,
  createMatch,
  redactFor,
  roundStartedEvent,
  type Action,
  type EngineEvent,
  type GameState,
  VARIANT_KEYS,
} from '../../../src/game/engine';
import {
  WS_CLOSE_NOT_FOUND,
  WS_CLOSE_REJECTED,
  WS_CLOSE_REPLACED,
  type ClientMsg,
  type RoomMember,
  type RoomSettings,
  type RoomView,
  type AfkVoteView,
  type ServerMsg,
} from '../../../src/game/protocol';
import { clamp, defaultSettings, resolveRules, sanitizeName, toEngineAction } from './validate';

const MEMORIZE_MS = 15_000; // fixed window to view starting cards
const ROUND_END_MS = 8_000; // reveal display time before the next round deals
const DISCONNECT_GRACE_MS = 60_000; // stall guard when it's a vanished player's turn on ∞ timer
const IDLE_EXPIRY_MS = 2 * 60 * 60 * 1000; // empty rooms self-destruct after 2h
const IDLE_CHECK_MS = 30 * 60 * 1000;
const ABANDON_MS = 5 * 60 * 1000; // playing room with nobody connected → abandon the match
const AFK_THRESHOLD_MS = 90_000; // inactivity on your turn before the table may vote you out
const VOTE_WINDOW_MS = 30_000; // how long the drop-or-wait vote stays open
const WAIT_GRACE_MS = 90_000; // extra time a granted "wait" buys the AFK player

interface Member {
  playerId: string;
  name: string;
  joinedAt: number;
  isHost: boolean;
  /**
   * Private seat credential. playerIds are broadcast to the whole room (the UI
   * needs them), so they must never double as proof of identity — rejoining an
   * occupied seat requires this token, minted on first join and sent only to
   * that player's socket ({t:'welcome'}). Never included in roomView().
   */
  token: string;
}

interface AfkVote {
  targetId: string;
  endsAt: number;
  votes: Record<string, 'drop' | 'wait'>;
}

interface RoomData {
  code: string | null;
  status: 'waiting' | 'playing';
  settings: RoomSettings;
  members: Member[];
  lastActivity: number;
  /**
   * Per-player proof of life: set by real actions and by "I'm here" clicks, but
   * NOT by a bare reconnect — an auto-reconnecting zombie tab must not look active.
   */
  lastActiveAt: Record<string, number>;
  /** After the table votes to wait, no new vote on that player until this passes. */
  waitGraceUntil: Record<string, number>;
  /** When the current turn's clock runs out (null = untimed room). */
  turnEndsAt: number | null;
  afk: AfkVote | null;
}

interface DeadlineData {
  at: number;
  /** afkOpen = time to offer the vote; afkVote = time the open vote resolves. */
  kind: 'timeout' | 'nextRound' | 'afkOpen' | 'afkVote';
}

export class GameRoom {
  private ctx: DurableObjectState;
  private room: RoomData = {
    code: null,
    status: 'waiting',
    settings: defaultSettings(),
    members: [],
    lastActivity: Date.now(),
    lastActiveAt: {},
    waitGraceUntil: {},
    turnEndsAt: null,
    afk: null,
  };
  private game: GameState | null = null;
  private deadline: DeadlineData | null = null;

  constructor(ctx: DurableObjectState) {
    this.ctx = ctx;
    ctx.blockConcurrencyWhile(async () => {
      this.room = (await ctx.storage.get<RoomData>('room')) ?? this.room;
      this.game = (await ctx.storage.get<GameState>('game')) ?? null;
      this.deadline = (await ctx.storage.get<DeadlineData>('deadline')) ?? null;
    });
  }

  private async persist(): Promise<void> {
    await this.ctx.storage.put({ room: this.room, game: this.game, deadline: this.deadline });
  }

  // -------------------------------------------------------------------------
  // HTTP entry points (from the router)
  // -------------------------------------------------------------------------

  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === 'POST' && url.pathname === '/claim') {
      if (this.room.code !== null) return new Response('taken', { status: 409 });
      this.room.code = await request.text();
      this.room.lastActivity = Date.now();
      await this.persist();
      await this.ctx.storage.setAlarm(Date.now() + IDLE_CHECK_MS);
      return new Response('ok');
    }

    // WebSocket join: /rooms/:code/ws?playerId=&name=&token=
    if (request.headers.get('Upgrade')?.toLowerCase() === 'websocket') {
      return this.handleJoin(url);
    }
    return new Response('Not found', { status: 404 });
  }

  /** Accept-then-close so browsers can read a reason (plain 403s surface as opaque errors). */
  private rejectSocket(code: number, reason: string): Response {
    const pair = new WebSocketPair();
    pair[1].accept();
    pair[1].close(code, reason);
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  private async handleJoin(url: URL): Promise<Response> {
    const playerId = (url.searchParams.get('playerId') ?? '').slice(0, 64);
    const token = (url.searchParams.get('token') ?? '').slice(0, 64);
    const name = sanitizeName(url.searchParams.get('name'));
    if (this.room.code === null) return this.rejectSocket(WS_CLOSE_NOT_FOUND, 'Table not found');
    if (!playerId) return this.rejectSocket(WS_CLOSE_NOT_FOUND, 'playerId required');

    const existing = this.room.members.find((m) => m.playerId === playerId);
    let member: Member;
    if (!existing) {
      if (this.room.status === 'playing') return this.rejectSocket(WS_CLOSE_REJECTED, 'Match in progress');
      if (this.room.members.length >= this.room.settings.maxPlayers) {
        return this.rejectSocket(WS_CLOSE_REJECTED, 'Table is full');
      }
      member = {
        playerId,
        name,
        joinedAt: Date.now(),
        isHost: this.room.members.length === 0,
        token: crypto.randomUUID(),
      };
      this.room.members.push(member);
    } else {
      // playerIds are public — the seat token is the actual credential.
      if (existing.token !== token) return this.rejectSocket(WS_CLOSE_REJECTED, 'That seat is taken');
      member = existing;
      if (name && name !== 'Player') existing.name = name;
    }

    // One live socket per player: drop any previous connection.
    for (const ws of this.ctx.getWebSockets(playerId)) ws.close(WS_CLOSE_REPLACED, 'Replaced by a new connection');

    const pair = new WebSocketPair();
    this.ctx.acceptWebSocket(pair[1], [playerId]);
    pair[1].serializeAttachment({ playerId });
    this.room.lastActivity = Date.now();
    this.ensureLiveHost();
    await this.persist();
    this.sendTo(pair[1], { t: 'welcome', token: member.token });
    this.broadcastRoom();
    if (this.game) this.sendGameTo(playerId);
    if (this.room.afk) this.sendTo(pair[1], { t: 'afk', vote: this.afkView() });
    if (this.room.afk) this.evaluateAfkVote();
    return new Response(null, { status: 101, webSocket: pair[0] });
  }

  /** The crown must sit on a connected head, or restart/start become impossible. */
  private ensureLiveHost(): void {
    const live = (m: Member) => this.ctx.getWebSockets(m.playerId).length > 0;
    if (this.room.members.some((m) => m.isHost && live(m))) return;
    const heir = this.room.members.find(live);
    if (!heir) return;
    for (const m of this.room.members) m.isHost = false;
    heir.isHost = true;
  }

  // -------------------------------------------------------------------------
  // WebSocket lifecycle (hibernation API)
  // -------------------------------------------------------------------------

  async webSocketMessage(ws: WebSocket, raw: string | ArrayBuffer): Promise<void> {
    const playerId = (ws.deserializeAttachment() as { playerId: string } | null)?.playerId;
    if (!playerId) return;
    let msg: ClientMsg;
    try {
      msg = JSON.parse(typeof raw === 'string' ? raw : new TextDecoder().decode(raw));
    } catch {
      return this.sendTo(ws, { t: 'error', message: 'Malformed message' });
    }
    this.room.lastActivity = Date.now();
    const member = this.room.members.find((m) => m.playerId === playerId);
    if (!member) return this.sendTo(ws, { t: 'error', message: 'Not in this room' });

    switch (msg.t) {
      case 'setName': {
        member.name = sanitizeName(msg.name);
        await this.persist();
        return this.broadcastRoom();
      }

      case 'configure': {
        if (!member.isHost) return this.sendTo(ws, { t: 'error', message: 'Only the host can change settings' });
        if (this.room.status !== 'waiting') return this.sendTo(ws, { t: 'error', message: 'Match already running' });
        const s = this.room.settings;
        // Explicit list — `in` would also accept prototype keys like 'toString'.
        const variant = msg.variant && VARIANT_KEYS.includes(msg.variant) ? msg.variant : s.variant;
        s.variant = variant;
        s.maxPlayers = clamp(msg.maxPlayers ?? s.maxPlayers, 2, 5);
        s.turnTimerSec = [0, 15, 30, 60].includes(msg.turnTimerSec ?? -1) ? (msg.turnTimerSec as number) : s.turnTimerSec;
        s.rules = resolveRules(variant, msg.rules);
        await this.persist();
        return this.broadcastRoom();
      }

      case 'start': {
        if (!member.isHost) return this.sendTo(ws, { t: 'error', message: 'Only the host can start' });
        if (this.room.status !== 'waiting') return this.sendTo(ws, { t: 'error', message: 'Already started' });
        const connected = this.room.members.filter((m) => this.ctx.getWebSockets(m.playerId).length > 0);
        if (connected.length < 2) return this.sendTo(ws, { t: 'error', message: 'Need at least 2 connected players' });
        // Players = connected members in join order; latecomers spectate the next match.
        this.room.members = connected;
        const seed = crypto.getRandomValues(new Uint32Array(1))[0];
        this.game = createMatch(connected.map((m) => m.playerId), seed, this.room.settings.rules);
        this.room.status = 'playing';
        const startedAt = Date.now();
        this.room.lastActiveAt = Object.fromEntries(connected.map((m) => [m.playerId, startedAt]));
        this.room.waitGraceUntil = {};
        this.room.turnEndsAt = null;
        this.room.afk = null;
        this.setDeadline({ at: startedAt + MEMORIZE_MS, kind: 'timeout' });
        await this.persist();
        this.broadcastRoom();
        return this.broadcastGame([roundStartedEvent(this.game)]);
      }

      case 'action': {
        if (this.room.status !== 'playing' || !this.game) {
          return this.sendTo(ws, { t: 'error', message: 'No match running' });
        }
        const action = toEngineAction(msg.action, playerId);
        if (!action) return this.sendTo(ws, { t: 'error', message: 'Unknown action' });
        const before = this.game.currentSeat;
        const res = applyAction(this.game, action);
        if (!res.ok) return this.sendTo(ws, { t: 'error', message: res.error });
        this.markActive(playerId);
        this.cancelAfkVoteIfTarget(playerId);
        this.game = res.state;
        const turnChanged = res.state.currentSeat !== before || res.state.phase !== 'turn';
        this.updateDeadlineFor(res.state, { newTurn: turnChanged });
        await this.persist();
        this.broadcastGame(res.events);
        // A drop may have been pending on someone who just became irrelevant.
        if (this.room.afk) this.evaluateAfkVote();
        return;
      }

      case 'afkVote': {
        const vote = this.room.afk;
        if (!vote) return this.sendTo(ws, { t: 'error', message: 'No vote is running' });
        if (!this.eligibleVoters(vote).includes(playerId)) {
          return this.sendTo(ws, { t: 'error', message: 'You cannot vote on this' });
        }
        if (msg.vote !== 'drop' && msg.vote !== 'wait') return;
        vote.votes[playerId] = msg.vote;
        this.markActive(playerId); // voting proves the voter is present too
        this.evaluateAfkVote();
        await this.persist();
        return;
      }

      case 'imHere': {
        this.markActive(playerId);
        this.cancelAfkVoteIfTarget(playerId);
        await this.persist();
        return;
      }

      case 'playAgain': {
        if (!member.isHost) return this.sendTo(ws, { t: 'error', message: 'Only the host can restart' });
        if (this.game && this.game.phase !== 'matchEnd') {
          return this.sendTo(ws, { t: 'error', message: 'Match still running' });
        }
        this.room.status = 'waiting';
        this.game = null;
        this.room.afk = null;
        this.room.turnEndsAt = null;
        this.setDeadline(null);
        await this.persist();
        return this.broadcastRoom();
      }
    }
  }

  async webSocketClose(ws: WebSocket): Promise<void> {
    const playerId = (ws.deserializeAttachment() as { playerId: string } | null)?.playerId;
    this.room.lastActivity = Date.now();
    if (playerId && this.room.status === 'waiting') {
      // In the lobby, a departed player frees their seat.
      if (this.ctx.getWebSockets(playerId).length === 0) {
        this.room.members = this.room.members.filter((m) => m.playerId !== playerId);
      }
    }
    this.ensureLiveHost();
    // The electorate just changed — a smaller pool can settle an open vote.
    if (this.room.afk && this.game) this.evaluateAfkVote();
    // Mid-match seats persist for reconnects. Connection churn must only ever
    // TIGHTEN the clock, never restart it — rearming here would let any player
    // extend the active turn timer indefinitely by reconnecting. The only case
    // to handle: ∞-timer rooms where the CURRENT actor vanished and no deadline
    // exists — arm the stall guard so the game cannot freeze forever.
    if (
      this.game &&
      (this.game.phase === 'turn' || this.game.phase === 'finalTurns') &&
      this.deadline === null
    ) {
      const actor = this.game.players[this.game.currentSeat];
      if (actor.id === playerId && this.ctx.getWebSockets(actor.id).length === 0) {
        this.setDeadline({ at: Date.now() + DISCONNECT_GRACE_MS, kind: 'timeout' });
      }
    }
    await this.persist();
    this.broadcastRoom();
  }

  // -------------------------------------------------------------------------
  // Timers
  // -------------------------------------------------------------------------

  private setDeadline(d: DeadlineData | null): void {
    this.deadline = d;
    if (d) void this.ctx.storage.setAlarm(d.at);
    else void this.ctx.storage.setAlarm(Date.now() + IDLE_CHECK_MS);
  }

  /**
   * One alarm, several clocks: the turn timer, the moment an idle player
   * becomes vote-eligible, and an open vote's own deadline. Whichever comes
   * first wins. Connection churn must never extend a live turn clock, so
   * `turnEndsAt` is only reset when the turn itself changes.
   */
  private updateDeadlineFor(state: GameState, opts: { newTurn?: boolean } = {}): void {
    const now = Date.now();
    switch (state.phase) {
      case 'memorize':
        this.room.turnEndsAt = null;
        this.room.afk = null;
        if (this.deadline?.kind !== 'timeout' || this.deadline.at < now) {
          this.setDeadline({ at: now + MEMORIZE_MS, kind: 'timeout' });
        }
        return;
      case 'roundEnd':
        this.room.turnEndsAt = null;
        this.room.afk = null;
        this.setDeadline({ at: now + ROUND_END_MS, kind: 'nextRound' });
        return;
      case 'matchEnd':
        this.room.turnEndsAt = null;
        this.room.afk = null;
        this.setDeadline(null);
        return;
      case 'turn':
      case 'finalTurns': {
        const timer = this.room.settings.turnTimerSec;
        if (opts.newTurn || this.room.turnEndsAt === null) {
          this.room.turnEndsAt = timer > 0 ? now + timer * 1000 : null;
        }
        this.scheduleTurnPhase(state);
        return;
      }
    }
  }

  /** Pick the earliest of: open vote end, turn timer, AFK-vote eligibility. */
  private scheduleTurnPhase(state: GameState): void {
    const now = Date.now();
    if (this.room.afk) {
      this.setDeadline({ at: this.room.afk.endsAt, kind: 'afkVote' });
      return;
    }
    const actor = state.players[state.currentSeat];
    const idleSince = this.room.lastActiveAt[actor.id] ?? now;
    const afkAt = Math.max(idleSince, this.room.waitGraceUntil[actor.id] ?? 0) + AFK_THRESHOLD_MS;
    const candidates: DeadlineData[] = [{ at: afkAt, kind: 'afkOpen' }];
    if (this.room.turnEndsAt !== null) candidates.push({ at: this.room.turnEndsAt, kind: 'timeout' });
    // A vanished actor in an untimed room still needs a stall guard.
    if (this.room.turnEndsAt === null && this.ctx.getWebSockets(actor.id).length === 0) {
      candidates.push({ at: now + DISCONNECT_GRACE_MS, kind: 'timeout' });
    }
    candidates.sort((a, b) => a.at - b.at);
    this.setDeadline(candidates[0]);
  }

  /** Mark a player as demonstrably present (real action or "I'm here"). */
  private markActive(playerId: string): void {
    this.room.lastActiveAt[playerId] = Date.now();
  }

  private eligibleVoters(vote: AfkVote): string[] {
    if (!this.game) return [];
    return this.game.players
      .filter(
        (p) =>
          p.id !== vote.targetId &&
          !p.droppedForRound &&
          this.ctx.getWebSockets(p.id).length > 0,
      )
      .map((p) => p.id);
  }

  private afkView(): AfkVoteView | null {
    const v = this.room.afk;
    if (!v) return null;
    return { targetId: v.targetId, endsAt: v.endsAt, eligible: this.eligibleVoters(v), votes: v.votes };
  }

  private broadcastAfk(): void {
    const vote = this.afkView();
    for (const ws of this.ctx.getWebSockets()) this.sendTo(ws, { t: 'afk', vote });
  }

  private openAfkVote(): void {
    if (!this.game || this.room.afk) return;
    const actor = this.game.players[this.game.currentSeat];
    if (actor.droppedForRound) return;
    this.room.afk = { targetId: actor.id, endsAt: Date.now() + VOTE_WINDOW_MS, votes: {} };
    this.scheduleTurnPhase(this.game);
    this.broadcastAfk();
  }

  /**
   * Resolve if the outcome is already certain, or when the window closes.
   * Dropping is the default: waiting is what needs a majority to agree on.
   */
  private evaluateAfkVote(force = false): void {
    const vote = this.room.afk;
    if (!vote || !this.game) return;
    const eligible = this.eligibleVoters(vote);
    const cast = eligible.filter((id) => vote.votes[id] !== undefined).length;
    const waits = eligible.filter((id) => vote.votes[id] === 'wait').length;
    const needed = Math.floor(eligible.length / 2) + 1;
    const waitWins = eligible.length > 0 && waits >= needed;
    const waitImpossible = waits + (eligible.length - cast) < needed;

    if (waitWins) return this.resolveAfkWait();
    if (force || waitImpossible || eligible.length === 0) return this.resolveAfkDrop();
    this.broadcastAfk();
  }

  private resolveAfkWait(): void {
    const vote = this.room.afk;
    if (!vote || !this.game) return;
    // Buy 90 more seconds without pretending they are present: only a move or
    // an "I'm here" click updates lastActiveAt.
    this.room.waitGraceUntil[vote.targetId] = Date.now() + WAIT_GRACE_MS;
    this.room.afk = null;
    this.updateDeadlineFor(this.game, { newTurn: true });
    this.broadcastAfk();
  }

  private resolveAfkDrop(): void {
    const vote = this.room.afk;
    if (!vote || !this.game) return;
    this.room.afk = null;
    const res = applyAction(this.game, { type: 'DROP_PLAYER', playerId: vote.targetId });
    if (res.ok) {
      this.game = res.state;
      this.updateDeadlineFor(res.state, { newTurn: true });
      this.broadcastGame(res.events);
    } else {
      this.updateDeadlineFor(this.game);
    }
    this.broadcastAfk();
  }

  /** The target came back — any move or click cancels the vote outright. */
  private cancelAfkVoteIfTarget(playerId: string): void {
    if (!this.room.afk || this.room.afk.targetId !== playerId || !this.game) return;
    this.room.afk = null;
    this.room.waitGraceUntil[playerId] = 0;
    this.updateDeadlineFor(this.game, { newTurn: true });
    this.broadcastAfk();
  }

  async alarm(): Promise<void> {
    const now = Date.now();

    // At-least-once delivery: a stale wake must not clobber a future deadline.
    if (this.deadline && now < this.deadline.at - 250) {
      await this.ctx.storage.setAlarm(this.deadline.at);
      return;
    }

    // Everyone gone for a while → abandon the match instead of ticking turn
    // timers forever (TIMEOUT alone never ends a round quickly; see engine's
    // consecutiveTimeouts backstop for the in-game guarantee).
    const empty = this.ctx.getWebSockets().length === 0;
    if (empty && this.room.status === 'playing' && now - this.room.lastActivity > ABANDON_MS) {
      this.room.status = 'waiting';
      this.game = null;
      this.room.afk = null;
      this.room.turnEndsAt = null;
      this.setDeadline(null);
      await this.persist();
      return;
    }

    if (this.deadline && now >= this.deadline.at && this.game && this.room.status === 'playing') {
      const kind = this.deadline.kind;
      if (kind === 'afkOpen') {
        this.openAfkVote();
        await this.persist();
        return;
      }
      if (kind === 'afkVote') {
        this.evaluateAfkVote(true); // window closed → drop unless waiting won
        await this.persist();
        return;
      }
      const action: Action = kind === 'nextRound' ? { type: 'NEXT_ROUND' } : { type: 'TIMEOUT' };
      const res = applyAction(this.game, action);
      if (res.ok) {
        this.game = res.state;
        // A timeout ends that player's turn, so the next turn's clock starts.
        this.updateDeadlineFor(res.state, { newTurn: true });
        await this.persist();
        this.broadcastGame(res.events);
      } else {
        this.setDeadline(null);
      }
      return;
    }

    // Idle housekeeping: destroy rooms nobody has touched in a while.
    if (empty && now - this.room.lastActivity > IDLE_EXPIRY_MS) {
      await this.ctx.storage.deleteAll();
      // Reset memory too — a resident instance must not stay joinable after
      // its storage is wiped, and must not keep ticking.
      this.room = {
        code: null,
        status: 'waiting',
        settings: defaultSettings(),
        members: [],
        lastActivity: now,
        lastActiveAt: {},
        waitGraceUntil: {},
        turnEndsAt: null,
        afk: null,
      };
      this.game = null;
      this.deadline = null;
      return;
    }
    await this.ctx.storage.setAlarm(now + IDLE_CHECK_MS);
  }

  // -------------------------------------------------------------------------
  // Outbound
  // -------------------------------------------------------------------------

  private sendTo(ws: WebSocket, msg: ServerMsg): void {
    try {
      ws.send(JSON.stringify(msg));
    } catch {
      /* socket already gone */
    }
  }

  private roomView(): RoomView {
    return {
      code: this.room.code ?? '',
      status: this.room.status,
      settings: this.room.settings,
      members: this.room.members.map(
        (m): RoomMember => ({
          playerId: m.playerId,
          name: m.name,
          connected: this.ctx.getWebSockets(m.playerId).length > 0,
          isHost: m.isHost,
        }),
      ),
    };
  }

  private broadcastRoom(): void {
    const view = this.roomView();
    for (const ws of this.ctx.getWebSockets()) {
      const pid = (ws.deserializeAttachment() as { playerId: string } | null)?.playerId ?? '';
      this.sendTo(ws, { t: 'room', room: view, you: pid });
    }
  }

  /** Route events (public + recipient's own private) and per-viewer state. */
  private broadcastGame(events: EngineEvent[]): void {
    if (!this.game) return;
    const deadlineAt = this.deadline?.kind === 'timeout' || this.deadline?.kind === 'nextRound' ? this.deadline.at : null;
    for (const ws of this.ctx.getWebSockets()) {
      const pid = (ws.deserializeAttachment() as { playerId: string } | null)?.playerId ?? '';
      const visible = events.filter((e) => e.scope === 'public' || e.playerId === pid);
      if (visible.length > 0) this.sendTo(ws, { t: 'events', events: visible });
      this.sendTo(ws, { t: 'state', view: redactFor(this.game, pid), deadline: deadlineAt });
    }
  }

  private sendGameTo(playerId: string): void {
    if (!this.game) return;
    for (const ws of this.ctx.getWebSockets(playerId)) {
      this.sendTo(ws, {
        t: 'state',
        view: redactFor(this.game, playerId),
        deadline: this.deadline?.at ?? null,
      });
    }
  }
}
