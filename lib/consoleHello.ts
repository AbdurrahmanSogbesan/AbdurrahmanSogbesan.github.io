import { site } from '@/content';

const MONO = 'font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;';

/** Prints the console greeting once per page load, coloured with the current accent. */
export function printConsoleHello() {
  const w = window as Window & { __asHello?: boolean };
  if (w.__asHello) return;
  w.__asHello = true;
  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#151514';
  const { heading, lines, hint } = site.console;
  console.log(
    `%c${heading}%c\n\n${lines.join('\n')}\n\n%c${hint}`,
    `${MONO}font-size: 16px; font-weight: 600; color: ${accent};`,
    `${MONO}font-size: 12px; line-height: 1.6;`,
    `${MONO}font-size: 11px; color: #8B8B8B;`,
  );
}
