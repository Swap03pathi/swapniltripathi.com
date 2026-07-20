import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { WHATSAPP_URL } from '../constants/contact';

const CARDS = [
  {
    label: 'Hiring, or building something interesting?',
    body: 'Email is best for anything substantial. LinkedIn works too — and is where my full history lives. Open to conversations about data/ML engineering, backend and real-time platforms, and founding-engineer problems.',
    links: [
      { text: 'swapniltripathi2905@gmail.com', href: 'mailto:swapniltripathi2905@gmail.com' },
      {
        text: 'LinkedIn',
        href: 'https://www.linkedin.com/in/swapnil-neeraj-tripathi-310019122/',
      },
    ],
  },
  {
    label: 'Something quick?',
    body: 'WhatsApp — for anything that fits in three sentences.',
    links: [{ text: 'Message on WhatsApp', href: WHATSAPP_URL }],
  },
  {
    label: 'Read something here and disagree?',
    body: 'Even better — tell me why. The corrections are usually the best part.',
    links: [
      {
        text: 'swapniltripathi2905@gmail.com',
        href: 'mailto:swapniltripathi2905@gmail.com?subject=About%20something%20you%20wrote',
      },
    ],
  },
];

export default function ContactPage() {
  return (
    <div className="relative z-10">
      <Seo
        title="Contact — Swapnil Tripathi"
        description="Get in touch about roles, real-time data systems, or anything I've written — email, LinkedIn, or WhatsApp. I actually reply."
        path="/contact"
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-3 text-white/60">
          My inbox is open — and I actually reply. Usually within a day or two, IST.
        </p>
        <ul className="mt-10 space-y-6">
          {CARDS.map((card) => (
            <li key={card.label} className="rounded-lg border border-white/10 p-5">
              <h2 className="text-base font-medium text-white/90">{card.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-white/50">{card.body}</p>
              <p className="mt-3 flex flex-wrap gap-4">
                {card.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-accent/80 underline transition-colors hover:text-accent"
                  >
                    {l.text}
                  </a>
                ))}
              </p>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
}
