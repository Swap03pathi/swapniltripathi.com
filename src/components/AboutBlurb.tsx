export default function AboutBlurb() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-[600px] mx-auto">
        <h2 className="text-xs font-medium text-accent/60 uppercase tracking-widest mb-6">
          About
        </h2>
        <div className="space-y-4 text-sm text-white/50 leading-relaxed">
          <p>
            I'm a technical leader focused on building systems that stay stable
            under real-world pressure.
          </p>
          <p>
            After working at Apple across Data Engineering and Data Science, I
            moved into a leadership role as CTO and Co-Founder of Saras (formerly
            Finosauras), where I built and scaled the core platform from scratch.
          </p>
          <p>
            We launched in 3 months and scaled to 150,000+ downloads, processing
            200k+ daily signals with high-concurrency backend systems and custom
            execution logic.
          </p>
          <p>
            I specialize in building efficient, high-performance systems —
            maintaining 99.9% uptime while optimizing for cost and scale.
          </p>
          <p>
            I'm currently looking to work with teams where I can own technical
            direction and build systems that actually work in production.
          </p>
        </div>
      </div>
    </section>
  );
}
