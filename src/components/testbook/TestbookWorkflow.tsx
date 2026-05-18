import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { TESTBOOK_SECTION_IDS } from '../../constants/testbookExperience';
import { testbookWorkflowSteps } from '../../data/testbookExperienceCopy';
import { testbookWorkflowIcons } from './TestbookIconMap';
import { TestbookSection } from './TestbookPrimitives';

export default function TestbookWorkflow() {
  return (
    <TestbookSection
      id={TESTBOOK_SECTION_IDS.workflow}
      title="From Data to Decisions"
      className="border-b border-white/[0.06]"
    >
      <div className="-mx-1 flex gap-3 overflow-x-auto pb-2 md:mx-0 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible md:pb-0">
        {testbookWorkflowSteps.map((step, i) => {
          const Icon = testbookWorkflowIcons[step.icon];
          return (
            <div key={step.id} className="flex min-w-[168px] flex-1 items-stretch md:min-w-0">
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className="flex flex-1 flex-col rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-accent/15 hover:bg-white/[0.03]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.06]">
                  <Icon className="h-4 w-4 text-accent/70" strokeWidth={1.5} />
                </span>
                <h3 className="mt-3 text-sm font-semibold text-white/85">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/40">{step.description}</p>
              </motion.div>
              {i < testbookWorkflowSteps.length - 1 ? (
                <div className="hidden shrink-0 items-center px-1 text-accent/30 md:flex">
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </TestbookSection>
  );
}
