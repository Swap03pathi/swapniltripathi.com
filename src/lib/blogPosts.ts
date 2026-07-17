import { parseFrontmatter } from './frontmatter';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd — used for sorting and display
  updated?: string;
  tags: string[];
  cover?: string; // path under /public, e.g. /blogs/<slug>/cover.png
  canonical?: string;
  content: string;
  readingMinutes: number;
};

// PUBLISHING A BLOG: drop a markdown file into src/content/blogs/, e.g. my-post.md
// (the filename becomes the URL: /blogs/my-post). Frontmatter format:
//
//   ---
//   title: "Post Title"
//   description: "One-sentence summary shown on the /blogs index."
//   date: "2026-07-20"
//   tags: ["security", "git-hooks"]
//   cover: "/blogs/my-post/cover.png"
//   canonical: "https://swapniltripathi.com/blogs/my-post"
//   ---
//
//   Post body in markdown (raw HTML like <details>/<figure> is supported)…
//
// query:'?raw' inlines the files at build time — no fetch, no backend.
const files = import.meta.glob('../content/blogs/*.{md,mdx}', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

function parseTags(value: string | undefined): string[] {
  if (!value) return [];
  // Supports both `tags: ["a", "b"]` (JSON array) and `tags: a, b`
  if (value.trim().startsWith('[')) {
    try {
      const arr = JSON.parse(value);
      if (Array.isArray(arr)) return arr.map(String);
    } catch {
      /* fall through to comma-split */
    }
  }
  return value.split(',').map((t) => t.trim().replace(/^["'[]+|["'\]]+$/g, '')).filter(Boolean);
}

const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.(md|mdx)$/, '');
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? '1970-01-01',
      updated: data.updated || undefined,
      tags: parseTags(data.tags),
      cover: data.cover || undefined,
      canonical: data.canonical || undefined,
      content,
      readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getAllBlogPosts = () => posts;
export const getBlogPost = (slug: string) => posts.find((p) => p.slug === slug);
