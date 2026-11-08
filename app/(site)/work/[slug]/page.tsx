import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import { projectDetails, projects, site, type Project } from '@/content';
import { projectMetadata } from '@/lib/metadata';
import { displayDomain, metaLine, padPosition } from '@/lib/projects';

// One static page per project (design/Project.dc.html). Unknown slugs 404 instead of rendering on demand.
export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return project ? projectMetadata(project) : {};
}

const ui = site.ui;

/** Web projects get 16:10 slots (gallery two across); phone projects get 9:19.5 screens, three to a row. */
function Shots({
  project,
  srcs,
  offset,
  kind,
}: {
  project: Project;
  srcs: string[];
  offset: number;
  kind: 'hero' | 'gallery';
}) {
  const phones = project.preview.frame === 'phones';
  const slot = phones ? 'pd-img pd-tall' : 'pd-img pd-wide';
  const wrap = phones ? 'pd-phones' : kind === 'gallery' ? 'pd-gallery' : undefined;
  return (
    <div className={wrap}>
      {srcs.map((src, i) => (
        <div key={src} className={slot}>
          {/* eslint-disable-next-line @next/next/no-img-element -- static export, images.unoptimized */}
          <img
            src={src}
            alt={`${project.name} ${ui.a11y.screenshot} ${offset + i + 1}`}
            loading={kind === 'hero' && i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
      ))}
    </div>
  );
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  const details = projectDetails[slug];
  if (index < 0 || !details) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  // Hero: the first shot (web) or first three (phones). Everything after goes in the gallery.
  const all = project.detailShots ?? project.screenshots;
  const heroCount = project.preview.frame === 'phones' ? 3 : 1;
  const shots = { hero: all.slice(0, heroCount), gallery: all.slice(heroCount) };
  const total = projects.length;

  // Rows render only when they have data; there are no Team or Scale rows.
  const rows: { label: string; value: ReactNode }[] = [
    { label: ui.detailRows.platform, value: metaLine(project) },
    ...(details.company ? [{ label: ui.detailRows.company, value: details.company }] : []),
    { label: ui.detailRows.role, value: details.role },
    ...(details.stack.length ? [{ label: ui.detailRows.stack, value: details.stack.join(', ') }] : []),
    ...(details.liveUrl
      ? [
          {
            label: ui.detailRows.liveUrl,
            value: (
              <a className="pd-live" href={details.liveUrl} target="_blank" rel="noopener">
                {displayDomain(details.liveUrl)} ↗
              </a>
            ),
          },
        ]
      : []),
  ];

  return (
    <>
      <main style={{ padding: '72px 0 0' }}>
        <div className="pd-crumb rise" style={{ animationDelay: '0ms' }}>
          <Link className="pd-back" href="/work/">
            <span aria-hidden="true">←</span>
            {ui.backToWork}
          </Link>
          <span className="mono" style={{ color: 'var(--muted)' }}>
            <span aria-hidden="true">
              {padPosition(index + 1)} / {padPosition(total)}
            </span>
            <span className="sr-only">
              {ui.a11y.projectPosition.prefix} {index + 1} {ui.a11y.projectPosition.of} {total}
            </span>
          </span>
        </div>

        <section
          className="rise"
          style={{ padding: '32px 0 0', display: 'flex', flexDirection: 'column', gap: '10px', animationDelay: '50ms' }}
        >
          <h1 className="pd-title">{project.name}</h1>
          <p style={{ margin: 0, fontSize: '17px', lineHeight: 1.6, maxWidth: '52ch' }}>{project.description}</p>
        </section>

        {shots.hero.length > 0 && (
          <section
            className="rise"
            aria-label={ui.a11y.screenshots}
            style={{ padding: '36px 0 0', animationDelay: '100ms' }}
          >
            <Shots project={project} srcs={shots.hero} offset={0} kind="hero" />
          </section>
        )}

        <section
          className="rise"
          aria-label={ui.a11y.projectDetails}
          style={{ padding: '40px 0 0', animationDelay: '150ms' }}
        >
          <dl className="pd-meta">
            {rows.map((row) => (
              <div key={row.label} className="pd-row">
                <dt className="mono" style={{ color: 'var(--muted)' }}>
                  {row.label}
                </dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="did-label" style={{ padding: '56px 0 0' }}>
          <h2 id="did-label" className="label spaced">
            {ui.whatIDid}
          </h2>
          <ul className="pd-list">
            {details.did.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {shots.gallery.length > 0 && (
          <section aria-label={ui.a11y.moreScreenshots} style={{ padding: '56px 0 0' }}>
            <Shots project={project} srcs={shots.gallery} offset={shots.hero.length} kind="gallery" />
          </section>
        )}

        <section aria-labelledby="next-label" style={{ padding: '72px 0 0' }}>
          <h2 id="next-label" className="label spaced">
            {ui.nextProject}
          </h2>
          {/* No prefetch: it would load the next project's full-size screenshots in the background. */}
          <Link className="pd-next" href={`/work/${next.slug}/`} prefetch={false}>
            <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
              <span className="nm">{next.name}</span>
              <span style={{ fontSize: '14px', color: 'var(--muted)', overflowWrap: 'anywhere' }}>
                {next.description}
              </span>
            </span>
            <span className="mono" style={{ flex: 'none', color: 'var(--muted)' }}>
              {metaLine(next)} →
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
