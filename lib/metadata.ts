import type { Metadata } from 'next';
import { site } from '@/content';

/** OG images from scripts/generate-brand-assets.mjs: About has its own, every other page uses the default. */
const ogImages = {
  default: { url: '/og-default.png', alt: site.meta.ogImageAlt.default },
  about: { url: '/og-about.png', alt: site.meta.ogImageAlt.about },
};

/** Per-page title plus matching Open Graph / Twitter tags (Next replaces these objects per page, not merges). */
export function pageMetadata(title: string, path: string, image: keyof typeof ogImages = 'default'): Metadata {
  const { url, alt } = ogImages[image];
  return {
    title,
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en',
      url: path,
      title,
      description: site.meta.description,
      images: [{ url, width: 1200, height: 630, type: 'image/png', alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: site.meta.description,
      images: [{ url, alt }],
    },
  };
}
