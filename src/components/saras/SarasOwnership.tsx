import { Users } from 'lucide-react';
import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasCollaboration, sarasOwned } from '../../data/sarasExperienceCopy';
import { SarasCard, SarasSection } from './SarasPrimitives';

export default function SarasOwnership() {
  return (
    <SarasSection
      id={SARAS_SECTION_IDS.ownership}
      eyebrow="Credibility"
      title="What I Owned"
      description="Honest scope of technical ownership and cross-functional collaboration at Saras."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <SarasCard className="p-6 md:p-8">
          <h3 className="text-lg font-semibold text-white">What I owned</h3>
          <ul className="mt-5 space-y-2.5">
            {sarasOwned.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-white/50">
                <span className="text-accent/50">—</span>
                {item}
              </li>
            ))}
          </ul>
        </SarasCard>

        <SarasCard className="relative p-6 md:p-8">
          <Users className="absolute right-6 top-6 h-5 w-5 text-white/15" strokeWidth={1.25} />
          <h3 className="text-lg font-semibold text-white">Collaborated with</h3>
          <ul className="mt-5 space-y-2.5">
            {sarasCollaboration.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm text-white/50">
                <span className="text-emerald-400/40">+</span>
                {item}
              </li>
            ))}
          </ul>
        </SarasCard>
      </div>
    </SarasSection>
  );
}
