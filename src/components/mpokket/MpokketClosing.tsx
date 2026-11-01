import { m } from 'framer-motion';
import { MPOKKET_SECTION_IDS } from '../../constants/mpokketExperience';
import { mpokketClosing } from '../../data/mpokketExperienceCopy';
import { MpokketCard } from './MpokketPrimitives';

export default function MpokketClosing() {
  return (
    <section id={MPOKKET_SECTION_IDS.closing} className="scroll-mt-28 py-16 md:py-20 lg:py-28">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <m.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <MpokketCard className="mx-auto max-w-3xl px-6 py-10 text-center md:px-10 md:py-12">
            <span className="text-4xl font-serif leading-none text-accent/50" aria-hidden>
              &ldquo;
            </span>
            <p className="mt-4 text-sm leading-relaxed text-white/45 md:text-base md:leading-relaxed">
              {mpokketClosing}
            </p>
          </MpokketCard>
        </m.div>
      </div>
    </section>
  );
}
