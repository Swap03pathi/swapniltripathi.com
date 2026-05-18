import { ChevronDown } from 'lucide-react';

const SOURCES = ['Social Media', 'AppleCare Site', 'Support Data', 'Sprinklr'] as const;

const OUTPUTS = ['Dashboards', 'Operational Visibility', 'Stakeholders'] as const;

export default function AppleHeroFlowDiagram() {
  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6"
      aria-hidden
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent/50">Data flow</p>
      <div className="mt-5 space-y-4">
        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/30">Data sources</p>
          <div className="grid grid-cols-2 gap-2">
            {SOURCES.map((s) => (
              <FlowNode key={s} label={s} small />
            ))}
          </div>
        </div>
        <FlowArrow />
        <div className="grid grid-cols-2 gap-2">
          <FlowNode label="Pipelines" accent />
          <FlowNode label="Anomaly Detection" accent />
        </div>
        <FlowArrow />
        <div className="space-y-2">
          {OUTPUTS.map((o) => (
            <FlowNode key={o} label={o} />
          ))}
        </div>
      </div>
    </div>
  );
}

function FlowNode({
  label,
  accent = false,
  small = false,
}: {
  label: string;
  accent?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border px-2.5 text-center ${
        small ? 'py-2' : 'py-2.5'
      } ${
        accent
          ? 'border-accent/20 bg-accent/[0.06] text-white/70'
          : 'border-white/[0.06] bg-white/[0.02] text-white/50'
      }`}
    >
      <span className={`${small ? 'text-[10px]' : 'text-xs'} leading-snug`}>{label}</span>
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex justify-center text-white/20">
      <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
    </div>
  );
}
