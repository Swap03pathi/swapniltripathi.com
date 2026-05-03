export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative">
      <div className="max-w-2xl text-center">
        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-tight animate-fade-in"
          style={{ animationDelay: '0.1s' }}
        >
          I build systems from scratch
          <br />
          <span className="text-accent">that actually work.</span>
        </h1>

        <p
          className="mt-6 text-base sm:text-lg text-white/50 leading-relaxed animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          From messy inputs to real-world execution — I take ideas from zero to
          working systems.
        </p>

        <p
          className="mt-3 text-xs text-white/25 tracking-wide animate-fade-in-up"
          style={{ animationDelay: '0.5s' }}
        >
          CTO @ Saras &bull; Apple &bull; IIT Bombay
        </p>

        <div
          className="mt-10 animate-fade-in-up"
          style={{ animationDelay: '0.7s' }}
        >
          <a
            href="mailto:hello@swapnil.dev"
            className="inline-block px-6 py-2.5 text-sm font-medium bg-accent/10 text-accent border border-accent/20 rounded-md hover:bg-accent/20 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all"
          >
            Let's talk
          </a>
        </div>
      </div>
    </section>
  );
}
