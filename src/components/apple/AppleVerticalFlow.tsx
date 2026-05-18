import { ChevronDown } from 'lucide-react';

export default function AppleVerticalFlow({ steps }: { steps: readonly string[] }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/28">Process flow</p>
      <ol className="mt-3 space-y-0">
        {steps.map((step, i) => (
          <li key={step}>
            <div className="flex items-start gap-2.5 py-1.5">
              <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03]">
                <span className="h-1.5 w-1.5 rounded-full bg-accent/50" />
              </span>
              <span className="pt-1 text-xs leading-snug text-white/50">{step}</span>
            </div>
            {i < steps.length - 1 ? (
              <div className="ml-3 flex justify-center py-0.5 text-white/15">
                <ChevronDown className="h-3.5 w-3.5" strokeWidth={1.5} />
              </div>
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
