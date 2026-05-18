export default function AboutBlurb() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-[600px]">
        <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-accent/60">About</h2>
        <div className="space-y-4 text-sm leading-relaxed text-white/50">
          <p>
            I&apos;m an engineer focused on building operational systems that remain reliable
            under real-world constraints.
          </p>
          <p>
            After working across analytics and operational infrastructure at Apple, I moved into
            a leadership role as CTO and Co-Founder at Saras, where I helped build and scale the
            platform from scratch.
          </p>
          <p>
            My work has primarily focused on realtime ingestion systems, execution infrastructure,
            analytics workflows, automation tooling, and production data pipelines.
          </p>
          <p>
            I enjoy solving problems that sit at the intersection of scale, reliability, and
            operational complexity.
          </p>
        </div>
      </div>
    </section>
  );
}
