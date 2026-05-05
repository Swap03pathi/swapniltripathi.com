export interface Tool {
  name: string;
  logoUrl: string;
  homepageUrl: string;
}

export interface Project {
  slug: string;
  name: string;
  highlight: string;
  description: string;
  experienceSlug: string;
  period: string;
  githubUrl?: string;
  tools: Tool[];
}

export interface Experience {
  slug: string;
  title: string;
  role: string;
  period: string;
  shortDescription: string;
  fullDescription: string;
  projects: Project[];
  logoUrl: string;
}

export interface Social {
  name: string;
  url: string;
  icon: 'linkedin' | 'whatsapp' | 'email' | 'instagram' | 'github';
}

export const socials: Social[] = [
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/swapniltripathi',
    icon: 'linkedin',
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/919999999999',
    icon: 'whatsapp',
  },
  {
    name: 'Email',
    url: 'mailto:hello@swapniltripathi.com',
    icon: 'email',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/swapniltripathi',
    icon: 'instagram',
  },
];

export const allProjects: Project[] = [
  // Saras projects
  {
    slug: 'trading-execution-engine',
    name: 'Trading Execution Engine',
    highlight: 'High-throughput execution system handling concurrent order flows with custom routing logic.',
    description:
      'Built a high-throughput trading execution engine from scratch that handles concurrent order flows with custom routing logic and real-time state management. The system processes thousands of orders per minute with sub-millisecond latency, ensuring correct order sequencing and state transitions even under peak load conditions. Implemented custom matching algorithms and failover mechanisms to maintain 99.9% uptime during market hours.',
    experienceSlug: 'saras',
    period: 'Jun 2022 — Present',
    githubUrl: 'https://github.com/Swap03pathi/trading-execution-engine',
    tools: [
      { name: 'Go', logoUrl: 'https://cdn.simpleicons.org/go/00ADD8', homepageUrl: 'https://go.dev' },
      { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
      { name: 'Docker', logoUrl: 'https://cdn.simpleicons.org/docker/2496ED', homepageUrl: 'https://docker.com' },
      { name: 'Kubernetes', logoUrl: 'https://cdn.simpleicons.org/kubernetes/326CE5', homepageUrl: 'https://kubernetes.io' },
      { name: 'AWS', logoUrl: 'https://cdn.simpleicons.org/amazonaws/FF9900', homepageUrl: 'https://aws.amazon.com' },
    ],
  },
  {
    slug: 'signal-processing-pipeline',
    name: 'Signal Processing Pipeline',
    highlight: 'Distributed pipeline ingesting 200K+ daily signals with deduplication and real-time alerting.',
    description:
      'Designed and implemented a distributed signal processing pipeline that ingests over 200,000 daily signals from multiple market data sources. The pipeline handles deduplication, normalization, and enrichment before routing signals to downstream consumers. Built with horizontal scalability in mind, the system can absorb 10x signal volume spikes without degradation. Includes real-time alerting for high-priority signals and a replay mechanism for missed events.',
    experienceSlug: 'saras',
    period: 'Aug 2022 — Present',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Apache Kafka', logoUrl: 'https://cdn.simpleicons.org/apachekafka/231F20', homepageUrl: 'https://kafka.apache.org' },
      { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
      { name: 'Docker', logoUrl: 'https://cdn.simpleicons.org/docker/2496ED', homepageUrl: 'https://docker.com' },
      { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
    ],
  },
  {
    slug: 'mobile-platform-backend',
    name: 'Mobile Platform Backend',
    highlight: 'Backend powering 150K+ downloads with high-concurrency API layer and real-time sync.',
    description:
      'Architected and built the entire backend platform for the Saras mobile application, supporting 150,000+ downloads. The system handles high-concurrency API requests, real-time data synchronization, push notifications, and user session management. Implemented rate limiting, caching layers, and circuit breakers to ensure stability under load. The platform was launched within 3 months of starting development.',
    experienceSlug: 'saras',
    period: 'Mar 2022 — Jul 2022',
    githubUrl: 'https://github.com/Swap03pathi/saras-backend',
    tools: [
      { name: 'Node.js', logoUrl: 'https://cdn.simpleicons.org/nodejs/339933', homepageUrl: 'https://nodejs.org' },
      { name: 'TypeScript', logoUrl: 'https://cdn.simpleicons.org/typescript/3178C6', homepageUrl: 'https://typescriptlang.org' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
      { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
      { name: 'AWS', logoUrl: 'https://cdn.simpleicons.org/amazonaws/FF9900', homepageUrl: 'https://aws.amazon.com' },
      { name: 'Firebase', logoUrl: 'https://cdn.simpleicons.org/firebase/FFCA28', homepageUrl: 'https://firebase.google.com' },
    ],
  },

  // Apple projects
  {
    slug: 'data-pipeline-system',
    name: 'Data Pipeline System',
    highlight: 'End-to-end pipeline infrastructure processing terabytes of data daily with automated quality checks.',
    description:
      'Built end-to-end data pipeline infrastructure at Apple that processes terabytes of data daily. The system includes automated quality checks, data validation gates, and self-healing recovery mechanisms. Designed to handle Apple-scale data volumes with strict correctness requirements, the pipeline reduced data freshness latency by 60% while maintaining zero data loss. Integrated with multiple upstream and downstream systems across the organization.',
    experienceSlug: 'apple',
    period: 'Jun 2019 — Mar 2021',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Apache Spark', logoUrl: 'https://cdn.simpleicons.org/apachespark/E25A1C', homepageUrl: 'https://spark.apache.org' },
      { name: 'Apache Airflow', logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE', homepageUrl: 'https://airflow.apache.org' },
      { name: 'HDFS', logoUrl: 'https://cdn.simpleicons.org/apachehadoop/CC0000', homepageUrl: 'https://hadoop.apache.org' },
      { name: 'Scala', logoUrl: 'https://cdn.simpleicons.org/scala/DC322F', homepageUrl: 'https://scala-lang.org' },
      { name: 'SQL', logoUrl: 'https://cdn.simpleicons.org/mysql/4479A1', homepageUrl: 'https://mysql.com' },
    ],
  },
  {
    slug: 'anomaly-detection-system',
    name: 'Anomaly Detection System',
    highlight: 'ML-based detection system identifying outliers in production data streams with configurable alerting.',
    description:
      'Developed an ML-based anomaly detection system that identifies outliers in production data streams in near real-time. The system uses statistical models and machine learning algorithms to detect deviations from expected patterns, with configurable sensitivity thresholds to balance precision and recall. Integrated with on-call alerting systems and built dashboards for anomaly investigation. Reduced false positive alerts by 40% compared to the previous rule-based system.',
    experienceSlug: 'apple',
    period: 'Apr 2021 — Dec 2022',
    githubUrl: 'https://github.com/Swap03pathi/anomaly-detection',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'TensorFlow', logoUrl: 'https://cdn.simpleicons.org/tensorflow/FF6F00', homepageUrl: 'https://tensorflow.org' },
      { name: 'Pandas', logoUrl: 'https://cdn.simpleicons.org/pandas/150458', homepageUrl: 'https://pandas.pydata.org' },
      { name: 'Jupyter', logoUrl: 'https://cdn.simpleicons.org/jupyter/F37626', homepageUrl: 'https://jupyter.org' },
      { name: 'Apache Kafka', logoUrl: 'https://cdn.simpleicons.org/apachekafka/231F20', homepageUrl: 'https://kafka.apache.org' },
      { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
    ],
  },
  {
    slug: 'data-quality-framework',
    name: 'Data Quality Framework',
    highlight: 'Automated framework for data validation and quality scoring across 50+ datasets.',
    description:
      'Created an automated data quality framework that validates and scores data across 50+ production datasets. The framework runs configurable validation rules, tracks quality metrics over time, and generates detailed quality reports. It integrates into CI/CD pipelines to catch data issues before they reach production. The framework became the standard data quality tool within the team and was adopted by 3 other teams across the organization.',
    experienceSlug: 'apple',
    period: 'Jan 2021 — Sep 2021',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Great Expectations', logoUrl: 'https://cdn.simpleicons.org/greatexpectations/FC5A3B', homepageUrl: 'https://greatexpectations.io' },
      { name: 'Apache Airflow', logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE', homepageUrl: 'https://airflow.apache.org' },
      { name: 'SQL', logoUrl: 'https://cdn.simpleicons.org/mysql/4479A1', homepageUrl: 'https://mysql.com' },
      { name: 'Tableau', logoUrl: 'https://cdn.simpleicons.org/tableau/E97627', homepageUrl: 'https://tableau.com' },
    ],
  },

  // Testbook projects
  {
    slug: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    highlight: 'Internal dashboard aggregating user behavior data with real-time metrics and cohort analysis.',
    description:
      'Built an internal analytics dashboard that aggregates user behavior data from multiple sources into a unified view. The dashboard provides real-time metrics, cohort analysis, and funnel visualization to support product decisions. Designed with a self-serve model so product managers could create custom reports without engineering support. The dashboard was used daily by the entire product and leadership team.',
    experienceSlug: 'testbook',
    period: 'Jun 2018 — Feb 2019',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'React', logoUrl: 'https://cdn.simpleicons.org/react/61DAFB', homepageUrl: 'https://react.dev' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
      { name: 'D3.js', logoUrl: 'https://cdn.simpleicons.org/d3js/F9A03C', homepageUrl: 'https://d3js.org' },
      { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
    ],
  },
  {
    slug: 'automated-reporting-system',
    name: 'Automated Reporting System',
    highlight: 'System generating periodic reports, reducing manual reporting effort by 80%.',
    description:
      'Developed an automated reporting system that generates and distributes periodic reports to stakeholders. The system pulls data from multiple sources, applies business logic transformations, and delivers formatted reports via email and Slack. Reduced manual reporting effort by 80% and improved report accuracy by eliminating copy-paste errors. The system handles weekly, monthly, and quarterly report schedules with configurable recipients and formats.',
    experienceSlug: 'testbook',
    period: 'Oct 2018 — Mar 2019',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'SQL', logoUrl: 'https://cdn.simpleicons.org/mysql/4479A1', homepageUrl: 'https://mysql.com' },
      { name: 'Celery', logoUrl: 'https://cdn.simpleicons.org/celery/37814A', homepageUrl: 'https://docs.celeryq.dev' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
    ],
  },
  {
    slug: 'user-segmentation-engine',
    name: 'User Segmentation Engine',
    highlight: 'Engine classifying users into behavioral segments for targeted interventions.',
    description:
      'Built a user segmentation engine that classifies users into behavioral segments based on activity patterns, engagement levels, and learning behavior. The engine runs daily batch jobs to update segment assignments and feeds into the marketing and product personalization systems. Enabled targeted push notifications and email campaigns that improved user retention by 15%. The segmentation logic was designed to be easily extended with new criteria.',
    experienceSlug: 'testbook',
    period: 'Dec 2018 — Mar 2019',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'scikit-learn', logoUrl: 'https://cdn.simpleicons.org/scikitlearn/F7931E', homepageUrl: 'https://scikit-learn.org' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
      { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
      { name: 'Apache Airflow', logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE', homepageUrl: 'https://airflow.apache.org' },
    ],
  },

  // First System projects
  {
    slug: 'core-application',
    name: 'Core Application',
    highlight: 'First end-to-end system built from scratch — handling data ingestion, processing, and output.',
    description:
      'The first real end-to-end system I built from scratch. It handles data ingestion from multiple sources, processes and transforms the data, and generates structured output. This project taught me the fundamentals of building systems that need to work reliably — error handling, logging, monitoring, and graceful degradation. It was the project that sparked my obsession with making things that actually work in the real world, not just in demos.',
    experienceSlug: 'first-system',
    period: 'Jan 2017 — May 2017',
    githubUrl: 'https://github.com/Swap03pathi/core-application',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Flask', logoUrl: 'https://cdn.simpleicons.org/flask/000000', homepageUrl: 'https://flask.palletsprojects.com' },
      { name: 'SQLite', logoUrl: 'https://cdn.simpleicons.org/sqlite/003B57', homepageUrl: 'https://sqlite.org' },
      { name: 'Linux', logoUrl: 'https://cdn.simpleicons.org/linux/FCC624', homepageUrl: 'https://kernel.org' },
    ],
  },
  {
    slug: 'automation-toolkit',
    name: 'Automation Toolkit',
    highlight: 'Collection of scripts and tools built to automate repetitive tasks and reduce manual overhead.',
    description:
      'A collection of scripts and tools built to automate repetitive tasks I encountered daily. From file organization and batch processing to automated backups and system monitoring scripts. Each tool was born out of a real frustration with manual work. The toolkit grew organically as I kept finding things that could be automated. This project taught me the power of small, focused tools that do one thing well — and how composing them creates systems that are greater than the sum of their parts.',
    experienceSlug: 'first-system',
    period: 'Mar 2017 — Aug 2017',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Bash', logoUrl: 'https://cdn.simpleicons.org/gnubash/4EAA25', homepageUrl: 'https://gnu.org/software/bash' },
      { name: 'Cron', logoUrl: 'https://cdn.simpleicons.org/linux/FCC624', homepageUrl: 'https://man7.org/linux/man-pages/man8/cron.8.html' },
      { name: 'Linux', logoUrl: 'https://cdn.simpleicons.org/linux/FCC624', homepageUrl: 'https://kernel.org' },
    ],
  },
  {
    slug: 'monitoring-setup',
    name: 'Monitoring Setup',
    highlight: 'First monitoring and alerting system — because you can\'t fix what you can\'t see.',
    description:
      'My first monitoring and alerting setup. Built because I learned the hard way that you cannot fix what you cannot see. Set up basic health checks, log aggregation, and alerting for my personal projects. This simple system caught issues before they became problems and gave me the confidence to run things in production. It was the beginning of my understanding that observability is not optional — it is foundational to any system that needs to work reliably.',
    experienceSlug: 'first-system',
    period: 'Jun 2017 — Sep 2017',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Prometheus', logoUrl: 'https://cdn.simpleicons.org/prometheus/E6522C', homepageUrl: 'https://prometheus.io' },
      { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
      { name: 'Linux', logoUrl: 'https://cdn.simpleicons.org/linux/FCC624', homepageUrl: 'https://kernel.org' },
    ],
  },
];

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
    projects: allProjects.filter((p) => p.experienceSlug === 'saras'),
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
    projects: allProjects.filter((p) => p.experienceSlug === 'apple'),
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
    projects: allProjects.filter((p) => p.experienceSlug === 'testbook'),
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
    projects: allProjects.filter((p) => p.experienceSlug === 'first-system'),
  },
];

export const thoughts: string[] = [
  'The best system is the one you don\'t have to think about.',
  'Scale is a consequence of getting the fundamentals right.',
  'If it works in production, it works. Everything else is theory.',
  'Build for the real world, not the demo.',
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((p) => p.slug === slug);
}

export function getExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function getExperienceForProject(project: Project): Experience | undefined {
  return experiences.find((e) => e.slug === project.experienceSlug);
}
