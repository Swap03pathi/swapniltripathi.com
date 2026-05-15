import { mmieOutcomes } from '../../../data/mmieArchitectureCopy';
import { MmieSectionShell } from './MmiePrimitives';
import { OutcomeCard } from './OutcomeCard';

export function OperationalOutcomesSection() {
  return (
    <MmieSectionShell number="09" eyebrow="Impact" title="Operational outcomes" compact>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {mmieOutcomes.map((t, i) => (
          <OutcomeCard key={t} text={t} delay={i * 0.04} />
        ))}
      </div>
    </MmieSectionShell>
  );
}
