import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { rrisArchitecturePath } from '../../constants/realtimeRecommendationIngestion';
import {
  rrisChallenges,
  rrisPreviewSources,
  rrisSystemOverview,
} from '../../data/rrisArchitectureCopy';
import { RrisIcon, type RrisIconName } from '../architecture/rris/RrisIcons';

function SourcePreviewCard({ label, icon }: { label: string; icon: RrisIconName }) {
  return (
    <m.div
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-violet-500/[0.06] via-white/[0.03] to-transparent p-4 text-left shadow-[0_0_0_1px_rgba(139,92,246,0.06)] transition-shadow hover:border-violet-400/25 hover:shadow-[0_0_28px_-10px_rgba(139,92,246,0.2)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-violet-400/[0.05] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex flex-col gap-2">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-400/15 bg-violet-500/[0.08] text-violet-200/90">
          <RrisIcon name={icon} className="h-4 w-4" />
        </span>
        <span className="text-[11px] font-semibold leading-snug text-white/85">
          {label}
        </span>
      </div>
    </m.div>
  );
}

export default function RealtimeRecommendationIngestionSections() {
  const navigate = useNavigate();
  const goArch = () => navigate(rrisArchitecturePath());

  return (
    <div className="space-y-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-violet-300/55">
            {rrisSystemOverview.title}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/50">
            {rrisSystemOverview.introParagraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-white/45">{rrisSystemOverview.goalsIntro}</p>
            <ul className="list-disc space-y-2 pl-5 marker:text-violet-400/40">
              {rrisSystemOverview.goals.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-violet-300/55">
            Source preview
          </h2>
          <div className="relative rounded-2xl border border-dashed border-violet-400/15 bg-violet-950/[0.08] p-3 sm:p-4">
            <div className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_50%_0%,rgba(139,92,246,0.12),transparent_60%)]" />
            <div className="relative grid grid-cols-2 gap-3 sm:grid-cols-3">
              {rrisPreviewSources.map((c) => (
                <SourcePreviewCard key={c.id} label={c.label} icon={c.icon} />
              ))}
            </div>
          </div>
          <div className="mt-5 flex justify-center sm:justify-start">
            <m.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={goArch}
              className="inline-flex items-center justify-center rounded-xl border border-violet-400/35 bg-violet-500/[0.12] px-5 py-2.5 text-xs font-semibold tracking-wide text-violet-200 transition-colors hover:border-violet-300/50 hover:bg-violet-500/[0.18]"
            >
              Open architecture
            </m.button>
          </div>
        </div>
      </div>

      <section>
        <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-violet-300/55">
          Key engineering challenges
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {rrisChallenges.map((ch, i) => (
            <m.div
              key={ch.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-sm transition-shadow hover:shadow-[0_0_28px_-12px_rgba(139,92,246,0.15)]"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-r from-transparent via-violet-500/[0.06] to-transparent" />
              <p className="relative text-xs leading-relaxed text-white/55 transition-colors group-hover:text-white/70">
                {ch.title}
              </p>
            </m.div>
          ))}
        </div>
      </section>
    </div>
  );
}
