import { Link } from 'react-router-dom';
import type { Project } from '../data';

export default function ProjectHighlightCard({ project }: { project: Project }) {
  return (
    <Link
      to={`/project/${project.slug}`}
      className="group block p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/20 hover:bg-white/[0.04] transition-all"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h3 className="text-sm font-semibold text-white group-hover:text-accent transition-colors">
              {project.name}
            </h3>
            <span className="text-[11px] text-white/20">{project.period}</span>
          </div>
          <p className="text-xs text-white/40 mt-2 leading-relaxed group-hover:text-white/60 transition-colors">
            {project.highlight}
          </p>
        </div>
        <svg
          className="w-4 h-4 text-white/10 group-hover:text-accent/60 mt-0.5 transition-colors flex-shrink-0"
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
