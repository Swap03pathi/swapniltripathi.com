/**
 * Comma-separated URL prefixes for Stellarium sky data (see `public/stellarium/skydata/`).
 * Vite inlines `VITE_*` at build time — set in Cloudflare Pages env if you override paths.
 * When unset, defaults to bundled assets so production matches local without extra config.
 */
export function getStellariumSkyDataPrefixes(): string[] {
  const base = import.meta.env.BASE_URL.replace(/\/?$/, '');
  const raw =
    import.meta.env.VITE_STELLARIUM_SKYDATA_BASE_URLS?.trim() ||
    `${base}/stellarium/skydata`;
  return raw
    .split(',')
    .map((u) => u.trim().replace(/\/?$/, ''))
    .filter(Boolean)
    .map((u) => `${u}/`);
}

export function hasStellariumSkyDataConfigured(): boolean {
  return getStellariumSkyDataPrefixes().length > 0;
}
