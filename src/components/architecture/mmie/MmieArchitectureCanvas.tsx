import { HeroAndQueryExplosion } from './HeroAndQueryExplosion';
import { CachingFailureSection } from './CachingFailureSection';
import { RedisLayerStack } from './RedisLayerStack';
import { QueryExecutionSection } from './QueryExecutionSection';
import { AdvisorIntelligenceSection } from './AdvisorIntelligenceSection';
import { IncrementalRecomputationSection } from './IncrementalRecomputationSection';
import { ProfitMutationSection } from './ProfitMutationSection';
import { PhilosophySection } from './PhilosophySection';
import { OperationalOutcomesSection } from './OperationalOutcomesSection';
import { MmieTechStackBar } from './MmieTechStackBar';
import { MmieLayoutGrid, MmieSpan12 } from './MmiePrimitives';

export default function MmieArchitectureCanvas() {
  return (
    <div className="relative pb-20 text-slate-300">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.28]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 80% 28% at 50% -8%, rgba(34, 211, 238, 0.04), transparent),
            linear-gradient(rgba(148,163,184,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.02) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 40px 40px, 40px 40px',
        }}
      />

      <MmieLayoutGrid>
        <MmieSpan12>
          <HeroAndQueryExplosion />
        </MmieSpan12>
        <MmieSpan12>
          <CachingFailureSection />
        </MmieSpan12>
        <MmieSpan12>
          <RedisLayerStack />
        </MmieSpan12>
        <MmieSpan12>
          <QueryExecutionSection />
        </MmieSpan12>
        <MmieSpan12>
          <AdvisorIntelligenceSection />
        </MmieSpan12>
        <MmieSpan12>
          <IncrementalRecomputationSection />
        </MmieSpan12>
        <MmieSpan12>
          <ProfitMutationSection />
        </MmieSpan12>
        <MmieSpan12>
          <PhilosophySection />
        </MmieSpan12>
        <MmieSpan12>
          <OperationalOutcomesSection />
        </MmieSpan12>
        <MmieSpan12>
          <MmieTechStackBar />
        </MmieSpan12>
      </MmieLayoutGrid>
    </div>
  );
}
