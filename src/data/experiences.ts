import type { Experience } from './types';

// Chronological work history used across timeline + experience pages.
// Keep this file focused on company/role data only.
export const experiences: Experience[] = [
  {
    slug: 'saras',
    title: 'Saras',
    role: 'CTO, Co-Founder',
    period: 'Mar 2022 — Present',
    shortDescription:
      'Built and scaled the core platform from scratch. 150K+ downloads, 200K+ daily signals, 99.9% uptime.',
    fullDescription:
      'As CTO and Co-Founder, I architected and built the entire technical platform from zero. We launched in 3 months, scaled to 150,000+ downloads, and processed 200K+ daily signals with high-concurrency backend systems and custom execution logic. Maintained 99.9% uptime while optimizing for cost and scale.',
    logoUrl: 'https://cdn.simpleicons.org/gnubash/4EAA25',
    projectSlugs: [
      'trading-execution-engine',
      'signal-processing-pipeline',
      'mobile-platform-backend',
    ],
  },
  {
    slug: 'apple',
    title: 'Apple',
    role: 'Data Engineer → Data Scientist',
    period: 'Jun 2019 — Dec 2022',
    shortDescription:
      'Worked across Data Engineering and Data Science, building systems that handled production-scale data workflows.',
    fullDescription:
      'Started in Data Engineering building robust pipeline infrastructure, then transitioned to Data Science where I developed analytical systems and models. Worked on systems that needed to be reliable at Apple scale — handling massive data volumes with strict correctness requirements.',
    logoUrl: 'https://cdn.simpleicons.org/apple/000000',
    projectSlugs: [
      'data-pipeline-system',
      'anomaly-detection-system',
      'data-quality-framework',
    ],
  },
  {
    slug: 'testbook',
    title: 'Testbook',
    role: 'Analyst',
    period: 'Jun 2018 — Mar 2019',
    shortDescription:
      'Data analysis and building internal tools to support product decisions at scale.',
    fullDescription:
      'Worked as an analyst building data-driven tools and reports that directly influenced product strategy. Developed internal systems that automated reporting and provided actionable insights for the team.',
    logoUrl: 'https://cdn.simpleicons.org/gnubash/4EAA25',
    projectSlugs: [
      'analytics-dashboard',
      'automated-reporting-system',
      'user-segmentation-engine',
    ],
  },
  {
    slug: 'first-system',
    title: 'First System',
    role: 'Early Project',
    period: 'Jan 2017 — Sep 2017',
    shortDescription:
      'The first real system I built — where the obsession with making things work started.',
    fullDescription:
      'The project that started it all. Before the titles and the companies, there was a system I built from scratch that actually worked. This is where I learned that building things that run reliably in the real world is fundamentally different from building things that just run.',
    logoUrl: 'https://cdn.simpleicons.org/gnubash/4EAA25',
    projectSlugs: ['core-application', 'automation-toolkit', 'monitoring-setup'],
  },
];
