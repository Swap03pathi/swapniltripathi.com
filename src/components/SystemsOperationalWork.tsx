import { systemGatewayCards } from '../data/systemGatewayCards';
import SystemGatewayCard from './SystemGatewayCard';

export default function SystemsOperationalWork() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-xs font-medium uppercase tracking-widest text-accent/60">
          Systems & Operational Work
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          {systemGatewayCards.map((card) => (
            <SystemGatewayCard
              key={card.title}
              title={card.title}
              description={card.description}
              href={card.href}
              label={card.label}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
