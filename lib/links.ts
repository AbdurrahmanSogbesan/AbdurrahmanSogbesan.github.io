/** Internal routes go through next/link; everything else is a plain anchor. */
export function isInternalRoute(href: string) {
  return href.startsWith('/') && !/\.[a-z0-9]+$/i.test(href);
}

/** External sites and files (e.g. the résumé PDF) open in a new tab; mailto and internal routes don't. */
export function opensInNewTab(href: string) {
  return /^https?:\/\//.test(href) || (href.startsWith('/') && !isInternalRoute(href));
}

/** '/about/' and '/about' are the same page (trailingSlash: true). */
export function isCurrentPath(pathname: string, href: string) {
  const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  return strip(pathname) === strip(href);
}

/**
 * Nav highlight: the page itself, or a page inside its section (Work stays on for /work/<slug>/).
 * aria-current="page" is only for the exact page.
 */
export function navState(pathname: string, href: string) {
  const strip = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p);
  const current = isCurrentPath(pathname, href);
  const inSection = isInternalRoute(href) && strip(href) !== '/' && strip(pathname).startsWith(`${strip(href)}/`);
  return { on: current || inSection, ariaCurrent: current ? ('page' as const) : undefined };
}
