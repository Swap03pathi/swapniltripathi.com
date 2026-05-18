import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasPlatformCards } from '../../data/sarasExperienceCopy';
import PlatformExpandableCard from './PlatformExpandableCard';
import { SarasCard, SarasSection } from './SarasPrimitives';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function StaticPlatformCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <SarasCard className="p-5 md:p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm text-white/45">
            · {item}
          </li>
        ))}
      </ul>
    </SarasCard>
  );
}

function ScrollPlatformCard({
  title,
  items,
  scrollTo,
}: {
  title: string;
  items: readonly string[];
  scrollTo: string;
}) {
  return (
    <button type="button" onClick={() => scrollToSection(scrollTo)} className="block w-full text-left">
      <SarasCard hover className="p-5 md:p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <ul className="mt-4 space-y-2">
          {items.map((item) => (
            <li key={item} className="text-sm text-white/45">
              · {item}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm font-medium text-accent/65">View product surfaces ↓</p>
      </SarasCard>
    </button>
  );
}

type PlatformCardData =
  | (typeof sarasPlatformCards.left)[number]
  | (typeof sarasPlatformCards.right)[number];

function PlatformCard({ card }: { card: PlatformCardData }) {
  if ('scrollTo' in card && card.scrollTo) {
    return <ScrollPlatformCard title={card.title} items={card.items} scrollTo={card.scrollTo} />;
  }
  if ('paragraphs' in card && card.paragraphs) {
    return (
      <PlatformExpandableCard title={card.title} items={card.items} paragraphs={card.paragraphs} />
    );
  }
  return <StaticPlatformCard title={card.title} items={card.items} />;
}

export default function SarasPlatformEcosystem() {
  return (
    <SarasSection
      id={SARAS_SECTION_IDS.platform}
      eyebrow="Ecosystem"
      title="Platform Ecosystem"
      description="The broader product and operations surface — complementary to the core computation engines."
      className="relative z-0 pb-8 md:pb-12"
    >
      <div className="grid items-start gap-5 lg:grid-cols-2">
        <div className="flex flex-col gap-5">
          {sarasPlatformCards.left.map((card) => (
            <PlatformCard key={card.id} card={card} />
          ))}
        </div>
        <div className="flex flex-col gap-5">
          {sarasPlatformCards.right.map((card) => (
            <PlatformCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </SarasSection>
  );
}
