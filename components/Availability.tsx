import { site } from '@/content';

export default function Availability() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <span className="dot" aria-hidden="true" />
      <span className="mono" style={{ fontSize: '12.5px', color: 'var(--body)' }}>
        {site.availability}
      </span>
    </div>
  );
}
