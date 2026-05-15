import { Fragment } from 'react';
import { motion } from 'framer-motion';
import { mmieQueryExecutionSteps } from '../../../data/mmieArchitectureCopy';
import { MmieGlassPanel, MmieSectionShell } from './MmiePrimitives';

function StepBlock({
  cmd,
  desc,
  i,
}: {
  cmd: string;
  desc: string;
  i: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.03 }}
      className="min-w-0"
    >
      <MmieGlassPanel className="h-full p-3 md:p-4" glow={i % 2 === 0 ? 'cyan' : 'subtle'}>
        <p className="font-mono text-sm font-semibold leading-tight text-cyan-200/95 md:text-base">{cmd}</p>
        <p className="mt-1.5 text-sm leading-snug text-slate-500">{desc}</p>
      </MmieGlassPanel>
    </motion.div>
  );
}

function HorizontalConnector() {
  return (
    <div
      className="hidden items-center justify-center self-center text-[10px] font-medium text-slate-600 xl:flex"
      aria-hidden
    >
      →
    </div>
  );
}

export function QueryExecutionSection() {
  const steps = mmieQueryExecutionSteps;

  return (
    <MmieSectionShell number="04" eyebrow="Execution" title="Query execution flow">
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
        Set intersections and sorted-set operations first — hydrate documents only at the boundary.
      </p>

      {/* Mobile / tablet: dense vertical stack */}
      <div className="space-y-2 xl:hidden">
        {steps.map((step, i) => (
          <Fragment key={step.cmd}>
            {i > 0 ? (
              <div className="flex justify-center py-0.5" aria-hidden>
                <div className="h-4 w-px bg-gradient-to-b from-cyan-500/15 to-violet-500/10" />
              </div>
            ) : null}
            <StepBlock cmd={step.cmd} desc={step.desc} i={i} />
          </Fragment>
        ))}
      </div>

      {/* Desktop: horizontally dominant — two rows of four */}
      <div className="hidden xl:block">
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-y-2">
          {steps.slice(0, 4).map((step, i) => (
            <Fragment key={step.cmd}>
              <StepBlock cmd={step.cmd} desc={step.desc} i={i} />
              {i < 3 ? <HorizontalConnector /> : null}
            </Fragment>
          ))}
        </div>
        <div className="mt-2 flex justify-center py-1" aria-hidden>
          <div className="h-5 w-px bg-gradient-to-b from-cyan-500/12 to-violet-500/10" />
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] items-stretch gap-y-2">
          {steps.slice(4, 8).map((step, i) => (
            <Fragment key={step.cmd}>
              <StepBlock cmd={step.cmd} desc={step.desc} i={i + 4} />
              {i < 3 ? <HorizontalConnector /> : null}
            </Fragment>
          ))}
        </div>
      </div>
    </MmieSectionShell>
  );
}
