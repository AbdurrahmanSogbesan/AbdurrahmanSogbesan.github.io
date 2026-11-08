import Link from 'next/link';
import type { Project } from '@/content';
import { metaLine } from '@/lib/projects';
import ProjectPreview from './ProjectPreview';

/**
 * The whole card links to the project page (`a.card.cardlink`). Hover and focus underline the name only.
 * `heading`: h3 under Home's "Selected work" h2; h2 on /work/, where the page title is the h1.
 */
export default function ProjectCard({ project, heading: Title = 'h3' }: { project: Project; heading?: 'h2' | 'h3' }) {
  return (
    <Link className="card cardlink" href={`/work/${project.slug}/`}>
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
    </Link>
  );
}
