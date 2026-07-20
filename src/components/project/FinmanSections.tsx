import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { resolveAssetUrl } from '../../utils/assetUrl';

/**
 * The walkthrough deck is a fixed 1920x1080 page — rendered at native size and
 * scaled down to the container width so every slide is fully visible inline.
 */
function ScaledDeck({ src, title }: { src: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.45);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / 1920);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className="aspect-video w-full overflow-hidden rounded-lg border border-white/10 bg-white/[0.02]"
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="origin-top-left"
        style={{ width: 1920, height: 1080, transform: `scale(${scale})`, border: 0 }}
      />
    </div>
  );
}

const REPO_DEVICE = 'https://github.com/Swap03pathi/Finance-tracker-dart';
const REPO_SERVER = 'https://github.com/Swap03pathi/Finance-tracker-server';

const FACT_STRIP = [
  { label: 'Role', value: 'Solo — design, engine, server, device, tests' },
  { label: 'Timeline', value: 'June 2026 · one focused week' },
  { label: 'Platform', value: 'Android only (iOS blocks SMS access)' },
  { label: 'Status', value: 'Paused · foundation complete' },
];

const PIPELINE_STEPS = [
  'SMS (device inbox)',
  'Gate — drop OTP/promo',
  'Fingerprint — mask → SHA-256',
  'Parse — template + classify',
  'Ledger — idempotent entry',
  'income · expenses · savings',
];

const GUARANTEES = [
  'Raw bodies never persisted server-side — device + your own Drive only',
  'Money is integer paise / NUMERIC(14,2), never a float',
  'Server re-checks redaction — a surviving digit-run is rejected (422)',
  'Per-install random key — no shared account, no cross-user leak',
];

const HIGHLIGHTS = [
  {
    title: 'Privacy as a hard constraint',
    body: 'Raw SMS never leaves the phone; only a redacted skeleton syncs — and the masker and redactor are one code path, so they can’t drift.',
    sub: 'server re-checks redaction · 422',
  },
  {
    title: 'Two-language golden-vector lockstep',
    body: 'Parsing lives twice — TypeScript engine and Dart port — kept honest by language-neutral input → expected fixtures run in both.',
    sub: 'engine matrix + 109 device tests green',
  },
  {
    title: 'Per-account balance reconciliation',
    body: 'A balance belongs to the account, not the card — deposit sightings collapse to one line per issuer and chain to the rupee; unexplained moves are flagged, not hidden.',
    sub: 'fixed the “off by ₹1,000” fragmentation bug',
  },
  {
    title: 'Fail-first TDD + distribution hardening',
    body: 'Every fix began red. The server is hardened with fail-closed JWT, rate limiting, security headers, per-install keys, and no cloud backup.',
    sub: '12 server e2e tests green',
  },
];

const STACK_ROWS = [
  ['Device app', 'Flutter / Dart · drift (SQLite) · offline outbox + sync client'],
  ['Reference engine', '@finman/engine — framework-free TypeScript parsing/ledger logic'],
  ['Server', 'NestJS 10 · Prisma 5 · PostgreSQL 16 · JWT auth'],
  ['Testing', 'Jest + ts-jest · fast-check (property/invariant) · golden vectors'],
  ['Money model', 'NUMERIC(14,2) at rest, integer paise in compute — never a float'],
  ['Infra', 'AWS EC2 + PM2 + RDS Postgres (deliberately no k8s/ECS)'],
];

const LEARNED = [
  {
    title: 'Privacy is a design constraint, not a feature',
    body: 'Deciding up front that raw messages could never leave the device shaped every layer that followed.',
  },
  {
    title: 'Two implementations only stay in sync if a test forces them to',
    body: 'The golden-vector approach was the single most valuable engineering decision in the project.',
  },
  {
    title: 'Property-based tests earn their keep on money',
    body: 'fast-check invariants — like by-tag totals reconciling to by-category totals — caught bugs example-based tests missed.',
  },
];

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="mb-6 text-xs font-medium uppercase tracking-widest text-accent/60">
      {children}
    </h2>
  );
}

export default function FinmanSections() {
  return (
    <div className="space-y-16">
      {/* Hero extras: badge, CTAs, fact strip */}
      <section>
        <p className="mb-5 inline-block rounded border border-accent/15 px-2.5 py-1 text-[11px] font-medium tracking-wide text-accent/50">
          Android-only passion project · not distributed · code is open
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href="#finman-demo"
            className="rounded-md border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20"
          >
            ▶ View the walkthrough deck
          </a>
          <a
            href={REPO_DEVICE}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/60 transition-all hover:border-accent/30 hover:text-accent"
          >
            Device app repo ↗
          </a>
          <a
            href={REPO_SERVER}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-white/60 transition-all hover:border-accent/30 hover:text-accent"
          >
            Server + engine repo ↗
          </a>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {FACT_STRIP.map((f) => (
            <div key={f.label} className="rounded-lg border border-white/5 bg-white/[0.02] p-4">
              <p className="text-[10px] font-medium uppercase tracking-wider text-white/30">
                {f.label}
              </p>
              <p className="mt-1.5 text-sm leading-snug text-white/70">{f.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why I built it */}
      <section>
        <SectionLabel>Why I built it</SectionLabel>
        <div className="space-y-4 text-sm leading-relaxed text-white/50">
          <p>
            Every month my real spending lived scattered across dozens of bank and UPI text
            messages — different formats, OTPs and promos mixed in, balances that quietly
            drifted. The apps that promise to organise it want read access to your entire
            financial life. I wanted the opposite:{' '}
            <span className="text-white/80">
              three honest numbers, computed on my own phone, with the raw messages never
              leaving it.
            </span>
          </p>
          <p>
            So I built Finman as a passion project — partly to have the tool I wanted, partly
            as an excuse to do the engineering properly: a privacy model that holds up, money
            math that can&apos;t round wrong, and parsing logic tested hard enough that
            I&apos;d trust the numbers.
          </p>
          <p>
            And yes — I know <span className="text-white/80">Finman</span> is a terrible name.
            I was deep in a Marvel binge at the time, so the finance tracker got named like a
            superhero. I&apos;m sorry.{' '}
            <span className="text-white/70">(I&apos;m not. Finman answers to no one.)</span>
          </p>
        </div>
      </section>

      {/* The problem */}
      <section>
        <SectionLabel>The problem</SectionLabel>
        <p className="text-sm leading-relaxed text-white/50">
          Dozens of banks, dozens of formats, one-time passwords and promos in the mix, and
          available balances that drift between messages. The signal is all there; it just
          isn&apos;t legible — and it&apos;s too sensitive to hand to a third party. Finman
          parses every transactional SMS on-device and turns it into a clean, reconciled
          ledger.
        </p>
      </section>

      {/* How it works */}
      <section>
        <SectionLabel>How it works</SectionLabel>
        <div className="flex flex-wrap items-center gap-2">
          {PIPELINE_STEPS.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/60">
                {step}
              </span>
              {i < PIPELINE_STEPS.length - 1 ? (
                <span aria-hidden="true" className="text-accent/40">
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-white/50">
          Every message runs the same deterministic pipeline into an{' '}
          <span className="text-white/80">idempotent ledger entry</span> — keyed (UUIDv5) so a
          re-sync or a duplicate SMS can never double-count. Unknown message shapes are induced
          server-side <span className="text-white/80">from a redacted skeleton only</span>,
          cached as a template, then re-parsed on-device. The raw body never travels — the full
          diagram is in <a href="#finman-demo" className="text-accent/70 underline hover:text-accent">the walkthrough below</a>.
        </p>
      </section>

      {/* The privacy line */}
      <section>
        <SectionLabel>The privacy line</SectionLabel>
        <div className="grid grid-cols-1 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.02] p-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-white/30">
              Raw — device-local only
            </p>
            <p className="font-mono text-xs leading-relaxed text-white/60">
              Rs.4,510 spent on Card xx1234 at ZOMATO on 02-06. Avl Bal Rs.18,240. Ref 559210
            </p>
          </div>
          <div className="flex flex-col items-center px-2 text-accent/60">
            <span aria-hidden="true" className="text-lg">
              →
            </span>
            <span className="font-mono text-[10px] text-accent/50">mask == redact</span>
          </div>
          <div className="rounded-lg border border-accent/20 bg-accent/5 p-4">
            <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-accent/50">
              Redacted skeleton — the only thing that syncs
            </p>
            <p className="font-mono text-xs leading-relaxed text-white/60">
              Rs.§AMT§ spent on Card §ACCT§ at §MERCHANT§ on §DATE§. Avl Bal Rs.§AMT§. Ref
              §REF§
            </p>
          </div>
        </div>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {GUARANTEES.map((g) => (
            <li
              key={g}
              className="rounded-lg border border-white/5 bg-white/[0.02] p-3.5 text-xs leading-relaxed text-white/55"
            >
              {g}
            </li>
          ))}
        </ul>
      </section>

      {/* Engineering highlights */}
      <section>
        <SectionLabel>Engineering highlights</SectionLabel>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {HIGHLIGHTS.map((h) => (
            <div key={h.title} className="rounded-lg border border-white/5 bg-white/[0.02] p-5">
              <h3 className="text-sm font-semibold text-white">{h.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-white/50">{h.body}</p>
              <p className="mt-3 text-[10px] font-medium uppercase tracking-wider text-accent/45">
                {h.sub}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* The app — the walkthrough deck, embedded at scale */}
      <section id="finman-demo">
        <SectionLabel>The app</SectionLabel>
        <ScaledDeck
          src={resolveAssetUrl('/finman/reel.html')}
          title="Finman walkthrough deck: dev cycle, data flow, privacy, and the app"
        />
        <p className="mt-2 text-center text-xs text-white/40">
          7-slide walkthrough — auto-plays, or step with ← → ·{' '}
          <a
            href={resolveAssetUrl('/finman/reel.html')}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent/60 underline transition-colors hover:text-accent"
          >
            open full-screen ↗
          </a>
        </p>
      </section>

      {/* Stack & decisions */}
      <section>
        <SectionLabel>Stack & decisions</SectionLabel>
        <div className="overflow-hidden rounded-lg border border-white/5">
          {STACK_ROWS.map(([k, v], i) => (
            <div
              key={k}
              className={`grid grid-cols-1 gap-1 p-3.5 sm:grid-cols-[160px_1fr] sm:gap-4 ${
                i % 2 === 0 ? 'bg-white/[0.02]' : ''
              }`}
            >
              <span className="text-xs font-medium text-white/40">{k}</span>
              <span className="text-xs leading-relaxed text-white/65">{v}</span>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm leading-relaxed text-white/50">
          A few decisions were deliberate.{' '}
          <span className="text-white/80">Money is integer paise, never a float</span> — the
          one rule I refused to bend. Parsing was duplicated across two languages on purpose
          and kept honest by golden vectors, because the device must work offline and the
          server can&apos;t be the only source of truth. And the infra is intentionally
          boring, because a passion project shouldn&apos;t need a Kubernetes cluster.
        </p>
      </section>

      {/* What I learned */}
      <section>
        <SectionLabel>What I learned</SectionLabel>
        <div className="space-y-4">
          {LEARNED.map((l) => (
            <div key={l.title}>
              <h3 className="text-sm font-medium text-white/85">{l.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-white/50">{l.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Status & what's next */}
      <section>
        <SectionLabel>Status & what&apos;s next</SectionLabel>
        <div className="rounded-lg border border-accent/20 bg-accent/5 p-5 text-sm leading-relaxed text-white/60">
          <p>
            <span className="font-medium text-white/85">
              Why it&apos;s Android-only, and why it&apos;s paused.
            </span>{' '}
            The whole idea rests on reading transactional SMS on the device, and Apple
            doesn&apos;t allow apps to read your messages — so an iOS version isn&apos;t
            possible. It&apos;s a passion project, so I built the core loop end-to-end —
            capture → ledger → the three numbers → per-account reconciliation — then chose to
            stop there rather than ship something I&apos;d have to support.
          </p>
          <p className="mt-3">
            I&apos;m not distributing an APK; the goal was the engineering, not a launch. The
            full source is open (linked above). Future phases — payee/tag learning,
            settlement, liabilities, Drive backup, real Google Sign-In, TLS — are sketched if
            I ever revisit.
          </p>
        </div>
      </section>

      {/* Close */}
      <section className="flex flex-wrap items-center gap-3">
        <a
          href={REPO_DEVICE}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20"
        >
          Device app repo ↗
        </a>
        <a
          href={REPO_SERVER}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20"
        >
          Server + engine repo ↗
        </a>
        <Link
          to="/contact"
          className="text-sm text-white/40 underline transition-colors hover:text-accent"
        >
          or say hello
        </Link>
      </section>
    </div>
  );
}
