import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { createLowlight } from 'lowlight';
import type { Element, ElementContent, Root } from 'hast';
// Register ONLY the grammars the posts actually use instead of highlight.js's
// ~37-language "common" set. We deliberately do NOT use rehype-highlight: its
// `languages` option changes runtime registration only — the plugin statically
// references lowlight's `common` set as a fallback, so all ~37 grammars stay
// in the bundle regardless (~146KB min). `bash` also registers its `sh`
// alias, `javascript` registers `js`. If a future post fences a new language,
// its grammar MUST be imported and registered here, or that code block
// silently renders unhighlighted.
import langBash from 'highlight.js/lib/languages/bash';
import langJavascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import NotFoundPage from './NotFoundPage';
import { getBlogPost } from '../lib/blogPosts';

const SITE = 'https://swapniltripathi.com';

// Keys are the canonical grammar names — fence-language aliases (sh, js) come
// from the grammar definitions themselves.
const lowlight = createLowlight({ bash: langBash, javascript: langJavascript });

const textContent = (node: Element): string =>
  node.children
    .map((child) =>
      child.type === 'text' ? child.value : child.type === 'element' ? textContent(child) : '',
    )
    .join('');

const languageOf = (node: Element): string | undefined => {
  const list = node.properties.className;
  if (!Array.isArray(list)) return undefined;
  let name: string | undefined;
  for (const item of list) {
    const value = String(item);
    if (value === 'no-highlight' || value === 'nohighlight') return undefined;
    if (!name && value.startsWith('lang-')) name = value.slice(5);
    if (!name && value.startsWith('language-')) name = value.slice(9);
  }
  return name;
};

// Minimal drop-in for rehype-highlight (same classes, same hast output) that
// only bundles the grammars registered above.
function rehypeHighlightLite() {
  return (tree: Root) => {
    const visit = (node: Root | Element) => {
      for (const child of node.children) {
        if (child.type !== 'element') continue;
        if (
          child.tagName === 'code' &&
          node.type === 'element' &&
          node.tagName === 'pre'
        ) {
          const lang = languageOf(child);
          if (lang) {
            if (!Array.isArray(child.properties.className)) child.properties.className = [];
            if (!child.properties.className.includes('hljs')) {
              child.properties.className.unshift('hljs');
            }
            // Unregistered grammar: keep the themed block but no token spans —
            // the same degradation rehype-highlight has for unknown languages.
            if (lowlight.registered(lang)) {
              const result = lowlight.highlight(lang, textContent(child), { prefix: 'hljs-' });
              if (result.children.length > 0) {
                child.children = result.children as ElementContent[];
              }
            }
          }
        }
        visit(child);
      }
    };
    visit(tree);
  };
}

// FAQ structured data for posts that answer common questions (wins People-Also-Ask /
// AI-overview slots). Answers are faithful summaries of the post content.
const FAQ_BY_SLUG: Record<string, { q: string; a: string }[]> = {
  'malware-in-git-hooks': [
    {
      q: 'Is a take-home coding assignment from a recruiter safe to run?',
      a: 'Treat every take-home as untrusted code. Do not git clone, npm install, or git checkout it on your real machine before inspecting it — malware can hide in git hooks and install scripts, and following the setup instructions can be the exploit itself.',
    },
    {
      q: 'Can git checkout run malware?',
      a: 'Yes. Git hooks such as post-checkout and pre-commit run automatically when you use normal git commands. A ZIP that ships a full .git folder can smuggle live hooks onto your machine — git deliberately does not transmit hooks over a normal clone, which is why attackers deliver assignments as ZIP files instead of repo links.',
    },
    {
      q: 'How do I check a suspicious coding assignment without running it?',
      a: 'Inspect it read-only: look inside .git/hooks/ for anything that is not a *.sample file, use npm install --ignore-scripts inside a throwaway VM if you must install, and verify recruiters through the company’s real domain. The free open-source interview-assignment-scanner automates these checks without ever executing the code.',
    },
  ],
};

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) return <NotFoundPage />;

  const url = post.canonical ?? `${SITE}/blogs/${post.slug}`;
  const image = post.cover ? `${SITE}${post.cover}` : undefined;

  const jsonLd: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      ...(post.updated ? { dateModified: post.updated } : {}),
      author: { '@type': 'Person', name: 'Swapnil Tripathi', url: `${SITE}/` },
      ...(image ? { image } : {}),
      mainEntityOfPage: url,
    },
  ];
  const faq = FAQ_BY_SLUG[post.slug];
  if (faq) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(({ q, a }) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    });
  }

  return (
    <div className="relative z-10">
      <Seo
        title={`${post.title} — Swapnil Tripathi`}
        description={post.description}
        path={`/blogs/${post.slug}`}
        ogType="article"
        image={image}
        jsonLd={jsonLd}
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <p className="text-xs uppercase tracking-widest text-white/40">
          <Link to="/blogs" className="hover:text-white/70">← Blog</Link>
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-sm text-white/50">
          Swapnil Tripathi · <time dateTime={post.date}>{post.date}</time> ·{' '}
          {post.readingMinutes} min read
        </p>
        {post.tags.length > 0 && (
          <p className="mt-3 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded border border-white/10 px-2 py-0.5 text-[11px] text-white/40"
              >
                {tag}
              </span>
            ))}
          </p>
        )}
        <div className="post-content prose prose-invert mt-10 max-w-none">
          <Markdown
            remarkPlugins={[remarkGfm]}
            // rehype-raw stays: posts rely on raw HTML (<figure>, <details>).
            rehypePlugins={[rehypeRaw, rehypeHighlightLite]}
            components={{
              // Article images live below the fold — lazy-load them all.
              // (react-markdown passes a `node` prop that must not reach the DOM.)
              img: (imgProps) => {
                const { node: _node, ...props } = imgProps;
                void _node;
                return <img loading="lazy" decoding="async" {...props} />;
              },
            }}
          >
            {post.content}
          </Markdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
