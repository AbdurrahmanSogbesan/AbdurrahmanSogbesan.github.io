import type { MetadataRoute } from 'next';
import { site } from '@/content';

// Static export: prerender to out/sitemap.xml at build time.
export const dynamic = 'force-static';

// Every indexable page, with the trailing slash GitHub Pages serves (trailingSlash: true).
const paths = ['/', '/about/'];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
