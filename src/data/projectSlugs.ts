// Single source of truth for project slugs. routes.tsx (client entry chunk)
// needs only the slug list to enumerate prerender paths — importing the full
// projects.ts there would ship every project description on every page.
// projects.ts imports this list and throws at module scope on any mismatch,
// so the SSG build fails loudly if the two files ever drift.
export const projectSlugs = [
  'signal-ingestion-system',
  'signal-processing-pipeline',
  'realtime-recommendation-ingestion-system',
  'multidimensional-market-intelligence-engine',
  'real-time-virtual-execution-system',
  'analytics-aggregation-system',
  'backend-infrastructure',
  'admin-platform',
  'ey-content-platform-ops',
  'ey-video-validation-system',
  'oyo-ranking-analysis',
  'oyo-data-scraping',
  'finman',
] as const;
