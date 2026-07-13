import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { WHATSAPP_URL } from '../constants/contact';

const LINKS = [
  {
    label: 'Email',
    value: 'swapniltripathi2905@gmail.com',
    href: 'mailto:swapniltripathi2905@gmail.com',
    note: 'Best for anything detailed — roles, systems questions, feedback on a post.',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/swapnil-neeraj-tripathi-310019122',
    href: 'https://www.linkedin.com/in/swapnil-neeraj-tripathi-310019122/',
    note: 'Fastest response; also where my work history lives.',
  },
  {
    label: 'WhatsApp',
    value: 'Quick messages',
    href: WHATSAPP_URL,
    note: 'For anything short and informal.',
  },
];

export default function ContactPage() {
  return (
    <div className="relative z-10">
      <Seo
        title="Contact — Swapnil Tripathi"
        description="Get in touch about roles, real-time data systems, or anything I've written — email, LinkedIn, or WhatsApp."
        path="/contact"
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <h1 className="text-4xl font-semibold">Contact</h1>
        <p className="mt-3 text-white/60">
          Whether it&apos;s a role, a systems problem, or feedback on something I wrote — my
          inbox is open. I usually reply within a day or two.
        </p>
        <ul className="mt-10 space-y-6">
          {LINKS.map((l) => (
            <li key={l.label} className="rounded-lg border border-white/10 p-5">
              <p className="text-xs uppercase tracking-widest text-white/40">{l.label}</p>
              <a
                className="mt-1 block text-lg underline hover:text-white"
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              >
                {l.value}
              </a>
              <p className="mt-2 text-sm text-white/50">{l.note}</p>
            </li>
          ))}
        </ul>
        {/* OPTIONAL — enable only after deciding job-search visibility (plan §14.5):
        <p className="mt-10 text-sm text-white/60">
          I'm open to conversations about Data/ML Engineering, Backend/Platform, and Founding
          Engineer roles.
        </p> */}
      </main>
      <Footer />
    </div>
  );
}
