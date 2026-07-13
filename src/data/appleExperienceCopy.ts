/** Apple tooling tiles — some tools are internal (no homepage) or have no public logo. */
export type AppleTool = {
  name: string;
  logoUrl?: string;
  homepageUrl?: string;
  /** Tailwind size classes for the tool logo (e.g. raster marks). Default h-8 w-8. */
  logoImgClassName?: string;
};

export const appleHero = {
  eyebrow: 'Apple Experience',
  title: 'Building Operational Data Infrastructure at Apple',
  tenure:
    'Consulting Data Engineer, Jan 2022 – Jun 2023 → Consulting Data Scientist, Jun 2023 – Jul 2024',
  description:
    'Sole data engineer for an entire analytics org — every pipeline, alert, and data workflow across AppleCare Digital’s social listening ran through systems I built and maintained. Promoted to data scientist after automating the full data-engineering workload and bringing prediction models into the pipelines.',
  metadata: [
    { label: 'Data Engineer → Data Scientist (promoted 2023)', icon: 'code' as const },
    { label: 'Analytics & BI', icon: 'chart' as const },
    { label: 'AppleCare Digital', icon: 'building' as const },
    { label: 'Social Listening', icon: 'radio' as const },
  ],
  metrics: [
    { value: '~20', label: 'Production Data Pipelines', icon: 'pipeline' as const },
    { value: '400K+', label: 'Items Classified / Day', icon: 'posts' as const },
    { value: '48 × 14', label: 'KPIs × Locales Monitored', icon: 'workflow' as const },
    { value: '68%', label: 'Pipeline Runtime Cut', icon: 'stack' as const },
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
      'New-product-launch pipelines (NPI) & WWDC support — fast social-listening reporting on public perception during launches; 14+ reports and 3 data processes automated',
      'Self-serve tooling: one-variable templated workflows with ~30-min turnaround, plus a self-serve query sheet that auto-delivers results to the requester',
      'Social listening ingestion pipelines from Sprinklr',
    ],
    tools: ['Python', 'SQL', 'Snowflake', 'Teradata', 'MySQL'],
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
    description:
      'Designed end-to-end from my own concept: a hybrid ML-forecast + statistical-threshold system monitoring 48 KPIs across 14 locales. It caught multiple production issues early — with security-update spikes deliberately modeled as expected and excluded.',
    bullets: [
      'ML forecast for each KPI from its trailing 30 days of history',
      'Severity graded by standard-deviation bands: 1–2σ = P3, 2–3σ = P2, beyond ±3σ = P1',
      'Each anomaly routed to the relevant per-KPI stakeholder for root-cause analysis',
      'Dimensional fact/dim storage for 48 KPIs × 14 locales',
      'Centralized monitoring dashboard integrations',
    ],
    tools: ['Python', 'SQL', 'Snowflake', 'Tableau'],
    flow: [
      'Trailing 30-Day KPI History',
      'Prediction Model',
      'Expected Range Calculation',
      'Standard Deviation Thresholding',
      'P1 / P2 / P3 Alerts',
      'Per-KPI Stakeholder Routing',
    ],
  },
  {
    id: 'pci',
    number: '3',
    icon: 'classify' as const,
    title: 'PCI Classification System',
    subtitle: 'social-listening issue classification system',
    highlight: false,
    description:
      'Operational ML workflows classifying 400K+ items per day from 6 social channels — product discussions, issues, and feature-level signals — to improve visibility and proactive response workflows.',
    bullets: [
      'Multi-source ingestion across 6 social channels',
      '400K+ items classified per day',
      'BERT classification pipelines',
      'FLAN-T5 summarization workflows',
      'FAISS vector matching for issue identification',
      'Dynamic issue category creation',
      '5 prediction models & 8 pretrained models deployed',
      'GPU-accelerated processing with Airflow orchestration — 68% runtime reduction through batching and caching',
    ],
    challenge:
      'Hardest problem: the classification taxonomy shifted continuously. Issue categories, the FAISS issue list, dimensional tables, and downstream dashboards all had to absorb every hierarchy change without breaking pipelines or invalidating historical data.',
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

export const appleTooling: AppleTool[] = [
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
    name: 'Sprinklr (social data sourcing)',
    homepageUrl: 'https://www.sprinklr.com/',
  },
  {
    name: 'SimCloud (Apple internal cloud · CUDA GPU)',
    logoUrl: 'https://cdn.simpleicons.org/apple/ffffff',
    logoImgClassName: 'h-6 w-6',
  },
  {
    name: 'CUDA Processing',
    logoUrl: 'https://cdn.simpleicons.org/nvidia/76B900',
    homepageUrl: 'https://developer.nvidia.com/cuda-zone',
    logoImgClassName: 'h-7 w-7',
  },
];

export const appleClosing =
  'I ran on one principle at Apple: never do the same task twice. Everything manual got automated — pipelines, reporting, ad-hoc requests. By the time I left, the role I vacated was backfilled by two hires.';
