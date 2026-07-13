/** Copy for Realtime Recommendation Ingestion — project overview + architecture canvas. */

export const rrisSystemOverview = {
  title: 'System Overview',
  introParagraphs: [
    'The platform continuously ingested trading recommendations from highly inconsistent multi-platform sources including Telegram, PDFs, YouTube livestreams, Twitter/X, news feeds, and Perplexity search workflows.',
    'Each source used custom ingestion logic, AI-assisted extraction, normalization pipelines, and operational verification workflows before converging into a unified execution-ready trade schema.',
  ],
  goalsIntro: 'The architecture was specifically designed to:',
  goals: [
    'handle noisy human communication',
    'minimize ingestion latency',
    'optimize AI processing cost',
    'support realtime recommendation capture',
    'normalize inconsistent advisor formats',
    'maintain operational verification workflows',
  ],
};

export const rrisPreviewSources = [
  { id: 'telegram', label: 'Telegram', icon: 'telegram' as const },
  { id: 'pdf', label: 'PDF Reports', icon: 'file-text' as const },
  { id: 'youtube', label: 'YouTube Live', icon: 'youtube' as const },
  { id: 'twitter', label: 'X', icon: 'x' as const },
  { id: 'news', label: 'News APIs', icon: 'newspaper' as const },
  { id: 'perplexity', label: 'Perplexity Search', icon: 'sparkles' as const },
] as const;

export const rrisHero = {
  title: 'Realtime Recommendation Ingestion System',
  subtitle:
    'Production-grade multi-source realtime intelligence ingestion platform that transforms noisy human recommendations into execution-ready structured trade state.',
  badgeLive: 'Live since Sept 2024',
  badgeProd: 'Production',
};

export const rrisArchitectureChallengesDetailed: {
  title: string;
  icon: 'activity' | 'layers' | 'cpu' | 'shield-alert' | 'timer';
}[] = [
  {
    title: 'Managing high-volume Telegram streams with mostly irrelevant traffic.',
    icon: 'activity',
  },
  {
    title: 'Normalizing inconsistent advisor formats into one execution-ready schema.',
    icon: 'layers',
  },
  {
    title: 'Option instrument parsing and parent-ticker resolution under ambiguity.',
    icon: 'cpu',
  },
  {
    title: 'Hallucination management and confidence-aware extraction.',
    icon: 'shield-alert',
  },
  {
    title: 'Latency vs cost tradeoffs at realtime capture scale.',
    icon: 'timer',
  },
];

export const rrisChallenges = [
  {
    title:
      'Managing extremely high-volume Telegram streams with mostly irrelevant messages.',
  },
  {
    title:
      'Converting inconsistent advisor communication styles into structured trade state.',
  },
  {
    title: 'Balancing latency, cost, and extraction accuracy at scale.',
  },
  {
    title:
      'Handling OCR and livestream ingestion for realtime YouTube recommendations.',
  },
  {
    title:
      'Maintaining operational verification workflows for hallucination prevention.',
  },
];

export const rrisArchitectureChallenges = [
  'Telegram volume scaling',
  'Inconsistent advisor formats',
  'Option instrument parsing',
  'Hallucination management',
  'Latency vs cost tradeoffs',
  'Realtime expectations',
] as const;

export const rrisPipelineOutcomes = [
  'Reduced ingestion latency',
  'Realtime capture',
  'Standardized schema',
  'Scalable ingestion',
  'Operational moderation',
  'Downstream execution readiness',
] as const;

export const rrisTradeoffQuote =
  'The system optimized for accuracy and latency during early scale because execution realism mattered more than infrastructure cost.';

export const rrisMessageRaw = `NIFTY OPTION INTRADAY
BUY NSEPUT NIFTY
12MAY2026 23600 @ 45.2
SL 15 TGT 85,100`;

export const rrisMessageJson = `{
  "ticker": "NIFTY 23600 PE (12 May 2026)",
  "category": "Index Options",
  "position": "Buy",
  "entry": 45.2,
  "stoploss": 15,
  "target": [85, 100],
  "period": "Intraday"
}`;

export const rrisNormalizedObjectLines: { k: string; v: string }[] = [
  { k: 'ticker', v: 'NIFTY2360012MAY26PE' },
  { k: 'parent_ticker', v: 'NIFTY' },
  { k: 'instrument_type', v: 'OPTIDX' },
  { k: 'category', v: 'Index Options' },
  { k: 'position', v: 'Buy' },
  { k: 'entry', v: '45.2' },
  { k: 'stoploss', v: '15' },
  { k: 'target', v: '[85,100]' },
  { k: 'period', v: 'Intraday' },
  { k: 'advisor', v: 'Example Research' },
  { k: 'source', v: 'Telegram' },
  { k: 'status', v: 'Pending Review' },
];

export const rrisEngineeringPriorities = [
  {
    tier: 'Highest Priority',
    title: 'Accuracy',
    accent: 'emerald' as const,
    bullets: [
      'Execution realism',
      'Extraction correctness',
      'Moderation workflows',
      'Trade state integrity',
    ],
  },
  {
    tier: 'Secondary Priority',
    title: 'Latency',
    accent: 'amber' as const,
    bullets: [
      'Realtime ingestion',
      'Low-delay execution visibility',
      'Fast downstream propagation',
      'Timely user notifications',
    ],
  },
  {
    tier: 'Managed Constraint',
    title: 'Cost',
    accent: 'sky' as const,
    bullets: [
      'AI optimization',
      'Selective processing',
      'Bounded infrastructure',
      'Cost-aware scaling',
    ],
  },
];

export const rrisFollowUpDetection = [
  'Target changes',
  'Stoploss updates',
  'Exit calls',
  'Time extensions',
  'Trade modifications',
  'New entries',
];

export const rrisTechStack = [
  { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
  { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },
  { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
  {
    name: 'OpenAI',
    logoUrl: '/logos/openai-chatgpt.png',
    homepageUrl: 'https://openai.com',
    logoClassName: 'h-7 w-7 object-contain opacity-95',
  },
  { name: 'Celery', logoUrl: 'https://cdn.simpleicons.org/celery/37814A', homepageUrl: 'https://docs.celeryq.dev' },
  { name: 'Telethon', logoUrl: 'https://cdn.simpleicons.org/telegram/26A5E4', homepageUrl: 'https://docs.telethon.dev/en/stable/' },
  { name: 'OpenCV', logoUrl: 'https://cdn.simpleicons.org/opencv/5C3EE8', homepageUrl: 'https://opencv.org' },
  {
    name: 'AWS S3',
    logoUrl: '/logos/aws-s3.png',
    homepageUrl: 'https://aws.amazon.com/s3/',
    logoClassName: 'h-7 w-7 object-contain opacity-95',
  },
  { name: 'AWS EC2', logoUrl: '/logos/ec2.png', homepageUrl: 'https://aws.amazon.com/ec2/', logoClassName: 'h-7 w-7' },
] as const;
