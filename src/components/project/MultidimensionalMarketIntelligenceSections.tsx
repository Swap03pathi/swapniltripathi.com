import { useNavigate } from 'react-router-dom';
import { m } from 'framer-motion';
import { mmieArchitecturePath } from '../../constants/multidimensionalMarketIntelligence';
import {
  mmieChallenges,
  mmieQueryDimensions,
  mmieRedisPreviewCards,
  mmieSystemOverview,
} from '../../data/mmieArchitectureCopy';
import { QueryDimensionNode } from '../architecture/mmie/QueryDimensionNode';
import { MmieGlassPanel } from '../architecture/mmie/MmiePrimitives';

function RedisPreviewStrip() {
  return (
    <div className="space-y-2">
      {mmieRedisPreviewCards.map((c, i) => (
        <m.div
          key={c.id}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06 }}
        >
          <MmieGlassPanel className="px-3 py-2.5" glow="subtle">
            <span className="text-[11px] font-medium text-white/75">{c.label}</span>
          </MmieGlassPanel>
        </m.div>
      ))}
    </div>
  );
}

export default function MultidimensionalMarketIntelligenceSections() {
  const navigate = useNavigate();
  const goArch = () => navigate(mmieArchitecturePath());

  return (
    <div className="space-y-16">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-cyan-400/55">
            {mmieSystemOverview.title}
          </h2>
          <div className="space-y-4 text-sm leading-relaxed text-white/50">
            {mmieSystemOverview.paragraphs.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-cyan-400/55">
            Query complexity visualization
          </h2>
          <div className="relative rounded-2xl border border-dashed border-cyan-500/20 bg-cyan-950/[0.06] p-3 sm:p-4">
            <div className="pointer-events-none absolute inset-0 opacity-40 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.1),transparent_55%)]" />
            <div className="relative grid grid-cols-3 gap-2">
              {mmieQueryDimensions.map((d, i) => (
                <QueryDimensionNode key={d.id} label={d.label} values={d.values} delay={i * 0.03} />
              ))}
            </div>
            <div className="relative mt-4 space-y-2 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-violet-300/70">
                Millions of possible query paths
              </p>
              <p className="text-[11px] font-medium text-cyan-200/80">→ Redis query orchestrator</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-14">
        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-cyan-400/55">
            Redis computation preview
          </h2>
          <RedisPreviewStrip />
          <div className="mt-5 flex justify-center sm:justify-start">
            <m.button
              type="button"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              onClick={goArch}
              className="inline-flex items-center justify-center rounded-xl border border-cyan-500/35 bg-cyan-500/[0.1] px-5 py-2.5 text-xs font-semibold tracking-wide text-cyan-200 transition-colors hover:border-cyan-400/50 hover:bg-cyan-500/[0.14]"
            >
              Open architecture
            </m.button>
          </div>
        </div>

        <div>
          <h2 className="mb-5 text-xs font-medium uppercase tracking-widest text-cyan-400/55">
            Key engineering challenges
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {mmieChallenges.map((title, i) => (
              <m.div
                key={title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-sm transition-shadow hover:shadow-[0_0_28px_-12px_rgba(34,211,238,0.12)]"
              >
                <p className="text-xs leading-relaxed text-white/55">{title}</p>
              </m.div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center border-t border-white/[0.06] pt-10">
        <m.button
          type="button"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={goArch}
          className="inline-flex items-center justify-center rounded-xl border border-cyan-500/40 bg-cyan-500/[0.12] px-8 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100 transition-colors hover:border-cyan-400/55 hover:bg-cyan-500/[0.18]"
        >
          Architecture deep-dive
        </m.button>
      </div>
    </div>
  );
}
