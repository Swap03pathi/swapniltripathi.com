import { APPLE_SECTION_IDS } from '../../constants/appleExperience';
import { appleTooling } from '../../data/appleExperienceCopy';
import { AppleSection, AppleSectionLabel } from './ApplePrimitives';
import AppleTechLogoGrid from './AppleTechLogoGrid';

export default function AppleScaleTooling() {
  return (
    <AppleSection id={APPLE_SECTION_IDS.scale} className="border-b border-white/[0.06]">
      <AppleSectionLabel>Scale & Tooling</AppleSectionLabel>
      <AppleTechLogoGrid tools={appleTooling} />

      {/*
      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
        {appleOperationalStats.map((stat) => {
          const Icon = appleStatIcons[stat.icon];
          return (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-5 text-center transition-colors hover:border-white/[0.09]"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
                <Icon className="h-4 w-4 text-accent/55" strokeWidth={1.5} />
              </div>
              <p className="mt-3 text-sm font-semibold text-white/80">{stat.value}</p>
              <p className="mt-1 text-[11px] leading-snug text-white/35">{stat.label}</p>
            </div>
          );
        })}
      </div>
      */}
    </AppleSection>
  );
}
