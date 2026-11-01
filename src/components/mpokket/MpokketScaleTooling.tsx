import { MPOKKET_SECTION_IDS } from '../../constants/mpokketExperience';
import { mpokketTooling } from '../../data/mpokketExperienceCopy';
import { MpokketSection, MpokketSectionLabel } from './MpokketPrimitives';
import MpokketTechLogoGrid from './MpokketTechLogoGrid';

export default function MpokketScaleTooling() {
  return (
    <MpokketSection id={MPOKKET_SECTION_IDS.scale} className="border-b border-white/[0.06]">
      <MpokketSectionLabel>Scale & Tooling</MpokketSectionLabel>
      <MpokketTechLogoGrid tools={mpokketTooling} />
    </MpokketSection>
  );
}
