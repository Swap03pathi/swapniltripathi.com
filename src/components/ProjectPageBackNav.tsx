import { Link, useLocation } from 'react-router-dom';
import type { Project } from '../data';
import { getExperienceForProject } from '../data';

type NavState = { from?: string } | null | undefined;

function labelForPath(path: string): string {
  if (path === '/') return 'Back home';
  if (path.includes('/architecture')) return 'Back to architecture';
  if (path.startsWith('/experience')) return 'Back to experience';
  return 'Back';
}

/**
 * Primary navigation off a project detail page: prefers the referrer path
 * passed through router location state (set by links into this page).
 */
export default function ProjectPageBackNav({ project }: { project: Project }) {
  const location = useLocation();
  const state = location.state as NavState;
  const from = state?.from;

  const experience = getExperienceForProject(project);
  const fallbackPath = experience ? `/experience/${experience.slug}` : '/';

  const to =
    typeof from === 'string' &&
    from.startsWith('/') &&
    !from.startsWith('//') &&
    from !== location.pathname
      ? from
      : fallbackPath;

  const label = labelForPath(to);

  return (
    <Link
      to={to}
      replace={false}
      className="mb-8 inline-flex items-center gap-1.5 text-xs text-white/30 transition-colors hover:text-white/60"
    >
      <svg
        className="h-3 w-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
      {label}
    </Link>
  );
}
