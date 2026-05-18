import { Database } from 'lucide-react';
import { testbookHeroOutputs, testbookHeroSources } from '../../data/testbookExperienceCopy';
import { testbookHubIcons } from './TestbookIconMap';

function HubNode({
  label,
  iconKey,
}: {
  label: string;
  iconKey: keyof typeof testbookHubIcons;
}) {
  const Icon = testbookHubIcons[iconKey];
  return (
    <div className="flex items-center gap-2.5 rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.03]">
        <Icon className="h-3.5 w-3.5 text-white/45" strokeWidth={1.5} />
      </span>
      <span className="text-xs leading-snug text-white/55">{label}</span>
    </div>
  );
}

export default function TestbookHeroHubDiagram() {
  return (
    <div
      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6"
      aria-hidden
    >
      <div className="flex flex-col items-stretch gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
        <div className="space-y-2 lg:flex-1">
          {testbookHeroSources.map((s) => (
            <HubNode key={s.label} label={s.label} iconKey={s.icon} />
          ))}
        </div>

        <div className="flex shrink-0 flex-col items-center gap-2 px-2">
          <div className="hidden h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/25 bg-accent/[0.08] shadow-[0_0_32px_-16px_rgba(0,212,255,0.25)]">
            <Database className="h-6 w-6 text-accent/70" strokeWidth={1.5} />
          </div>
          <div className="hidden h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block" />
          <div className="flex gap-1 text-white/20 lg:hidden">
            <span className="text-[10px]">↓</span>
          </div>
        </div>

        <div className="space-y-2 lg:flex-1">
          {testbookHeroOutputs.map((o) => (
            <HubNode key={o.label} label={o.label} iconKey={o.icon} />
          ))}
        </div>
      </div>
    </div>
  );
}
