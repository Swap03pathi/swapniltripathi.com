import type { Experience } from './types';

// Chronological work history used across timeline + experience pages.
// Keep this file focused on company/role data only.
export const experiences: Experience[] = [
  {
    slug: 'mpokket',
    title: 'mPokket',
    role: 'Tech Lead, Data Platform',
    period: 'Sept 2026 — Present',
    shortDescription:
      'Leading the data platform team at a consumer-lending fintech — Databricks lakehouse and AWS DMS replication feeding every analytics, data-science, and business team, plus compliance and audit data. Cut Databricks cost ~20% (about $187K annualised) and reclaimed 20 TB from S3 in month one.',
    logoUrl: '/logos/mpokket.png',
    projectSlugs: [
      'mpokket-databricks-cost-optimization',
      'mpokket-delta-storage-reclamation',
      'mpokket-lakehouse-reporting-platform',
    ],
  },
  {
    slug: 'saras',
    title: 'Saras',
    role: 'CTO, Co-Founder',
    period: 'Sept 2024 — Aug 2026',
    shortDescription:
    'Built a signal intelligence platform that captures, parses, and virtually executes trading recommendations across multiple sources. 150K+ downloads, 200K+ daily messages received, <500ms execution latency, 20K concurrent users, 600+ APIs, 98% uptime.',
    logoUrl: '/logos/saras.png',
    projectSlugs: [
      'signal-ingestion-system',
      'realtime-recommendation-ingestion-system',
      'multidimensional-market-intelligence-engine',
      'signal-processing-pipeline',
      'real-time-virtual-execution-system',
      'analytics-aggregation-system',
      'backend-infrastructure',
      'admin-platform',
    ],
  },
  {
    slug: 'apple',
    title: 'Apple',
    role: 'Consulting Data Engineer → Data Scientist',
    period: 'Jan 2022 — July 2024',
    shortDescription:
      'Sole data engineer for an AppleCare analytics org — ~20 production pipelines, ML-based KPI anomaly detection, and an NLP classification pipeline processing 400K+ items daily with a 68% runtime cut.',
    logoUrl: 'https://cdn.simpleicons.org/apple/ffffff',
    projectSlugs: [],
  },
  {
    slug: 'testbook',
    title: 'Testbook',
    role: 'Analyst',
    period: 'Aug 2020 — Jan 2022',
    shortDescription:
      'Owned event instrumentation for 6M+ monthly active users — Redash dashboards on MongoDB, and self-taught automation powering sales operations.',
    logoUrl: '/logos/testbook.png',
    projectSlugs: [],
  },
  {
    slug: 'oyo',
    title: 'OYO',
    role: 'Summer Analyst',
    period: 'Jun 2019 — Jul 2019',
    shortDescription:
    'Scraped OTA listing data and ran ranking-analysis experiments — my first hands-on exposure to real-world data problems, and where I taught myself SQL.',
    logoUrl: 'https://cdn.simpleicons.org/OYO/EE2E24',
    projectSlugs: [ 'oyo-data-scraping',
      'oyo-ranking-analysis'],
  },
  {
    slug: 'ey',
    title: 'EY',
    role: 'Summer Associate',
    period: 'May 2018 — Jul 2018',
    shortDescription:
    'Built my first working system without prior coding experience as part of a national-scale education platform initiative.',
    logoUrl: '/logos/ey.png',
    projectSlugs: [
      'ey-video-validation-system',
      'ey-content-platform-ops',
    ],
  },
];
