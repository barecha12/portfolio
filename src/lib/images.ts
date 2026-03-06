type ResponsiveImageAttrs = {
  src: string;
  srcSet?: string;
  sizes?: string;
};

function buildUnsplashUrl(baseUrl: URL, width: number): string {
  const url = new URL(baseUrl.toString());
  const params = url.searchParams;

  const baseWidth = Number(params.get('w') || '1200') || 1200;
  const baseHeight = Number(params.get('h') || '760') || 760;
  const ratio = baseHeight / baseWidth;
  const height = Math.round(width * ratio);

  params.set('auto', 'format');
  params.set('fit', 'crop');
  params.set('fm', 'webp');
  params.set('q', '80');
  params.set('w', String(width));
  params.set('h', String(height));

  return url.toString();
}

export function getResponsiveImageAttrs(image: string): ResponsiveImageAttrs {
  try {
    const parsed = new URL(image);
    if (parsed.hostname.includes('images.unsplash.com')) {
      const widths = [360, 540, 760, 980, 1200];
      const srcSet = widths
        .map((width) => `${buildUnsplashUrl(parsed, width)} ${width}w`)
        .join(', ');

      return {
        src: buildUnsplashUrl(parsed, 760),
        srcSet,
        sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      };
    }
  } catch {
    return { src: image };
  }

  return { src: image };
}

function toGithubPreviewFromRepo(repoUrl?: string): string | null {
  if (!repoUrl) return null;

  try {
    const parsed = new URL(repoUrl);
    if (parsed.hostname !== 'github.com') return null;

    const parts = parsed.pathname.split('/').filter(Boolean);
    if (parts.length < 2) return null;

    const owner = parts[0];
    const repo = parts[1];
    return `https://opengraph.githubassets.com/1/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}`;
  } catch {
    return null;
  }
}

export function getImageFallbacks(primaryImage: string, repoUrl?: string): string[] {
  const candidates = [
    primaryImage,
    toGithubPreviewFromRepo(repoUrl),
    '/image/img.JPG'
  ].filter((item): item is string => Boolean(item));

  return [...new Set(candidates)];
}
