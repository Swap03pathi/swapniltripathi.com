/** Copy for Multidimensional Market Intelligence Engine — overview + architecture canvas. */

export const mmieSystemOverview = {
  title: 'System overview',
  paragraphs: [
    'The platform continuously computed, filtered, ranked, and served multidimensional market intelligence under constantly mutating live market conditions.',
    'Traditional caching strategies became ineffective because every filter permutation combined with continuously changing live prices created entirely new aggregation paths.',
    'To solve this, the architecture evolved from database-centric aggregation into a Redis-powered distributed computation layer using sorted sets, incremental ranking systems, ID-first filtering, partial hydration strategies, and realtime event-driven state synchronization.',
  ],
};

export const mmieHero = {
  title: 'Multidimensional Market Intelligence Engine',
  subtitle:
    'Realtime multidimensional computation infrastructure for filtering, ranking, scoring, and serving continuously mutating market intelligence.',
  tagline: 'Realtime · Incremental · Intelligent',
};

export const mmieHeroKpis = [
  { label: 'Filter dimensions', value: '9 dimensions · multi-select', tone: 'amber' as const },
  { label: 'Live trades', value: '~400 concurrent, from a 200K+ msg/day firehose', tone: 'orange' as const },
  { label: 'Data scale', value: 'Millions of documents · 3.2M-msg collection', tone: 'emerald' as const },
  { label: 'Match latency', value: '<500ms downstream', tone: 'violet' as const },
];

export const mmieQueryDimensions = [
  { id: 'period', label: 'Period', values: ['Intraday', 'Swing', 'Positional'] },
  { id: 'category', label: 'Category', values: ['Index Opt', 'Stock Opt', 'Futures', 'Equity'] },
  { id: 'position', label: 'Position', values: ['Buy', 'Sell', 'Hold'] },
  { id: 'source', label: 'Source', values: ['Telegram', 'Report', 'X', 'YouTube'] },
  { id: 'status', label: 'Trade status', values: ['Open', 'Closed', 'Pending'] },
  { id: 'daterange', label: 'Date range', values: ['7D', '30D', '90D', 'Custom'] },
  { id: 'profit', label: 'Profit potential', values: ['Upside %', 'R:R', 'Absolute'] },
  { id: 'accuracy', label: 'Advisor accuracy', values: ['Rolling', 'Segmented'] },
  { id: 'sort', label: 'Sorting', values: ['Upside', 'Recent', 'Accuracy'] },
] as const;

export const mmieCachingFilterFlow = [
  'Single filter change',
  'Cache invalidation',
  'New aggregation path',
] as const;

export const mmieCachingPriceFlow = [
  'Live price mutation',
  'Ranking mutation',
  'Continuous recomputation pressure',
] as const;

export const mmieCachingImpacts = [
  'Cache hit rate collapsed under combinatorial paths',
  'Mongo aggregation CPU spiked on hot queries',
  'Expensive recomputation on every meaningful change',
  'Throwing EC2 at the problem could not scale fast enough',
] as const;

export const mmieRedisLayers = [
  {
    n: '1',
    name: 'Live price layer',
    accent: 'emerald' as const,
    keys: ['price:{ticker}', 'cmp:{ticker}'],
    purpose: 'Live market state from tick feeds.',
  },
  {
    n: '2',
    name: 'Trade state layer',
    accent: 'sky' as const,
    keys: ['trade:{id}', 'trade:open', 'trade:category:{x}', 'trade:source:{x}'],
    purpose: 'Trade filtering & grouping.',
  },
  {
    n: '3',
    name: 'Ranking layer',
    accent: 'amber' as const,
    keys: ['trade:rank:upside', 'trade:rank:accuracy', 'trade:rank:relevance'],
    purpose: 'Realtime ranking computation.',
  },
  {
    n: '4',
    name: 'Advisor intelligence layer',
    accent: 'violet' as const,
    keys: ['advisor:perf:{id}'],
    fields: ['accuracy:1d / 7d / 30d / 90d', 'per-category splits', 'per-period splits', 'totalTrades:90d'],
    purpose: 'Dynamic advisor intelligence scoring.',
  },
  {
    n: '5',
    name: 'Reference layer',
    accent: 'cyan' as const,
    keys: ['category:{id}', 'period:{id}', 'advisor:{id}'],
    purpose: 'Static reference & metadata — advisor info, ticker mappings, category references.',
  },
] as const;

export const mmieQueryExecutionSteps = [
  { cmd: 'SINTER', desc: 'Intersect filter sets → candidate IDs' },
  { cmd: 'Candidate IDs', desc: 'Filtered IDs only — no heavy objects yet' },
  { cmd: 'ZINTERSTORE', desc: 'Rank overlay via sorted-set intersection' },
  { cmd: 'Rank overlay', desc: 'Merge ranking scores for candidates' },
  { cmd: 'ZREVRANGE', desc: 'Top-N trade IDs in rank order' },
  { cmd: 'Top-N IDs', desc: 'Paginated IDs for hydration' },
  { cmd: 'HMGET hydration', desc: 'Full trade objects for results' },
  { cmd: 'API response', desc: 'Low-latency payload to clients' },
] as const;

export const mmiePhilosophyHeadline = 'Filter first. Hydrate last.';
export const mmiePhilosophySub = 'IDs are cheap. Objects are expensive.';
export const mmiePhilosophyBody =
  'Traditional object-level aggregation collapses under continuously mutating multidimensional market state.';

export const mmieAdvisorOld = {
  title: 'Old system',
  formula: 'wins / total trades',
  problems: ['Stale rankings', 'Ignored live open trades', 'Easily gamed or manipulated signals'],
};

export const mmieAdvisorNew = {
  title: 'New system',
  parts: [
    'closed-trade win-rate baseline',
    'rolling windows — 1d / 7d / 30d / 90d',
    'category + period segmentation',
    'incremental delta updates per trade event',
  ],
};

export const mmieRollingWindows = ['1d', '7d', '30d', '90d'] as const;
export const mmieAdvisorCategories = ['Index options', 'Stock options', 'Futures', 'Equity'] as const;
export const mmieDeltaUpdatesNote =
  'Advisor scores update via per-event increment/decrement — never a full recompute across all trades.';

export const mmieIncrementalSteps = [
  'Trade event',
  'Delta update',
  'Targeted Redis mutation',
  'Partial ranking update',
] as const;

export const mmieIncrementalNotes = [
  'Stoploss cascade handling',
  'Multiple targets & shared SL',
  'Duplicate recomputation prevention',
] as const;

export const mmieIncrementalQuote = 'We never recomputed all trades per tick.';

export const mmieProfitSteps = [
  'Live tick',
  'Profit potential mutation',
  'Ranking mutation',
  'Selective recomputation',
] as const;

export const mmieProfitQuote = 'Upside changes every tick.';

export const mmieProfitExplain = [
  'Static cache keys could not track upside moving every tick.',
  'Top-K ranking had to stay fresh without full global sorts.',
  'Full recomputation across the universe was operationally impossible.',
] as const;

export const mmieOutcomes = [
  'Reduced Mongo aggregation pressure',
  'Low-latency multidimensional filtering',
  'Realtime advisor intelligence scoring',
  'Incremental recomputation',
  'Dynamic live profit-potential serving',
] as const;

export const mmieChallenges = [
  'Multidimensional query explosion',
  'Live ranking mutation',
  'Dynamic profit potential computation',
  'Cache invalidation complexity',
  'Incremental recomputation',
  'Avoiding Mongo aggregation collapse',
] as const;

export const mmieRedisPreviewCards = [
  { id: 'l1', label: 'Live price layer' },
  { id: 'l2', label: 'Trade state layer' },
  { id: 'l3', label: 'Ranking layer' },
  { id: 'l4', label: 'Advisor intelligence layer' },
  { id: 'l5', label: 'Reference layer' },
] as const;

export const mmieTechStack = [
  { name: 'Redis', logoUrl: 'https://cdn.simpleicons.org/redis/DC382D', homepageUrl: 'https://redis.io' },
  { name: 'MongoDB', logoUrl: 'https://cdn.simpleicons.org/mongodb/47A248', homepageUrl: 'https://mongodb.com' },
  { name: 'Node.js', logoUrl: 'https://cdn.simpleicons.org/nodedotjs/5FA04E', homepageUrl: 'https://nodejs.org' },
  { name: 'AWS ECS', logoUrl: '/logos/ECS.png', homepageUrl: 'https://aws.amazon.com/ecs/' },
  { name: 'Python', logoUrl: 'https://cdn.simpleicons.org/python/3776AB', homepageUrl: 'https://python.org' },
  {
    name: 'Apache Airflow',
    logoUrl: 'https://cdn.simpleicons.org/apacheairflow/017CEE',
    homepageUrl: 'https://airflow.apache.org',
  },
  { name: 'Grafana', logoUrl: 'https://cdn.simpleicons.org/grafana/F46800', homepageUrl: 'https://grafana.com' },
  { name: 'Prometheus', logoUrl: 'https://cdn.simpleicons.org/prometheus/E6522C', homepageUrl: 'https://prometheus.io' },
] as const;
