import { motion } from 'framer-motion';
import { Sparkles, UserRoundCog } from 'lucide-react';
import { RrisGlassPanel } from './RrisPrimitives';
import { PipelineConnector } from './PipelineConnector';

const actions = ['Approve', 'Edit', 'Reject', 'Fino Pick'] as const;

const steps = [
  {
    title: 'Review queue',
    body: 'Candidate trades land with extraction confidence, source lineage, and advisor context.',
  },
  {
    title: 'Analyst decisions',
    body: 'Moderation is not only validation — analysts shape what ships and what gets promoted.',
  },
  {
    title: 'Publication',
    body: 'Approved state syncs to the trade collection consumed by execution and client surfaces.',
  },
] as const;

export function ModerationWorkflow() {
  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {steps.map((s, i) => (
        <div key={s.title}>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
          >
            <RrisGlassPanel className="px-4 py-4 sm:px-5" glow={i === 1 ? 'violet' : 'subtle'}>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-400/20 bg-violet-500/[0.07] text-violet-200/90">
                  {i === 1 ? (
                    <UserRoundCog className="h-4 w-4" strokeWidth={1.35} />
                  ) : (
                    <Sparkles className="h-4 w-4 text-accent/75" strokeWidth={1.35} />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-white/88">{s.title}</p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/48">{s.body}</p>
                  {i === 1 ? (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {actions.map((a) => (
                        <span
                          key={a}
                          className="rounded-md border border-white/[0.1] bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white/70"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  {i === 1 ? (
                    <p className="mt-3 text-[11px] leading-relaxed text-violet-200/55">
                      <span className="font-semibold text-violet-200/75">Fino Pick</span> flags
                      high-confidence, high-credibility trades promoted prominently in-app — human
                      judgment on signal quality, not just schema correctness.
                    </p>
                  ) : null}
                </div>
              </div>
            </RrisGlassPanel>
          </motion.div>
          {i < steps.length - 1 ? <PipelineConnector orientation="vertical" delay={i * 0.05} /> : null}
        </div>
      ))}
    </div>
  );
}
