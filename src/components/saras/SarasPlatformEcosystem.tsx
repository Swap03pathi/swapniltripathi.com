import { SARAS_SECTION_IDS } from '../../constants/sarasExperience';
import { sarasPlatformCards } from '../../data/sarasExperienceCopy';
import PlatformExpandableCard from './PlatformExpandableCard';
import { SarasCard, SarasSection } from './SarasPrimitives';

const platformCardClass = 'border-white/[0.05] bg-white/[0.012]';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function StaticPlatformCard({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <SarasCard subtle className={`p-5 md:p-6 ${platformCardClass}`}>
      <h3 className="text-base font-medium text-white/85">{title}</h3>
      <ul className="mt-3 space-y-1.5">
        {items.map((item) => (
          <li key={item} className="text-xs leading-relaxed text-white/38">
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
      <SarasCard
        subtle
        hover
        className={`p-5 transition-colors md:p-6 ${platformCardClass} hover:!border-white/[0.08] hover:!bg-white/[0.02]`}
      >
        <h3 className="text-base font-medium text-white/85">{title}</h3>
        <ul className="mt-3 space-y-1.5">
          {items.map((item) => (
            <li key={item} className="text-xs leading-relaxed text-white/38">
              · {item}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs font-medium text-white/40">View product surfaces ↓</p>
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
      <PlatformExpandableCard
        title={card.title}
        items={card.items}
        paragraphs={card.paragraphs}
        cardClassName={platformCardClass}
      />
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
      description="Supporting product and operations surfaces — complementary to the core computation engines."
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
