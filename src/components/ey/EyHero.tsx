import { motion } from 'framer-motion';
import { EY_SECTION_IDS } from '../../constants/eyExperience';
import { eyHero } from '../../data/eyExperienceCopy';
import { resolveAssetUrl } from '../../utils/assetUrl';
import EyConsultingVisual from './EyConsultingVisual';
import { eyMetaIcons } from './EyIconMap';
import { EyPill } from './EyPrimitives';

export default function EyHero() {
  return (
    <section
      id={EY_SECTION_IDS.hero}
      className="scroll-mt-28 border-b border-white/[0.05] py-12 md:py-14"
    >
      <div className="mx-auto max-w-[1000px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12"
        >
          <div>
            <img
              src={resolveAssetUrl('/logos/ey.png')}
              alt="Ernst & Young"
              className="h-8 w-auto object-contain opacity-90"
            />
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/55">
              {eyHero.eyebrow}
            </p>
            <h1 className="mt-3 text-2xl font-bold leading-snug tracking-tight text-white sm:text-[1.75rem] lg:text-[1.9rem]">
              {eyHero.title}
            </h1>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/42 md:text-[0.9375rem]">
              {eyHero.description}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {eyHero.metadata.map((tag) => {
                const Icon = eyMetaIcons[tag.icon];
                return (
                  <EyPill key={tag.label}>
                    <Icon className="h-3 w-3 shrink-0 text-accent/45" strokeWidth={1.5} />
                    {tag.label}
                  </EyPill>
                );
              })}
            </div>
          </div>
          <EyConsultingVisual />
        </motion.div>
      </div>
    </section>
  );
}
