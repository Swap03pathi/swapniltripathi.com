import { RrisHeroConvergence } from './RrisHeroConvergence';
import { SourceDeepDiveSection } from './SourceDeepDiveSection';
import { RrisMidBand } from './RrisMidBand';
import { RrisEngineeringTriad } from './RrisEngineeringTriad';
import { RrisTechStackBar } from './RrisTechStackBar';

export default function RrisArchitectureCanvas() {
  return (
    <div className="relative space-y-14 pb-20 text-slate-400 sm:space-y-16">
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.4]"
        aria-hidden
        style={{
          backgroundImage: `
            radial-gradient(ellipse 90% 35% at 50% -5%, rgba(59, 130, 246, 0.07), transparent),
            linear-gradient(rgba(148,163,184,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.03) 1px, transparent 1px)
          `,
          backgroundSize: 'auto, 44px 44px, 44px 44px',
        }}
      />

      <RrisHeroConvergence />

      <SourceDeepDiveSection />

      <RrisMidBand />

      <RrisEngineeringTriad />

      <RrisTechStackBar />
    </div>
  );
}
