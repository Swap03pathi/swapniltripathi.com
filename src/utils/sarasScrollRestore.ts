import { SARAS_EXPERIENCE_PATH } from '../constants/sarasExperience';

export const SARAS_RETURN_SECTION_KEY = 'saras-return-section';

export function saveSarasReturnSection(sectionId: string) {
  sessionStorage.setItem(SARAS_RETURN_SECTION_KEY, sectionId);
}

export function readSarasReturnSection(): string | null {
  return sessionStorage.getItem(SARAS_RETURN_SECTION_KEY);
}

export function clearSarasReturnSection() {
  sessionStorage.removeItem(SARAS_RETURN_SECTION_KEY);
}

export function scrollToSarasSection(sectionId: string, behavior: ScrollBehavior = 'auto') {
  document.getElementById(sectionId)?.scrollIntoView({ behavior, block: 'start' });
}

export function hasPendingSarasScrollRestore(pathname: string, state: unknown): boolean {
  if (pathname !== SARAS_EXPERIENCE_PATH) return false;
  const scrollSection = (state as { scrollSection?: string } | null)?.scrollSection;
  return Boolean(scrollSection || readSarasReturnSection());
}
