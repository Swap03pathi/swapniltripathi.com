import { Link, useParams } from 'react-router-dom';
import Footer from '../../components/Footer';
import { SARAS_EXPERIENCE_PATH } from '../../constants/sarasExperience';
import { sarasPlatformPageCopy } from '../../data/sarasExperienceCopy';

export default function SarasPlatformPage() {
  const { section } = useParams<{ section: string }>();
  const copy = section ? sarasPlatformPageCopy[section] : undefined;

  if (!copy) {
    return (
      <div className="relative z-10 px-6 pb-16 pt-24">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-2xl font-bold text-white">Not found</h1>
          <Link to={SARAS_EXPERIENCE_PATH} className="mt-6 inline-block text-sm text-accent hover:underline">
            Back to Saras Experience
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative z-10 min-h-screen bg-dark px-6 pb-16 pt-24">
      <div className="mx-auto max-w-2xl">
        <Link
          to={SARAS_EXPERIENCE_PATH}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/40 hover:text-accent"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Saras Experience
        </Link>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent/55">{copy.eyebrow}</p>
        <h1 className="mt-2 text-3xl font-bold text-white">{copy.title}</h1>
        <div className="mt-8 space-y-4">
          {copy.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-white/45 md:text-base">
              {p}
            </p>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
