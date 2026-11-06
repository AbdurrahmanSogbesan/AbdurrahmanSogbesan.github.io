import type { Metadata } from 'next';
import { site } from '@/content';

const ogImage = { url: '/og.png', width: 1200, height: 630, alt: site.name };

/** Per-page title plus matching Open Graph / Twitter tags (Next replaces these objects per page, not merges). */
export function pageMetadata(title: string, path: string): Metadata {
  return {
    title,
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: 'en',
      url: path,
      title,
      description: site.meta.description,
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: site.meta.description,
      images: [ogImage.url],
    },
  };
}
