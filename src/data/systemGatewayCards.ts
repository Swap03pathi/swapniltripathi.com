export type SystemGatewayCard = {
  title: string;
  description: string;
  href: string;
  label: string;
};

export const systemGatewayCards: SystemGatewayCard[] = [
  {
    title: 'Realtime Recommendation Ingestion',
    description:
      'Realtime ingestion and parsing infrastructure for transforming noisy multi-source recommendations into structured trading signals.',
    href: '/saras/systems/realtime-ingestion',
    label: 'Saras Architecture',
  },
  {
    title: 'Virtual Trade Execution Engine',
    description:
      'Execution infrastructure for managing concurrent trade lifecycle simulation, follow-ups, and realtime state transitions.',
    href: '/saras/systems/realtime-execution',
    label: 'Saras Architecture',
  },
  {
    title: 'Multidimensional Analytics Infrastructure',
    description:
      'Redis-powered multidimensional filtering and analytics infrastructure optimized for realtime operational querying.',
    href: '/saras/systems/market-intelligence',
    label: 'Saras Architecture',
  },
  {
    title: 'KPI Anomaly Detection',
    description:
      'ML-assisted anomaly detection workflows for operational KPI monitoring and automated stakeholder alerting.',
    href: '/experience/apple#core-systems',
    label: 'Apple Experience',
  },
  {
    title: 'PCI Classification Workflows',
    description:
      'Operational ML pipelines for classifying product issues, feature-level signals, and social conversations at scale.',
    href: '/experience/apple#core-systems',
    label: 'Apple Experience',
  },
  {
    title: 'Product Instrumentation & Analytics',
    description:
      'Event instrumentation, analytics workflows, experimentation tracking, and operational reporting systems.',
    href: '/experience/testbook#instrumentation',
    label: 'Testbook Experience',
  },
];
