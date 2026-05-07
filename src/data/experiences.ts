import type { Experience } from './types';

// Chronological work history used across timeline + experience pages.
// Keep this file focused on company/role data only.
export const experiences: Experience[] = [
  {
    slug: 'saras',
    title: 'Saras',
    role: 'CTO, Co-Founder',
    period: 'Sept 2024 — Present',
    shortDescription:
    'Built a signal intelligence platform that captures, parses, and virtually executes trading recommendations across multiple sources. 150K+ downloads, 200K+ daily signals, 99.9% uptime.',
    fullDescription:
    'Saras (formerly Finosauras) is a signal intelligence platform designed to capture trading recommendations from multiple unstructured sources and convert them into structured, trackable, and virtually executed trades.\n\nAs CTO and Co-Founder, I built the system from scratch — covering ingestion, processing, execution, and infrastructure — with a focus on reliability, speed, and cost efficiency.\n\nThe platform ingests signals from Telegram, PDFs, news articles, YouTube live streams, and Twitter, normalizes them using LLM-based parsing, and executes them virtually using real-time price feeds. Trades remain active until exit conditions such as target, stoploss, expiry, or time-based rules are met.\n\nWe launched the platform within 3 months and scaled to over 150,000 downloads, processing 200K+ signals daily while maintaining 99.9% uptime.\n\nThe company raised $500K+ in pre-seed funding and was featured on Shark Tank India.',
    logoUrl: 'https://cdn.simpleicons.org/gnubash/4EAA25',
    projectSlugs: [
      'signal-ingestion-system',
      'signal-processing-pipeline',
      'virtual-execution-engine',
      'analytics-aggregation-system',
      'backend-infrastructure',
      'admin-platform',
    ],
  },
  {
    slug: 'apple',
    title: 'Apple',
    role: 'Data Engineer → Data Scientist',
    period: 'Jan 2022 — July 2024',
    shortDescription:
      'Worked across Data Engineering and Data Science, building systems that handled production-scale data workflows.',
    fullDescription:
      'Started in Data Engineering building robust pipeline infrastructure, then transitioned to Data Science where I developed analytical systems and models. Worked on systems that needed to be reliable at Apple scale — handling massive data volumes with strict correctness requirements.',
    logoUrl: 'https://simpleicons.org/icons/apple.svg',
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
