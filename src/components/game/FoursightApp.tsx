import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Crown, History, Link2, LogOut, Play, Wifi, WifiOff } from 'lucide-react';
import { getHistory } from '../../game/client/identity';
import { Eyebrow } from './bits';
import { useFoursight } from '../../game/client/useFoursight';
import { VARIANT_KEYS, VARIANTS } from '../../game/engine/types';
import { ROOM_CODE_LENGTH, isValidRoomCode } from '../../game/protocol';
import FoursightTable from './FoursightTable';

export default function FoursightApp() {
  const game = useFoursight();
  const { st } = game;
  const [inviteCode, setInviteCode] = useState('');
  const joinedFromUrl = useRef(false);

  // Invite links: /game/foursight?join=CODE — auto-join when a name is saved,
  // otherwise prefill the code and let the player pick a name first.
  useEffect(() => {
    if (joinedFromUrl.current) return;
    joinedFromUrl.current = true;
    const code = new URLSearchParams(window.location.search).get('join')?.toUpperCase() ?? '';
    if (!isValidRoomCode(code)) return;
    window.history.replaceState(null, '', window.location.pathname);
    if (game.st.name) game.connect(code);
    else setInviteCode(code);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 sm:p-6" data-screen={st.screen}>
      {st.error && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-2.5 text-sm text-red-200/90">
          <span>{st.error}</span>
          {st.connectionLost && st.code && (
            <button
              type="button"
              onClick={() => game.connect(st.code as string)}
              className="rounded-md border border-red-300/30 px-3 py-1 text-xs font-semibold text-red-100 transition-colors hover:bg-red-400/20"
            >
              Rejoin {st.code}
            </button>
          )}
        </div>
      )}
      {st.screen === 'entry' && <Entry game={game} initialCode={inviteCode} />}
      {st.screen === 'connecting' && (
        <p className="py-16 text-center text-sm text-white/55">Joining table {st.code}…</p>
      )}
      {st.screen === 'lobby' && <Lobby game={game} />}
      {st.screen === 'table' && <FoursightTable game={game} />}
    </div>
  );
}

type Game = ReturnType<typeof useFoursight>;

// ---------------------------------------------------------------------------
// Entry — name, create / join, history
// ---------------------------------------------------------------------------

function Entry({ game, initialCode = '' }: { game: Game; initialCode?: string }) {
  const [name, setName] = useState(game.st.name);
  const [code, setCode] = useState(initialCode);
  useEffect(() => {
    if (initialCode) setCode(initialCode);
  }, [initialCode]);
  const history = getHistory();

  const saveNameIfSet = () => {
    if (name.trim()) game.rename(name);
  };

  return (
    <div className="grid gap-8 md:grid-cols-2">
      <div>
        <label htmlFor="foursight-name" className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.2em] text-accent/75">
          Display name
        </label>
        <input
          id="foursight-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={24}
          placeholder="How should players see you?"
          className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white outline-none placeholder:text-white/30 focus:border-accent/40"
        />
        <p className="mt-1.5 text-xs text-white/45">
          Stored only in this browser — no account, no signup.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              saveNameIfSet();
              void game.createRoom();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-accent/25 bg-accent/15 px-5 py-2.5 text-sm font-semibold text-accent transition-colors hover:bg-accent/25"
          >
            <Play className="h-4 w-4" strokeWidth={2} /> Create a table
          </button>
          <div className="flex flex-1 gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, ROOM_CODE_LENGTH))}
              placeholder="TABLE CODE"
              aria-label="Table code"
              className="w-full flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-center font-mono text-sm tracking-[0.3em] text-white outline-none placeholder:tracking-normal placeholder:text-white/30 focus:border-accent/40"
            />
            <button
              type="button"
              disabled={!isValidRoomCode(code)}
              onClick={() => {
                saveNameIfSet();
                game.connect(code);
              }}
              className="rounded-lg border border-white/10 px-5 py-2.5 text-sm font-medium text-white/70 transition-colors enabled:hover:border-white/25 enabled:hover:text-white disabled:opacity-40"
            >
              Join
            </button>
          </div>
        </div>
      </div>

      <div>
        <Eyebrow className="mb-2 flex items-center gap-2">
          <History className="h-3.5 w-3.5" /> Your recent matches
          </Eyebrow>
        {history.length === 0 ? (
          <p className="text-sm text-white/45">
            None yet. Match results are saved in this browser — clear site data and the slate wipes clean.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {history.slice(0, 6).map((h) => (
              <li
                key={h.date}
                className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2 text-xs"
              >
                <span className={h.won ? 'font-semibold text-accent' : 'text-white/60'}>
                  {h.won ? 'Won' : `#${h.placement}`}
                </span>
                <span className="text-white/50">{h.players.length} players</span>
                <span className="text-white/50">{h.myScore} pts</span>
                <span className="text-white/35">{new Date(h.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Lobby — members, settings, start
// ---------------------------------------------------------------------------

function Lobby({ game }: { game: Game }) {
  const { st } = game;
  const room = st.room;
  // Both hooks must run before any early return (rules of hooks).
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  if (!room) return null;
  const me = room.members.find((m) => m.playerId === st.you);
  const isHost = Boolean(me?.isHost);
  const connectedCount = room.members.filter((m) => m.connected).length;

  const copy = () => {
    void navigator.clipboard?.writeText(room.code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const copyInvite = () => {
    const url = `${window.location.origin}/game/foursight?join=${room.code}`;
    void navigator.clipboard?.writeText(url).then(() => {
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 1500);
    });
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Eyebrow>Table code</Eyebrow>
          <button
            type="button"
            onClick={copy}
            title="Copy table code"
            className="mt-1 inline-flex items-center gap-2.5 font-mono text-3xl font-bold tracking-[0.25em] text-white transition-colors hover:text-accent"
          >
            {room.code}
            {copied ? <Check className="h-5 w-5 text-accent" /> : <Copy className="h-5 w-5 opacity-50" />}
          </button>
          <p className="mt-1 text-xs text-white/45">Share this code — friends join at swapniltripathi.com/game/foursight</p>
          <button
            type="button"
            onClick={copyInvite}
            className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 text-xs font-medium text-white/60 transition-colors hover:border-accent/30 hover:text-accent"
          >
            {linkCopied ? <Check className="h-3.5 w-3.5 text-accent" /> : <Link2 className="h-3.5 w-3.5" />}
            {linkCopied ? 'Invite link copied' : 'Copy invite link'}
          </button>
        </div>
        <button
          type="button"
          onClick={game.leave}
          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 px-3.5 py-2 text-xs font-medium text-white/60 transition-colors hover:border-white/25 hover:text-white"
        >
          <LogOut className="h-3.5 w-3.5" /> Leave
        </button>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div>
          <Eyebrow className="mb-2">
            Players ({connectedCount}/{room.settings.maxPlayers})
          </Eyebrow>
          <ul className="space-y-1.5">
            {room.members.map((m) => (
              <li
                key={m.playerId}
                className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5 text-sm"
              >
                {m.connected ? (
                  <Wifi className="h-3.5 w-3.5 text-accent/70" />
                ) : (
                  <WifiOff className="h-3.5 w-3.5 text-white/30" />
                )}
                <span className={m.playerId === st.you ? 'font-semibold text-white' : 'text-white/70'}>
                  {m.name}
                  {m.playerId === st.you && ' (you)'}
                </span>
                {m.isHost && <Crown className="h-3.5 w-3.5 text-amber-300/80" />}
              </li>
            ))}
          </ul>
          {isHost && (
            <button
              type="button"
              disabled={connectedCount < 2}
              onClick={() => game.send({ t: 'start' })}
              className="mt-4 w-full rounded-lg border border-accent/25 bg-accent/15 px-5 py-3 text-sm font-semibold text-accent transition-colors enabled:hover:bg-accent/25 disabled:opacity-40"
            >
              {connectedCount < 2 ? 'Waiting for a second player…' : 'Start the match'}
            </button>
          )}
          {!isHost && <p className="mt-4 text-center text-xs text-white/45">Waiting for the host to start…</p>}
        </div>

        <div>
          <Eyebrow className="mb-2">Game mode</Eyebrow>
          <div className="space-y-1.5">
            {VARIANT_KEYS.map((key) => {
              const v = VARIANTS[key];
              const active = room.settings.variant === key;
              return (
                <button
                  key={key}
                  type="button"
                  disabled={!isHost}
                  onClick={() => game.send({ t: 'configure', variant: key })}
                  className={`w-full rounded-lg border px-3 py-2.5 text-left transition-colors ${
                    active
                      ? 'border-accent/35 bg-accent/10'
                      : 'border-white/[0.06] bg-white/[0.02] enabled:hover:border-white/15'
                  } disabled:cursor-default`}
                >
                  <span className={`text-sm font-medium ${active ? 'text-accent' : 'text-white/75'}`}>{v.label}</span>
                  <span className="mt-0.5 block text-xs text-white/50">{v.description}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex items-center gap-3">
            <label className="text-xs text-white/55">Turn timer</label>
            {[15, 30, 60, 0].map((sec) => (
              <button
                key={sec}
                type="button"
                disabled={!isHost}
                onClick={() => game.send({ t: 'configure', turnTimerSec: sec })}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  room.settings.turnTimerSec === sec
                    ? 'bg-accent/15 text-accent'
                    : 'text-white/55 enabled:hover:text-white'
                }`}
              >
                {sec === 0 ? '∞' : `${sec}s`}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
