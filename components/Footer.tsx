'use client';

import { site } from '@/content';
import { useToast } from '@/hooks/useToast';
import { ArrowUpRight, CopyIcon } from './icons';

export default function Footer() {
  const toast = useToast();

  const copyEmail = () => {
    try {
      navigator.clipboard?.writeText(site.email).catch(() => {});
    } catch {
      // Clipboard API unavailable (insecure context): the toast still confirms the intent.
    }
    toast.show(site.footer.copiedToast, 'copy', 1600);
  };

  return (
    <footer
      style={{
        marginTop: '120px',
        padding: '64px 0 48px',
        borderTop: '1px solid var(--line)',
        display: 'flex',
        flexDirection: 'column',
        gap: '28px',
      }}
    >
      <h2 style={{ margin: 0, fontSize: '16px', fontWeight: 400, color: 'var(--body)' }}>{site.footer.heading}</h2>
      <div>
        <button
          type="button"
          className="copy"
          onClick={copyEmail}
          aria-label={`${site.ui.a11y.copyEmail} ${site.email}`}
        >
          <span className="em">{site.email}</span>
          <CopyIcon size={18} strokeWidth={1.6} />
        </button>
      </div>
      <div>
        <a className="solid" href={`mailto:${site.email}`}>
          {site.footer.cta}
          <ArrowUpRight size={14} strokeWidth={1.8} />
        </a>
      </div>
      <p className="mono stamp" style={{ margin: '36px 0 0', color: 'var(--muted)', fontSize: '11.5px' }}>
        {site.location} · © {site.copyrightYear}
      </p>
    </footer>
  );
}
