import type { MetadataRoute } from 'next';
import { projects, site } from '@/content';

// Static export: prerender to out/sitemap.xml at build time.
export const dynamic = 'force-static';

// Every indexable page, with the trailing slash GitHub Pages serves (trailingSlash: true).
const paths = ['/', '/work/', '/about/', ...projects.map((p) => `/work/${p.slug}/`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((path) => ({ url: `${site.url}${path}` }));
}
