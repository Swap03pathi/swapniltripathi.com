import type { Project } from './types';

// Detailed projects are separated from experience sections so you can
// edit and reorder projects without touching page/component code.
export const projects: Project[] = [
  {
    slug: 'trading-execution-engine',
    name: 'Trading Execution Engine',
    period: 'Jun 2022 — Present',
    highlight:
      'High-throughput execution system for concurrent order flows with custom routing logic.',
    description:
      'Built a low-latency execution system that handles high concurrency and maintains strict state consistency across workflows.',
    githubUrl: 'https://github.com/Swap03pathi/trading-execution-engine',
    tools: [
      { name: 'Go', logoUrl: 'https://cdn.simpleicons.org/go/00ADD8', homepageUrl: 'https://go.dev' },
      { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
    ],
  },
  {
    slug: 'signal-processing-pipeline',
    name: 'Signal Processing Pipeline',
    period: 'Aug 2022 — Present',
    highlight:
      'Distributed signal ingestion and normalization pipeline for 200K+ events/day.',
    description:
      'Designed and operated a reliable ingestion + deduplication pipeline with near real-time downstream delivery and alerting.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Apache Kafka', logoUrl: 'https://cdn.simpleicons.org/apachekafka/231F20', homepageUrl: 'https://kafka.apache.org' },
      { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
    ],
  },
  {
    slug: 'mobile-platform-backend',
    name: 'Mobile Platform Backend',
    period: 'Mar 2022 — Jul 2022',
    highlight:
      'Backend powering 150K+ downloads with high-concurrency API layer and real-time sync.',
    description:
      'Architected and built the backend platform for the Saras mobile application with real-time data sync, notifications, and resilient API behavior under load.',
    githubUrl: 'https://github.com/Swap03pathi/saras-backend',
    tools: [
      { name: 'Node.js', logoUrl: 'https://cdn.simpleicons.org/nodejs/339933', homepageUrl: 'https://nodejs.org' },
      { name: 'TypeScript', logoUrl: 'https://cdn.simpleicons.org/typescript/3178C6', homepageUrl: 'https://typescriptlang.org' },
      { name: 'AWS', logoUrl: 'https://cdn.simpleicons.org/amazonaws/FF9900', homepageUrl: 'https://aws.amazon.com' },
    ],
  },
  {
    slug: 'data-pipeline-system',
    name: 'Data Pipeline System',
    period: '2019 — 2022',
    highlight:
      'Production-grade data pipelines processing large daily volumes with quality controls.',
    description:
      'Built resilient end-to-end pipelines with validation, monitoring, and recovery workflows for analytics correctness at scale.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Apache Spark', logoUrl: 'https://cdn.simpleicons.org/apachespark/E25A1C', homepageUrl: 'https://spark.apache.org' },
      { name: 'Apache Airflow', logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE', homepageUrl: 'https://airflow.apache.org' },
    ],
  },
  {
    slug: 'anomaly-detection-system',
    name: 'Anomaly Detection System',
    period: '2019 — 2022',
    highlight:
      'ML-based anomaly detection to catch critical outliers in production streams.',
    description:
      'Implemented a configurable anomaly scoring and alerting setup to surface abnormal behavior across high-volume datasets.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'TensorFlow', logoUrl: 'https://cdn.simpleicons.org/tensorflow/FF6F00', homepageUrl: 'https://tensorflow.org' },
      { name: 'Pandas', logoUrl: 'https://cdn.simpleicons.org/pandas/150458', homepageUrl: 'https://pandas.pydata.org' },
    ],
  },
  {
    slug: 'data-quality-framework',
    name: 'Data Quality Framework',
    period: 'Jan 2021 — Sep 2021',
    highlight:
      'Automated framework for data validation and quality scoring across production datasets.',
    description:
      'Created a reusable quality framework with validation checks, scoring, and reporting that caught data issues before release.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Great Expectations', logoUrl: 'https://cdn.simpleicons.org/greatexpectations/FC5A3B', homepageUrl: 'https://greatexpectations.io' },
      { name: 'Tableau', logoUrl: 'https://cdn.simpleicons.org/tableau/E97627', homepageUrl: 'https://www.tableau.com' },
    ],
  },
  {
    slug: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    period: '2020 — 2021',
    highlight:
      'Internal dashboard for user behavior metrics, cohorts, and product trend tracking.',
    description:
      'Created actionable analytics dashboards used by product teams to understand engagement and prioritize roadmap decisions.',
    tools: [
      { name: 'SQL', logoUrl: 'https://cdn.simpleicons.org/mysql/4479A1', homepageUrl: 'https://mysql.com' },
      { name: 'Tableau', logoUrl: 'https://cdn.simpleicons.org/tableau/E97627', homepageUrl: 'https://www.tableau.com' },
    ],
  },
  {
    slug: 'automated-reporting-system',
    name: 'Automated Reporting System',
    period: '2020 — 2021',
    highlight:
      'Automated reporting pipeline that significantly reduced manual reporting effort.',
    description:
      'Built scheduled report generation and distribution workflows that improved consistency and reduced manual data operations.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'SQL', logoUrl: 'https://cdn.simpleicons.org/mysql/4479A1', homepageUrl: 'https://mysql.com' },
      { name: 'Celery', logoUrl: 'https://cdn.simpleicons.org/celery/37814A', homepageUrl: 'https://docs.celeryq.dev' },
    ],
  },
  {
    slug: 'user-segmentation-engine',
    name: 'User Segmentation Engine',
    period: 'Dec 2018 — Mar 2019',
    highlight:
      'Engine classifying users into behavioral segments for targeted interventions.',
    description:
      'Implemented segmentation logic and automated updates that enabled retention-focused targeting across user cohorts.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'scikit-learn', logoUrl: 'https://cdn.simpleicons.org/scikitlearn/F7931E', homepageUrl: 'https://scikit-learn.org' },
      { name: 'Apache Airflow', logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE', homepageUrl: 'https://airflow.apache.org' },
    ],
  },
  {
    slug: 'core-application',
    name: 'Core Application',
    period: 'Before 2018',
    highlight: 'First complete system built end-to-end from ingestion to output.',
    description:
      'Implemented the first production-like software system from scratch, including data flow, processing rules, and output handling.',
    githubUrl: 'https://github.com/Swap03pathi/core-application',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Flask', logoUrl: 'https://cdn.simpleicons.org/flask/000000', homepageUrl: 'https://flask.palletsprojects.com' },
      { name: 'SQLite', logoUrl: 'https://cdn.simpleicons.org/sqlite/003B57', homepageUrl: 'https://sqlite.org' },
    ],
  },
  {
    slug: 'automation-toolkit',
    name: 'Automation Toolkit',
    period: 'Before 2018',
    highlight: 'Small utility scripts that removed repetitive manual operations.',
    description:
      'Assembled scripts and helpers to automate recurring tasks and speed up day-to-day engineering workflows.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Bash', logoUrl: 'https://cdn.simpleicons.org/gnubash/4EAA25', homepageUrl: 'https://gnu.org/software/bash' },
      { name: 'Cron', logoUrl: 'https://cdn.simpleicons.org/linux/FCC624', homepageUrl: 'https://man7.org/linux/man-pages/man8/cron.8.html' },
    ],
  },
  {
    slug: 'monitoring-setup',
    name: 'Monitoring Setup',
    period: 'Jun 2017 — Sep 2017',
    highlight:
      "First monitoring and alerting system — because you can't fix what you can't see.",
    description:
      'Built early monitoring and alerting pipelines with basic health checks and dashboards to improve production reliability.',
    tools: [
      { name: 'Prometheus', logoUrl: 'https://cdn.simpleicons.org/prometheus/E6522C', homepageUrl: 'https://prometheus.io' },
      { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
      { name: 'Linux', logoUrl: 'https://cdn.simpleicons.org/linux/FCC624', homepageUrl: 'https://kernel.org' },
    ],
  },
];
