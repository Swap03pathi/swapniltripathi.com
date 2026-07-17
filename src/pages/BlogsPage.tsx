import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { getAllBlogPosts } from '../lib/blogPosts';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

export default function BlogsPage() {
  const posts = getAllBlogPosts();

  useEffect(() => {
    document.title = 'Blog — Swapnil Tripathi';
  }, []);

  return (
    <div className="relative z-10">
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <h1 className="text-4xl font-semibold">Blog</h1>
        <p className="mt-3 text-white/60">
          Write-ups from things I build and run in production.
        </p>

        {posts.length === 0 ? (
          <div className="mt-12 rounded-lg border border-white/10 bg-white/[0.02] p-8 text-center">
            <p className="text-sm text-white/50">
              The first posts are being written — check back soon.
            </p>
          </div>
        ) : (
          <ul className="mt-12 space-y-10">
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <Link to={`/blogs/${post.slug}`} className="group block">
                    <h2 className="text-xl font-medium transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {post.description}
                    </p>
                    <p className="mt-2 text-xs text-white/40">
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                      {' · '}
                      {post.readingMinutes} min read
                    </p>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </main>
      <Footer />
    </div>
  );
}
