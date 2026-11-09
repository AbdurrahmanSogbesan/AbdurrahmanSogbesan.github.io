'use client';

import type { FocusEvent, PointerEvent } from 'react';
import { site, type Company } from '@/content';
import AppLink from './AppLink';
import { ArrowUpRight } from './icons';

/** Desktop-only preview above the link (CSS shows it on fine-pointer hover or focus-within). */
function HoverCard({ company }: { company: Company }) {
  const { card } = company;
  return (
    <span className="pop" role="tooltip">
      <span className="shot">
        {card.screenshot ? (
          // eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized
          <img src={card.screenshot} alt="" loading="lazy" decoding="async" />
        ) : (
          `${company.name} ${site.ui.landingPageSuffix}`
        )}
      </span>
      <span className="popmeta">
        <span>
          <span className="popdom">{card.domain}</span>
          <span className="popdesc">{card.blurb}</span>
        </span>
        <ArrowUpRight size={14} strokeWidth={1.8} />
      </span>
    </span>
  );
}

/** Gap kept between an open hover card and the window edge. */
const EDGE = 16;

/**
 * The card is centred on its link; near the window edge that would cut it off. Before it opens (it waits
 * 120ms), measure and slide it sideways just enough to stay EDGE px inside the window: `--nudge` on `.co`.
 */
function keepCardOnScreen(e: PointerEvent<HTMLElement> | FocusEvent<HTMLElement>) {
  const co = e.currentTarget;
  const card = co.querySelector<HTMLElement>('.pop');
  if (!card) return;
  const link = co.getBoundingClientRect();
  const width = card.offsetWidth;
  const left = link.left + link.width / 2 - width / 2;
  const fits = Math.min(Math.max(left, EDGE), window.innerWidth - EDGE - width);
  co.style.setProperty('--nudge', `${Math.round(fits - left)}px`);
}

export default function CompanyLink({ company }: { company: Company }) {
  return (
    <span className="co" onPointerEnter={keepCardOnScreen} onFocus={keepCardOnScreen}>
      <AppLink className="inline" href={company.url}>
        <span className="logo" aria-hidden="true">
          {company.logo ? (
            // eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized
            <img src={company.logo} alt="" />
          ) : (
            company.initial
          )}
        </span>
        <span className="nm">{company.name}</span>
      </AppLink>
      <HoverCard company={company} />
    </span>
  );
}
