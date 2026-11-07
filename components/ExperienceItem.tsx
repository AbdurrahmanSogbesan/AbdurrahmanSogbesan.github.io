import { companies, type ExperienceEntry } from '@/content';
import LogoChip from './LogoChip';

/** One static experience row: chip, company and role, dates, summary. */
export default function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  const company = companies[entry.company];

  return (
    <div className="exp">
      <div className="exprow">
        <LogoChip logo={company.logo} initials={company.initial} tile={company.logoTile} />
        <span style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: '3px' }}>
          <span style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px' }}>
            <span style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 10px', minWidth: 0 }}>
              <span className="coname">{company.name}</span>
              <span
                style={{
                  fontSize: '14px',
                  color: 'var(--muted)',
                  lineHeight: 1.4,
                  minWidth: 0,
                  overflowWrap: 'anywhere',
                }}
              >
                {entry.role}
              </span>
            </span>
            <span className="mono dates" style={{ flex: 'none', color: 'var(--muted)', whiteSpace: 'nowrap' }}>
              {entry.dates}
            </span>
          </span>
          {/* Shown instead of .dates below 560px. */}
          <span className="mono datesm" style={{ display: 'none', color: 'var(--muted)' }}>
            {entry.dates}
          </span>
          {entry.summary && (
            <span style={{ fontSize: '14.5px', lineHeight: 1.6, color: 'var(--body)', overflowWrap: 'anywhere' }}>
              {entry.summary}
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
