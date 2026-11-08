import Link from 'next/link';
import { projects, site } from '@/content';
import ProjectCard from './ProjectCard';

/** Home: the first few projects, no filters, and a link to /work/ for the rest. */
export default function SelectedWork() {
  return (
    <section className="rise" aria-labelledby="work-label" style={{ padding: '72px 0 0', animationDelay: '100ms' }}>
      <h2 id="work-label" className="label" style={{ marginBottom: '28px' }}>
        {site.ui.selectedWorkLabel}
      </h2>

      <div className="grid">
        {projects.slice(0, site.ui.homeProjectCount).map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
        <Link className="quiet" href="/work/">
          {site.ui.allWork}
          <span className="mono" style={{ color: 'var(--muted)', fontSize: '11px' }}>
            {projects.length}
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
