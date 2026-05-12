/** Long-form copy for the architecture canvas (tooltips / expand). */
export const rteNarrativeDescription =
  'Designed and built a persistent real-time virtual execution system that continuously tracked advisor recommendations against live websocket market prices.\n\nThe architecture replaced an interval-based cron/Lambda pipeline with a stateful worker-driven system powered by Redis, MongoDB, websocket subscriptions, and automated recovery workflows.\n\nThe system dynamically managed active ticker pools, processed high-frequency tick streams, minimized execution latency, and maintained strong consistency between real-time state and long-term persistence layers.';

export const rteSystemOverviewLeft = {
  title: 'System Overview',
  paragraphs: [
    'The platform ingests advisor recommendations from multiple sources and continuously tracks them against live market prices streamed through websocket feeds.',
    'Each recommendation transitions through multiple execution states based on dynamic market conditions, targets, stoplosses, and expiry rules.',
  ],
  states: ['recommendation', 'entry', 'active', 'closed'] as const,
  afterStates:
    'To support real-time execution visibility, the system maintains active trade state in Redis while MongoDB acts as the durable source of truth.',
  goalsIntro: 'The architecture was specifically designed to:',
  goals: [
    'reduce execution delay',
    'avoid redundant matching',
    'optimize websocket subscriptions',
    'recover automatically from outages',
    'maintain consistent state at scale',
  ],
};

export const rteChallenges = [
  {
    title:
      'Handling ~1000 websocket ticks/sec without subscribing to the full market.',
    icon: 'activity' as const,
  },
  {
    title:
      'Replacing interval-based Lambda matching with persistent low-latency workers.',
    icon: 'timer' as const,
  },
  {
    title:
      'Maintaining synchronized execution state across Redis and MongoDB.',
    icon: 'database' as const,
  },
  {
    title:
      'Designing automatic hindsight recovery after websocket/provider outages.',
    icon: 'refresh-cw' as const,
  },
  {
    title: 'Managing dynamic ticker subscription pools at scale.',
    icon: 'layers' as const,
  },
];

export const rtePreviewCards = [
  { id: 'ingestion', label: 'Signal Ingestion', icon: 'radio' as const },
  { id: 'redis', label: 'Redis State', icon: 'database' as const },
  { id: 'ws', label: 'Websocket Stream', icon: 'activity' as const },
  { id: 'workers', label: 'Matching Workers', icon: 'cpu' as const },
  { id: 'mongo', label: 'MongoDB Sync', icon: 'hard-drive' as const },
  { id: 'recovery', label: 'Recovery Engine', icon: 'shield' as const },
];
