export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm text-white/30">
          Want to build something that works?
        </p>
        <a
          href="mailto:hello@swapnil.dev"
          className="inline-block mt-4 px-6 py-2.5 text-sm font-medium bg-accent/10 text-accent border border-accent/20 rounded-md hover:bg-accent/20 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all"
        >
          Let's talk
        </a>
        <p className="mt-8 text-xs text-white/15">
          &copy; {new Date().getFullYear()} Swapnil
        </p>
      </div>
    </footer>
  );
}
