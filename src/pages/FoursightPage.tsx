import { Suspense, lazy } from 'react';
import { ClientOnly } from 'vite-react-ssg';
import { ArrowLeftRight, Eye, Search } from 'lucide-react';
import Seo from '../components/Seo';

// The game app (WebSocket client + table UI) loads as its own chunk after
// hydration — the prerendered rules content below costs the site nothing.
const FoursightApp = lazy(() => import('../components/game/FoursightApp'));

const FAQ = [
  {
    q: 'Is Foursight free to play?',
    a: 'Completely free. No account, no signup, no ads inside the game — pick a name, share a table code, play.',
  },
  {
    q: 'How many players can join a table?',
    a: 'Two to five players per table. Create a table, send the 5-letter code to friends, and start when everyone is in.',
  },
  {
    q: 'What kind of game is Foursight?',
    a: 'A memory and deduction card game from the classic Golf/Cambio family of folk card games: everyone holds four face-down cards, you only ever glimpse some of them, and the lowest total wins the round.',
  },
  {
    q: 'What are the game modes?',
    a: 'Classic (play to 100 points), Quick Match (exactly five rounds), Beginner (see all four starting cards, no power cards), and Custom (tune the target score, timers, and rules yourself).',
  },
  {
    q: 'Do I need to install anything?',
    a: 'No. Foursight runs entirely in the browser on desktop and mobile. Your match history is stored locally in your browser.',
  },
];

const JSON_LD = [
  {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: 'Foursight',
    url: 'https://swapniltripathi.com/game/foursight',
    description:
      'Foursight is a free online multiplayer memory card game for 2–5 players. Hold four face-down cards, remember what you glimpse, use peek, spy, and swap powers, and call "Foursight!" when you think your total is lowest.',
    playMode: 'MultiPlayer',
    gamePlatform: 'Web browser',
    applicationCategory: 'GameApplication',
    isAccessibleForFree: true,
    numberOfPlayers: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5 },
    genre: ['Card game', 'Memory game', 'Deduction game'],
    author: { '@type': 'Person', name: 'Swapnil Tripathi', url: 'https://swapniltripathi.com' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  },
];

export default function FoursightPage() {
  return (
    <div className="relative z-10 min-h-screen bg-dark text-white">
      <Seo
        title="Foursight — Free Online Multiplayer Memory Card Game"
        description="Play Foursight free in your browser with 2–5 friends: a memory and deduction card game where you hold four face-down cards, peek, spy, swap — and call it when you think you're lowest."
        path="/game/foursight"
        jsonLd={JSON_LD}
      />

      <div className="mx-auto max-w-5xl px-5 pb-20 pt-14 sm:px-6 lg:px-8">
        {/* Hero */}
        <header className="animate-rise">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent/75">
            A game built into this site · 2–5 players · Free
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl">
            Foursight<span className="text-accent">.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
            Four face-down cards. Two glimpses. A memory you can&apos;t fully trust, opponents you
            can&apos;t fully read — and one moment where you look up and call{' '}
            <span className="font-semibold text-accent">&ldquo;Foursight!&rdquo;</span> Lowest total
            wins. Create a table, send the code to your friends, and play right here — Among-Us-style code joining, no accounts.
          </p>
        </header>

        {/* The game itself */}
        <section id="play" className="mt-10 scroll-mt-24" aria-label="Play Foursight">
          <ClientOnly>
            {() => (
              <Suspense
                fallback={
                  <div className="flex h-48 items-center justify-center rounded-2xl border border-white/[0.08] bg-white/[0.02] text-sm text-white/45">
                    Dealing the table…
                  </div>
                }
              >
                <FoursightApp />
              </Suspense>
            )}
          </ClientOnly>
        </section>

        {/* How to play — prerendered, crawlable, written from scratch */}
        <section className="mt-16">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/75">How to play</h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <RuleCard step="01" title="The deal">
              Everyone gets four cards, face down — a 2×2 grid you must not look at. At the start of
              the round you get one privilege: privately view two of your own cards, once. After
              that, your memory is the only record.
            </RuleCard>
            <RuleCard step="02" title="Your turn">
              Draw the top card of the deck and decide: swap it into your grid (the replaced card
              goes to the discard, face up), spend it for its power if it has one, or toss it. Or
              skip the deck entirely and take the visible discard — but then you must swap it in.
            </RuleCard>
            <RuleCard step="03" title="The call">
              When you believe your four cards total less than everyone else&apos;s, end the round:
              call <em>Foursight</em> instead of drawing. Every opponent gets exactly one more turn,
              then all cards flip. Guess right and you score zero. Guess wrong and the round&apos;s
              points come to you — plus a 5-point fine.
            </RuleCard>
            <RuleCard step="04" title="The match">
              Low is life: cards score their face value, 0 is gold, 12 is a brick. Rounds repeat
              until someone reaches the target score (100 in Classic) — and the player with the{' '}
              <em>lowest</em> cumulative total takes the match.
            </RuleCard>
          </div>
        </section>

        {/* Power cards */}
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/75">Power cards</h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
            Six of the thirteen values carry a power, and every power card says so on its face —
            its icon, its name, its own color. Nothing to memorize. Powers only trigger when you
            draw the card from the deck and spend it — cards taken from the discard are just numbers.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <PowerCard icon={Eye} values="7 · 8" name="Peek" iconClass="text-accent" bgClass="bg-accent/10" valueClass="text-accent/70">
              Privately look at one of your own face-down cards. Your opponents see that you
              peeked — not what you saw.
            </PowerCard>
            <PowerCard icon={Search} values="9 · 10" name="Spy" iconClass="text-violet-300" bgClass="bg-violet-400/10" valueClass="text-violet-300/70">
              Privately look at one card in an opponent&apos;s grid. Knowledge is ammunition.
            </PowerCard>
            <PowerCard icon={ArrowLeftRight} values="11 · 12" name="Swap" iconClass="text-amber-300" bgClass="bg-amber-400/10" valueClass="text-amber-300/70">
              Trade one of your cards for one of theirs — completely blind. Neither of you sees
              either card. Chaos, weaponized.
            </PowerCard>
          </div>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/55">
            <span className="font-semibold text-white/75">The matching rule:</span> convinced that
            two, three, or even four of your face-down cards share a value? Declare it. Right, and
            they all leave your grid — fewer cards, lower total. Wrong, and your turn is forfeit.
          </p>
        </section>

        {/* Variants */}
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/75">Game modes</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <VariantCard name="Classic" detail="The full game: see 2 of your 4 cards, all powers live, first past 100 points ends it — lowest total wins." />
            <VariantCard name="Quick Match" detail="Exactly five rounds, no target score. Perfect for a lunch break." />
            <VariantCard name="Beginner" detail="See all four of your starting cards, no power cards, race to 50. Learn the rhythm before the mind games." />
            <VariantCard name="Custom" detail="Host tunes everything: hand size, target, timers, powers, matching." />
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/75">FAQ</h2>
          <div className="mt-5 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3">
                <summary className="cursor-pointer list-none text-sm font-medium text-white/80 transition-colors group-open:text-accent">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-white/55">{f.a}</p>
              </details>
            ))}
          </div>
          <p className="mt-8 text-xs leading-relaxed text-white/40">
            Foursight is an original implementation of a classic folk card game structure (the
            Golf/Cambio family), built from scratch — rules engine, realtime rooms, and all — as
            part of this site. No downloads, no tracking, no accounts.
          </p>
        </section>
      </div>
    </div>
  );
}

function RuleCard({ step, title, children }: { step: string; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <p className="text-xs font-bold text-accent/60">{step}</p>
      <h3 className="mt-1.5 text-base font-semibold text-white/90">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">{children}</p>
    </div>
  );
}

function PowerCard({
  icon: Icon,
  values,
  name,
  iconClass,
  bgClass,
  valueClass,
  children,
}: {
  icon: typeof Eye;
  values: string;
  name: string;
  /** Matches the power's in-game card color — the page teaches the palette. */
  iconClass: string;
  bgClass: string;
  valueClass: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <div className="flex items-center gap-2.5">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${bgClass}`}>
          <Icon className={`h-5 w-5 ${iconClass}`} strokeWidth={1.75} />
        </span>
        <div>
          <p className="text-sm font-semibold text-white/90">{name}</p>
          <p className={`font-mono text-xs ${valueClass}`}>{values}</p>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-white/55">{children}</p>
    </div>
  );
}

function VariantCard({ name, detail }: { name: string; detail: string }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
      <h3 className="text-sm font-semibold text-white/90">{name}</h3>
      <p className="mt-2 text-xs leading-relaxed text-white/55">{detail}</p>
    </div>
  );
}
