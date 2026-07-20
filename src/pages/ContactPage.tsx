import Seo from '../components/Seo';
import Footer from '../components/Footer';
import SocialIcon from '../components/SocialIcon';
import { WHATSAPP_URL } from '../constants/contact';

// One medium, one purpose, one button.
const CHANNELS = [
  {
    icon: 'email',
    name: 'Email',
    purpose:
      'Hiring, building something interesting, or telling me I’m wrong about something I wrote? Email is best for anything substantial — roles, collaborations, long-form disagreements.',
    button: 'Email me',
    href: 'mailto:swapniltripathi2905@gmail.com',
  },
  {
    icon: 'linkedin',
    name: 'LinkedIn',
    purpose:
      'Where my full work history lives — connect, or message me there if that’s your home turf.',
    button: 'LinkedIn',
    href: 'https://www.linkedin.com/in/swapnil-neeraj-tripathi-310019122/',
  },
  {
    icon: 'whatsapp',
    name: 'WhatsApp',
    purpose: 'Something quick? For anything that fits in three sentences.',
    button: 'WhatsApp',
    href: WHATSAPP_URL,
  },
  {
    icon: 'instagram',
    name: 'Instagram',
    purpose: 'The unprofessional feed — life beyond the terminal.',
    button: 'Instagram',
    href: 'https://instagram.com/swap0_3pathi',
  },
];

export default function ContactPage() {
  return (
    <div className="relative z-10">
      <Seo
        title="Contact — Swapnil Tripathi"
        description="Get in touch about roles, real-time data systems, or anything I've written — email, LinkedIn, WhatsApp, or Instagram. I actually reply."
        path="/contact"
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-3 text-white/60">
          My inbox is open — and I actually reply. Usually within a day or two, IST.
        </p>
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CHANNELS.map((c) => (
            <li
              key={c.name}
              className="flex flex-col rounded-lg border border-white/10 bg-white/[0.02] p-5"
            >
              <h2 className="text-base font-medium text-white/90">{c.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-white/50">{c.purpose}</p>
              <a
                href={c.href}
                target={c.href.startsWith('http') ? '_blank' : undefined}
                rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="mt-4 inline-flex w-fit items-center gap-2 rounded-md border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20"
              >
                <SocialIcon icon={c.icon} className="h-4 w-4" />
                {c.button}
              </a>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
