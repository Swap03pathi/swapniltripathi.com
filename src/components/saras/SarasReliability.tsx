import { Shield } from 'lucide-react';
import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasIncident, sarasReliabilityLeft } from '../../data/sarasExperienceCopy';
import { SarasCard, SarasSection } from './SarasPrimitives';

export default function SarasReliability() {
  return (
    <SarasSection
      id={SARAS_SECTION_IDS.reliability}
      eyebrow="Operations"
      title="Reliability & Operations Highlights"
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <SarasCard className="p-6 md:p-8">
          <ul className="space-y-3">
            {sarasReliabilityLeft.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed text-white/50">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                {item}
              </li>
            ))}
          </ul>
        </SarasCard>

        <SarasCard className="p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06]">
              <Shield className="h-5 w-5 text-emerald-400/80" strokeWidth={1.35} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{sarasIncident.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/45">{sarasIncident.body}</p>
            </div>
          </div>
        </SarasCard>
      </div>
    </SarasSection>
  );
}
