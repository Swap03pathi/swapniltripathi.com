import { motion } from 'framer-motion';
import { OYO_SECTION_IDS } from '../../constants/oyoExperience';
import { oyoHero } from '../../data/oyoExperienceCopy';
import { resolveAssetUrl } from '../../utils/assetUrl';
import OyoExploratoryVisual from './OyoExploratoryVisual';
import { oyoPillIcons } from './OyoIconMap';
import { OyoPill } from './OyoPrimitives';

export default function OyoHero() {
  return (
    <section
      id={OYO_SECTION_IDS.hero}
      className="scroll-mt-28 border-b border-white/[0.05] py-12 md:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12"
        >
          <div>
            <div className="inline-flex items-center justify-center rounded-lg border border-white/[0.08] bg-white px-3 py-2">
              <img
                src={resolveAssetUrl('https://cdn.simpleicons.org/oyo/EE2E24')}
                alt="OYO"
                className="h-6 w-auto object-contain"
              />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/55">
              {oyoHero.eyebrow}
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-[2rem]">
              {oyoHero.title}
            </h1>
            <p className="mt-3 text-sm font-medium text-white/50">{oyoHero.role}</p>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/42 md:text-[0.9375rem]">
              {oyoHero.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {oyoHero.techPills.map((pill) => {
                const Icon = oyoPillIcons[pill.icon];
                return (
                  <OyoPill key={pill.label}>
                    <Icon className="h-3 w-3 shrink-0 text-accent/50" strokeWidth={1.5} />
                    {pill.label}
                  </OyoPill>
                );
              })}
            </div>
          </div>
          <OyoExploratoryVisual />
        </motion.div>
      </div>
    </section>
  );
}
