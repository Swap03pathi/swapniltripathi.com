/**
 * Guest identity — lives entirely in this browser's localStorage.
 * Clearing site data = a brand-new player. Renaming keeps id and history.
 */

const ID_KEY = 'foursight.identity.v1';
const HISTORY_KEY = 'foursight.history.v1';
const HISTORY_CAP = 50;

export interface Identity {
  playerId: string;
  name: string;
}

export interface MatchRecord {
  date: string; // ISO
  code: string;
  players: { name: string; score: number }[];
  myScore: number;
  placement: number; // 1 = won
  won: boolean;
}

export function getIdentity(): Identity {
  try {
    const raw = localStorage.getItem(ID_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Identity;
      if (parsed.playerId) return parsed;
    }
  } catch {
    /* corrupted storage — fall through to a fresh identity */
  }
  const fresh: Identity = { playerId: crypto.randomUUID(), name: '' };
  try {
    localStorage.setItem(ID_KEY, JSON.stringify(fresh));
  } catch {
    /* private mode without storage — identity lasts one session */
  }
  return fresh;
}

export function saveName(name: string): Identity {
  const id = getIdentity();
  const next = { ...id, name: name.trim().slice(0, 24) };
  try {
    localStorage.setItem(ID_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  return next;
}

export function getHistory(): MatchRecord[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (raw) return JSON.parse(raw) as MatchRecord[];
  } catch {
    /* ignore */
  }
  return [];
}

export function addHistory(record: MatchRecord): void {
  const next = [record, ...getHistory()].slice(0, HISTORY_CAP);
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
}
