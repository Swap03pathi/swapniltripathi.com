import { TESTBOOK_SECTION_IDS } from '../../constants/testbookExperience';
import { testbookTooling } from '../../data/testbookExperienceCopy';
import AppleTechLogoGrid from '../apple/AppleTechLogoGrid';
import { TestbookSection } from './TestbookPrimitives';

export default function TestbookTechStack() {
  return (
    <TestbookSection
      id={TESTBOOK_SECTION_IDS.tooling}
      title="Tech Stack"
      className="border-b border-white/[0.06]"
    >
      <AppleTechLogoGrid tools={testbookTooling} />
    </TestbookSection>
  );
}
