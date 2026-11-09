import Link from 'next/link';
import type { Project } from '@/content';
import { metaLine } from '@/lib/projects';
import ProjectPreview from './ProjectPreview';
import LinkPending from './LinkPending';

/**
 * The whole card links to the project page (`a.card.cardlink`). Hover and focus underline the name only.
 * `heading`: h3 under Home's "Selected work" h2; h2 on /work/, where the page title is the h1.
 * No prefetch: prefetching a project page loads its full-size screenshots, so Home and /work/ would download
 * every hero in the background. The page is fetched on click instead.
 */
export default function ProjectCard({ project, heading: Title = 'h3' }: { project: Project; heading?: 'h2' | 'h3' }) {
  return (
    <Link className="card cardlink" href={`/work/${project.slug}/`} prefetch={false}>
      <ProjectPreview project={project} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
        <div className="cardhead">
          <Title className="cardtitle">{project.name}</Title>
          <span className="mono meta">{metaLine(project)}</span>
        </div>
        <p className="desc" title={project.description}>
          {project.description}
        </p>
      </div>
      <LinkPending />
    </Link>
  );
}
