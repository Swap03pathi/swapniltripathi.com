import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import NotFoundPage from './NotFoundPage';
import { getPost } from '../lib/posts';

// Powers the post → system-page internal links (WEBSITE_AUDIT_PLAN.md §10).
const SYSTEM_LINKS: Record<string, { href: string; label: string }> = {
  'market-intelligence': {
    href: '/saras/systems/market-intelligence',
    label: 'Multidimensional Market Intelligence Engine',
  },
  'realtime-execution': {
    href: '/saras/systems/realtime-execution',
    label: 'Real-Time Virtual Execution System',
  },
  'realtime-ingestion': {
    href: '/saras/systems/realtime-ingestion',
    label: 'Realtime Recommendation Ingestion System',
  },
};

export default function ThoughtPostPage() {
  const { slug } = useParams();
  const post = slug ? getPost(slug) : undefined;
  if (!post) return <NotFoundPage />;

  const system = post.system ? SYSTEM_LINKS[post.system] : undefined;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    ...(post.updated ? { dateModified: post.updated } : {}),
    author: { '@id': 'https://swapniltripathi.com/#person' },
    mainEntityOfPage: `https://swapniltripathi.com/thoughts/${post.slug}`,
  };

  return (
    <div className="relative z-10">
      <Seo
        title={`${post.title} — Swapnil Tripathi`}
        description={post.description}
        path={`/thoughts/${post.slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <p className="text-xs uppercase tracking-widest text-white/40">
          <Link to="/thoughts" className="hover:text-white/70">← Thoughts</Link>
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{post.title}</h1>
        {/* Visible author + date = E-E-A-T and AI-citation signal */}
        <p className="mt-4 text-sm text-white/50">
          Swapnil Tripathi · <time dateTime={post.date}>{post.date}</time> ·{' '}
          {post.readingMinutes} min read
        </p>
        <div className="prose prose-invert mt-10 max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
        {system && (
          <p className="mt-12 border-t border-white/10 pt-6 text-sm text-white/60">
            This post is about a system I built and ran at Saras. Full architecture:{' '}
            <Link to={system.href} className="underline hover:text-white">
              {system.label}
            </Link>
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
}
