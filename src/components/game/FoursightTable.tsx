import { useEffect, useMemo, useState } from 'react';
import { LogOut, Megaphone } from 'lucide-react';
import type { useFoursight } from '../../game/client/useFoursight';
import { abilityForValue, type Ability, type Card } from '../../game/engine/types';
import { ActionBtn, Eyebrow, Overlay, TimerBar } from './bits';
import { ABILITY_ICON, CARD_SIZE, CardBack, CardFace, EmptySlot } from './cards';
import RevealTable from './RevealTable';

type Game = ReturnType<typeof useFoursight>;

/** Which click-target the table is currently waiting for. */
type Mode = 'idle' | 'memorize' | 'replace' | 'peek' | 'spy' | 'swapOwn' | 'swapTheir' | 'match';

/** Engine ability → the interaction mode that collects its targets. */
const ABILITY_MODE: Record<Ability, Mode> = { peek: 'peek', spy: 'spy', swap: 'swapOwn' };

export default function FoursightTable({ game }: { game: Game }) {
  const { st } = game;
  const view = st.view;
  const [mode, setMode] = useState<Mode>('idle');
  const [picked, setPicked] = useState<number[]>([]);
  const [swapOwnSlot, setSwapOwnSlot] = useState<number | null>(null);

  // Reset interaction mode whenever the actionable situation changes.
  const situation = `${view?.phase}:${view?.turnStage}:${view?.currentSeat}:${view?.round}`;
  useEffect(() => {
    setMode('idle');
    setPicked([]);
    setSwapOwnSlot(null);
  }, [situation]);

  const revealAt = useMemo(() => {
    const map = new Map<string, Card>();
    for (const r of st.reveals) map.set(r.key, r.card);
    return map;
  }, [st.reveals]);

  if (!view || !st.room) return null;
  const me = view.players.find((p) => p.id === st.you);
  const myTurn = view.players[view.currentSeat]?.id === st.you && (view.phase === 'turn' || view.phase === 'finalTurns');
  const memorizing = view.phase === 'memorize' && me && !me.memorized;
  const held = view.heldCard;
  const heldAbility = held && view.turnStage === 'holdingDrawn' ? abilityForValue(held.value, view.rules) : null;
  const discardTop = view.discardPile[view.discardPile.length - 1] ?? null;
  const opponents = view.players.filter((p) => p.id !== st.you);
  const nameOf = (id: string) => st.room?.members.find((m) => m.playerId === id)?.name ?? 'Player';

  // ----- interactions -------------------------------------------------------

  const clickOwnSlot = (slot: number) => {
    if (memorizing || mode === 'memorize') {
      const next = picked.includes(slot) ? picked.filter((s) => s !== slot) : [...picked, slot];
      setPicked(next);
      if (next.length === view.rules.memorizeCount) {
        game.act({ type: 'MEMORIZE', slots: next });
        setPicked([]);
      }
      return;
    }
    if (mode === 'replace') {
      game.act({ type: 'REPLACE', slot });
      setMode('idle');
      return;
    }
    if (mode === 'peek') {
      game.act({ type: 'USE_ABILITY', ownSlot: slot });
      setMode('idle');
      return;
    }
    if (mode === 'swapOwn') {
      setSwapOwnSlot(slot);
      setMode('swapTheir');
      return;
    }
    if (mode === 'match') {
      const next = picked.includes(slot) ? picked.filter((s) => s !== slot) : [...picked, slot].slice(0, 4);
      setPicked(next);
    }
  };

  const clickOpponentSlot = (playerId: string, slot: number) => {
    if (mode === 'spy') {
      game.act({ type: 'USE_ABILITY', targetPlayerId: playerId, targetSlot: slot });
      setMode('idle');
      return;
    }
    if (mode === 'swapTheir' && swapOwnSlot !== null) {
      game.act({ type: 'USE_ABILITY', ownSlot: swapOwnSlot, targetPlayerId: playerId, targetSlot: slot });
      setMode('idle');
      setSwapOwnSlot(null);
    }
  };

  const hint = memorizing
    ? `Tap ${view.rules.memorizeCount} of your cards to memorize (${picked.length}/${view.rules.memorizeCount})`
    : mode === 'replace'
      ? 'Tap one of your cards to replace it'
      : mode === 'peek'
        ? 'Tap one of your cards to peek at it'
        : mode === 'spy'
          ? "Tap an opponent's card to spy on it"
          : mode === 'swapOwn'
            ? 'Tap YOUR card to give away'
            : mode === 'swapTheir'
              ? "Now tap an opponent's card to take"
              : mode === 'match'
                ? `Select 2–4 cards you believe match, then confirm (${picked.length} picked)`
                : null;

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-white/55">
          <span className="font-mono tracking-[0.2em] text-white/70">{st.room.code}</span>
          <span>Round {view.round}</span>
          {view.callerId && (
            <span className="rounded-md bg-accent/15 px-2 py-0.5 font-semibold text-accent">
              {nameOf(view.callerId)} called — final turns!
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <TimerBar deadline={st.deadline} />
          <button
            type="button"
            onClick={game.leave}
            title="Leave the table"
            aria-label="Leave the table"
            className="rounded-lg border border-white/10 p-2 text-white/50 transition-colors hover:border-white/25 hover:text-white"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_240px]">
        <div>
          {/* Opponents */}
          <div className="grid gap-3 sm:grid-cols-2">
            {opponents.map((p) => {
              const theirTurn = view.players[view.currentSeat]?.id === p.id;
              const targetable = mode === 'spy' || mode === 'swapTheir';
              return (
                <div
                  key={p.id}
                  className={`rounded-xl border p-3 transition-colors ${
                    theirTurn ? 'border-accent/30 bg-accent/[0.06]' : 'border-white/[0.06] bg-white/[0.02]'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className={theirTurn ? 'font-semibold text-accent' : 'text-white/70'}>{nameOf(p.id)}</span>
                    <span className="text-white/50">{p.score} pts</span>
                  </div>
                  <div className="flex gap-1.5">
                    {p.handSlots.map((present, slot) => (
                      <CardBack
                        key={slot}
                        present={present}
                        reveal={revealAt.get(`${p.id}:${slot}`)}
                        small
                        highlight={targetable && present}
                        onClick={() => present && clickOpponentSlot(p.id, slot)}
                        ownerLabel={`${nameOf(p.id)}'s`}
                        slot={slot}
                        slotCount={p.handSlots.length}
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Piles */}
          <div className="my-5 flex items-center justify-center gap-6">
            <button
              type="button"
              disabled={!myTurn || view.turnStage !== 'awaitingMain' || mode !== 'idle'}
              onClick={() => game.act({ type: 'DRAW' })}
              className={`group relative ${CARD_SIZE.lg} rounded-lg border border-white/15 bg-gradient-to-b from-white/[0.08] to-white/[0.03] text-center transition-colors enabled:hover:border-accent/40 disabled:opacity-60`}
              title="Draw from the deck"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-white/50 group-enabled:group-hover:text-accent">
                Draw
              </span>
              <span className="mt-1 block text-lg font-bold text-white/80">{view.drawCount}</span>
            </button>
            <div className="text-center">
              {discardTop ? (
                <CardFace card={discardTop} />
              ) : (
                <EmptySlot />
              )}
              <button
                type="button"
                disabled={!myTurn || view.turnStage !== 'awaitingMain' || mode !== 'idle' || !discardTop}
                onClick={() => game.act({ type: 'TAKE_DISCARD' })}
                className="mt-1.5 rounded-md px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/50 transition-colors enabled:hover:text-accent disabled:opacity-50"
              >
                Take discard
              </button>
            </div>
            {held && (
              <div className="text-center">
                <CardFace card={held} glow />
                <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-accent/80">In hand</p>
              </div>
            )}
          </div>

          {/* Hint banner */}
          {hint && (
            <p className="mb-3 rounded-lg border border-accent/20 bg-accent/[0.07] px-3.5 py-2 text-center text-xs font-medium text-accent">
              {hint}
            </p>
          )}

          {/* My hand */}
          {me && (
            <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className={myTurn ? 'font-semibold text-accent' : 'text-white/70'}>
                  {myTurn ? 'Your turn' : 'You'}
                </span>
                <span className="text-white/50">{me.score} pts</span>
              </div>
              <div className="flex justify-center gap-2.5">
                {me.handSlots.map((present, slot) => (
                  <CardBack
                    key={slot}
                    present={present}
                    reveal={revealAt.get(`${st.you}:${slot}`)}
                    selected={picked.includes(slot)}
                    highlight={present && (memorizing || ['replace', 'peek', 'swapOwn', 'match'].includes(mode))}
                    onClick={() => present && clickOwnSlot(slot)}
                    ownerLabel="Your"
                    slot={slot}
                    slotCount={me.handSlots.length}
                  />
                ))}
              </div>

              {/* Action bar */}
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {myTurn && view.turnStage === 'awaitingMain' && mode === 'idle' && (
                  <>
                    {view.phase === 'turn' && (
                      <ActionBtn onClick={() => game.act({ type: 'CALL' })} accent>
                        <Megaphone className="h-3.5 w-3.5" /> Call Foursight!
                      </ActionBtn>
                    )}
                    {view.rules.matchingEnabled && !me.matchClaimedThisTurn && (
                      <ActionBtn onClick={() => setMode('match')}>Claim a match</ActionBtn>
                    )}
                  </>
                )}
                {mode === 'match' && (
                  <>
                    <ActionBtn
                      accent
                      disabled={picked.length < 2}
                      onClick={() => {
                        game.act({ type: 'MATCH_CLAIM', slots: picked });
                        setMode('idle');
                        setPicked([]);
                      }}
                    >
                      Confirm match ({picked.length})
                    </ActionBtn>
                    <ActionBtn
                      onClick={() => {
                        setMode('idle');
                        setPicked([]);
                      }}
                    >
                      Cancel
                    </ActionBtn>
                  </>
                )}
                {myTurn && view.turnStage === 'holdingDrawn' && mode === 'idle' && (
                  <>
                    <ActionBtn accent onClick={() => setMode('replace')}>
                      Keep it (replace a card)
                    </ActionBtn>
                    {heldAbility && held && (
                      <ActionBtn onClick={() => setMode(ABILITY_MODE[heldAbility])}>
                        {(() => {
                          const I = ABILITY_ICON(held.value);
                          return I && <I className="h-3.5 w-3.5" />;
                        })()}
                        Use ability
                      </ActionBtn>
                    )}
                    <ActionBtn onClick={() => game.act({ type: 'DISCARD_DRAWN' })}>Discard it</ActionBtn>
                  </>
                )}
                {myTurn && view.turnStage === 'holdingDiscard' && mode === 'idle' && (
                  <ActionBtn accent onClick={() => setMode('replace')}>
                    Choose a card to replace
                  </ActionBtn>
                )}
                {mode !== 'idle' && mode !== 'match' && !memorizing && (
                  <ActionBtn
                    onClick={() => {
                      setMode('idle');
                      setSwapOwnSlot(null);
                    }}
                  >
                    Cancel
                  </ActionBtn>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Log */}
        <aside className="max-h-[420px] overflow-y-auto rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
          <Eyebrow className="mb-2 text-[10px]">Table talk</Eyebrow>
          <ul className="space-y-1 text-xs leading-relaxed text-white/55">
            {[...st.log].reverse().map((line, i) => (
              <li key={`${i}-${line}`} className={line.startsWith('—') ? 'pt-1 font-semibold text-white/70' : ''}>
                {line}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Round reveal */}
      {view.phase === 'roundEnd' && st.lastReveal && (
        <Overlay title={st.lastReveal.falseCall ? 'False call!' : 'Round over'}>
          <RevealTable reveal={st.lastReveal} nameOf={(id) => (id === st.you ? 'You' : nameOf(id))} />
          <p className="mt-3 text-center text-xs text-white/45">Next round starts automatically…</p>
        </Overlay>
      )}

      {/* Match end — derived from the authoritative snapshot so it survives
          reconnects that missed the MATCH_ENDED event. */}
      {view.phase === 'matchEnd' && (
        <Overlay
          title={view.matchWinnerIds.includes(st.you) ? 'You won! 🏆' : `${nameOf(view.matchWinnerIds[0] ?? '')} wins`}
        >
          {st.lastReveal && <RevealTable reveal={st.lastReveal} nameOf={(id) => (id === st.you ? 'You' : nameOf(id))} />}
          <ol className="mx-auto mt-4 max-w-xs space-y-1.5">
            {[...view.players]
              .sort((a, b) => a.score - b.score)
              .map((p, i) => (
                <li
                  key={p.id}
                  className={`flex justify-between rounded-lg px-3 py-2 text-sm ${
                    view.matchWinnerIds.includes(p.id)
                      ? 'bg-accent/10 font-semibold text-accent'
                      : 'bg-white/[0.03] text-white/65'
                  }`}
                >
                  <span>
                    #{i + 1} {p.id === st.you ? 'You' : nameOf(p.id)}
                  </span>
                  <span>{p.score} pts</span>
                </li>
              ))}
          </ol>
          <div className="mt-5 flex justify-center gap-3">
            {st.room.members.find((m) => m.playerId === st.you)?.isHost && (
              <ActionBtn accent onClick={() => game.send({ t: 'playAgain' })}>
                Back to lobby
              </ActionBtn>
            )}
            <ActionBtn onClick={game.leave}>Leave table</ActionBtn>
          </div>
        </Overlay>
      )}
    </div>
  );
}
