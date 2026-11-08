import { site, type Project } from '@/content';

/** "Web + Mobile · 2023": card meta line, the Platform row and the Next project row. */
export function metaLine(project: Project) {
  const platforms = project.platforms.map((p) => site.ui.filters[p]).join(' + ');
  return project.year ? `${platforms} · ${project.year}` : platforms;
}

/** "https://www.addressable.io/" → "addressable.io" */
export function displayDomain(url: string) {
  return new URL(url).host.replace(/^www\./, '');
}

/** "05 / 09" */
export const padPosition = (n: number) => String(n).padStart(2, '0');
