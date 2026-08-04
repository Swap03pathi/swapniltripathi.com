import type { Card, RuleConfig } from './types';

/** Deterministic PRNG (mulberry32). Returns [0,1) and the advanced state. */
export function nextRandom(state: number): { value: number; state: number } {
  const s = (state + 0x6d2b79f5) | 0;
  let t = Math.imul(s ^ (s >>> 15), 1 | s);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return { value: ((t ^ (t >>> 14)) >>> 0) / 4294967296, state: s };
}

/** values 0..maxValue, `copies` of each — 52 cards with defaults. */
export function buildDeck(rules: RuleConfig): Card[] {
  const cards: Card[] = [];
  let n = 0;
  for (let value = 0; value <= rules.maxValue; value++) {
    for (let copy = 0; copy < rules.copies; copy++) {
      cards.push({ id: `c${n++}`, value });
    }
  }
  return cards;
}

/** Fisher–Yates with the engine's PRNG; returns shuffled copy + new rng state. */
export function shuffle(cards: readonly Card[], rngState: number): { cards: Card[]; rngState: number } {
  const out = [...cards];
  let state = rngState;
  for (let i = out.length - 1; i > 0; i--) {
    const r = nextRandom(state);
    state = r.state;
    const j = Math.floor(r.value * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return { cards: out, rngState: state };
}
