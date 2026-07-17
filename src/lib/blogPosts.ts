import { parseFrontmatter } from './frontmatter';

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd — used for sorting and display
  updated?: string;
  tags: string[];
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
//   tags: "redis, architecture"
//   ---
//
//   Post body in markdown…
//
// query:'?raw' inlines the files at build time — no fetch, no backend.
const files = import.meta.glob('../content/blogs/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const posts: BlogPost[] = Object.entries(files)
  .map(([path, raw]) => {
    const slug = path.split('/').pop()!.replace(/\.md$/, '');
    const { data, content } = parseFrontmatter(raw);
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? '',
      date: data.date ?? '1970-01-01',
      updated: data.updated || undefined,
      tags: data.tags ? data.tags.split(',').map((t) => t.trim()) : [],
      content,
      readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getAllBlogPosts = () => posts;
export const getBlogPost = (slug: string) => posts.find((p) => p.slug === slug);
