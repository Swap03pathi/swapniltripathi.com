import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { rteArchitecturePath } from '../../constants/realTimeVirtualExecution';
import {
  rteChallenges,
  rtePreviewCards,
  rteSystemOverviewLeft,
} from '../../data/rteArchitectureCopy';
import { RteIcon, type RteIconName } from '../architecture/rte/RteIcons';

function PreviewCard({ label, icon }: { label: string; icon: RteIconName }) {
  return (
    <m.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.05] to-transparent p-4 text-left shadow-[0_0_0_1px_rgba(0,212,255,0.04)] transition-shadow hover:border-accent/25 hover:shadow-[0_0_28px_-10px_rgba(0,212,255,0.18)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-border-shine bg-[length:200%_100%]" />
      <div className="relative flex flex-col gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent/75">
          <RteIcon name={icon} className="h-4 w-4" />
        </span>
        <span className="text-[11px] font-semibold leading-snug text-white/85">
          {label}
        </span>
      </div>
    </m.div>
  );
}

export default function RealTimeVirtualExecutionSections() {
  const navigate = useNavigate();
  const goArch = () => navigate(rteArchitecturePath());

  const preview = rtePreviewCards;

  return (
    <div className="space-y-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-5">
            {rteSystemOverviewLeft.title}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/50">
            {rteSystemOverviewLeft.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-white/45">
              States:{' '}
              {rteSystemOverviewLeft.states.map((s, i) => (
                <span key={s}>
                  <code className="text-accent/60">{s}</code>
                  {i < rteSystemOverviewLeft.states.length - 1 ? ' · ' : ''}
                </span>
              ))}
            </p>
            <p>{rteSystemOverviewLeft.afterStates}</p>
            <p className="text-white/45">{rteSystemOverviewLeft.goalsIntro}</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-accent/35">
              {rteSystemOverviewLeft.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-5">
            Architecture preview
          </h2>
          <div className="relative rounded-2xl border border-dashed border-white/[0.08] p-3 sm:p-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {preview.map((c) => (
                <PreviewCard key={c.id} label={c.label} icon={c.icon} />
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:justify-start">
            <m.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={goArch}
              className="inline-flex items-center justify-center rounded-xl border border-accent/35 bg-accent/[0.1] px-5 py-2.5 text-xs font-semibold tracking-wide text-accent transition-colors hover:border-accent/50 hover:bg-accent/[0.14]"
            >
              Open architecture
            </m.button>
          </div>
        </div>
      </div>

      <section>
        <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-5">
          Key Engineering Challenges
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {rteChallenges.map((ch, i) => (
            <m.div
              key={ch.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-sm transition-shadow hover:shadow-[0_0_28px_-12px_rgba(0,212,255,0.12)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-transparent via-accent/[0.05] to-transparent animate-border-shine bg-[length:200%_100%]" />
              <div className="relative flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-accent/70">
                  <RteIcon name={ch.icon} className="h-4 w-4" />
                </span>
                <p className="text-xs leading-relaxed text-white/55 transition-colors group-hover:text-white/70">
                  {ch.title}
                </p>
              </div>
            </m.div>
          ))}
        </div>
      </section>
    </div>
  );
}
