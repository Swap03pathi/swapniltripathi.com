/** Dedicated experience pages vs generic detail template. */
const DEDICATED_EXPERIENCE_PATHS: Record<string, string> = {
  saras: '/experience/saras',
  apple: '/experience/apple',
};

export function getExperiencePath(slug: string): string {
  return DEDICATED_EXPERIENCE_PATHS[slug] ?? `/experience/${slug}`;
}
