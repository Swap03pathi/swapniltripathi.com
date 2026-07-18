import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="relative z-10">
      <Seo
        title="Page not found — Swapnil Tripathi"
        description="This page doesn't exist."
        path="/404"
        noindex
      />
      <main className="px-6 pt-32 pb-24 text-center">
        <p className="text-xs uppercase tracking-widest text-white/40">404</p>
        <h1 className="mt-3 text-3xl font-semibold">This page doesn&apos;t exist</h1>
        <p className="mx-auto mt-4 max-w-md text-white/60">
          The link may be old, or the page may have moved.
        </p>
        <nav className="mt-8 flex justify-center gap-6 text-sm">
          <Link className="underline hover:text-white" to="/">Home</Link>
          <Link className="underline hover:text-white" to="/experience">Experience</Link>
          <Link className="underline hover:text-white" to="/blogs">Blog</Link>
        </nav>
      </main>
      <Footer />
    </div>
  );
}
