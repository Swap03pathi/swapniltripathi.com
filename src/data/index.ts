import { experiences } from './experiences';
import { projects } from './projects';
import { highlightedProjectSlugs, thoughts } from './sections';
import { socials } from './socials';
import type { Experience, Project } from './types';

// Fast lookup map used by page-level helper functions.
const projectBySlug = new Map(projects.map((project) => [project.slug, project]));

export const allProjects = projects;

export function getProjectBySlug(slug: string): Project | undefined {
  return projectBySlug.get(slug);
}

export function getExperienceForProject(project: Project): Experience | undefined {
  return experiences.find((experience) => experience.projectSlugs.includes(project.slug));
}

export function getProjectsForExperience(experience: Experience): Project[] {
  return experience.projectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project));
}

export function getHighlightedProjects(): Project[] {
  return highlightedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((project): project is Project => Boolean(project));
}

export { experiences, thoughts, socials };
export type { Experience, Project, SocialLink, Tool } from './types';
