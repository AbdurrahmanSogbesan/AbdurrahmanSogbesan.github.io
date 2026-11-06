import type { Metadata } from 'next';
import AppLink from '@/components/AppLink';
import Header from '@/components/Header';
import { notFound, site } from '@/content';

export const metadata: Metadata = { title: site.meta.titles.notFound };

// Outside the (site) group on purpose: no toaster, retro mode or other easter eggs here.
export default function NotFound() {
  return (
    <div className="col">
      <Header />
      <main style={{ padding: '112px 0 0' }}>
        <p className="label rise" style={{ animationDelay: '0ms' }}>
          {notFound.label}
        </p>
        <h1 className="nf-title rise" style={{ marginTop: '20px', animationDelay: '50ms' }}>
          {notFound.heading}
        </h1>
        <p className="rise" style={{ margin: '24px 0 0', maxWidth: '46ch', animationDelay: '100ms' }}>
          {notFound.body}
        </p>

        <nav
          className="rise"
          aria-label={site.ui.a11y.pagesIndex}
          style={{ marginTop: '64px', animationDelay: '150ms' }}
        >
          <ul className="nf-index">
            {notFound.index.map((row) => (
              <li key={row.n} className="nf-row">
                <span className="mono" style={{ color: 'var(--muted)' }}>
                  {row.n}
                </span>
                <span>
                  <AppLink className="nf-link" href={row.href}>
                    {row.label}
                  </AppLink>{' '}
                  <span className="nf-what">{row.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </nav>
      </main>

      <footer style={{ marginTop: '120px', padding: '32px 0 48px', borderTop: '1px solid var(--line)' }}>
        <p className="mono" style={{ margin: 0, color: 'var(--muted)', fontSize: '11.5px' }}>
          {site.location} · © {site.copyrightYear}
        </p>
      </footer>
    </div>
  );
}
