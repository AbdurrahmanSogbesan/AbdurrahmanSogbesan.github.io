import { site } from '@/content';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;';

const YELLOW = '#FFE81A';
const RED = '#E2332A';
const INK = '#141414';

/**
 * Comic-book heading: yellow face, thin ink outline, red extrusion down-right.
 * Fixed colours rather than the site accent: DevTools has its own light/dark theme, and the outline keeps
 * the yellow readable on a white console as well as a dark one. Padding leaves room for the shadows.
 */
const HEADING = [
  "font-family: 'Arial Black', Impact, 'Helvetica Neue', sans-serif",
  'font-size: 28px',
  'font-weight: 900',
  'letter-spacing: 2px',
  `color: ${YELLOW}`,
  `text-shadow: -1px -1px 0 ${INK}, 1px -1px 0 ${INK}, -1px 1px 0 ${INK}, 1px 1px 0 ${INK}, 2px 2px 0 ${RED}, 3px 3px 0 ${RED}, 4px 4px 0 ${RED}, 5px 5px 0 ${INK}`,
  'padding: 2px 8px 8px 2px',
].join('; ');

/** Prints the console greeting once per page load. */
export function printConsoleHello() {
  const w = window as Window & { __asHello?: boolean };
  if (w.__asHello) return;
  w.__asHello = true;
  const { heading, lines, hint } = site.console;
  console.log(
    `%c${heading}%c\n\n${lines.join('\n')}\n\n%c${hint}`,
    HEADING,
    `${MONO}font-size: 12px; line-height: 1.6;`,
    `${MONO}font-size: 11px; color: #8B8B8B;`,
  );
}
