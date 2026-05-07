export function resolveAssetUrl(url: string): string {
  // Keep external URLs untouched; prepend Vite base for local public assets.
  if (/^https?:\/\//.test(url) || url.startsWith('data:')) {
    return url;
  }

  return `${import.meta.env.BASE_URL}${url.replace(/^\/+/, '')}`;
}
