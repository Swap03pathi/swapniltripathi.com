import { RrisChallengesColumn } from './RrisChallengesColumn';
import { RrisEngineeringPriorities } from './RrisEngineeringPriorities';
import { RrisPipelineOutcomesHub } from './RrisPipelineOutcomesHub';

/** Single reference row: challenges | priorities | outcomes (three columns). */
export function RrisEngineeringTriad() {
  return (
    <section className="rounded-2xl border border-slate-800/70 bg-slate-950/45 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.03)] backdrop-blur-xl sm:p-8">
      <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-slate-500">
        Engineering
      </p>
      <h2 className="mt-2 border-b border-white/[0.06] pb-6 text-sm font-semibold tracking-tight text-white sm:text-base">
        Challenges, priorities &amp; pipeline outcomes
      </h2>

      <div className="mt-8 grid gap-10 lg:grid-cols-3 lg:gap-8">
        <div>
          <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Key engineering challenges
          </h3>
          <RrisChallengesColumn />
        </div>
        <div className="lg:border-x lg:border-white/[0.06] lg:px-8">
          <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Engineering priorities
          </h3>
          <RrisEngineeringPriorities variant="column" />
        </div>
        <div>
          <h3 className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            Pipeline outcomes
          </h3>
          <RrisPipelineOutcomesHub />
        </div>
      </div>
    </section>
  );
}
