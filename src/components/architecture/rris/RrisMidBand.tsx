import { motion } from 'framer-motion';
import { Coins, Shield, Zap, GitBranch } from 'lucide-react';
import { AiExtractionCard } from './AiExtractionCard';
import { MessageTransformFlow } from './MessageTransformFlow';
import { RrisFollowUpTracking } from './RrisFollowUpTracking';
import { PipelineConnector } from './PipelineConnector';

const tiles = [
  { label: 'Latency optimized', icon: Zap, text: 'Short classifier prompts; extraction only on signal.' },
  { label: 'Cost optimized', icon: Coins, text: 'Two-stage workflow gates expensive model calls.' },
  { label: 'Hallucination safeguards', icon: Shield, text: 'Thresholds, checks, and moderation handoff.' },
  { label: 'Advisor pattern library', icon: GitBranch, text: 'Few-shots and per-advisor parsing templates.' },
] as const;

/** Processing core: horizontal AI steps, message flow below (full width), then follow-ups. */
export function RrisMidBand() {
  return (
    <section className="relative rounded-2xl border border-slate-800/70 bg-slate-950/40 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-xl sm:p-8">
      <div className="mb-8 border-b border-white/[0.06] pb-6">
        <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-violet-300/45">
          Processing core
        </p>
        <h2 className="mt-2 text-sm font-semibold tracking-tight text-white/90 sm:text-base">
          AI extraction, schema normalization &amp; live follow-ups
        </h2>
      </div>

      <div className="space-y-10 lg:space-y-12">
        {/* AI extraction — horizontal steps on lg, vertical on small screens */}
        <div>
          <div className="mb-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/55">
              AI
            </p>
            <h3 className="mt-1 text-sm font-semibold text-white/90">AI extraction layer</h3>
            <p className="mt-2 max-w-3xl text-[11px] leading-relaxed text-white/42">
              Classification gates spend; structured extraction runs only when a recommendation
              is likely.
            </p>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-3">
            <div className="min-w-0 flex-1">
              <AiExtractionCard
                compact
                step="Step 1"
                title="Classification"
                subtitle="Does this message contain a trade recommendation?"
                highlight="Filters Telegram-scale noise before any heavy extraction."
                bullets={[
                  'Binary / low-token classifier paths',
                  'Queue-aware batching under burst load',
                  'Confidence thresholds for ambiguous phrasing',
                ]}
              />
            </div>

            <div className="flex justify-center lg:hidden" aria-hidden>
              <PipelineConnector orientation="vertical" delay={0.04} />
            </div>

            <div
              className="hidden shrink-0 items-stretch self-stretch px-1 lg:flex lg:w-[4.5rem]"
              aria-hidden
            >
              <PipelineConnector orientation="horizontal" className="h-full w-full" delay={0.04} />
            </div>

            <div className="min-w-0 flex-1">
              <AiExtractionCard
                compact
                step="Step 2"
                title="Structured extraction"
                subtitle="Map noisy advisor language into candidate fields."
                bullets={[
                  'Instrument & option-chain disambiguation',
                  'Target / SL / entry recovery without inventing fields',
                  'Quality payload for moderation queue',
                ]}
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {tiles.map((T, i) => (
              <motion.div
                key={T.label}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.04 * i }}
                whileHover={{ y: -1 }}
                className="rounded-lg border border-white/[0.07] bg-white/[0.02] px-2.5 py-2"
              >
                <T.icon className="h-3.5 w-3.5 text-accent/70" strokeWidth={1.35} />
                <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-wide text-white/55">
                  {T.label}
                </p>
                <p className="mt-1 text-[9px] leading-snug text-white/38">{T.text}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Message transformation — full width under AI, room for three columns without scroll */}
        <div className="border-t border-white/[0.06] pt-10">
          <div className="mb-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-violet-300/55">
              Schema
            </p>
            <h3 className="mt-1 text-sm font-semibold text-white/90">Message transformation flow</h3>
            <p className="mt-2 max-w-3xl text-[11px] leading-relaxed text-white/42">
              Raw human text → model JSON → normalized trade object ready for review.
            </p>
          </div>
          <MessageTransformFlow />
        </div>

        {/* Follow-up tracking */}
        <div className="border-t border-white/[0.06] pt-10">
          <RrisFollowUpTracking />
        </div>
      </div>
    </section>
  );
}
