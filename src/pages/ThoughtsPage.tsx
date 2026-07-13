import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { getAllPosts } from '../lib/posts';

const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });

export default function ThoughtsPage() {
  const posts = getAllPosts();
  return (
    <div className="relative z-10">
      <Seo
        title="Thoughts — Swapnil Tripathi"
        description="Engineering write-ups from building real-time data systems: Redis architecture, LLM pipelines, incidents, and tradeoffs — first-hand, with numbers."
        path="/thoughts"
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <h1 className="text-4xl font-semibold">Thoughts</h1>
        <p className="mt-3 text-white/60">
          First-person write-ups from systems I built and ran in production. No tutorials —
          just what worked, what broke, and why.
        </p>
        <ul className="mt-12 space-y-10">
          {posts.map((post) => (
            <li key={post.slug}>
              <article>
                <Link to={`/thoughts/${post.slug}`} className="group block">
                  <h2 className="text-xl font-medium transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">{post.description}</p>
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
      </main>
      <Footer />
    </div>
  );
}
