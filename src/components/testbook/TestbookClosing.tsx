import { m } from 'framer-motion';
import { TESTBOOK_SECTION_IDS } from '../../constants/testbookExperience';
import { testbookClosing } from '../../data/testbookExperienceCopy';
import { TestbookCard } from './TestbookPrimitives';

export default function TestbookClosing() {
  return (
    <section id={TESTBOOK_SECTION_IDS.closing} className="scroll-mt-28 py-14 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <TestbookCard className="mx-auto max-w-3xl px-6 py-10 text-center md:px-10 md:py-12">
            <span className="text-4xl font-serif leading-none text-accent/50" aria-hidden>
              &ldquo;
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base md:leading-relaxed">
              {testbookClosing}
            </p>
          </TestbookCard>
        </m.div>
      </div>
    </section>
  );
}
