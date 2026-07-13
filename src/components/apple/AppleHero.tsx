import { motion } from 'framer-motion';
import { APPLE_SECTION_IDS } from '../../constants/appleExperience';
import { appleHero } from '../../data/appleExperienceCopy';
import { resolveAssetUrl } from '../../utils/assetUrl';
import AppleHeroFlowDiagram from './AppleHeroFlowDiagram';
import { appleHeroMetaIcons, appleHeroMetricIcons } from './AppleIconMap';
import { ApplePill } from './ApplePrimitives';

export default function AppleHero() {
  return (
    <section
      id={APPLE_SECTION_IDS.hero}
      className="scroll-mt-28 border-b border-white/[0.06] py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14"
        >
          <div>
            <div className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              <img
                src={resolveAssetUrl('https://cdn.simpleicons.org/apple/ffffff')}
                alt="Apple"
                className="h-9 w-9 object-contain opacity-90"
              />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/60">
              {appleHero.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
              {appleHero.title}
            </h1>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-white/40 md:text-sm">
              {appleHero.tenure}
            </p>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
              {appleHero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {appleHero.metadata.map((tag) => {
                const Icon = appleHeroMetaIcons[tag.icon];
                return (
                  <ApplePill key={tag.label}>
                    <Icon className="mr-1.5 h-3 w-3 text-accent/55" strokeWidth={1.5} />
                    {tag.label}
                  </ApplePill>
                );
              })}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-8 lg:grid-cols-2">
              {appleHero.metrics.map((m) => {
                const Icon = appleHeroMetricIcons[m.icon];
                return (
                  <div key={m.label} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-accent/55" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white md:text-xl">{m.value}</p>
                      <p className="mt-0.5 text-xs leading-snug text-white/35">{m.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <AppleHeroFlowDiagram />
        </motion.div>
      </div>
    </section>
  );
}
