import type { Tool } from './types';

export const appleHero = {
  eyebrow: 'Apple Experience',
  title: 'Building Operational Data Infrastructure at Apple',
  description:
    'Worked across analytics, social listening, and data science workflows within AppleCare Digital to build and maintain production-grade data pipelines, anomaly detection systems, and operational reporting infrastructure.',
  metadata: [
    { label: 'Consulting Data Engineer → Data Scientist (2022–2024)', icon: 'code' as const },
    { label: 'Analytics & BI', icon: 'chart' as const },
    { label: 'AppleCare Digital', icon: 'building' as const },
    { label: 'Social Listening', icon: 'radio' as const },
  ],
  metrics: [
    { value: '~20', label: 'Production Pipelines', icon: 'pipeline' as const },
    { value: '100k+', label: 'Social Posts / Day', icon: 'posts' as const },
    { value: '400K+', label: 'Items Classified / Day', icon: 'stack' as const },
    { value: '68%', label: 'Pipeline Runtime Cut', icon: 'workflow' as const },
  ],
};

export const appleCoreSystems = [
  {
    id: 'analytics',
    number: '1',
    icon: 'pipeline' as const,
    title: 'Analytics Infrastructure',
    highlight: false,
    bullets: [
      'Built and maintained end-to-end production pipelines',
      'DAGs, cron workflows, aggregate tables & automation',
      'Monitoring, alerts, backfills & operational maintenance',
      'Temporary launch workflows for NPI & WWDC support',
      'Social listening ingestion pipelines from Sprinklr',
    ],
    tools: ['Python', 'Snowflake', 'Teradata', 'MySQL'],
    flow: [
      'Data Ingestion',
      'Processing',
      'Automation',
      'Monitoring',
      'Operational Tables',
    ],
  },
  {
    id: 'kpi-anomaly',
    number: '2',
    icon: 'alert' as const,
    title: 'KPI Anomaly Detection System',
    highlight: true,
    bullets: [
      'Forecasts each KPI from its own recent history',
      'Scores daily values against expected deviation bands',
      'Distance from the band sets severity — P1, P2, or P3',
      'Anomalies emailed to the stakeholder who owns that KPI',
      'Backed by a centralized monitoring dashboard',
    ],
    tools: ['Python', 'SQL', 'Snowflake', 'Tableau'],
    flow: [
      'Historical KPI Data',
      'Prediction Model',
      'Expected Range Calculation',
      'Standard Deviation Thresholding',
      'P1 / P2 / P3 Alerts',
      'Stakeholder Notifications',
    ],
  },
  {
    id: 'pci',
    number: '3',
    icon: 'classify' as const,
    title: 'Social Listening Classification System',
    highlight: false,
    description:
      'Operational ML workflows for classifying product-related discussions, issues, and feature-level signals from social media and support interactions to improve visibility and proactive response workflows.',
    bullets: [
      'Multi-source ingestion workflows',
      'BERT classification pipelines',
      'FLAN-T5 summarization workflows',
      'FAISS vector matching for issue identification',
      'Dynamic issue category creation',
      'GPU-accelerated processing with Airflow orchestration',
    ],
    tools: ['Python', 'BERT', 'FLAN-T5', 'FAISS', 'Airflow', 'CUDA'],
    flow: [
      'Multi-source Data',
      'Deduplication',
      'BERT Classification',
      'FLAN-T5 Summarization',
      'FAISS Matching',
      'Issue Categorization',
      'Dashboard Visibility',
    ],
  },
] as const;

export const appleTooling: Tool[] = [
  {
    name: 'Python',
    logoUrl: 'https://cdn.simpleicons.org/python/3776AB',
    homepageUrl: 'https://python.org',
  },
  {
    name: 'Snowflake',
    logoUrl: 'https://cdn.simpleicons.org/snowflake/29B5E8',
    homepageUrl: 'https://www.snowflake.com/',
  },
  {
    name: 'Tableau',
    logoUrl: 'https://cdn.simpleicons.org/tableau/E97627',
    homepageUrl: 'https://www.tableau.com/',
  },
  {
    name: 'Teradata',
    logoUrl: 'https://cdn.simpleicons.org/teradata/FF6600',
    homepageUrl: 'https://www.teradata.com/',
  },
  {
    name: 'MySQL',
    logoUrl: 'https://cdn.simpleicons.org/mysql/4479A1',
    homepageUrl: 'https://www.mysql.com/',
  },
  {
    name: 'Airflow',
    logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE',
    homepageUrl: 'https://airflow.apache.org/',
  },
  {
    name: 'SimCloud',
    logoUrl: 'https://cdn.simpleicons.org/apple/ffffff',
    homepageUrl: '',
    logoImgClassName: 'h-6 w-6',
  },
  {
    name: 'CUDA Processing',
    logoUrl: 'https://cdn.simpleicons.org/nvidia/76B900',
    homepageUrl: 'https://developer.nvidia.com/cuda-zone',
    logoImgClassName: 'h-7 w-7',
  },
];

export const appleOperationalStats = [
  { label: 'Production Pipelines', value: '~20', icon: 'pipeline' as const },
  { label: 'Social Listening Workflows', value: 'Multi-source', icon: 'listening' as const },
  { label: 'Monitoring Systems', value: 'KPI + Classification', icon: 'monitor' as const },
  { label: 'Automation Workflows', value: 'DAG + Cron', icon: 'automation' as const },
] as const;

export const appleClosing =
  'My rule at Apple was simple: never do the same task twice. Anything manual I inherited got automated — so an entire analytics org\'s reporting, alerting, and data workflows kept running without needing someone to babysit them.';

