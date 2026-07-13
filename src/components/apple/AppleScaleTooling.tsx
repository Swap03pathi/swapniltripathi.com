import { APPLE_SECTION_IDS } from '../../constants/appleExperience';
import { appleTooling } from '../../data/appleExperienceCopy';
import { AppleSection } from './ApplePrimitives';
import AppleTechLogoGrid from './AppleTechLogoGrid';

export default function AppleScaleTooling() {
  return (
    <AppleSection
      id={APPLE_SECTION_IDS.scale}
      eyebrow="Stack"
      title="Scale & Tooling"
      className="border-b border-white/[0.06]"
    >
      <AppleTechLogoGrid tools={appleTooling} />
    </AppleSection>
  );
}
