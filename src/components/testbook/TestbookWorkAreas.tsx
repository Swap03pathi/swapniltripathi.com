import { motion } from 'framer-motion';
import { TESTBOOK_SECTION_IDS } from '../../constants/testbookExperience';
import { testbookWorkAreas } from '../../data/testbookExperienceCopy';
import { testbookWorkIcons } from './TestbookIconMap';
import { TestbookCard, TestbookPill, testbookAccentStyles } from './TestbookPrimitives';

export default function TestbookWorkAreas() {
  return (
    <section
      id={TESTBOOK_SECTION_IDS.workAreas}
      className="scroll-mt-28 border-b border-white/[0.06] py-14 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <div className="space-y-5 md:space-y-6">
          {testbookWorkAreas.map((area, i) => {
            const Icon = testbookWorkIcons[area.icon];
            const styles = testbookAccentStyles[area.accent];
            const pillTone = area.accent;

            return (
              <motion.div
                key={area.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <TestbookCard
                  highlight={'highlight' in area && area.highlight}
                  className="p-5 md:p-6"
                >
                  <div className="flex flex-col gap-6 md:flex-row md:gap-8">
                    <div className="flex gap-4 md:flex-1">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border ${styles.icon}`}
                      >
                        <Icon className="h-6 w-6" strokeWidth={1.35} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-bold tracking-tight text-white md:text-xl">
                          <span className="text-white/35">{area.number}. </span>
                          {area.title}
                        </h3>
                        <ul className="mt-4 space-y-2">
                          {area.bullets.map((b) => (
                            <li key={b} className="flex gap-2 text-sm leading-relaxed text-white/45">
                              <span className="text-white/20">·</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="md:w-44 md:shrink-0 md:border-l md:border-white/[0.06] md:pl-6">
                      <p className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${styles.label}`}>
                        Tech Stack
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2 md:flex-col md:items-start">
                        {area.stack.map((t) => (
                          <TestbookPill key={t} tone={pillTone}>
                            {t}
                          </TestbookPill>
                        ))}
                      </div>
                    </div>
                  </div>
                </TestbookCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
