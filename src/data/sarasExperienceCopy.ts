import { SARAS_SECTION_IDS, SARAS_SYSTEM_ROUTES } from '../constants/sarasExperience';
import type { SarasSystemKey } from '../constants/sarasExperience';

export const sarasHero = {
  label: 'Saras — CTO & Co-Founder · Sept 2024 – Present',
  title: 'A Trust Layer for',
  titleAccent: 'Smarter Trading Decisions',
  description:
    'Saras was built to bring transparency to the noisy world of stock market recommendations — helping retail traders evaluate advisor credibility before acting on recommendations.',
  highlights: [
    { label: 'Featured on Shark Tank India', icon: 'tv' as const },
    { label: 'Antler-backed · $500K pre-seed', icon: 'funding' as const },
    { label: 'Built for retail traders', icon: 'users' as const },
  ],
  metrics: [
    { value: '150K+', label: 'Downloads' },
    { value: '200K+', label: 'Messages ingested / day' },
    { value: '~400', label: 'Concurrent live trades' },
    { value: '99.5%', label: 'Uptime' },
    { value: '20K', label: 'Concurrent users' },
  ],
};

export const sarasSectionNav = [
  { id: SARAS_SECTION_IDS.hero, label: 'Overview' },
  { id: SARAS_SECTION_IDS.coreSystems, label: 'Core Systems' },
  { id: SARAS_SECTION_IDS.platform, label: 'Platform' },
  { id: SARAS_SECTION_IDS.product, label: 'Product' },
  { id: SARAS_SECTION_IDS.evolution, label: 'Evolution' },
  { id: SARAS_SECTION_IDS.reliability, label: 'Reliability' },
  { id: SARAS_SECTION_IDS.press, label: 'Press' },
  { id: SARAS_SECTION_IDS.ownership, label: 'Ownership' },
] as const;

export const sarasCoreSystems = [
  {
    number: '01',
    title: 'Realtime Recommendation Ingestion System',
    summary:
      'Captures unstructured recommendations from Telegram, YouTube, reports, and social channels — normalizing them into structured, deduplicated trade candidates.',
    challenge: 'Multi-source ingestion with AI parsing, deduplication, and stream-safe handoff under bursty advisor traffic — a message store that has grown into millions of raw documents.',
    stack: ['Python', 'Redis Streams', 'MongoDB', 'Node.js', 'LLM Parsing'],
    flow: ['Sources', 'AI Parsing', 'Dedup', 'Persistence', 'Redis Streams'],
    href: SARAS_SYSTEM_ROUTES.ingestion,
  },
  {
    number: '02',
    title: 'Real-Time Virtual Execution System',
    summary:
      'Matches live market prices against open recommendations — computing P&L, targets, stoplosses, and broadcast-ready trade state in real time. A cost-aware active-ticker pool works within a vendor hard cap of 3,000 concurrent WebSocket tickers.',
    challenge: '<500ms price-match latency across hundreds of concurrently live virtual trades — with hot tickers emitting up to ~1,000 ticks/sec — and deterministic target/stoploss/expiry exit rules.',
    stack: ['Node.js', 'Redis', 'WebSocket', 'MongoDB', 'AWS ECS'],
    flow: ['Live Prices', 'Matching Engine', 'Portfolio', 'Performance', 'Broadcast'],
    href: SARAS_SYSTEM_ROUTES.execution,
  },
  {
    number: '03',
    title: 'Multidimensional Market Intelligence Engine',
    summary:
      'Redis-orchestrated filtering, ranking, and advisor scoring across combinatorial query dimensions under continuously mutating market state. Filtering runs directly on Redis fetch instead of MongoDB aggregations burning ECS CPU — faster and cheaper.',
    challenge: 'ID-first computation when traditional caching collapses under filter × live-price permutation explosion.',
    stack: ['Redis', 'MongoDB', 'Node.js', 'Sorted Sets', 'Incremental Rank'],
    flow: ['Trade Universe', 'Filter Sets', 'Rank Overlay', 'Top-N IDs', 'Hydration'],
    href: SARAS_SYSTEM_ROUTES.intelligence,
  },
] as const;

/** Unique per-system intros rendered on the deep-dive pages before the shared summary. */
export const sarasSystemIntros: Record<SarasSystemKey, string> = {
  'realtime-execution':
    'This engine started life as a cron + Lambda job — interval-based, roughly two minutes behind the market, with overlapping runs that broke it every few weeks. Re-architecting it as a persistent real-time engine brought price matching under 500ms, on a recovery design that needs no data backfilling.',
  'realtime-ingestion':
    'Recommendations arrive from five to six sources — Telegram, PDF research reports, YouTube live streams, X, and financial news — peaking at roughly 10,000 messages per hour at market open. A two-stage classify-then-extract LLM design keeps costs controlled: only the small fraction of messages that are real recommendations ever reach the expensive extraction call.',
  'market-intelligence':
    'The engine filters first and hydrates last: rankings and filters resolve entirely against Redis ID sets before a single full document is fetched. That design — together with a cost-aware active-ticker pool working within a vendor hard cap of 3,000 concurrent WebSocket tickers — keeps multidimensional queries fast under live market state.',
};

/** Expandable platform cards — `paragraphs` shown when “Explore” is opened. */
export const sarasPlatformCards = {
  left: [
    {
      id: 'delivery',
      title: 'Product & Delivery',
      items: [
        'Multi-platform Delivery',
        'Realtime Notifications',
        'Subscription Access',
        'Unified User Flows',
      ],
      paragraphs: [
        'The platform operated across Flutter mobile apps, marketing websites, and PWA delivery surfaces while remaining synchronized with realtime backend state.',
        'Notification systems, subscription gating, and delivery workflows were tightly coupled with ingestion and execution systems to ensure users received timely and consistent recommendation updates across all surfaces.',
      ],
    },
    {
      id: 'ux',
      title: 'User Experience',
      items: [
        'Trade Discovery',
        'Advisor Transparency',
        'Realtime Feed Experience',
        'Search & Filtering',
      ],
      paragraphs: [
        'The product experience was designed around helping users evaluate advisor credibility through historical trade visibility, realtime updates, and transparent performance tracking.',
        'The interface combined realtime trade feeds, advisor profiles, filtering systems, and expandable trade context to help users navigate noisy recommendation ecosystems more effectively.',
      ],
    },
    {
      id: 'evolution-card',
      title: 'Growth & Distribution',
      items: [
        'Regional Campaigns',
        'Notification Engagement',
        'Advisor Discovery',
        'Social Distribution',
      ],
      paragraphs: [
        'The platform continuously experimented with acquisition and engagement workflows including regional distribution strategies, social discovery loops, notification engagement systems, and advisor onboarding flows.',
        'Growth systems were closely connected to platform operations because advisor discovery and trust-building directly impacted long-term retention.',
      ],
    },
  ],
  right: [
    {
      id: 'operations',
      title: 'Operations & Moderation',
      items: [
        'Advisor Verification',
        'Trade Review Workflows',
        'Backtesting Validation',
        'Controlled Rollouts',
      ],
      paragraphs: [
        'Operational tooling was created to maintain recommendation quality and platform trust across a constantly evolving advisor ecosystem.',
        'The workflows included advisor verification systems, moderation tooling, backtesting validation flows, controlled CMS rollouts, and replay systems used to correct parsing or execution inconsistencies.',
      ],
    },
    {
      id: 'reliability',
      title: 'Reliability & Infrastructure',
      items: ['Zero-Downtime ECS Migration', 'Redis Optimization', 'Monitoring Systems', 'Security Recovery'],
      paragraphs: [
        'The platform infrastructure evolved significantly as operational complexity increased, including a zero-downtime migration from PM2-based services to ECS on Fargate — ECR images, GitHub Actions CI/CD — and large-scale Redis optimization for realtime filtering workflows.',
        'Monitoring, observability, recovery procedures, and security hardening became increasingly important as the platform scaled operationally.',
      ],
    },
    {
      id: 'experiments',
      title: 'Experiments & Explorations',
      items: [
        'Knowledge Graph Research',
        'AI Chatbot Exploration',
        'Recommendation Discovery',
        'Experimental R&D',
      ],
      paragraphs: [
        'The team explored several experimental systems beyond the production platform, including Neo4j-based knowledge graph workflows and conversational recommendation discovery interfaces.',
        'While many of these explorations were ultimately abandoned due to operational complexity and inconsistent output quality, they played an important role in shaping later architectural and product decisions.',
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
      'The original execution engine ran on cron + Lambda — interval-based by nature, trades surfaced with a ~2-minute lag, consecutive runs overlapped, and it broke every few weeks. It was re-architected as a persistent real-time engine powered by Redis state management, websocket market feeds, and event-driven processing.',
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
  'Realtime monitoring with Grafana + Prometheus across ingestion, execution, and API tiers',
  'Redis cluster scaling for ranking and stream workloads',
  'Zero-downtime pm2 → ECS migration — ECS on Fargate, ECR images, GitHub Actions CI/CD',
  'Reduced AWS compute consumption ~45% through an infrastructure optimization drive',
  'Automated recovery playbooks and health-checked services',
  'WebSocket stability for live trade and price fan-out',
] as const;

export const sarasIncident = {
  title: 'A Critical Incident We Overcame',
  body: 'An exposed AWS key led to unauthorized infrastructure deletion. We rebuilt core services within six hours, then introduced scoped credentials, rotation policies, and deployment guardrails. When a key leaked a second time, the attack caused zero damage — and the per-process scoped keys pinpointed the source immediately.',
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
    supportLine: 'Pitched Saras on national television — Shark Tank India — bringing advisor transparency to a mainstream audience.',
  },
  {
    id: 'signal',
    outlet: 'Signal By Saras',
    type: 'Platform',
    href: '',
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
  'Database schema design',
  'Backend process logic',
  'Infrastructure, ECS, and deployment pipelines',
  'Redis strategy — streams, sorted sets, and ranking layers',
  'Data pipelines and aggregation systems',
  'Virtual execution and trade lifecycle engines',
  'Scaling, observability, and incident response',
  'Moderation and rollout tooling — scoped and built to product-defined specs',
  'Hired and grew the ~8-person engineering team — each engineer mentored into full ownership of a vertical',
] as const;

export const sarasCollaboration = [
  'Product-driven requirements and roadmap prioritization',
  'Frontend implementation with dedicated app and web teams',
  'Marketing experimentation and growth funnel support',
  'Analyst workflow tooling and backtesting interfaces',
  'Advisor onboarding and verification operations',
] as const;

