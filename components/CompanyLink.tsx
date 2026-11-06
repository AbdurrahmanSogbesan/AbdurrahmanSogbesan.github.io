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
          <img src={card.screenshot} alt="" />
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

export default function CompanyLink({ company }: { company: Company }) {
  return (
    <span className="co">
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
