import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Seo from '../components/Seo';
import { FAVORITES_UPDATED, favoriteShelves } from '../data/meFavorites';

// Personal sandbox page. Rough work — expect this to change often.
const SURVEILLANCE_URL = 'https://swapniltripathi.com/app/surveillance';
// Feedback lands in a Google Sheet (no Google Form embedded — the page posts straight
// to a tiny Apps Script web app attached to the sheet). Setup (~5 min):
//   1. Create a Google Sheet → Extensions → Apps Script.
//   2. Paste the doPost script (appends [timestamp, email, message] to a 'Feedback' tab).
//   3. Deploy → New deployment → Web app → Execute as: Me · Access: Anyone.
//   4. Paste the /exec URL here. While empty, the form shows a friendly note instead.
// The URL only permits appending rows to that one sheet — safe to ship in the bundle.
const SHEETS_WEBAPP_URL: string =
  'https://script.google.com/macros/s/AKfycby5wYHuhuLdlvWVXL5Q38Z1GkuHakjJH3CaSJpYXZ6ZKEUnsGcN9PBFpTsLrfaZmPyW0g/exec';

type SendStatus = 'idle' | 'sending' | 'sent' | 'error';

export default function MePage() {
  const [feedback, setFeedback] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [status, setStatus] = useState<SendStatus>('idle');

  const sendFeedback = async () => {
    const text = feedback.trim();
    const email = senderEmail.trim(); // optional
    if (!text || !SHEETS_WEBAPP_URL) return;

    setStatus('sending');
    try {
      // mode:'no-cors' is required for Apps Script web apps — the response is opaque,
      // so a resolved fetch is treated as success (the standard pattern for this setup).
      await fetch(SHEETS_WEBAPP_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ email, message: text }),
      });
      setStatus('sent');
      setFeedback('');
      setSenderEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="relative z-10 pt-24 pb-16 px-6">
      <Seo
        title="Me — Swapnil Tripathi"
        description="A corner for the things I build for fun."
        path="/me"
        noindex
      />
      {/* Header */}
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold text-white">Me</h1>
        <p className="mt-2 text-sm text-white/40">
          A corner for the things I build for fun.
        </p>
      </div>

      {/* Dummy / rough-work section */}
      <section className="px-0 pt-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-lg border border-dashed border-white/10 bg-white/[0.02] p-5">
            <div className="mb-2 flex items-center gap-3">
              <h2 className="text-xs font-medium uppercase tracking-widest text-accent/60">
                Rough work
              </h2>
              <span className="rounded border border-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent/40">
                feeling cute, might delete later
              </span>
            </div>
            <p className="text-sm leading-relaxed text-white/45">
              This page is my sandbox. I&apos;ll keep dumping random, half-built
              experiments here — some polished, most not, a few that vanish next
              week. Nothing here is meant to be permanent.
            </p>
          </div>
        </div>
      </section>

      {/* Passion projects (the app section) */}
      <section className="px-0 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-accent/60">
            Passion Projects
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
            <a
              href={SURVEILLANCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ease-out hover:border-accent/20 hover:bg-white/[0.04] hover:shadow-[0_12px_36px_-18px_rgba(0,212,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40"
            >
              <div className="flex h-full min-h-[120px] flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-accent/45">
                    Live · CCTV / Computer Vision
                  </span>
                  <svg
                    className="h-4 w-4 shrink-0 text-white/10 transition-colors group-hover:text-accent/55"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-accent">
                  Live-Feed Surveillance &amp; Emergency Detection
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/45 transition-colors group-hover:text-white/55">
                  Real-time incident detection on any camera. Point your phone, an
                  RTSP/ONVIF IP camera, or an uploaded clip at it — and it flags
                  home-safety events (falls, prolonged stillness, danger-zone
                  entry, presence/absence, off-hours intrusion) and traffic events
                  (wrong-way vehicles, breakdowns, congestion, stray animals).
                  Per-user login, private feeds, runs scale-to-zero on AWS.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent/70 transition-colors group-hover:text-accent">
                  Launch the live app
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </a>
            <Link
              to="/game/foursight"
              className="group block h-full rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ease-out hover:border-accent/20 hover:bg-white/[0.04] hover:shadow-[0_12px_36px_-18px_rgba(0,212,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40"
            >
              <div className="flex h-full min-h-[120px] flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-accent/45">
                    Live · Multiplayer Game
                  </span>
                  <svg
                    className="h-4 w-4 shrink-0 text-white/10 transition-colors group-hover:text-accent/55"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-accent">
                  Foursight — a card game you can play right here
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/45 transition-colors group-hover:text-white/55">
                  A memory &amp; deduction card game for 2–5 players, built into this site:
                  room codes, realtime WebSocket play on Cloudflare Durable Objects, and a
                  fully unit-tested rules engine. Grab friends, share a code, go lowest.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent/70 transition-colors group-hover:text-accent">
                  Play Foursight
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
            <Link
              to="/project/finman"
              className="group block h-full rounded-lg border border-white/5 bg-white/[0.02] p-5 transition-all duration-300 ease-out hover:border-accent/20 hover:bg-white/[0.04] hover:shadow-[0_12px_36px_-18px_rgba(0,212,255,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent/40"
            >
              <div className="flex h-full min-h-[120px] flex-col">
                <div className="flex items-start justify-between gap-3">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-accent/45">
                    Paused · On-Device AI / Android
                  </span>
                  <svg
                    className="h-4 w-4 shrink-0 text-white/10 transition-colors group-hover:text-accent/55"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <h3 className="mt-3 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-accent">
                  Finman — AI Personal CFO
                </h3>
                <p className="mt-2 flex-1 text-xs leading-relaxed text-white/45 transition-colors group-hover:text-white/55">
                  Privacy-first Android app that reads bank SMS entirely on-device and turns
                  them into three honest numbers — income, expenses, savings — with
                  per-account reconciliation. TypeScript engine + Flutter port kept in
                  lockstep by golden vectors. Raw messages never leave the phone.
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-accent/70 transition-colors group-hover:text-accent">
                  Read the case study
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          </div>
          <p className="mt-4 text-xs text-white/25">
            First load takes ~1–2 minutes — the server sleeps when idle to keep it
            free, and wakes on demand.
          </p>
        </div>
      </section>

      {/* Current favorites — rotating shelf, data in src/data/meFavorites.ts */}
      <section className="px-0 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <h2 className="text-xs font-medium uppercase tracking-widest text-accent/60">
              Current Favorites
            </h2>
            <span className="rounded border border-accent/15 px-2 py-0.5 text-[10px] font-medium text-accent/40">
              rotates whenever taste does · {FAVORITES_UPDATED}
            </span>
          </div>
          <div className="space-y-6">
            {favoriteShelves.map((shelf) => (
              <div key={shelf.id}>
                <h3 className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-white/35">
                  {shelf.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {shelf.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/60 transition-all hover:border-accent/30 hover:bg-accent/5 hover:text-accent"
                    >
                      {item.name}
                      {item.note ? (
                        <span className="text-[10px] text-accent/45 group-hover:text-accent/70">
                          · {item.note}
                        </span>
                      ) : null}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feedback */}
      <section className="px-0 pb-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-accent/60">
            Feedback
          </h2>
          <p className="mb-4 text-sm text-white/40">
            Tried something here? Tell me what you think — good, bad, or broken.
          </p>
          {SHEETS_WEBAPP_URL ? (
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-5">
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="Your email (optional — only if you'd like a reply)"
              className="mb-3 w-full rounded-md border border-white/10 bg-dark/40 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-accent/40"
            />
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="What did you think?"
              className="w-full resize-y rounded-md border border-white/10 bg-dark/40 px-3 py-2.5 text-sm text-white placeholder-white/25 outline-none transition-colors focus:border-accent/40"
            />
            <div className="mt-3 flex items-center justify-end gap-4">
              {status === 'sent' ? (
                <span className="text-xs text-accent/70">Sent — thank you!</span>
              ) : null}
              {status === 'error' ? (
                <span className="text-xs text-white/40">
                  Couldn&apos;t send — please email me instead.
                </span>
              ) : null}
              <button
                type="button"
                onClick={sendFeedback}
                disabled={!feedback.trim() || status === 'sending'}
                className="rounded-md border border-accent/20 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-all hover:border-accent/40 hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === 'sending' ? 'Sending…' : 'Send feedback'}
              </button>
            </div>
          </div>
          ) : (
          <div className="rounded-lg border border-white/5 bg-white/[0.02] p-5 text-sm text-white/45">
            The feedback box is being wired up — meanwhile, tell me what you think via the{' '}
            <Link to="/contact" className="text-accent/70 underline hover:text-accent">
              contact page
            </Link>
            .
          </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
