import type { Project } from '../data/experiences';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="p-5 rounded-lg border border-white/5 bg-white/[0.02] hover:border-accent/15 hover:bg-white/[0.04] transition-all">
      <h4 className="text-sm font-semibold text-white">{project.name}</h4>
      <p className="text-xs text-white/40 mt-2 leading-relaxed">
        {project.description}
      </p>
    </div>
  );
}
