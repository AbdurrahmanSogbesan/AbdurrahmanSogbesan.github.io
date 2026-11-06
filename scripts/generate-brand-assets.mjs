// Generates favicons and the OG image into public/ (run: npm run brand-assets).
// Spec: design/Favicon.dc.html + HANDOFF.md §10. resvg shapes the text (GPOS kerning, letter-spacing) from
// the design's own <text> markup and outlines it to paths, so the output needs no fonts at runtime.
// Fonts: scripts/fonts (Unbounded 800 subset "AS", Geist 500).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const pub = (p) => here(`../public/${p}`);

// Tokens from design/site.css.
const LIGHT = { bg: '#F6F4EF', fg: '#151514' };
const DARK = { bg: '#0A0A0A', fg: '#EDEDED' };
// Geist hhea ascender / unitsPerEm (1005 / 1000).
const GEIST_ASCENT = 1.005;

const siteName = /name:\s*'([^']+)'/.exec(readFileSync(here('../content/site.ts'), 'utf8'))[1];
const fontOptions = {
  loadSystemFonts: false,
  fontFiles: [here('./fonts/unbounded-800-AS.ttf'), here('./fonts/geist-500.ttf')],
};

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">${body}</svg>`;

/** Outlines a <text> element (in a w×h canvas) and returns its path data plus ink bbox. */
function outline(textEl, w, h) {
  const r = new Resvg(svg(w, h, textEl), { font: fontOptions });
  const ds = [...r.toString().matchAll(/ d="([^"]+)"/g)].map((m) => m[1]);
  return { d: ds.join(' '), bbox: r.getBBox() };
}

// The monogram, exactly as the design's `.mark` <text>: x=-4 y=37, Unbounded 800, 30px, letter-spacing -2px.
const AS = outline(
  '<text x="-4" y="37" style="font-family: Unbounded; font-weight: 800; font-size: 30px; letter-spacing: -2px">AS</text>',
  40,
  40,
).d;

/** Monogram in the 40-unit space, clipped to the rounded tile. `tile`/`letters` are fill attrs or classes. */
const mark = ({ rx = 10, tile, letters }) =>
  `<defs><clipPath id="c"><rect width="40" height="40" rx="${rx}"/></clipPath></defs>` +
  `<rect width="40" height="40" rx="${rx}" ${tile}/>` +
  `<g clip-path="url(#c)"><path d="${AS}" ${letters}/></g>`;
const lightMark = (rx) => mark({ rx, tile: `fill="${LIGHT.fg}"`, letters: `fill="${LIGHT.bg}"` });

const png = (markup, width) =>
  new Resvg(markup, { fitTo: { mode: 'width', value: width }, font: fontOptions }).render().asPng();

// favicon.svg: light and dark variants via prefers-color-scheme inside the SVG.
writeFileSync(
  pub('favicon.svg'),
  svg(
    40,
    40,
    `<style>.t{fill:${LIGHT.fg}}.l{fill:${LIGHT.bg}}@media (prefers-color-scheme:dark){.t{fill:${DARK.fg}}.l{fill:${DARK.bg}}}</style>` +
      mark({ tile: 'class="t"', letters: 'class="l"' }),
  ) + '\n',
);

// PNG fallbacks (light). The 16px tile uses rx 9, as in the favicon spec.
writeFileSync(pub('favicon-16x16.png'), png(svg(40, 40, lightMark(9)), 16));
writeFileSync(pub('favicon-32x32.png'), png(svg(40, 40, lightMark(10)), 32));

// apple-touch-icon: 180×180, light background, 20% padding (108px mark).
writeFileSync(
  pub('apple-touch-icon.png'),
  png(
    svg(
      180,
      180,
      `<rect width="180" height="180" fill="${LIGHT.bg}"/><g transform="translate(36 36) scale(${108 / 40})">${lightMark(10)}</g>`,
    ),
    180,
  ),
);

// OG image: 1200×630, the header lockup (monogram + name) at 4× on --bg.
// Header: 38px mark, 12px gap, name 14.5px/500 in --fg, vertically centred in a 1.3 line box.
const S = 4;
const MARK = 38 * S;
const GAP = 12 * S;
const NAME = 14.5 * S;
const W = 1200;
const H = 630;
// Geist's ascender + descender is exactly 1.3em, so the 1.3 line box has no half-leading: baseline = top + ascent.
const baseline = H / 2 - (NAME * 1.3) / 2 + GEIST_ASCENT * NAME;
const name = outline(
  `<text x="0" y="${baseline}" style="font-family: Geist; font-weight: 500; font-size: ${NAME}px">${siteName}</text>`,
  W,
  H,
);
const left = (W - (MARK + GAP + name.bbox.x + name.bbox.width)) / 2;
const og = svg(
  W,
  H,
  `<rect width="${W}" height="${H}" fill="${LIGHT.bg}"/>` +
    `<g transform="translate(${left} ${(H - MARK) / 2}) scale(${MARK / 40})">${lightMark(10)}</g>` +
    `<path transform="translate(${left + MARK + GAP} 0)" d="${name.d}" fill="${LIGHT.fg}"/>`,
);
writeFileSync(pub('og.png'), png(og, W));

console.log('Wrote favicon.svg, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, og.png');
