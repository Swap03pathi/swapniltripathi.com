import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Footer from '../components/Footer';
import { getBlogPost } from '../lib/blogPosts';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;

  useEffect(() => {
    document.title = post
      ? `${post.title} — Swapnil Tripathi`
      : 'Post not found — Swapnil Tripathi';
  }, [post]);

  if (!post) {
    return (
      <div className="relative z-10">
        <main className="px-6 pt-32 pb-24 text-center">
          <h1 className="text-3xl font-semibold">Post not found</h1>
          <p className="mx-auto mt-4 max-w-md text-white/60">
            This post doesn&apos;t exist — it may have moved.
          </p>
          <Link to="/blogs" className="mt-8 inline-block text-sm underline hover:text-white">
            ← Back to the blog
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative z-10">
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <p className="text-xs uppercase tracking-widest text-white/40">
          <Link to="/blogs" className="hover:text-white/70">← Blog</Link>
        </p>
        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">{post.title}</h1>
        <p className="mt-4 text-sm text-white/50">
          Swapnil Tripathi · <time dateTime={post.date}>{post.date}</time> ·{' '}
          {post.readingMinutes} min read
        </p>
        <div className="prose prose-invert mt-10 max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
