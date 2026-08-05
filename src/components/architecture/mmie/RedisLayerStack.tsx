import { m } from 'framer-motion';
import { mmieRedisLayers } from '../../../data/mmieArchitectureCopy';
import { MmieGlassPanel, MmieSectionShell } from './MmiePrimitives';

const accentBar: Record<(typeof mmieRedisLayers)[number]['accent'], string> = {
  emerald: 'from-emerald-400/40 to-emerald-400/0',
  sky: 'from-sky-400/40 to-sky-400/0',
  amber: 'from-amber-400/40 to-amber-400/0',
  violet: 'from-violet-400/40 to-violet-400/0',
  cyan: 'from-cyan-400/40 to-cyan-400/0',
};

export function RedisLayerStack() {
  return (
    <MmieSectionShell number="03" eyebrow="Orchestration" title="Redis computation architecture">
      <p className="mb-5 max-w-3xl text-sm leading-relaxed text-slate-400 md:text-base">
        Redis as a <span className="text-slate-200">layered computation substrate</span> — sorted sets, sets, and
        hashes composing live ranking and intelligence under continuous mutation.
      </p>
      <div className="space-y-2.5">
        {mmieRedisLayers.map((layer, i) => (
          <m.div
            key={layer.n}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <MmieGlassPanel className="overflow-hidden p-0" glow="subtle">
              <div className={`h-px w-full bg-gradient-to-r ${accentBar[layer.accent]}`} />
              <div className="grid grid-cols-12 gap-4 p-4 sm:gap-5 sm:p-5">
                <div className="col-span-12 flex items-start gap-3 sm:col-span-4 lg:col-span-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] text-xs font-bold text-slate-500">
                    {layer.n}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Layer {layer.n}</p>
                    <p className="mt-0.5 text-base font-semibold leading-snug text-white lg:text-lg">{layer.name}</p>
                  </div>
                </div>
                <div className="col-span-12 sm:col-span-8 lg:col-span-6">
                  <div className="flex flex-wrap gap-1.5">
                    {layer.keys.map((k) => (
                      <code
                        key={k}
                        className="rounded border border-cyan-500/10 bg-cyan-500/[0.04] px-2 py-0.5 font-mono text-xs text-cyan-100/85 sm:text-sm"
                      >
                        {k}
                      </code>
                    ))}
                  </div>
                  {'fields' in layer && layer.fields ? (
                    <p className="mt-2 text-sm text-slate-500">
                      <span className="font-medium text-slate-400">Fields</span> — {layer.fields.join(' · ')}
                    </p>
                  ) : null}
                </div>
                <div className="col-span-12 lg:col-span-3">
                  <p className="text-sm leading-relaxed text-slate-500 lg:text-right">{layer.purpose}</p>
                </div>
              </div>
            </MmieGlassPanel>
          </m.div>
        ))}
      </div>
    </MmieSectionShell>
  );
}
