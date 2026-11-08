import { site } from '@/content';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;';

/**
 * Heading colour. Fixed rather than the site accent: DevTools has its own light/dark theme, so the accent
 * (near-black on a light site) vanished on a dark console. Readable on both (3.6:1 on #FFF, 4.1:1 on #282828).
 */
const HEADING = '#E8590C';

/** Prints the console greeting once per page load. */
export function printConsoleHello() {
  const w = window as Window & { __asHello?: boolean };
  if (w.__asHello) return;
  w.__asHello = true;
  const { heading, lines, hint } = site.console;
  console.log(
    `%c${heading}%c\n\n${lines.join('\n')}\n\n%c${hint}`,
    `${MONO}font-size: 16px; font-weight: 600; color: ${HEADING};`,
    `${MONO}font-size: 12px; line-height: 1.6;`,
    `${MONO}font-size: 11px; color: #8B8B8B;`,
  );
}
