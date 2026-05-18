import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SARAS_EXPERIENCE_PATH } from '../constants/sarasExperience';
import {
  clearSarasReturnSection,
  readSarasReturnSection,
  scrollToSarasSection,
} from '../utils/sarasScrollRestore';

/** Restore scroll to the Saras section the user left from (browser back or return link). */
export function useSarasScrollRestore() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== SARAS_EXPERIENCE_PATH) return;

    const fromState = (location.state as { scrollSection?: string } | null)?.scrollSection;
    const fromStorage = readSarasReturnSection();
    const sectionId = fromState ?? fromStorage;
    if (!sectionId) return;

    clearSarasReturnSection();

    const timer = window.setTimeout(() => {
      scrollToSarasSection(sectionId, 'auto');
    }, 80);

    return () => window.clearTimeout(timer);
  }, [location.pathname, location.key, location.state]);
}
