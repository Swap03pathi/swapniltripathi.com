import { motion } from 'framer-motion';
import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasEvolutionConclusion, sarasEvolutionPhases } from '../../data/sarasExperienceCopy';
import { SarasCard, SarasPill, SarasSection } from './SarasPrimitives';

function EvolutionMilestone({
  phase,
  label,
  title,
  description,
  themes,
  index,
}: {
  phase: string;
  label: string;
  title: string;
  description: string;
  themes: readonly string[];
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-48px' }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group relative border-l border-accent/20 py-1 pl-6 transition-[border-color,box-shadow] duration-300 hover:border-accent/40 hover:shadow-[0_0_48px_-16px_rgba(0,212,255,0.12)] md:pl-8"
    >
      <p className="font-mono text-[11px] font-medium tracking-widest text-accent/45">
        Phase {phase}
      </p>
      <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.16em] text-white/50">
        {label}
      </p>
      <h3 className="mt-3 text-lg font-semibold tracking-tight text-white md:text-xl">{title}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-white/45">{description}</p>
      <div className="mt-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/25">
          Key Themes
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {themes.map((theme) => (
            <SarasPill key={theme}>{theme}</SarasPill>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function SarasPlatformEvolution() {
  return (
    <SarasSection
      id={SARAS_SECTION_IDS.evolution}
      eyebrow="Platform Evolution"
      title="How Saras Evolved Into a Production Ecosystem"
      description="Saras evolved from a lightweight Telegram recommendation tracker into a realtime multi-source platform focused on advisor transparency, execution realism, and operational reliability."
    >
      <motion.div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12 lg:gap-x-10">
        {sarasEvolutionPhases.map((item, i) => (
          <EvolutionMilestone
            key={item.phase}
            phase={item.phase}
            label={item.label}
            title={item.title}
            description={item.description}
            themes={item.themes}
            index={i}
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.45 }}
        className="mt-12 md:mt-14"
      >
        <SarasCard className="border-accent/10 bg-white/[0.025] p-8 md:p-10 lg:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent/45">Conclusion</p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-[1.65rem] lg:text-3xl">
            {sarasEvolutionConclusion.title}
          </h3>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/50 md:text-base md:leading-relaxed">
            {sarasEvolutionConclusion.description}
          </p>
        </SarasCard>
      </motion.div>
    </SarasSection>
  );
}
