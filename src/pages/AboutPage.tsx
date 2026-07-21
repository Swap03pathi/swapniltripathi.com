import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { PROFILE_PAGE } from '../lib/jsonld';
import { resolveAssetUrl } from '../utils/assetUrl';

const ABOUT_MD = `
**I say yes to problems before I know how to solve them, then figure them out. That's the
career in one sentence — here's the person behind it.**

The first time anyone asked me to write code, I couldn't. EY internship, 2018, a Govt. of
India education project — a senior official asked me to "write a program" without checking
whether I could. I didn't say no, taught myself in two weeks, and shipped. Nothing about that
tool was impressive except what it rewired in me: **everything is figure-out-able.** Every job
since — [Testbook](/experience/testbook), [Apple](/experience/apple), co-founding
[Saras](/experience/saras) — has been that same lesson at bigger scale. The details live on
their own pages; I won't retell them here.

Earlier this year I stepped down from Saras and started my first deliberate break in eight
years. It turns out I don't really do "pause" — so far the break has produced a
[malware investigation](/blogs/malware-in-git-hooks), a
[free security tool](/blogs/interview-assignment-scanner), and this website getting a
personality.

## How I'm wired

- **Never do the same task twice** — if I do something manually a second time, I automate it,
  at work and in life.
- **Under-commit, over-deliver** — most of tech runs the opposite way; I like being on the
  safe side of my own promises.
- **Prepare for the failure mode before it happens** — the instinct behind both my systems
  and that malware story.

## Beyond the terminal

At IIT Bombay I was the elected Sports Councillor of my hostel — 30+ events, a ₹0.5M budget,
an Overall Championship year. Less expected: **2nd place in stand-up comedy at the Inter-IIT
Cultural Meet** (30+ performers, 18 IITs), co-founding Comedy Cons — the campus stand-up
club — and later **opening for Vipul Goyal and Kunal Rao**. Two half-marathons and a 30 km
runathon later, I maintain that endurance is the only real prerequisite for both distributed
systems and comedy.

## What I'm into

Off the clock I run on **rap and Indian hip-hop**, watch stand-up specials the way other
people rewatch sitcoms — and also rewatch sitcoms. The rotating shelf of current favorites —
music, specials, shows, and the rest — lives over on [/me](/me).

## Say hello

On a break, building for curiosity, open to interesting problems and teams →
[contact](/contact).
`;

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <Seo
        title="About — Swapnil Tripathi"
        description="Self-taught systems builder: the EY origin story, how I'm wired, stand-up comedy, and what I'm building on a deliberate career break."
        path="/about"
        jsonLd={PROFILE_PAGE}
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <div className="flex items-center gap-6">
          <img
            src={resolveAssetUrl('/swapnil-profile-sm.jpg')}
            alt="Swapnil Tripathi"
            width={300}
            height={400}
            className="h-20 w-20 rounded-full border border-white/10 object-cover object-[50%_18%]"
          />
          <h1 className="text-4xl font-semibold">About</h1>
        </div>
        <div className="prose prose-invert mt-8 max-w-none">
          <Markdown remarkPlugins={[remarkGfm]}>{ABOUT_MD}</Markdown>
        </div>
      </main>
      <Footer />
    </div>
  );
}
