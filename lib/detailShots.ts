import fs from 'node:fs';
import path from 'node:path';

// Build-time only (server components): the project page renders whatever screenshots exist in
// public/screenshots/projects/<slug>/detail/. The number of files sets the number of slots;
// an empty set renders nothing.

const SHOT = /^(hero|gallery)-(\d+)\.(png|jpe?g|webp)$/i;

export interface DetailShots {
  hero: string[];
  gallery: string[];
}

export function detailShots(slug: string): DetailShots {
  const dir = path.join(process.cwd(), 'public', 'screenshots', 'projects', slug, 'detail');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir) : [];
  const pick = (kind: 'hero' | 'gallery') =>
    files
      .map((file) => ({ file, m: SHOT.exec(file) }))
      .filter(({ m }) => m && m[1].toLowerCase() === kind)
      .sort((a, b) => Number(a.m![2]) - Number(b.m![2]))
      .map(({ file }) => `/screenshots/projects/${slug}/detail/${file}`);
  return { hero: pick('hero'), gallery: pick('gallery') };
}
