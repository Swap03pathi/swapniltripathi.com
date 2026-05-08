import { Link } from 'react-router-dom';
import type { Project } from '../data';

type Variant = 'inline' | 'featured';

export default function ProjectHighlightCard({
  project,
  variant = 'inline',
}: {
  project: Project;
  variant?: Variant;
}) {
  if (variant === 'featured') {
    return (
      <Link
        to={`/project/${project.slug}`}
        className="group block h-full rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ease-out hover:z-10 hover:scale-[1.04] hover:border-accent/25 hover:bg-white/[0.06] hover:shadow-[0_14px_44px_-14px_rgba(0,212,255,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40"
      >
        <div className="flex h-full min-h-[108px] flex-col">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-accent">
                {project.name}
              </h3>
              <span className="mt-1 inline-block text-[11px] text-white/25">
                {project.period}
              </span>
            </div>
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-white/10 transition-colors group-hover:text-accent/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </div>

          {/* Short summary (highlight): hidden until hover on home grid */}
          <div className="mt-3 grid grid-rows-[0fr] overflow-hidden transition-[grid-template-rows] duration-300 ease-out group-hover:grid-rows-[1fr]">
            <div className="min-h-0">
              <p className="translate-y-1 pt-0 text-xs leading-relaxed text-white/55 opacity-0 transition-[opacity,transform] duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {project.highlight}
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all hover:border-accent/20 hover:bg-white/[0.04]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="text-sm font-semibold text-white transition-colors group-hover:text-accent">
              {project.name}
            </h3>
            <span className="text-[11px] text-white/20">{project.period}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/40 transition-colors group-hover:text-white/60">
            {project.highlight}
          </p>
        </div>
        <svg
          className="mt-0.5 h-4 w-4 shrink-0 text-white/10 transition-colors group-hover:text-accent/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
