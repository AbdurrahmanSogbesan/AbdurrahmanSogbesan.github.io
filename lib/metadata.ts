import type { Metadata } from 'next';
import { site } from '@/content';

/** OG images from scripts/generate-brand-assets.mjs: About has its own, every other page uses the default. */
const ogImages = {
  default: { url: '/og-default.png', alt: site.meta.ogImageAlt.default },
  about: { url: '/og-about.png', alt: site.meta.ogImageAlt.about },
};

type PageKey = keyof typeof site.meta.descriptions;

/**
 * Per-page title, description, canonical URL and matching Open Graph / Twitter tags.
 * Next replaces these objects per page rather than merging, so every page sets all of them.
 */
export function pageMetadata(page: PageKey, path: string, image: keyof typeof ogImages = 'default'): Metadata {
  const { url, alt } = ogImages[image];
  const title = site.meta.titles[page];
  const description = site.meta.descriptions[page];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en',
      url: path,
      title,
      description,
      images: [{ url, width: 1200, height: 630, type: 'image/png', alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [{ url, alt }],
    },
  };
}
