import { Link, useParams } from 'react-router-dom';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import Footer from '../components/Footer';
import { getBlogPost } from '../lib/blogPosts';
import { usePostHead } from '../lib/postHead';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = slug ? getBlogPost(slug) : undefined;

  usePostHead(post);

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
            rehypePlugins={[rehypeRaw, rehypeHighlight]}
          >
            {post.content}
          </Markdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
