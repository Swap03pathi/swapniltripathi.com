import { parseFrontmatter } from './frontmatter';

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO yyyy-mm-dd — used for sorting, <time>, and JSON-LD
  updated?: string;
  tags: string[];
  system?: string; // links the post to a Saras system page
  content: string;
  readingMinutes: number;
};

// query:'?raw' inlines the markdown at build time — works in both the Node SSG pass
// (getStaticPaths) and the browser bundle. No fetch, no backend.
const files = import.meta.glob('../content/thoughts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const posts: Post[] = Object.entries(files)
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
      system: data.system || undefined,
      content,
      readingMinutes: Math.max(1, Math.round(content.split(/\s+/).length / 220)),
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date));

export const getAllPosts = () => posts;
export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
