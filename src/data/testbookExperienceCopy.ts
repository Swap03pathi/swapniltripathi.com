import type { Tool } from './types';

export const testbookHero = {
  eyebrow: 'Testbook Experience',
  title: 'Building Analytics & Operational Foundations at Testbook',
  role: 'Analyst · Aug 2020 — Jan 2022',
  description:
    'My first job out of college, on a five-person analytics team inside a fast-moving edtech startup. Worked across analytics, reporting, product instrumentation, and operational automation supporting product, sales, and growth teams.',
  metadata: [
    { label: 'Analytics', icon: 'chart' as const },
    { label: 'Redash', icon: 'dashboard' as const },
    { label: 'MongoDB', icon: 'database' as const },
    { label: 'Firebase', icon: 'firebase' as const },
    { label: 'Google Apps Script', icon: 'script' as const },
  ],
};

export const testbookHeroSources = [
  { label: 'Data Sources', icon: 'database' as const },
  { label: 'Product Events', icon: 'zap' as const },
  { label: 'Sales Operations', icon: 'users' as const },
  { label: 'Manual Inputs', icon: 'file' as const },
] as const;

export const testbookHeroOutputs = [
  { label: 'Analytics & Dashboards', icon: 'chart' as const },
  { label: 'Alerts & Notifications', icon: 'bell' as const },
  { label: 'Operational Automation', icon: 'workflow' as const },
  { label: 'Decision Support', icon: 'target' as const },
] as const;

export const testbookWorkflowSteps = [
  {
    id: 'collect',
    title: 'Collect',
    description: 'Data from multiple operational and product sources',
    icon: 'collect' as const,
  },
  {
    id: 'process',
    title: 'Process',
    description: 'Query, transform, and structure data for reporting',
    icon: 'process' as const,
  },
  {
    id: 'analyze',
    title: 'Analyze',
    description: 'Build dashboards and derive operational insights',
    icon: 'analyze' as const,
  },
  {
    id: 'alert',
    title: 'Alert',
    description: 'Configure alerts using business thresholds',
    icon: 'alert' as const,
  },
  {
    id: 'act',
    title: 'Act',
    description: 'Enable teams to make data-driven decisions',
    icon: 'act' as const,
  },
] as const;

export const testbookWorkAreas = [
  {
    id: 'product-analytics',
    number: '1',
    title: 'Product Analytics & Dashboards',
    accent: 'accent' as const,
    icon: 'chart' as const,
    bullets: [
      'MongoDB querying across collections',
      'Redash dashboards for product, sales & marketing',
      'Query-based alert systems',
      'MIS & monthly engagement/growth reporting',
      'Adhoc analytical support for teams',
    ],
    stack: ['MongoDB', 'Redash', 'SQL (Mongo Queries)'],
  },
  {
    id: 'instrumentation',
    number: '2',
    title: 'Event Instrumentation & Experimentation',
    accent: 'violet' as const,
    highlight: true,
    icon: 'target' as const,
    bullets: [
      'Event instrumentation for 6M+ monthly active users (Google Tag Manager + WebEngage)',
      'Owned event planning — triggers, properties, and schemas',
      'Drove dev + QA through implementation and release',
      'Built A/B-testing dashboards in Firebase for product managers',
      'Pixel event tracking across product & growth funnels',
    ],
    stack: ['Firebase', 'WebEngage', 'Google Tag Manager', 'Pixel Events', 'A/B Testing'],
  },
  {
    id: 'automation',
    number: '3',
    title: 'Operational Automation',
    accent: 'emerald' as const,
    icon: 'code' as const,
    bullets: [
      'The defining build: self-taught JavaScript (pre-AI era) to automate a manual sales workflow',
      'Built a Google Apps Script custom toolbar the sales team used daily',
      'Bulk-inserted leads into the production database via REST APIs (POST/GET) straight from Sheets',
      'Became critical tooling for sales operations',
      'PySpark data automation & Airflow DAG authoring',
      'Backup workflows using Google Cloud',
    ],
    stack: ['Google Apps Script', 'JavaScript', 'REST APIs', 'PySpark', 'Airflow', 'GCP Storage'],
  },
] as const;

export const testbookTooling: Tool[] = [
  {
    name: 'MongoDB',
    logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248',
    homepageUrl: 'https://www.mongodb.com/',
  },
  {
    name: 'Redash',
    logoUrl: 'https://cdn.simpleicons.org/redash/E8472A',
    homepageUrl: 'https://redash.io/',
  },
  {
    name: 'Firebase',
    logoUrl: 'https://cdn.simpleicons.org/firebase/FFCA28',
    homepageUrl: 'https://firebase.google.com/',
  },
  {
    name: 'WebEngage',
    logoUrl: 'https://cdn.simpleicons.org/webengage/ffffff',
    homepageUrl: 'https://webengage.com/',
  },
  {
    name: 'Google Tag Manager',
    logoUrl: 'https://cdn.simpleicons.org/googletagmanager/246FDB',
    homepageUrl: 'https://tagmanager.google.com/',
  },
  {
    name: 'Google Apps Script',
    logoUrl: 'https://cdn.simpleicons.org/googleappsscript/4285F4',
    homepageUrl: 'https://developers.google.com/apps-script',
  },
  {
    name: 'Google Sheets',
    logoUrl: 'https://cdn.simpleicons.org/googlesheets/34A853',
    homepageUrl: 'https://www.google.com/sheets/about/',
  },
  {
    name: 'PySpark',
    logoUrl: 'https://cdn.simpleicons.org/apachespark/E25A1C',
    homepageUrl: 'https://spark.apache.org/',
  },
  {
    name: 'Airflow',
    logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE',
    homepageUrl: 'https://airflow.apache.org/',
  },
  {
    name: 'GCP Storage',
    logoUrl: 'https://cdn.simpleicons.org/googlecloud/4285F4',
    homepageUrl: 'https://cloud.google.com/storage',
  },
];

export const testbookClosing =
  'Testbook gave me early exposure to product analytics, operational automation, and cross-functional execution — shaping the foundation for my later work in production data systems and infrastructure engineering.';
