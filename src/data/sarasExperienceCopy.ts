import { SARAS_SECTION_IDS, SARAS_SYSTEM_ROUTES } from '../constants/sarasExperience';

export const sarasHero = {
  label: 'Saras Experience',
  title: 'A Trust Layer for',
  titleAccent: 'Smarter Trading Decisions',
  description:
    'Saras was built to bring transparency to the noisy world of stock market recommendations — helping retail traders evaluate advisor credibility before acting on recommendations.',
  highlights: [
    { label: 'Featured on Shark Tank India', icon: 'tv' as const },
    { label: 'Pre-seed funded', icon: 'funding' as const },
    { label: 'Built for retail traders', icon: 'users' as const },
  ],
  metrics: [
    { value: '150K+', label: 'Downloads' },
    { value: '200K+', label: 'Signals / day' },
    { value: '400', label: 'Daily Live trades' },
    { value: '98%', label: 'Uptime' },
    { value: '100K', label: 'Registered users' },
  ],
};

export const sarasSectionNav = [
  { id: SARAS_SECTION_IDS.hero, label: 'Overview' },
  { id: SARAS_SECTION_IDS.coreSystems, label: 'Core Systems' },
  { id: SARAS_SECTION_IDS.platform, label: 'Platform' },
  { id: SARAS_SECTION_IDS.product, label: 'Product' },
  { id: SARAS_SECTION_IDS.evolution, label: 'Evolution' },
  { id: SARAS_SECTION_IDS.reliability, label: 'Impact' },
  { id: SARAS_SECTION_IDS.press, label: 'Press' },
  { id: SARAS_SECTION_IDS.ownership, label: 'Ownership' },
] as const;

export const sarasCoreSystems = [
  {
    number: '01',
    title: 'Realtime Recommendation Ingestion System',
    summary:
      'Captures unstructured recommendations from Telegram, YouTube, reports, and social channels — normalizing them into structured, deduplicated trade candidates.',
    challenge: 'Multi-source ingestion with AI parsing, deduplication, and stream-safe handoff under bursty advisor traffic.',
    stack: ['Python', 'Redis Streams', 'MongoDB', 'Node.js', 'LLM Parsing'],
    flow: ['Sources', 'AI Parsing', 'Dedup', 'Persistence', 'Redis Streams'],
    href: SARAS_SYSTEM_ROUTES.ingestion,
  },
  {
    number: '02',
    title: 'Real-Time Virtual Execution System',
    summary:
      'Matches live market prices against open recommendations — computing P&L, targets, stoplosses, and broadcast-ready trade state in real time.',
    challenge: 'Sub-second execution semantics across thousands of concurrent virtual trades with deterministic exit rules.',
    stack: ['Node.js', 'Redis', 'WebSocket', 'MongoDB', 'AWS ECS'],
    flow: ['Live Prices', 'Matching Engine', 'Portfolio', 'Performance', 'Broadcast'],
    href: SARAS_SYSTEM_ROUTES.execution,
  },
  {
    number: '03',
    title: 'Multidimensional Market Intelligence Engine',
    summary:
      'Redis-orchestrated filtering, ranking, and advisor scoring across combinatorial query dimensions under continuously mutating market state.',
    challenge: 'ID-first computation when traditional caching collapses under filter × live-price permutation explosion.',
    stack: ['Redis', 'MongoDB', 'Node.js', 'Sorted Sets', 'Incremental Rank'],
    flow: ['Trade Universe', 'Filter Sets', 'Rank Overlay', 'Top-N IDs', 'Hydration'],
    href: SARAS_SYSTEM_ROUTES.intelligence,
  },
] as const;

/** Expandable platform cards — `paragraphs` shown when “Explore” is opened. */
export const sarasPlatformCards = {
  left: [
    {
      id: 'delivery',
      title: 'Product & Delivery',
      items: ['Flutter App', 'Website & PWA', 'Notifications', 'Subscriptions'],
      paragraphs: [
        'Flutter mobile app, marketing website, PWA surfaces, notification infrastructure, and subscription flows.',
        'Delivery systems were built to stay in sync with realtime backend state — not as isolated frontend shells.',
      ],
    },
    {
      id: 'ux',
      title: 'User Experience',
      items: ['Trade Feed', 'Advisor Profiles', 'Filters & Search', 'Realtime Updates'],
      scrollTo: SARAS_SECTION_IDS.product,
    },
    {
      id: 'evolution-card',
      title: 'Product Evolution',
      items: ['Early Finosauras designs', 'Major UI redesigns', 'Feature maturity timeline'],
    },
  ],
  right: [
    {
      id: 'operations',
      title: 'Operations & Moderation',
      items: [
        'Advisor Verification',
        'Moderation Tooling',
        'Backtesting Workflow',
        'CMS & Rollout Controls',
      ],
      paragraphs: [
        'Internal tooling for advisor verification, trade moderation, backtesting workflows, and controlled CMS rollouts.',
        'Operations workflows connect directly to ingestion quality and execution correctness upstream.',
      ],
    },
    {
      id: 'reliability',
      title: 'Reliability & Infrastructure',
      items: ['ECS Migration', 'Redis Scaling', 'Monitoring & Observability', 'Security & Recovery'],
      paragraphs: [
        'ECS-hosted services, Redis scaling, Grafana/Prometheus observability, and security hardening after production incidents.',
        'Operational maturity was earned through real load — 200K+ signals/day and continuous market mutation.',
      ],
    },
    {
      id: 'experiments',
      title: 'Experiments & Explorations',
      items: [
        'Neo4j Knowledge Graph',
        'AI Chatbot Exploration',
        'Abandoned Experiments',
        'Lessons Learned',
      ],
    },
  ],
} as const;

/**
 * Product surface screenshots — set `imageUrl` per screen (paths under `public/` recommended).
 * Example: imageUrl: '/saras/screenshots/trade-feed.png'
 */
export const sarasProductSurfaces = [
  {
    id: 'home',
    label: 'Home',
    caption: 'App home — discovery entry and live market pulse',
    imageUrl: '/saras/screenshots/home.png',
  },
  {
    id: 'feed',
    label: 'Trade',
    caption: 'Realtime recommendation stream with advisor context',
    imageUrl: '/saras/screenshots/trade-feed.png',
  },
  {
    id: 'filters',
    label: 'Filters & Search',
    caption: 'Multidimensional discovery across live universe',
    imageUrl: '/saras/screenshots/filters.png',
  },
  {
    id: 'details',
    label: 'Trade Details',
    caption: 'Targets, stoploss, live P&L, and exit state',
    imageUrl: '/saras/screenshots/trade-detail.png',
  },
  {
    id: 'advisor',
    label: 'Advisor Profile',
    caption: 'Credibility, history, and segmented performance',
    imageUrl: '/saras/screenshots/advisor-profile.png',
  },
  {
    id: 'premium',
    label: 'Premium Signal',
    caption: 'Subscription surfaces and gated intelligence',
    imageUrl: '/saras/screenshots/premium.jpg',
  },
] as const;

/**
 * Platform evolution — vertical editorial milestones for SarasPlatformEvolution.
 * Edit `label`, `title`, `description`, and `themes` per phase; conclusion block at bottom.
 */
export const sarasEvolutionPhases = [
  {
    phase: '01',
    label: 'Early Prototype',
    title: 'Finosauras & Telegram Tracking',
    description:
      'Saras initially started as a lightweight Telegram recommendation tracker using approximate market prices from public sources. The early prototype focused on exposing advisor performance publicly through a simple web interface.',
    themes: ['Telegram Signals', 'Public Tracking', 'Advisor Transparency', 'Prototype Infrastructure'],
  },
  {
    phase: '02',
    label: 'Platform Expansion',
    title: 'Expanding Beyond Telegram',
    description:
      'The platform evolved into a multi-source ingestion system capable of processing recommendations from research reports, Twitter/X, YouTube livestreams, and financial news feeds.',
    themes: ['Multi-source Ingestion', 'AI Parsing', 'OCR Pipelines', 'Data Normalization'],
  },
  {
    phase: '03',
    label: 'Realtime Infrastructure',
    title: 'Building the Execution Engine',
    description:
      'Saras moved from interval-based trade matching into a realtime execution architecture powered by Redis state management, websocket market feeds, and event-driven processing.',
    themes: ['Redis State', 'Websocket Feeds', 'Event Processing', 'Realtime Matching'],
  },
  {
    phase: '04',
    label: 'Consumer Platform',
    title: 'Launching the User Ecosystem',
    description:
      'After raising pre-seed funding, Saras expanded into a consumer-facing platform with Flutter applications, realtime notifications, advisor analytics, and premium recommendation delivery.',
    themes: ['Flutter App', 'Notifications', 'Premium Features', 'Consumer Platform'],
  },
  {
    phase: '05',
    label: 'Intelligence Systems',
    title: 'Advisor Intelligence & Market Analytics',
    description:
      'Saras introduced multidimensional filtering, advisor ranking systems, and realtime performance analytics designed to help users evaluate recommendation quality and advisor credibility.',
    themes: ['Advisor Ranking', 'Profit Potential', 'Filtering Engine', 'Analytics Systems'],
  },
  {
    phase: '06',
    label: 'Operational Scaling',
    title: 'Moderation & Reliability Systems',
    description:
      'As platform scale increased, Saras added operational tooling for trade verification, advisor moderation, notification management, replay systems, and infrastructure reliability.',
    themes: ['Operational Tooling', 'Replay Systems', 'Moderation', 'Reliability'],
  },
] as const;

export const sarasEvolutionConclusion = {
  title: 'What Saras Ultimately Became',
  description:
    'A trust layer designed to help retail traders make more informed decisions by analyzing advisor credibility, recommendation quality, and realtime execution outcomes across fragmented financial content sources.',
} as const;

export const sarasReliabilityLeft = [
  'Realtime monitoring across ingestion, execution, and API tiers',
  'Redis cluster scaling for ranking and stream workloads',
  'ECS migration for containerized, repeatable deploys',
  'Automated recovery playbooks and health-checked services',
  'WebSocket stability for live trade and price fan-out',
] as const;

export const sarasIncident = {
  title: 'A Critical Incident We Overcame',
  body: 'An exposed AWS key led to unauthorized infrastructure deletion. We rebuilt core services within six hours, then introduced scoped credentials, rotation policies, and deployment guardrails to prevent recurrence.',
};

/**
 * Press & public presence — `href` empty = static recognition card (no link).
 * Set `supportLine` for editorial copy under each outlet title.
 */
export const sarasPress = [
  {
    id: 'livemint',
    outlet: 'LiveMint',
    type: 'Feature',
    href: 'https://www.livemint.com/videos/inside-the-world-of-stock-market-tips-on-telegram-instagram-mint-money-11719316330214.html',
    supportLine: 'Coverage around retail trading ecosystems and advisor transparency.',
  },
  {
    id: 'antler',
    outlet: 'Antler India',
    type: 'Feature',
    href: 'https://www.antler.co/blog/how-is-ai-revolutionizing-the-bfsi-landscape',
    supportLine: 'Mentioned as part of AI-driven innovation discussions in fintech.',
  },
  {
    id: 'podcast',
    outlet: 'Founder Conversation',
    type: 'Video',
    href: 'https://www.youtube.com/watch?v=MGEnx5smEkg',
    supportLine: 'Public discussion around building Saras and operational challenges.',
  },
  {
    id: 'sharktank',
    outlet: 'Featured on Shark Tank India',
    type: 'Recognition',
    href: '',
    supportLine: 'Recognized as part of the broader Indian startup ecosystem.',
  },
  {
    id: 'signal',
    outlet: 'Signal By Saras',
    type: 'Platform',
    href: 'https://www.signal.saras.market/',
    supportLine: 'Community-facing product updates and platform presence.',
  },
] as const;

/**
 * Tutorial video — paste a full YouTube URL or 11-character video ID.
 * Embedded inline in Product Surfaces (not a new tab).
 */
export const sarasTutorialVideoUrl = 'https://youtu.be/5OG9ehGXGNg';

export const sarasOwned = [
  'System architecture across ingestion, execution, and intelligence',
  'Backend engineering and API design',
  'Infrastructure, ECS, and deployment pipelines',
  'Redis strategy — streams, sorted sets, and ranking layers',
  'Data pipelines and aggregation systems',
  'Virtual execution and trade lifecycle engines',
  'Scaling, observability, and incident response',
  'Operational tooling for moderation and rollout',
] as const;

export const sarasCollaboration = [
  'Product-driven requirements and roadmap prioritization',
  'Frontend implementation with dedicated app and web teams',
  'Marketing experimentation and growth funnel support',
  'Analyst workflow tooling and backtesting interfaces',
  'Advisor onboarding and verification operations',
] as const;

