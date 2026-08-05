import { m } from 'framer-motion';
import { OYO_SECTION_IDS } from '../../constants/oyoExperience';
import { oyoExplorationCards } from '../../data/oyoExperienceCopy';
import { oyoCardIcons, oyoNoteIcons, oyoSectionIcons } from './OyoIconMap';
import { OyoCard, OyoNoteBox, OyoSection } from './OyoPrimitives';

export default function OyoExplorationWork() {
  const SectionIcon = oyoSectionIcons.exploration;

  return (
    <OyoSection
      id={OYO_SECTION_IDS.exploration}
      title="Exploration Work"
      titleIcon={SectionIcon}
      className="border-b border-white/[0.05]"
    >
      <div className="grid gap-5 md:grid-cols-2 md:gap-6">
        {oyoExplorationCards.map((card, i) => {
          const Icon = oyoCardIcons[card.icon];
          const NoteIcon = oyoNoteIcons[card.note.icon];

          return (
            <m.div
              key={card.id}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <OyoCard className="flex h-full flex-col p-5 md:p-6">
                <div className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/15 bg-accent/[0.05]">
                    <Icon className="h-4 w-4 text-accent/60" strokeWidth={1.5} />
                  </span>
                  <h3 className="pt-1 text-base font-semibold text-white/88 md:text-lg">
                    <span className="text-white/35">{card.number}. </span>
                    {card.title}
                  </h3>
                </div>
                <ul className="mt-4 flex-1 space-y-2">
                  {card.bullets.map((b) => (
                    <li key={b} className="flex gap-2 text-sm leading-relaxed text-white/42">
                      <span className="text-accent/30">·</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <OyoNoteBox icon={NoteIcon}>{card.note.text}</OyoNoteBox>
              </OyoCard>
            </m.div>
          );
        })}
      </div>
    </OyoSection>
  );
}
