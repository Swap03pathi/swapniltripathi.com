import { motion } from 'framer-motion';
import { EY_SECTION_IDS } from '../../constants/eyExperience';
import { eyWorkAreas } from '../../data/eyExperienceCopy';
import { eyWorkIcons } from './EyIconMap';
import { EyCard, EyPill, EySection } from './EyPrimitives';

export default function EyWorkAreas() {
  return (
    <EySection id={EY_SECTION_IDS.workAreas} title="Work Areas" className="border-b border-white/[0.05]">
      <div className="space-y-4 md:space-y-5">
        {eyWorkAreas.map((area, i) => {
          const Icon = eyWorkIcons[area.icon];
          return (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <EyCard highlight={area.highlight} className="p-5 md:p-6">
                <div className="flex flex-col gap-5 md:flex-row md:gap-8">
                  <div className="flex gap-4 md:flex-1">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${
                        area.highlight
                          ? 'border-accent/20 bg-accent/[0.06]'
                          : 'border-white/[0.08] bg-white/[0.025]'
                      }`}
                    >
                      <Icon
                        className={`h-[18px] w-[18px] ${area.highlight ? 'text-accent/65' : 'text-white/40'}`}
                        strokeWidth={1.5}
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold text-white/88 md:text-lg">
                        <span className="text-white/35">{area.number}. </span>
                        {area.title}
                      </h3>
                      <ul className="mt-4 space-y-2">
                        {area.bullets.map((b) => (
                          <li key={b} className="flex gap-2 text-sm leading-relaxed text-white/42">
                            <span className="text-white/20">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="md:w-44 md:shrink-0 md:border-l md:border-white/[0.05] md:pl-6">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/28">
                      Tools
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {area.tools.map((t) => (
                        <EyPill key={t}>{t}</EyPill>
                      ))}
                    </div>
                  </div>
                </div>
              </EyCard>
            </motion.div>
          );
        })}
      </div>
    </EySection>
  );
}
