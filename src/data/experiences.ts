export interface Project {
  name: string;
  description: string;
}

export interface Experience {
  slug: string;
  title: string;
  role: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  projects: Project[];
}

export const experiences: Experience[] = [
  {
    slug: 'saras',
    title: 'Saras',
    role: 'CTO, Co-Founder',
    period: '2022 — Present',
    shortDescription:
      'Built and scaled the core platform from scratch. 150K+ downloads, 200K+ daily signals, 99.9% uptime.',
    fullDescription:
      'As CTO and Co-Founder, I architected and built the entire technical platform from zero. We launched in 3 months, scaled to 150,000+ downloads, and processed 200K+ daily signals with high-concurrency backend systems and custom execution logic. Maintained 99.9% uptime while optimizing for cost and scale.',
    projects: [
      {
        name: 'Trading Execution Engine',
        description:
          'High-throughput execution system handling concurrent order flows with custom routing logic and real-time state management.',
      },
      {
        name: 'Signal Processing Pipeline',
        description:
          'Distributed pipeline ingesting 200K+ daily signals with deduplication, normalization, and real-time alerting.',
      },
    ],
  },
  {
    slug: 'apple',
    title: 'Apple',
    role: 'Data Engineer → Data Scientist',
    period: '2019 — 2022',
    shortDescription:
      'Worked across Data Engineering and Data Science, building systems that handled production-scale data workflows.',
    fullDescription:
      'Started in Data Engineering building robust pipeline infrastructure, then transitioned to Data Science where I developed analytical systems and models. Worked on systems that needed to be reliable at Apple scale — handling massive data volumes with strict correctness requirements.',
    projects: [
      {
        name: 'Data Pipeline System',
        description:
          'End-to-end data pipeline infrastructure processing terabytes of data daily with automated quality checks and recovery.',
      },
      {
        name: 'Anomaly Detection System',
        description:
          'ML-based detection system identifying outliers in production data streams with configurable sensitivity and alerting.',
      },
    ],
  },
  {
    slug: 'testbook',
    title: 'Testbook',
    role: 'Analyst',
    period: '2018 — 2019',
    shortDescription:
      'Data analysis and building internal tools to support product decisions at scale.',
    fullDescription:
      'Worked as an analyst building data-driven tools and reports that directly influenced product strategy. Developed internal systems that automated reporting and provided actionable insights for the team.',
    projects: [
      {
        name: 'Analytics Dashboard',
        description:
          'Internal dashboard aggregating user behavior data with real-time metrics and cohort analysis.',
      },
      {
        name: 'Automated Reporting System',
        description:
          'System that generated and distributed periodic reports, reducing manual reporting effort by 80%.',
      },
    ],
  },
  {
    slug: 'first-system',
    title: 'First System',
    role: 'Early Project',
    period: 'Before 2018',
    shortDescription:
      'The first real system I built — where the obsession with making things work started.',
    fullDescription:
      'The project that started it all. Before the titles and the companies, there was a system I built from scratch that actually worked. This is where I learned that building things that run reliably in the real world is fundamentally different from building things that just run.',
    projects: [
      {
        name: 'Core Application',
        description:
          'First end-to-end system built from scratch — handling data ingestion, processing, and output generation.',
      },
      {
        name: 'Automation Toolkit',
        description:
          'Collection of scripts and tools built to automate repetitive tasks and reduce manual overhead.',
      },
    ],
  },
];

export const thoughts: string[] = [
  'The best system is the one you don\'t have to think about.',
  'Scale is a consequence of getting the fundamentals right.',
  'If it works in production, it works. Everything else is theory.',
  'Build for the real world, not the demo.',
];
