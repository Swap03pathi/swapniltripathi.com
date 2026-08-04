import { useCallback, useEffect, useRef, useState } from 'react';
import type { EngineEvent } from '../engine/types';
import type { ClientView } from '../engine/view';
import {
  WS_CLOSE_NOT_FOUND,
  WS_CLOSE_REJECTED,
  WS_CLOSE_REPLACED,
  type ClientMsg,
  type PlayerActionInput,
  type RoomView,
  type ServerMsg,
} from '../protocol';
import { HTTP_BASE, NO_SERVER_MSG, WS_BASE, getRoomToken, saveRoomToken } from './api';
import { EMPTY_DIGEST, expireReveals, reduceEvents, type EventDigest } from './events';
import { addHistory, getIdentity, saveName } from './identity';

export type Screen = 'entry' | 'connecting' | 'lobby' | 'table';

export interface FoursightState extends EventDigest {
  screen: Screen;
  you: string;
  name: string;
  code: string | null;
  room: RoomView | null;
  view: ClientView | null;
  deadline: number | null;
  error: string | null;
  connectionLost: boolean;
}

const INITIAL: Omit<FoursightState, 'you' | 'name'> = {
  screen: 'entry',
  code: null,
  room: null,
  view: null,
  deadline: null,
  error: null,
  connectionLost: false,
  ...EMPTY_DIGEST,
};

export function useFoursight() {
  const identity = useRef(getIdentity());
  const [st, setSt] = useState<FoursightState>({
    ...INITIAL,
    you: identity.current.playerId,
    name: identity.current.name,
  });
  const wsRef = useRef<WebSocket | null>(null);
  const closingRef = useRef(false);
  const recordedMatchRef = useRef('');

  // Current state for callbacks that must not re-subscribe on every render.
  const stRef = useRef(st);
  stRef.current = st;

  const send = useCallback((msg: ClientMsg) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) wsRef.current.send(JSON.stringify(msg));
  }, []);

  const nameOf = useCallback((playerId: string): string => {
    const m = stRef.current.room?.members.find((x) => x.playerId === playerId);
    if (!m) return 'Someone';
    return m.playerId === stRef.current.you ? 'You' : m.name;
  }, []);

  const handleEvents = useCallback(
    (events: EngineEvent[]) => {
      recordMatchHistory(events, stRef.current, recordedMatchRef);
      setSt((prev) => ({
        ...prev,
        ...reduceEvents(prev, events, { you: prev.you, nameOf, now: Date.now() }),
      }));
    },
    [nameOf],
  );

  const connect = useCallback(
    (code: string) => {
      if (!WS_BASE) return setSt((p) => ({ ...p, error: NO_SERVER_MSG }));
      closingRef.current = false;
      const { playerId, name } = identity.current;
      setSt((p) => ({ ...p, screen: 'connecting', code, error: null, connectionLost: false }));
      const ws = new WebSocket(
        `${WS_BASE}/rooms/${code}/ws?playerId=${encodeURIComponent(playerId)}&name=${encodeURIComponent(
          name || 'Player',
        )}&token=${encodeURIComponent(getRoomToken(code))}`,
      );
      wsRef.current = ws;

      ws.onmessage = (evt) => {
        let msg: ServerMsg;
        try {
          msg = JSON.parse(evt.data as string);
        } catch {
          return;
        }
        switch (msg.t) {
          case 'welcome':
            return saveRoomToken(code, msg.token);
          case 'room':
            return setSt((p) => {
              const backToLobby = msg.room.status === 'waiting';
              return {
                ...p,
                room: msg.room,
                screen:
                  msg.room.status === 'playing' && p.view ? 'table' : msg.room.status === 'playing' ? p.screen : 'lobby',
                // A fresh lobby (e.g. after playAgain) must not drag the previous
                // match's table, overlays, or log into the next game.
                ...(backToLobby ? { view: null, deadline: null, ...EMPTY_DIGEST } : {}),
                error: null,
              };
            });
          case 'state':
            return setSt((p) => ({
              ...p,
              view: msg.view,
              deadline: msg.deadline,
              screen: 'table',
              matchEnd: msg.view.phase === 'matchEnd' ? p.matchEnd : null,
            }));
          case 'events':
            return handleEvents(msg.events);
          case 'error':
            return setSt((p) => ({ ...p, error: msg.message }));
        }
      };

      ws.onclose = (evt) => {
        if (closingRef.current) return;
        if (evt.code === WS_CLOSE_REPLACED) {
          // Replaced by a newer connection (another tab took the seat).
          setSt((p) => ({ ...p, connectionLost: true, error: 'This game was opened in another tab — this one is disconnected.' }));
          return;
        }
        if (evt.code === WS_CLOSE_REJECTED || evt.code === WS_CLOSE_NOT_FOUND) {
          // Server rejected the join with a human-readable reason.
          setSt((p) => ({ ...p, screen: 'entry', code: null, error: evt.reason || 'Could not join that table.' }));
          return;
        }
        setSt((p) =>
          p.screen === 'entry'
            ? p
            : { ...p, connectionLost: true, error: p.error ?? 'Connection lost — rejoin with the same code to resume.' },
        );
      };

      ws.onerror = () => {
        setSt((p) => ({
          ...p,
          screen: p.screen === 'connecting' ? 'entry' : p.screen,
          error: 'Could not reach the game server.',
        }));
      };
    },
    [handleEvents],
  );

  const createRoom = useCallback(async () => {
    if (!HTTP_BASE) return setSt((p) => ({ ...p, error: NO_SERVER_MSG }));
    setSt((p) => ({ ...p, error: null }));
    try {
      const res = await fetch(`${HTTP_BASE}/rooms`, { method: 'POST' });
      const body = (await res.json()) as { code?: string; error?: string };
      if (!res.ok || !body.code) throw new Error(body.error ?? 'Could not create a table');
      connect(body.code);
    } catch (e) {
      setSt((p) => ({ ...p, error: e instanceof Error ? e.message : 'Could not create a table' }));
    }
  }, [connect]);

  const leave = useCallback(() => {
    closingRef.current = true;
    wsRef.current?.close();
    wsRef.current = null;
    setSt((p) => ({ ...p, ...INITIAL }));
  }, []);

  const rename = useCallback(
    (name: string) => {
      identity.current = saveName(name);
      setSt((p) => ({ ...p, name: identity.current.name }));
      send({ t: 'setName', name });
    },
    [send],
  );

  const act = useCallback((action: PlayerActionInput) => send({ t: 'action', action }), [send]);

  // Expire timed reveals.
  useEffect(() => {
    if (st.reveals.length === 0) return;
    const t = setInterval(() => {
      setSt((p) => {
        const next = expireReveals(p, Date.now());
        return next === p ? p : { ...p, ...next };
      });
    }, 500);
    return () => clearInterval(t);
  }, [st.reveals.length]);

  useEffect(() => () => wsRef.current?.close(), []);

  return { st, createRoom, connect, leave, rename, act, send };
}

/**
 * Persist a finished match to local history. Runs OUTSIDE the state updater
 * (updaters must stay pure — React may re-invoke them) and is deduped in case
 * the event stream is ever replayed.
 */
function recordMatchHistory(
  events: EngineEvent[],
  st: FoursightState,
  recordedRef: { current: string },
): void {
  const ended = events.find((e): e is Extract<EngineEvent, { type: 'MATCH_ENDED' }> => e.type === 'MATCH_ENDED');
  if (!ended || !st.room) return;
  const key = `${st.code}:${JSON.stringify(ended.standings)}`;
  if (recordedRef.current === key) return;
  recordedRef.current = key;
  const mine = ended.standings.findIndex((x) => x.playerId === st.you);
  addHistory({
    date: new Date().toISOString(),
    code: st.room.code,
    players: ended.standings.map((x) => ({
      name: st.room?.members.find((m) => m.playerId === x.playerId)?.name ?? 'Player',
      score: x.score,
    })),
    myScore: ended.standings[mine]?.score ?? 0,
    placement: mine + 1,
    won: ended.winnerIds.includes(st.you),
  });
}
