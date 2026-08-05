import { m } from 'framer-motion';
import { EY_SECTION_IDS } from '../../constants/eyExperience';
import { eyClosing } from '../../data/eyExperienceCopy';
import { EyCard } from './EyPrimitives';

export default function EyClosing() {
  return (
    <section id={EY_SECTION_IDS.closing} className="scroll-mt-28 py-12 md:py-14">
      <div className="mx-auto max-w-[1000px] px-5 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <EyCard className="mx-auto max-w-2xl px-6 py-8 text-center md:px-8 md:py-9">
            <span className="text-3xl font-serif leading-none text-accent/40" aria-hidden>
              &ldquo;
            </span>
            <p className="mt-3 text-sm leading-relaxed text-white/42 md:text-[0.9375rem]">
              {eyClosing}
            </p>
          </EyCard>
        </m.div>
      </div>
    </section>
  );
}
