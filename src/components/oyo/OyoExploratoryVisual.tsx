import { BarChart3, Code2, Database, ImageIcon, Table } from 'lucide-react';

export default function OyoExploratoryVisual() {
  return (
    <div
      className="mx-auto w-full max-w-sm rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 md:max-w-md md:p-5"
      aria-hidden
    >
      <div className="rounded-lg border border-dashed border-white/[0.1] bg-white/[0.02] p-3">
        <p className="text-[10px] font-medium text-white/35">Booking.com</p>
        <div className="mt-2 h-6 rounded border border-white/[0.08] bg-white/[0.03] px-2">
          <div className="flex h-full items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-1.5 flex-1 rounded bg-white/[0.06]" />
          </div>
        </div>
        <div className="mt-2 flex gap-2 rounded border border-white/[0.06] bg-white/[0.02] p-2">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded border border-white/[0.06] bg-white/[0.03]">
            <ImageIcon className="h-4 w-4 text-white/20" strokeWidth={1.5} />
          </div>
          <div className="flex-1 space-y-1.5 pt-0.5">
            <div className="h-1.5 w-3/4 rounded bg-white/[0.08]" />
            <div className="h-1 w-1/2 rounded bg-white/[0.05]" />
            <div className="h-1 w-2/3 rounded bg-white/[0.04]" />
          </div>
        </div>
        <div className="mt-1.5 space-y-1">
          {[1, 2].map((i) => (
            <div key={i} className="h-5 rounded border border-white/[0.04] bg-white/[0.015]" />
          ))}
        </div>
      </div>

      <div className="relative my-5 flex items-start justify-center gap-5">
        <span
          className="pointer-events-none absolute left-6 right-6 top-[18px] border-t border-dashed border-accent/15"
          aria-hidden
        />
        <NodeIcon icon={Code2} label="Scrape" />
        <NodeIcon icon={Database} label="SQL" />
        <NodeIcon icon={Table} label="Sheets" />
      </div>

      <div className="rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-3">
        <div className="flex items-end justify-center gap-2">
          {[40, 65, 35, 55].map((h, i) => (
            <div
              key={i}
              className="w-5 rounded-sm bg-accent/25"
              style={{ height: `${h * 0.35}px` }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-center">
          <BarChart3 className="h-3.5 w-3.5 text-accent/35" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}

function NodeIcon({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <div className="relative z-[1] flex flex-col items-center gap-1">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.04]">
        <Icon className="h-4 w-4 text-accent/55" strokeWidth={1.5} />
      </span>
      <span className="text-[9px] text-white/30">{label}</span>
    </div>
  );
}
