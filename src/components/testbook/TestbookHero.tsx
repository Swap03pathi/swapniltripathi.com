import { m } from 'framer-motion';
import { TESTBOOK_SECTION_IDS } from '../../constants/testbookExperience';
import { testbookHero } from '../../data/testbookExperienceCopy';
import { resolveAssetUrl } from '../../utils/assetUrl';
import TestbookHeroHubDiagram from './TestbookHeroHubDiagram';
import { testbookHeroMetaIcons } from './TestbookIconMap';
import { TestbookPill } from './TestbookPrimitives';

export default function TestbookHero() {
  return (
    <section
      id={TESTBOOK_SECTION_IDS.hero}
      className="scroll-mt-28 border-b border-white/[0.06] py-14 md:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-12"
        >
          <div>
            <div className="flex items-center gap-3">
              <img
                src={resolveAssetUrl('/logos/testbook.png')}
                alt="Testbook"
                width={96}
                height={96}
                className="h-9 w-9 rounded-md object-contain"
              />
              <span className="text-lg font-semibold text-white/90">Testbook</span>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-accent/60">
              {testbookHero.eyebrow}
            </p>
            <h1 className="mt-4 text-3xl font-bold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-[2.35rem]">
              {testbookHero.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45 md:text-base">
              {testbookHero.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {testbookHero.metadata.map((tag) => {
                const Icon = testbookHeroMetaIcons[tag.icon];
                return (
                  <TestbookPill key={tag.label}>
                    <Icon className="h-3 w-3 shrink-0 text-accent/50" strokeWidth={1.5} />
                    {tag.label}
                  </TestbookPill>
                );
              })}
            </div>
          </div>
          <TestbookHeroHubDiagram />
        </m.div>
      </div>
    </section>
  );
}
