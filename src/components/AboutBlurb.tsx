import { Link } from 'react-router-dom';

export default function AboutBlurb() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-[600px]">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-accent/60">About</h2>
        <div className="space-y-4 text-sm leading-relaxed text-white/50">
          <p>
            I&apos;m a self-taught engineer who ends up owning the problems nobody else picks
            up. The pattern is consistent: step in before I&apos;m &quot;qualified&quot;, learn
            exactly what the problem needs, and ship a system that survives production.
          </p>
          <p>
            That arc runs through my whole career — I taught myself JavaScript at Testbook to
            automate sales operations, went deep on Python and data engineering at Apple as the
            sole data engineer for an AppleCare analytics org, and took on full architecture,
            backend, and DevOps ownership as CTO and co-founder of Saras (Antler-backed).
          </p>
          <p>
            What I do best is &quot;idea → working system, fast&quot; — starting from raw, messy
            inputs, and building infrastructure that is deliberately cheap to run. At Saras I
            cut our AWS compute consumption by roughly 45% in a single optimization drive.
          </p>
          <p>
            I under-commit and over-deliver — I like being on the safe side of my own promises.{' '}
            <Link to="/about" className="text-accent/70 underline hover:text-accent">
              Full story →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
