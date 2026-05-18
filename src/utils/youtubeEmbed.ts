/** Extract YouTube video ID from a watch URL, youtu.be link, or raw ID. */
export function getYoutubeVideoId(urlOrId: string): string | null {
  const trimmed = urlOrId.trim();
  if (!trimmed) return null;
  if (/^[\w-]{11}$/.test(trimmed)) return trimmed;

  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    if (url.hostname.includes('youtu.be')) {
      const id = url.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    const v = url.searchParams.get('v');
    if (v) return v;
    const embedMatch = url.pathname.match(/\/embed\/([\w-]{11})/);
    if (embedMatch) return embedMatch[1];
  } catch {
    return null;
  }
  return null;
}

export function youtubeEmbedSrc(videoId: string) {
  return `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
}
