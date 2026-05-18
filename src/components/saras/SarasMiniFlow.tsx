/** Elegant horizontal system preview — thin connectors, no dense SVG. */
export default function SarasMiniFlow({ steps }: { steps: readonly string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 md:gap-3">
      {steps.map((step, i) => (
        <div key={step} className="flex items-center gap-2 md:gap-3">
          {i > 0 ? (
            <span className="text-xs text-white/20" aria-hidden>
              →
            </span>
          ) : null}
          <span className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-white/70 md:text-sm">
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}