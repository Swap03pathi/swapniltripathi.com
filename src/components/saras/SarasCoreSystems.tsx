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
    >
      <div className="space-y-6">
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
              <SarasCard hover className="p-5 md:p-7 lg:p-8">
                <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
                  <div className="lg:col-span-5">
                    <p className="font-mono text-sm font-bold text-accent/35">{system.number}</p>
                    <h3 className="mt-2 text-xl font-bold text-white transition-colors group-hover:text-accent md:text-2xl">
                      {system.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/45">{system.summary}</p>
                    <p className="mt-4 text-xs font-medium uppercase tracking-wider text-white/30">
                      Core challenge
                    </p>
                    <p className="mt-1 text-sm text-white/55">{system.challenge}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {system.stack.map((t) => (
                        <SarasPill key={t}>{t}</SarasPill>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/25">
                      Architecture preview
                    </p>
                    <SarasMiniFlow steps={system.flow} />
                  </div>
                </div>
                <p className="mt-6 text-right text-sm font-medium text-accent/70 transition-colors group-hover:text-accent">
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
