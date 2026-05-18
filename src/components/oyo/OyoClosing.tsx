import { motion } from 'framer-motion';
import { OYO_SECTION_IDS } from '../../constants/oyoExperience';
import { oyoClosing } from '../../data/oyoExperienceCopy';
import { OyoCard } from './OyoPrimitives';

export default function OyoClosing() {
  return (
    <section id={OYO_SECTION_IDS.closing} className="scroll-mt-28 py-12 md:py-14 lg:py-16">
      <div className="mx-auto max-w-[1040px] px-5 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <OyoCard className="mx-auto max-w-2xl border-accent/10 px-6 py-9 text-center md:px-10 md:py-10">
            <span className="text-3xl font-serif leading-none text-accent/45" aria-hidden>
              &ldquo;
            </span>
            <p className="mt-3 text-sm leading-relaxed text-white/42 md:text-[0.9375rem]">
              {oyoClosing}
            </p>
          </OyoCard>
        </motion.div>
      </div>
    </section>
  );
}
