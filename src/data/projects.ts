import type { Project } from './types';
import { projectSlugs } from './projectSlugs';

// Detailed projects are separated from experience sections so you can
// edit and reorder projects without touching page/component code.
// NOTE: when adding/renaming a project, update projectSlugs.ts too — the
// guard at the bottom of this file fails the build if the lists drift.
export const projects: Project[] = [
  {
    slug: 'mpokket-databricks-cost-optimization',
    name: 'Databricks Cost Attribution & Optimisation',
    period: 'Sept 2026 — Present',
    highlight:
      'Used Databricks system tables to make spend attributable per job and cluster, then cut Databricks cost by ~20% — about $187K annualised.',
    description:
      'When I joined, nobody could say where the Databricks bill was going. Rather than start by reorganising the team, I started with the data: Databricks system tables expose billing usage per workspace, job, cluster, and SKU, so I queried them to attribute every dollar of spend to the workload that caused it.\n\nThat attribution surfaced idle and oversized clusters, jobs running more often than their consumers needed, and compute that could be right-sized without changing what any downstream team saw. Acting on it cut Databricks cost by roughly 20%, about $187K on an annualised basis, with AWS storage savings on top (see the storage reclamation project).\n\nThe same system-table queries now run as ongoing bill tracking, so the cost picture stays visible instead of being rediscovered once a quarter.',
    tools: [
      { name: 'Databricks', logoUrl: 'https://cdn.simpleicons.org/databricks/FF3621', homepageUrl: 'https://www.databricks.com/' },
      { name: 'Apache Spark', logoUrl: 'https://cdn.simpleicons.org/apachespark/E25A1C', homepageUrl: 'https://spark.apache.org/' },
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
    ],
  },
  {
    slug: 'mpokket-delta-storage-reclamation',
    name: 'Delta Table Maintenance & S3 Storage Reclamation',
    period: 'Sept 2026 — Present',
    highlight:
      'Tuned Delta VACUUM and cleared stale Parquet files, reclaiming ~20 TB of unnecessary data from S3 on top of the Databricks savings.',
    description:
      'Delta tables keep old Parquet file versions around until VACUUM removes them, and a lakehouse that nobody has been maintaining accumulates terabytes of files that no query can ever read again.\n\nI audited the tables behind the platform, tuned VACUUM retention to what the teams actually needed for time travel and recovery, and cleared the orphaned Parquet files left behind by rewrites and failed jobs.\n\nThe cleanup removed roughly 20 TB of unnecessary data from S3 — AWS savings that sit on top of the ~20% Databricks cost reduction — and the maintenance now runs as a scheduled part of the platform rather than a one-off.',
    tools: [
      { name: 'Databricks', logoUrl: 'https://cdn.simpleicons.org/databricks/FF3621', homepageUrl: 'https://www.databricks.com/' },
      { name: 'Apache Parquet', logoUrl: 'https://cdn.simpleicons.org/apacheparquet/50ABF1', homepageUrl: 'https://parquet.apache.org/' },
      { name: 'Amazon S3', logoUrl: '/logos/aws-s3.png', homepageUrl: 'https://aws.amazon.com/s3/' },
    ],
  },
  {
    slug: 'mpokket-lakehouse-reporting-platform',
    name: 'Lakehouse Ingestion & Reporting Platform',
    period: 'Sept 2026 — Present',
    highlight:
      'AWS DMS replication into Databricks and the pipelines, email reports, and compliance and audit datasets built on the tables every team reads from.',
    description:
      'The data platform team at mPokket owns the Databricks lakehouse and the AWS DMS replication that feeds it from production databases. The tables we publish are the single source of numbers for analytics, data science, and the non-tech teams that run their dashboards on them.\n\nDay to day that means building and maintaining pipelines, generating scheduled reports delivered over email, preparing curated datasets for reporting and debugging, and producing the compliance datasets and audit submissions a regulated lender has to deliver. Pipeline code lives in GitLab.\n\nAs Tech Lead I own the platform architecture, sprint planning and workload management for the team, and hiring — with user PII handled under strict access controls throughout.',
    tools: [
      { name: 'Databricks', logoUrl: 'https://cdn.simpleicons.org/databricks/FF3621', homepageUrl: 'https://www.databricks.com/' },
      { name: 'AWS DMS', logoUrl: '/logos/aws-dms.png', homepageUrl: 'https://aws.amazon.com/dms/' },
      { name: 'Apache Spark', logoUrl: 'https://cdn.simpleicons.org/apachespark/E25A1C', homepageUrl: 'https://spark.apache.org/' },
      { name: 'GitLab', logoUrl: 'https://cdn.simpleicons.org/gitlab/FC6D26', homepageUrl: 'https://about.gitlab.com/' },
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
    ],
  },
  {
    slug: 'signal-ingestion-system',
    name: 'Multi-Source Signal Ingestion & Parsing',  
    period: 'Sept 2024 — Aug 2026',
    highlight:'Unified ingestion system for Telegram, PDFs, YouTube, news, and Twitter with LLM-based normalization.',

    description:
      'Built a unified ingestion pipeline to capture trading recommendations from multiple unstructured sources including Telegram channels, PDF reports, news articles, YouTube live streams, and Twitter.\n\nEach source had a different ingestion strategy — scraping, API pulls, or third-party tools (e.g., PDF parsing via Pulse AI). Despite differences in input format, all data was normalized into a common structure using LLM-based parsing (ChatGPT API).\n\nThe system handles noisy, inconsistent text inputs and converts them into structured trade signals ready for downstream processing.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },
      { name: 'OpenAI API', logoUrl: 'https://cdn.simpleicons.org/openai/412991', homepageUrl: 'https://openai.com' },
      { name: 'Telethon', logoUrl: 'https://cdn.simpleicons.org/telegram/26A5E4', homepageUrl: 'https://docs.telethon.dev/en/stable/' }      
    ],
  },
  {
      slug: 'signal-processing-pipeline',
    name: 'Signal Processing & Normalization Pipeline',
    period: 'Sept 2024 — Aug 2026',
    highlight:'LLM-powered parsing pipeline converting noisy inputs into structured trade signals.',
  description:
    'Designed a processing layer that transforms raw, unstructured signal data into a standardized format using LLM-based parsing.\n\nThis includes extracting key fields such as ticker, entry price, target, stoploss, and trade type from inconsistent natural language inputs.\n\nThe system ensures all downstream components receive clean, structured, and actionable data regardless of source complexity.',

    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'OpenAI API', logoUrl: 'https://cdn.simpleicons.org/openai/412991', homepageUrl: 'https://openai.com' },
      { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },
  
      
    ],
  },
  {
    slug: 'realtime-recommendation-ingestion-system',
    name: 'Realtime Recommendation Ingestion System',
    period: 'Sept 2024 — Aug 2026',
    highlight:
      'Multi-source realtime ingestion with AI classification, extraction, normalization, and human-in-the-loop verification.',
    description:
      'Built realtime and batch ingestion paths across Telegram, PDF reports, YouTube livestreams, Twitter/X, news APIs, and Perplexity-augmented discovery.\n\nEach connector applied source-specific reliability patterns — deduplication, rate limits, OCR and frame pipelines, and queue-backed processing — before converging on a shared LLM classification and extraction stack.\n\nThe platform minimized irrelevant API spend via a two-stage model workflow, normalized inconsistent advisor language into a single trade schema, and gated publication through operational moderation for downstream execution readiness.',
    tools: [
      {
        name: 'Python',
        logoUrl: 'https://cdn.simpleicons.org/python/3776AB',
        homepageUrl: 'https://python.org',
      },
      {
        name: 'MongoDB',
        logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248',
        homepageUrl: 'https://mongodb.com',
      },
      {
        name: 'Redis',
        logoUrl: 'https://cdn.simpleicons.org/redis/DC382D',
        homepageUrl: 'https://redis.io',
      },
      {
        name: 'OpenAI',
        logoUrl: 'https://cdn.simpleicons.org/openai/412991',
        homepageUrl: 'https://openai.com',
      },
      {
        name: 'Celery',
        logoUrl: 'https://cdn.simpleicons.org/celery/37814A',
        homepageUrl: 'https://docs.celeryq.dev',
      },
      {
        name: 'Telethon',
        logoUrl: 'https://cdn.simpleicons.org/telegram/26A5E4',
        homepageUrl: 'https://docs.telethon.dev/en/stable/',
      },
      {
        name: 'OpenCV',
        logoUrl: 'https://cdn.simpleicons.org/opencv/5C3EE8',
        homepageUrl: 'https://opencv.org',
      },
      {
        name: 'AWS S3',
        logoUrl: 'https://cdn.simpleicons.org/amazons3/569A31',
        homepageUrl: 'https://aws.amazon.com/s3/',
      },
      {
        name: 'AWS EC2',
        logoUrl: '/logos/ec2.png',
        homepageUrl: 'https://aws.amazon.com/ec2/',
        logoImgClassName: 'h-7 w-7',
      },
    ],
  },
  {
    slug: 'multidimensional-market-intelligence-engine',
    name: 'Multidimensional Market Intelligence Engine',
    period: 'Sept 2024 — Aug 2026',
    highlight:
      'Realtime multidimensional computation infrastructure for filtering, ranking, scoring, and serving continuously mutating market intelligence.',
    description:
      'Designed and built a realtime multidimensional intelligence computation engine capable of dynamically filtering, ranking, scoring, and serving continuously mutating market trade intelligence at scale.\n\nThe system powered advisor rankings, trade discovery, live profit-potential sorting, multidimensional filtering, and realtime analytics across thousands of active market signals while avoiding expensive aggregation bottlenecks.\n\nTraditional caching approaches became ineffective due to combinatorial filter permutations combined with continuously changing live market prices. To solve this, the architecture evolved from database-centric aggregation into a Redis-powered distributed computation layer using sorted sets, incremental ranking systems, ID-first filtering, partial hydration strategies, and event-driven state synchronization.\n\nThe engine transformed Redis from a simple caching layer into a realtime market intelligence orchestration system capable of handling dynamic ranking, live recomputation, rolling advisor scoring, and multidimensional query execution under constantly changing market state.',
    tools: [
      { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
      { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },
      { name: 'Node.js', logoUrl: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', homepageUrl: 'https://nodejs.org' },
      { name: 'AWS ECS', logoUrl: '/logos/ECS.png', homepageUrl: 'https://aws.amazon.com/ecs/' },
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      {
        name: 'Apache Airflow',
        logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE',
        homepageUrl: 'https://airflow.apache.org',
      },
      { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
      { name: 'Prometheus', logoUrl: 'https://cdn.simpleicons.org/prometheus/E6522C', homepageUrl: 'https://prometheus.io' },
    ],
  },
  {
    slug: 'real-time-virtual-execution-system',
    name: 'Real-Time Virtual Execution System',
    period: 'Sept 2024 — Aug 2026',
    highlight:
      'Persistent real-time virtual trade execution and state tracking against live websocket prices.',
    description:
      'Designed and built a persistent real-time virtual execution system that continuously tracked advisor recommendations against live websocket market prices.\n\nThe architecture replaced an interval-based cron/Lambda pipeline with a stateful worker-driven system powered by Redis, MongoDB, websocket subscriptions, and automated recovery workflows.\n\nThe system dynamically managed active ticker pools, processed high-volume tick streams, minimized execution latency, and maintained strong consistency between real-time state and long-term persistence layers.',
    tools: [
      {
        name: 'Node.js',
        logoUrl: 'https://cdn.simpleicons.org/nodedotjs/5FA04E',
        homepageUrl: 'https://nodejs.org',
      },
      {
        name: 'Redis',
        logoUrl: 'https://cdn.simpleicons.org/redis/DC382D',
        homepageUrl: 'https://redis.io',
      },
      {
        name: 'MongoDB',
        logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248',
        homepageUrl: 'https://mongodb.com',
      },
      {
        name: 'AWS EC2',
        logoUrl: '/logos/ec2.png',
        homepageUrl: 'https://aws.amazon.com/ec2/',
        logoImgClassName: 'h-7 w-7',
      },
      {
        name: 'Socket.IO',
        logoUrl: 'https://cdn.simpleicons.org/socketdotio/ffffff',
        homepageUrl: 'https://socket.io/',
      },
      {
        name: 'Grafana',
        logoUrl: 'https://cdn.simpleicons.org/grafana/F46800',
        homepageUrl: 'https://grafana.com',
      },
      {
        name: 'Prometheus',
        logoUrl: 'https://cdn.simpleicons.org/prometheus/E6522C',
        homepageUrl: 'https://prometheus.io',
      },
    ],
  },
  {
    slug: 'analytics-aggregation-system',
    name: 'Real-Time Analytics & Aggregation Engine',
  period: 'Sept 2024 — Aug 2026',
  highlight:
  'High-performance aggregation system using Redis for real-time filtering and advisor performance metrics.',
description:
  'Designed a high-performance analytics layer to compute advisor performance across multiple dimensions.\n\nSupports filtering based on timeframe (daily, weekly, etc.), strategy type (intraday, swing, BTST), instrument type (stocks, futures, options), and custom date ranges.\n\nInstead of querying MongoDB for heavy aggregations, the system uses Redis for pre-computed and fast-access data, significantly improving response time and reducing compute load.',

  tools: [
    { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
    { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },
    { name: 'Node.js', logoUrl: 'https://cdn.simpleicons.org/nodedotjs/339933', homepageUrl: 'https://nodejs.org' },

    
  ],
  },
  {
    slug: 'backend-infrastructure',
    name: 'Backend Infrastructure & Scaling System',
  period: 'Sept 2024 — Aug 2026',
  highlight:
    'ECS-based backend with Redis caching, load balancing, and high-uptime architecture.',
  description:
    'Architected the backend infrastructure using AWS ECS with load balancing for API serving.\n\nImplemented Redis within the same VPC for fast data access and periodic synchronization. Built a system to sync data efficiently between storage layers to ensure consistent and low-latency responses.\n\nIntegrated monitoring and alerting using Grafana and Prometheus to maintain 98% uptime under load.\n\nFocused heavily on cost optimization while maintaining performance and reliability.',

  tools: [
    { name: 'AWS ECS', logoUrl: 'https://cdn.simpleicons.org/amazonaws/FF9900', homepageUrl: 'https://aws.amazon.com/ecs/' },
    { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
    { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
    { name: 'Prometheus', logoUrl: 'https://cdn.simpleicons.org/prometheus/E6522C', homepageUrl: 'https://prometheus.io' },
    { name: 'Docker', logoUrl: 'https://cdn.simpleicons.org/docker/2496ED', homepageUrl: 'https://docker.com' },
    
  ],
  },
  {
    slug: 'admin-platform',
  name: 'Internal Admin & Operations Platform',
  period: 'Sept 2024 — Aug 2026',
  highlight:
    'Internal tooling to manage data validation, updates, and operational workflows without engineering dependency.',
  description:
    'Designed internal systems and workflows to allow non-technical teams to manage and verify data, trigger updates, and send notifications.\n\nReduced dependency on engineering for operational tasks by enabling structured workflows through internal tools.\n\nWorked closely with developers and stakeholders to ensure business logic and system integrity.',

  tools: [
    { name: 'React', logoUrl: 'https://cdn.simpleicons.org/react/61DAFB', homepageUrl: 'https://react.dev' },
    { name: 'Node.js', logoUrl: 'https://cdn.simpleicons.org/nodedotjs/339933', homepageUrl: 'https://nodejs.org' },
    { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },

    
  ],
  },
  {
    slug: 'ey-content-platform-ops',
    name: 'Content & Operations System',
    highlight: 'Structured large-scale educational content and workflows across multiple states.',
    description: 'Worked on assembling and organizing a catalogue of 700+ educational videos across multiple states.\n\nCollaborated with a large network of instructors to tag and structure content using SEO-optimized keywords.\n\nBuilt tools (including VBA-based systems) to collect structured data from educators and support platform operations.',
    tools: [
      { name: 'Excel', logoUrl: 'https://cdn.simpleicons.org/microsoftexcel/217346', homepageUrl: 'https://microsoft.com/excel' },
      { name: 'VBA', logoUrl: 'https://cdn.simpleicons.org/microsoft/5E5E5E', homepageUrl: 'https://learn.microsoft.com/en-us/office/vba/' },
    ],
    period: 'May 2018 — Jul 2018'
  },
  {
    slug: 'ey-video-validation-system',
    name: 'Automated Video Validation System',
    highlight:
      'First working system built without prior coding experience to detect broken content links.',
    description:
      'Built an automated system to identify broken or blocked YouTube videos within a large educational content repository.\n\nThe system scanned submitted links and flagged unavailable content, enabling replacement workflows.\n\nThis was developed without prior coding experience, relying on self-learning and problem-solving under real constraints.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'YouTube', logoUrl: 'https://cdn.simpleicons.org/youtube/FF0000', homepageUrl: 'https://youtube.com' },
    ],period: 'May 2018 — Jul 2018'
  },
  {
    slug: 'oyo-ranking-analysis',
    name: 'Ranking & Pricing Analysis System',
    highlight:
      'Regression-based analysis to improve search ranking and pricing consistency.',
    description:
      'Applied statistical models to analyze dependencies between different variables affecting hotel ranking.\n\nEvaluated discount strategies across platforms to ensure pricing parity and prevent price masking.\n\nDesigned dashboards to monitor listing performance across platforms. The ranking experiments were inconclusive — an honest early lesson in exploratory analytics.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
      { name: 'Excel', logoUrl: 'https://cdn.simpleicons.org/microsoftexcel/217346', homepageUrl: 'https://microsoft.com/excel' },
    ],
    period: 'Jun 2019 — Jul 2019'
  },{
    slug: 'oyo-data-scraping',
    name: 'OTA Data Scraping System',
    highlight:
      'Python-based scraper to collect data across multiple travel platforms.',
    description:
      'Built a data scraping system to collect hotel listing data from multiple Online Travel Agents.\n\nEnabled structured data collection across platforms for downstream analysis and performance tracking.\n\nThis was one of my first hands-on systems involving real-world data extraction.',
    tools: [
      { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
    ],period: 'Jun 2019 — Jul 2019'
  },
  {
    slug: 'finman',
    name: 'Finman — On-Device AI Personal CFO',
    period: 'June 2026',
    highlight:
      'Privacy-first Android "AI Personal CFO" that reads bank SMS entirely on-device to track income, expenses and savings — TypeScript engine + Flutter port kept in lockstep by golden vectors.',
    description:
      'A privacy-first Android app that parses transactional bank/UPI SMS on the device and turns them into a clean, reconciled personal ledger — income, expenses, savings, and per-account balances.\n\nBuilt solo, end-to-end: a framework-free TypeScript reference engine, a Flutter/Dart device port kept in lockstep by golden vectors, and a NestJS + Prisma + PostgreSQL server that only ever sees redacted skeletons.\n\nPassion project — Android-only by necessity, foundation complete, source open.',
    tools: [
      { name: 'Flutter', logoUrl: 'https://cdn.simpleicons.org/flutter/02569B', homepageUrl: 'https://flutter.dev' },
      { name: 'Dart', logoUrl: 'https://cdn.simpleicons.org/dart/0175C2', homepageUrl: 'https://dart.dev' },
      { name: 'TypeScript', logoUrl: 'https://cdn.simpleicons.org/typescript/3178C6', homepageUrl: 'https://typescriptlang.org' },
      { name: 'NestJS', logoUrl: 'https://cdn.simpleicons.org/nestjs/E0234E', homepageUrl: 'https://nestjs.com' },
      { name: 'Prisma', logoUrl: 'https://cdn.simpleicons.org/prisma/2D3748', homepageUrl: 'https://prisma.io' },
      { name: 'PostgreSQL', logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1', homepageUrl: 'https://postgresql.org' },
      { name: 'Jest', logoUrl: 'https://cdn.simpleicons.org/jest/C21325', homepageUrl: 'https://jestjs.io' },
    ],
  }
];

// Drift guard: routes.tsx prerenders /project/* purely from projectSlugs.ts (so the
// entry chunk never pulls in this file). This runs at module scope during the SSG
// build's Node evaluation and fails the build if the slug lists diverge.
const declaredSlugs = new Set<string>(projectSlugs);
if (projects.length !== declaredSlugs.size || projects.some((p) => !declaredSlugs.has(p.slug))) {
  throw new Error('src/data/projectSlugs.ts is out of sync with src/data/projects.ts');
}