import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasPlatformCards } from '../../data/sarasExperienceCopy';
import PlatformExpandableCard from './PlatformExpandableCard';
import { SarasSection } from './SarasPrimitives';

const platformCardClass = 'border-white/[0.05] bg-white/[0.012]';

type PlatformCardData =
  | (typeof sarasPlatformCards.left)[number]
  | (typeof sarasPlatformCards.right)[number];

function PlatformCard({ card }: { card: PlatformCardData }) {
  return (
    <PlatformExpandableCard
      title={card.title}
      items={card.items}
      paragraphs={card.paragraphs}
      cardClassName={platformCardClass}
    />
  );
}

export default function SarasPlatformEcosystem() {
  return (
    <SarasSection
      id={SARAS_SECTION_IDS.platform}
      eyebrow="Ecosystem"
      title="Platform Ecosystem"
      description="Product, growth, operations, and infrastructure surfaces that made the core computation systems usable in production."
      className="!py-14 md:!py-16 lg:!py-20"
    >
      <div className="grid items-start gap-4 lg:grid-cols-2 lg:gap-5">
        <div className="flex flex-col gap-4">
          {sarasPlatformCards.left.map((card) => (
            <PlatformCard key={card.id} card={card} />
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {sarasPlatformCards.right.map((card) => (
            <PlatformCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </SarasSection>
  );
}
