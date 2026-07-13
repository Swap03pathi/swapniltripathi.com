// Minimal frontmatter parser. Deliberately not gray-matter: it depends on Node's Buffer
// and breaks in the browser bundle at hydration (known Vite issue).
export function parseFrontmatter(raw: string): {
  data: Record<string, string>;
  content: string;
} {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(raw);
  if (!match) return { data: {}, content: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (/^(['"]).*\1$/.test(value)) value = value.slice(1, -1); // strip matching quotes
    data[key] = value;
  }
  return { data, content: raw.slice(match[0].length) };
}
