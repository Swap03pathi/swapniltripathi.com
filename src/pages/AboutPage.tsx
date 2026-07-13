import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Seo from '../components/Seo';
import Footer from '../components/Footer';
import { PROFILE_PAGE } from '../lib/jsonld';
import { resolveAssetUrl } from '../utils/assetUrl';

const ABOUT_MD = `
**I'm Swapnil Tripathi — a systems builder. I step into problems before I'm "qualified" for
them, learn exactly what the problem needs, and ship systems that survive production.**

Right now I'm the CTO and co-founder of **Saras** (Antler-backed), where I designed and ran the
real-time infrastructure that captures trading recommendations from public sources and virtually
executes them against live market prices. Before that I spent two and a half years at **Apple**
as the sole data engineer for an AppleCare analytics org. I graduated from **IIT Bombay**
(B.Tech, 2020).

## The pattern

Every phase of my career has the same shape: an unowned problem, no playbook, and a working
system shipped anyway.

- **EY (2018).** A senior official on a Govt. of India education project asked me to "write
  code" — without checking whether I could. I couldn't. I asked people what to learn, taught
  myself, and shipped a Python tool in about two weeks that scanned a national video repository
  for broken and blocked YouTube links. That's where I learned everything is figure-out-able.
- **Testbook (2020–2022).** First job out of college, five-person analytics team. I taught myself
  JavaScript to build a Google Sheets toolbar the sales team used daily to bulk-insert leads into
  the production database over REST — and owned event instrumentation for analytics serving
  6M+ monthly active users.
- **Apple (2022–2024).** Joined as a consulting data engineer; promoted to consulting data
  scientist after automating my entire DE workload. I was the only data engineer allotted to my
  analytics org: ~20 pipelines, a KPI anomaly-detection system I designed end-to-end (48 metrics
  across 14 locales), and an NLP classification pipeline processing 400K+ items a day. When I
  left, the role was backfilled by two hires.
- **Saras (2024–present).** Co-founded a signal-intelligence platform as the sole technical
  founder. Launched in three months: 150K+ downloads, 200K+ raw messages ingested daily and
  distilled into a few hundred live, virtually executed trades, <500ms price-match latency,
  99.5% uptime on deliberately lean infrastructure. We raised a $500K pre-seed led by Antler.
  We also pitched Saras on Shark Tank India.

## How I work

- **Execution-first.** Build → adjust → make it work in reality. I'd rather ship a working
  system and refine it than perfect a design document.
- **Never do the same task twice.** If I do something manually a second time, I automate it.
- **Infra-cost-conscious.** I count compute the way a founder counts cash — at Saras I cut our
  AWS compute consumption by ~45% in a single optimization drive.
- **Under-commit, over-deliver.** I like being on the safe side of my own promises.

## Beyond engineering

At IIT Bombay I was elected Sports Councillor of my hostel — 30+ events on a ₹0.5M budget, and
an Overall Championship year. I took **2nd place in stand-up comedy at the Inter-IIT Cultural
Meet 2017** (30+ participants across 18 IITs) and co-founded the campus stand-up club, Comedy
Cons. I've run two half-marathons and a 30 km runathon, and received the Institute Commendation
Award in 2018.

## Get in touch

The fastest ways to reach me are [LinkedIn](https://www.linkedin.com/in/swapnil-neeraj-tripathi-310019122/)
and [email](mailto:swapniltripathi2905@gmail.com) — more on the [contact page](/contact).
`;

export default function AboutPage() {
  return (
    <div className="relative z-10">
      <Seo
        title="About — Swapnil Tripathi"
        description="CTO & co-founder at Saras, ex-Apple data engineer, IIT Bombay. The story of a self-taught systems builder."
        path="/about"
        jsonLd={PROFILE_PAGE}
      />
      <main className="mx-auto max-w-3xl px-6 pt-28 pb-24">
        <div className="flex items-center gap-6">
          <img
            src={resolveAssetUrl('/swapnil-profile.png')}
            alt="Swapnil Tripathi"
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
