import { Link } from 'react-router-dom';
import { socials } from '../data';
import SocialIcon from './SocialIcon';

export default function Footer() {
  return (
    <footer className="py-16 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-sm text-white/55">
          Want to build something that works?
        </p>
        <Link
          to="/contact"
          className="inline-block mt-4 px-6 py-2.5 text-sm font-medium bg-accent/10 text-accent border border-accent/20 rounded-md hover:bg-accent/20 hover:border-accent/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-all"
        >
          Let&apos;s Talk
        </Link>

        {/* Socials */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {socials.map((social) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/20 hover:text-accent transition-colors"
              title={social.name}
            >
              <SocialIcon icon={social.icon} />
            </a>
          ))}
        </div>

        <nav className="mt-8 flex items-center justify-center gap-5 text-xs text-white/55">
          <Link to="/about" className="hover:text-white/85 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-white/85 transition-colors">Contact</Link>
          <Link to="/privacy" className="hover:text-white/85 transition-colors">Privacy</Link>
        </nav>

        <p className="mt-6 text-xs text-white/50">
          &copy; {new Date().getFullYear()} Swapnil
        </p>
      </div>
    </footer>
  );
}
