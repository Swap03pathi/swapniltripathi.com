import { motion } from 'framer-motion';
import { APPLE_SECTION_IDS } from '../../constants/appleExperience';
import { appleCoreSystems } from '../../data/appleExperienceCopy';
import { appleSystemIcons } from './AppleIconMap';
import AppleVerticalFlow from './AppleVerticalFlow';
import { AppleCard, ApplePill, AppleSection, AppleSectionLabel } from './ApplePrimitives';

export default function AppleCoreSystems() {
  return (
    <AppleSection id={APPLE_SECTION_IDS.coreSystems} className="border-b border-white/[0.06]">
      <AppleSectionLabel>Core Systems</AppleSectionLabel>
      <div className="space-y-6 md:space-y-8">
        {appleCoreSystems.map((system, i) => {
          const Icon = appleSystemIcons[system.icon];
          return (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <AppleCard
                highlight={system.highlight}
                hover={!system.highlight}
                className="p-6 md:p-8"
              >
                <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
                  <div
                    className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border ${
                      system.highlight
                        ? 'border-accent/25 bg-accent/[0.08] shadow-[0_0_32px_-16px_rgba(0,212,255,0.2)]'
                        : 'border-white/[0.08] bg-white/[0.03]'
                    }`}
                  >
                    <Icon
                      className={`h-7 w-7 ${system.highlight ? 'text-accent/80' : 'text-white/45'}`}
                      strokeWidth={1.35}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/15 text-xs font-bold text-accent">
                        {system.number}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-white md:text-2xl">
                        {system.title}
                      </h3>
                    </div>
                    {'description' in system && system.description ? (
                      <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-[0.9375rem]">
                        {system.description}
                      </p>
                    ) : null}
                    <ul className="mt-5 space-y-2.5">
                      {system.bullets.map((b) => (
                        <li key={b} className="flex gap-2.5 text-sm leading-relaxed text-white/45">
                          <span className="text-accent/35">·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-6">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/30">
                        Tech
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-2">
                        {system.tools.map((t) => (
                          <ApplePill key={t}>{t}</ApplePill>
                        ))}
                      </div>
                    </div>
                  </div>

                  {system.flow ? (
                    <div className="lg:w-52 lg:shrink-0">
                      <AppleVerticalFlow steps={system.flow} />
                    </div>
                  ) : null}
                </div>
              </AppleCard>
            </motion.div>
          );
        })}
      </div>
    </AppleSection>
  );
}
