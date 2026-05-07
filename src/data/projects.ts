import type { Project } from './types';

// Detailed projects are separated from experience sections so you can
// edit and reorder projects without touching page/component code.
export const projects: Project[] = [
  {
    slug: 'signal-ingestion-system',
    name: 'Multi-Source Signal Ingestion & Parsing',  
    period: 'Sept 2024 — Present',
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
    period: 'Sept 2024 — Present',
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
    slug: 'virtual-execution-engine',
  name: 'Virtual Trade Execution Engine',
  period: 'Sept 2024 — Present',
  highlight:
    'Stateful execution system that tracks trades using real-time price feeds and dynamic exit conditions.',
  description:
    'Built a virtual execution engine that tracks trades in real time based on live market prices.\n\nThe system consumes structured signals and continuously matches them against live price feeds using sockets and APIs. Trades remain active until exit conditions such as target, stoploss, time constraints, or expiry are triggered.\n\nHandles dynamic updates, maintains trade state, and ensures accurate PnL calculation without actual order placement.',

  tools: [
    { name: 'Node.js', logoUrl: 'https://cdn.simpleicons.org/nodedotjs/339933', homepageUrl: 'https://nodejs.org' },
    { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },
    { name: 'WebSocket', logoUrl: 'https://cdn.simpleicons.org/socketdotio/010101', homepageUrl: 'https://socket.io' },
    { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
  
    
  ],
  },
  {
    slug: 'analytics-aggregation-system',
    name: 'Real-Time Analytics & Aggregation Engine',
  period: 'Sept 2024 — Present',
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
  period: 'Sept 2024 — Present',
  highlight:
    'ECS-based backend with Redis caching, load balancing, and high-uptime architecture.',
  description:
    'Architected the backend infrastructure using AWS ECS with load balancing for API serving.\n\nImplemented Redis within the same VPC for fast data access and periodic synchronization. Built a system to sync data efficiently between storage layers to ensure consistent and low-latency responses.\n\nIntegrated monitoring and alerting using Grafana and Prometheus to maintain 99.9% uptime under load.\n\nFocused heavily on cost optimization while maintaining performance and reliability.',

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
  period: 'Sept 2024 — Present',
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
      'Applied statistical models to analyze dependencies between different variables affecting hotel ranking.\n\nEvaluated discount strategies across platforms to ensure pricing parity and prevent price masking.\n\nDesigned dashboards for monitoring performance across 2500+ listings and proposed improvements for customer retention.',
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
  }
];
