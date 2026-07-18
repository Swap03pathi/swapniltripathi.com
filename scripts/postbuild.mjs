// Runs via: vite-react-ssg build && node scripts/postbuild.mjs
// 1) Generates sitemap.xml by walking the prerendered output — the sitemap can never
//    drift from the real route list again.
// 2) Copies the prerendered /404 page to top-level 404.html so Cloudflare Pages returns
//    a real 404 status for unknown URLs.
import { copyFileSync, existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://swapniltripathi.com';
const DIST = 'dist';
// noindex'd pages stay out of the sitemap (must mirror the <Seo noindex> list)
const EXCLUDE = ['/404', '/me'];

function collect(dir, base = '') {
  const urls = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) urls.push(...collect(full, `${base}/${name}`));
    else if (name === 'index.html') urls.push(base || '/');
  }
  return urls;
}

const urls = collect(DIST)
  .filter((u) => !EXCLUDE.some((e) => u === e || u.startsWith(`${e}/`)))
  .sort();

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${SITE}${u}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(DIST, 'sitemap.xml'), xml);

const prerendered404 = join(DIST, '404', 'index.html');
if (existsSync(prerendered404)) copyFileSync(prerendered404, join(DIST, '404.html'));

console.log(`sitemap.xml: ${urls.length} URLs · 404.html: ${existsSync(prerendered404)}`);
