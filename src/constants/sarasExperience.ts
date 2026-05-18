/** Saras ecosystem overview + canonical deep-dive paths. */

export const SARAS_EXPERIENCE_PATH = '/experience/saras';

export const SARAS_SECTION_IDS = {
  hero: 'overview',
  coreSystems: 'core-systems',
  platform: 'platform',
  product: 'product',
  evolution: 'evolution',
  reliability: 'reliability',
  press: 'press',
  ownership: 'ownership',
} as const;

export const SARAS_SYSTEM_ROUTES = {
  ingestion: '/saras/systems/realtime-ingestion',
  execution: '/saras/systems/realtime-execution',
  intelligence: '/saras/systems/market-intelligence',
} as const;

export const SARAS_PLATFORM_ROUTES = {
  operations: '/saras/platform/operations',
  delivery: '/saras/platform/delivery',
  reliability: '/saras/platform/reliability',
} as const;

export type SarasPlatformSlug = keyof typeof SARAS_PLATFORM_ROUTES;

export type SarasSystemKey = 'realtime-ingestion' | 'realtime-execution' | 'market-intelligence';
