import type { Tool } from './types';

export const mpokketHero = {
  eyebrow: 'mPokket Experience',
  title: 'Leading the Data Platform at mPokket',
  description:
    'Tech Lead for the Data Platform team at mPokket, a consumer-lending fintech. The team owns the Databricks lakehouse and the AWS DMS replication feeding it — the tables that analytics, data science, and business teams all read from — plus the pipelines, email reports, compliance datasets, and audit submissions built on top.',
  metadata: [
    { label: 'Tech Lead, Data Platform (Sept 2026 – Present)', icon: 'code' as const },
    { label: 'Databricks Lakehouse', icon: 'layers' as const },
    { label: 'Consumer Lending', icon: 'building' as const },
    { label: 'Bengaluru', icon: 'pin' as const },
  ],
  metrics: [
    { value: '20%', label: 'Databricks Cost Reduced', icon: 'trend' as const },
    { value: '$187K', label: 'Annualised Savings', icon: 'coins' as const },
    { value: '20 TB', label: 'Reclaimed from S3', icon: 'storage' as const },
    { value: 'Org-wide', label: 'Teams Served by the Lakehouse', icon: 'users' as const },
  ],
};

export const mpokketCoreSystems = [
  {
    id: 'lakehouse',
    number: '1',
    icon: 'pipeline' as const,
    title: 'Lakehouse Ingestion & Replication',
    highlight: false,
    bullets: [
      'AWS DMS replication from production databases into Databricks',
      'Builds and maintains the Databricks tables every other team reads from',
      'Pipeline development, scheduling, and day-to-day maintenance',
      'Debugging data issues end to end, from source database to dashboard',
      'Pipeline code versioned and reviewed through GitLab',
    ],
    tools: ['Databricks', 'AWS DMS', 'Delta Lake', 'PySpark', 'SQL', 'GitLab'],
    flow: [
      'Production Databases',
      'AWS DMS Replication',
      'Databricks Lakehouse',
      'Curated Tables',
      'Analytics · Data Science · Business',
    ],
  },
  {
    id: 'reporting',
    number: '2',
    icon: 'report' as const,
    title: 'Reporting, Compliance & Audit Data',
    highlight: false,
    bullets: [
      'Scheduled reports delivered over email to business stakeholders',
      'Curated datasets for reporting, dashboards, and downstream analysis',
      'Compliance datasets and audit data submissions for a regulated lender',
      'One agreed set of numbers shared by analytics, data science, and non-tech teams',
    ],
    tools: ['Databricks', 'SQL', 'Python'],
    flow: [
      'Curated Tables',
      'Scheduled Jobs',
      'Email Reports',
      'Dashboards',
      'Compliance & Audit Submissions',
    ],
  },
  {
    id: 'cost',
    number: '3',
    icon: 'cost' as const,
    title: 'Databricks Cost & Storage Optimisation',
    highlight: true,
    description:
      'The first problem I picked up: nobody could say where the Databricks bill was going. Databricks system tables made spend attributable per job and cluster, and the savings followed from what that exposed.',
    bullets: [
      'Queried Databricks system tables to attribute spend by job, cluster, and workload',
      'Cut Databricks cost by ~20% — about $187K annualised — with AWS savings on top',
      'Tuned Delta VACUUM retention and cleared stale Parquet files',
      'Reclaimed ~20 TB of unnecessary data from S3',
    ],
    tools: ['Databricks System Tables', 'Delta Lake', 'Amazon S3', 'SQL'],
    flow: [
      'System Tables',
      'Spend Attribution',
      'Idle & Oversized Workloads',
      'Right-sizing',
      'VACUUM & Parquet Cleanup',
      'Ongoing Bill Tracking',
    ],
  },
  {
    id: 'team',
    number: '4',
    icon: 'team' as const,
    title: 'Team Leadership & Delivery',
    highlight: false,
    bullets: [
      'Owns platform architecture decisions for the data platform',
      'Sprint planning and workload management across the team',
      'Hiring for the data platform team',
      'Point of contact for analytics, data science, and business data requests',
    ],
    tools: ['Architecture', 'Sprint Planning', 'Hiring'],
    flow: null,
  },
] as const;

export const mpokketTooling: Tool[] = [
  {
    name: 'Databricks',
    logoUrl: 'https://cdn.simpleicons.org/databricks/FF3621',
    homepageUrl: 'https://www.databricks.com/',
  },
  {
    name: 'Apache Spark',
    logoUrl: 'https://cdn.simpleicons.org/apachespark/E25A1C',
    homepageUrl: 'https://spark.apache.org/',
  },
  {
    name: 'Apache Parquet',
    logoUrl: 'https://cdn.simpleicons.org/apacheparquet/50ABF1',
    homepageUrl: 'https://parquet.apache.org/',
  },
  {
    name: 'AWS DMS',
    logoUrl: '/logos/aws-dms.png',
    homepageUrl: 'https://aws.amazon.com/dms/',
    logoImgClassName: 'h-8 w-8 rounded-md',
  },
  {
    name: 'Amazon S3',
    logoUrl: '/logos/aws-s3.png',
    homepageUrl: 'https://aws.amazon.com/s3/',
    logoImgClassName: 'h-8 w-8 rounded-md',
  },
  {
    name: 'GitLab',
    logoUrl: 'https://cdn.simpleicons.org/gitlab/FC6D26',
    homepageUrl: 'https://about.gitlab.com/',
  },
  {
    name: 'Python',
    logoUrl: 'https://cdn.simpleicons.org/python/3776AB',
    homepageUrl: 'https://python.org',
  },
];

export const mpokketClosing =
  'One month in, the rule from Apple still holds: find the thing nobody is watching and own it. At mPokket that was the Databricks bill — so the first thing I built was visibility into spend, and the first real win came straight out of it.';
