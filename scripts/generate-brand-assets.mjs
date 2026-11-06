// Generates favicons and the OG images into public/ (run: npm run brand-assets).
// Favicons: design/Favicon.dc.html + HANDOFF.md §10. resvg shapes the text (GPOS kerning, letter-spacing) from
// the design's own <text> markup and outlines it to paths, so the favicons need no fonts at runtime.
// OG images: 1200×630, left-aligned editorial layout; every string comes from content/.
// Fonts: scripts/fonts (Unbounded 800 subset "AS", Geist 400/500, Geist Mono 400), all OFL.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { Resvg } from '@resvg/resvg-js';
import { site } from '../content/site.ts';

const here = (p) => fileURLToPath(new URL(p, import.meta.url));
const pub = (p) => here(`../public/${p}`);

// Tokens from design/site.css (light).
const LIGHT = { bg: '#F6F4EF', fg: '#151514', body: '#52524C', muted: '#6B6A63' };
const DARK = { bg: '#0A0A0A', fg: '#EDEDED' };

const fontOptions = {
  loadSystemFonts: false,
  fontFiles: ['unbounded-800-AS', 'geist-400', 'geist-500', 'geist-mono-400'].map((f) => here(`./fonts/${f}.ttf`)),
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

// ───────── OG images ─────────
const W = 1200;
const H = 630;
const PAD = 96; // safe area on every side
const RIGHT = W - PAD;
const BOTTOM = H - PAD;

const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const FONTS = {
  name: 'font-family: Geist; font-weight: 500',
  sans: 'font-family: Geist; font-weight: 400',
  mono: "font-family: 'Geist Mono'; font-weight: 400",
};
const textEl = (str, { x, y, font, size, fill, spacing = 0, anchor = 'start' }) =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" fill="${fill}" style="${font}; font-size: ${size}px; letter-spacing: ${spacing}px">${esc(str)}</text>`;

/** Ink box of a string set with its baseline at y=0 (top < 0 is the cap/ascender height). */
function ink(str, font, size, spacing = 0) {
  const b = new Resvg(svg(4000, 400, textEl(str, { x: 0, y: 200, font, size, fill: '#000', spacing })), {
    font: fontOptions,
  }).getBBox();
  return { left: b.x, right: b.x + b.width, top: b.y - 200, bottom: b.y + b.height - 200 };
}
const capHeight = (font, size) => -ink('H', font, size).top;

// Top row: monogram left, domain right (mono 26px muted, optically centred on the 72px tile).
// Bottom row: the stack line alone under a hairline, descenders resting on the safe-area edge.
const MARK = 72;
const MONO = 26;
const domain = new URL(site.url).host;
const domainBaseline = PAD + MARK / 2 + capHeight(FONTS.mono, MONO) / 2;
const rowBaseline = BOTTOM - ink(site.meta.ogStack, FONTS.mono, MONO).bottom;
const hairlineY = Math.round(rowBaseline - capHeight(FONTS.mono, MONO) - 32);

/** Shared frame: background, top row, hairline and bottom row. `middle` is the centre block. */
function ogImage(middle) {
  return svg(
    W,
    H,
    `<rect width="${W}" height="${H}" fill="${LIGHT.bg}"/>` +
      `<g transform="translate(${PAD} ${PAD}) scale(${MARK / 40})">${lightMark(10)}</g>` +
      textEl(domain, { x: RIGHT, y: domainBaseline, font: FONTS.mono, size: MONO, fill: LIGHT.muted, anchor: 'end' }) +
      middle +
      `<rect x="${PAD}" y="${hairlineY}" width="${W - 2 * PAD}" height="1" fill="${LIGHT.fg}" fill-opacity=".09"/>` +
      textEl(site.meta.ogStack, { x: PAD, y: rowBaseline, font: FONTS.mono, size: MONO, fill: LIGHT.muted }),
  );
}

// Centre block: optional mono label, then the name and "title · location". The block (label cap top →
// subtitle baseline) is centred on the canvas, so adding the label keeps the group visually centred.
const NAME = 72;
const SUB = 36;
const NAME_TO_SUB = 64; // name baseline → subtitle baseline
const LABEL_TO_NAME = 28; // label baseline → name cap top

function middleBlock(label) {
  const labelBlock = label ? capHeight(FONTS.mono, MONO) + LABEL_TO_NAME : 0;
  const top = H / 2 - (labelBlock + capHeight(FONTS.name, NAME) + NAME_TO_SUB) / 2;
  const nameBaseline = top + labelBlock + capHeight(FONTS.name, NAME);
  return (
    (label
      ? textEl(label, { x: PAD, y: top + capHeight(FONTS.mono, MONO), font: FONTS.mono, size: MONO, fill: LIGHT.muted })
      : '') +
    textEl(site.name, {
      x: PAD,
      y: nameBaseline,
      font: FONTS.name,
      size: NAME,
      fill: LIGHT.fg,
      spacing: -0.04 * NAME,
    }) +
    textEl(`${site.title} · ${site.location}`, {
      x: PAD,
      y: nameBaseline + NAME_TO_SUB,
      font: FONTS.sans,
      size: SUB,
      fill: LIGHT.body,
    })
  );
}

// og-default.png (Home + 404) and og-about.png (the same, with the nav's "About" label above the name).
writeFileSync(pub('og-default.png'), png(ogImage(middleBlock()), W));
writeFileSync(pub('og-about.png'), png(ogImage(middleBlock(site.nav.find((n) => n.href === '/about').label)), W));

console.log(
  'Wrote favicon.svg, favicon-16x16.png, favicon-32x32.png, apple-touch-icon.png, og-default.png, og-about.png',
);
