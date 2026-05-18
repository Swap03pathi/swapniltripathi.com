import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasCoreSystems } from '../../data/sarasExperienceCopy';
import { saveSarasReturnSection } from '../../utils/sarasScrollRestore';
import SarasMiniFlow from './SarasMiniFlow';
import { SarasCard, SarasPill, SarasSection } from './SarasPrimitives';

export default function SarasCoreSystems() {
  return (
    <SarasSection
      id={SARAS_SECTION_IDS.coreSystems}
      eyebrow="Core Engineering"
      title="Core Engineering Systems"
      description="Flagship realtime systems that power ingestion, execution, and multidimensional market intelligence."
      className="!py-20 md:!py-28 lg:!py-32"
    >
      <div className="space-y-8 md:space-y-10">
        {sarasCoreSystems.map((system, i) => (
          <motion.div
            key={system.href}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: i * 0.06 }}
          >
            <Link
              to={system.href}
              state={{ scrollSection: SARAS_SECTION_IDS.coreSystems }}
              onClick={() => saveSarasReturnSection(SARAS_SECTION_IDS.coreSystems)}
              className="group block"
            >
              <SarasCard
                hover
                className="border-accent/12 bg-white/[0.025] p-6 shadow-[0_0_60px_-28px_rgba(0,212,255,0.12)] transition-[border-color,box-shadow] hover:border-accent/22 hover:shadow-[0_0_72px_-24px_rgba(0,212,255,0.16)] md:p-8 lg:p-9"
              >
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
                  <div className="lg:col-span-5">
                    <p className="font-mono text-sm font-bold text-accent/45">{system.number}</p>
                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent md:text-2xl lg:text-[1.65rem]">
                      {system.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-white/50 md:text-[0.9375rem]">
                      {system.summary}
                    </p>
                    <p className="mt-5 text-xs font-medium uppercase tracking-wider text-white/30">
                      Core challenge
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55">{system.challenge}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {system.stack.map((t) => (
                        <SarasPill key={t}>{t}</SarasPill>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="mb-4 text-xs font-medium uppercase tracking-wider text-white/28">
                      Architecture preview
                    </p>
                    <SarasMiniFlow steps={system.flow} />
                  </div>
                </div>
                <p className="mt-8 text-right text-sm font-semibold text-accent/75 transition-colors group-hover:text-accent">
                  Open Architecture Deep-Dive →
                </p>
              </SarasCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </SarasSection>
  );
}
