import type { Tool } from './types';
import { TESTBOOK_SECTION_IDS } from '../constants/testbookExperience';

export const testbookHero = {
  eyebrow: 'Testbook Experience',
  title: 'Building Analytics & Operational Foundations at Testbook',
  description:
    'My first job out of college, on a five-person analytics team. Worked across analytics, reporting, product instrumentation, and operational automation workflows supporting product, sales, and growth teams within a fast-moving edtech startup environment.',
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
      'MIS & monthly engagement reporting workflows',
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
      'Planned analytics events, triggers & property schemas',
      'Worked with developers & QA for event implementation',
      'Firebase, WebEngage & pixel instrumentation',
      'GA + Google Tag Manager event planning & user-journey tracking',
      'A/B testing dashboards for PM workflows',
      'Product & growth event tracking',
    ],
    stack: ['Firebase', 'WebEngage', 'Pixel Events', 'A/B Testing'],
  },
  {
    id: 'automation',
    number: '3',
    title: 'Operational Automation',
    accent: 'emerald' as const,
    icon: 'code' as const,
    bullets: [
      'Automated manual data ingestion workflows',
      'Automated recurring reports with Apps Script + MongoDB queries',
      'Google Apps Script + Sheets automation',
      'Bulk lead insertion workflows',
      'REST API integrations',
      'Custom Sheets toolbar actions',
      'Backup workflows using Google Cloud',
    ],
    stack: ['Google Apps Script', 'Google Sheets', 'REST APIs', 'GCP Storage'],
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
    name: 'Google Analytics',
    logoUrl: 'https://cdn.simpleicons.org/googleanalytics/E37400',
    homepageUrl: 'https://analytics.google.com/',
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
    name: 'REST APIs',
    logoUrl: 'https://cdn.simpleicons.org/postman/FF6C37',
    homepageUrl: 'https://www.postman.com/',
  },
  {
    name: 'GCP Storage',
    logoUrl: 'https://cdn.simpleicons.org/googlecloud/4285F4',
    homepageUrl: 'https://cloud.google.com/storage',
  },
];

export const testbookClosing =
  'Testbook gave me early exposure to product analytics, operational automation, and cross-functional execution — shaping the foundation for my later work in production data systems and infrastructure engineering.';

export const testbookSectionNav = [
  { id: TESTBOOK_SECTION_IDS.hero, label: 'Overview' },
  { id: TESTBOOK_SECTION_IDS.workflow, label: 'Workflow' },
  { id: TESTBOOK_SECTION_IDS.workAreas, label: 'Work' },
  { id: TESTBOOK_SECTION_IDS.tooling, label: 'Stack' },
] as const;
