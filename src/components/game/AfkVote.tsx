import { UserMinus, UserRoundCheck } from 'lucide-react';
import type { AfkVoteView } from '../../game/protocol';
import { ActionBtn, TimerBar } from './bits';

/**
 * Shown when someone has gone quiet on their turn. Dropping is the default —
 * waiting is what the table has to agree on — so the copy states the stakes
 * plainly rather than making anyone read the rules.
 */
export default function AfkVote({
  vote,
  you,
  nameOf,
  onVote,
  onImHere,
}: {
  vote: AfkVoteView;
  you: string;
  nameOf: (id: string) => string;
  onVote: (v: 'drop' | 'wait') => void;
  onImHere: () => void;
}) {
  const isTarget = vote.targetId === you;
  const canVote = vote.eligible.includes(you);
  const myVote = vote.votes[you];
  const cast = vote.eligible.filter((id) => vote.votes[id] !== undefined).length;
  const name = nameOf(vote.targetId);

  if (isTarget) {
    return (
      <div className="mb-3 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3.5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-semibold text-amber-200">Are you still there?</p>
          <TimerBar deadline={vote.endsAt} />
        </div>
        <p className="mt-1 text-xs leading-relaxed text-amber-100/75">
          The table is voting on whether to drop you for this round. Make any move — or tap below — to stay in.
        </p>
        <div className="mt-3">
          <ActionBtn accent onClick={onImHere}>
            <UserRoundCheck className="h-3.5 w-3.5" /> I&apos;m here
          </ActionBtn>
        </div>
      </div>
    );
  }

  if (!canVote && !myVote) return null;

  return (
    <div className="mb-3 rounded-xl border border-amber-300/25 bg-amber-400/[0.07] p-3.5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-amber-200">{name} seems to be away</p>
        <TimerBar deadline={vote.endsAt} />
      </div>
      <p className="mt-1 text-xs leading-relaxed text-amber-100/70">
        No moves for 90 seconds. Drop {name} from this round, or wait? A dropped player sits out the
        rest of the round, scores its highest total, and is dealt back in next round.
      </p>
      {myVote ? (
        <p className="mt-2.5 text-xs font-medium text-amber-100/85">
          You voted to {myVote === 'drop' ? 'drop' : 'wait'}. {cast} of {vote.eligible.length} votes in
          {vote.eligible.length === 1 ? '' : ' — a majority must agree to wait'}.
        </p>
      ) : (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            <ActionBtn onClick={() => onVote('drop')}>
              <UserMinus className="h-3.5 w-3.5" /> Drop this round
            </ActionBtn>
            <ActionBtn accent onClick={() => onVote('wait')}>
              Wait for them
            </ActionBtn>
          </div>
          <p className="mt-2 text-[11px] text-amber-100/55">
            {vote.eligible.length === 1
              ? `You decide — if you don't choose in time, ${name} is dropped.`
              : `Without a majority to wait, ${name} is dropped when the timer ends.`}
          </p>
        </>
      )}
    </div>
  );
}
