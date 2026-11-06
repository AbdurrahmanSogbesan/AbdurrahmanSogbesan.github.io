import { companies, type ExperienceEntry } from '@/content';
import LogoChip from './LogoChip';

interface Props {
  entry: ExperienceEntry;
  open: boolean;
  onToggle: () => void;
}

/** One accordion row. Entries without bullets render a static (non-toggling) header. */
export default function ExperienceItem({ entry, open, onToggle }: Props) {
  const company = companies[entry.company];
  const hasBullets = entry.bullets.length > 0;
  const isOpen = hasBullets && open;

  return (
    <div className={isOpen ? 'exp open' : 'exp'}>
      <button
        type="button"
        className={hasBullets ? 'exphead' : 'exphead static'}
        onClick={hasBullets ? onToggle : undefined}
        aria-expanded={hasBullets ? isOpen : undefined}
      >
        <LogoChip logo={company.logo} initials={company.initial} />
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
        {hasBullets && (
          <svg
            className="chev"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        )}
      </button>
      <div className="expbody">
        <div className="expinner">
          <ul>
            {entry.bullets.map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
