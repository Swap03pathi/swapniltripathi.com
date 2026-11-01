import { m } from 'framer-motion';
import { MPOKKET_SECTION_IDS } from '../../constants/mpokketExperience';
import { mpokketHero } from '../../data/mpokketExperienceCopy';
import { resolveAssetUrl } from '../../utils/assetUrl';
import MpokketHeroFlowDiagram from './MpokketHeroFlowDiagram';
import { mpokketHeroMetaIcons, mpokketHeroMetricIcons } from './MpokketIconMap';
import { MpokketPill } from './MpokketPrimitives';

export default function MpokketHero() {
  return (
    <section
      id={MPOKKET_SECTION_IDS.hero}
      className="scroll-mt-28 border-b border-white/[0.06] py-16 md:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-14"
        >
          <div>
            <div className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] p-3">
              <img
                src={resolveAssetUrl('/logos/mpokket.png')}
                alt="mPokket"
                width={36}
                height={36}
                className="h-9 w-9 object-contain opacity-90"
              />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/60">
              {mpokketHero.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.5rem]">
              {mpokketHero.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
              {mpokketHero.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {mpokketHero.metadata.map((tag) => {
                const Icon = mpokketHeroMetaIcons[tag.icon];
                return (
                  <MpokketPill key={tag.label}>
                    <Icon className="mr-1.5 h-3 w-3 text-accent/55" strokeWidth={1.5} />
                    {tag.label}
                  </MpokketPill>
                );
              })}
            </div>

            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/[0.06] pt-8 lg:grid-cols-2">
              {mpokketHero.metrics.map((metric) => {
                const Icon = mpokketHeroMetricIcons[metric.icon];
                return (
                  <div key={metric.label} className="flex gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.03]">
                      <Icon className="h-4 w-4 text-accent/55" strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-white md:text-xl">{metric.value}</p>
                      <p className="mt-0.5 text-xs leading-snug text-white/35">{metric.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <MpokketHeroFlowDiagram />
        </m.div>
      </div>
    </section>
  );
}
