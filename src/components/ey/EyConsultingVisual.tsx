import { Check } from 'lucide-react';
import { eyVisualIcons } from './EyIconMap';

const CHECKLIST = ['Content intake', 'Tag & classify', 'Report'] as const;

export default function EyConsultingVisual() {
  const DocIcon = eyVisualIcons.doc;
  const SheetIcon = eyVisualIcons.sheet;

  return (
    <div
      className="mx-auto w-full max-w-sm rounded-xl border border-white/[0.06] bg-white/[0.015] p-4 md:max-w-md md:p-5"
      aria-hidden
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="space-y-2">
          <p className="text-[10px] font-medium uppercase tracking-wider text-white/28">Documents</p>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-2"
            >
              <DocIcon className="h-3.5 w-3.5 shrink-0 text-accent/40" strokeWidth={1.5} />
              <div className="flex-1 space-y-1">
                <div className="h-1 w-full rounded bg-white/[0.07]" />
                <div className="h-1 w-2/3 rounded bg-white/[0.04]" />
              </div>
            </div>
          ))}
        </div>

        <div>
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/28">Sheets</p>
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5">
            <div className="mb-2 flex items-center gap-1.5">
              <SheetIcon className="h-3.5 w-3.5 text-accent/40" strokeWidth={1.5} />
              <span className="text-[10px] text-white/35">Operations grid</span>
            </div>
            <div className="grid grid-cols-4 gap-0.5">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-4 rounded-sm border border-white/[0.04] ${
                    i % 5 === 0 ? 'bg-accent/[0.08]' : 'bg-white/[0.03]'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-white/[0.05] bg-white/[0.02] px-3 py-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/28">Process</p>
        <ul className="mt-2 space-y-2">
          {CHECKLIST.map((step, i) => (
            <li key={step} className="flex items-center gap-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded border border-accent/20 bg-accent/[0.05]">
                <Check className="h-3 w-3 text-accent/55" strokeWidth={2} />
              </span>
              <span className="text-xs text-white/45">{step}</span>
              {i < CHECKLIST.length - 1 ? (
                <span className="ml-auto text-[10px] text-white/15">→</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
