import type { Metadata } from 'next';
import { site } from '@/content';

/** OG images from scripts/generate-brand-assets.mjs: About has its own, every other page uses the default. */
const ogImages = {
  default: { url: '/og-default.png', alt: site.meta.ogImageAlt.default },
  about: { url: '/og-about.png', alt: site.meta.ogImageAlt.about },
};

type PageKey = keyof typeof site.meta.descriptions;
type OgImage = keyof typeof ogImages;

/** Metadata for a page keyed in site.meta (Home, About, Work). */
export function pageMetadata(page: PageKey, path: string, image: OgImage = 'default'): Metadata {
  return metadataFor(site.meta.titles[page], site.meta.descriptions[page], path, image);
}

/** Project pages: "<name> · Abdurrahman Sogbesan", the card description, the default OG image. */
export function projectMetadata(project: { slug: string; name: string; description: string }): Metadata {
  return metadataFor(`${project.name} · ${site.name}`, project.description, `/work/${project.slug}/`);
}

/**
 * Title, description, canonical URL and matching Open Graph / Twitter tags.
 * Next replaces these objects per page rather than merging, so every page sets all of them.
 */
function metadataFor(title: string, description: string, path: string, image: OgImage = 'default'): Metadata {
  const { url, alt } = ogImages[image];
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
