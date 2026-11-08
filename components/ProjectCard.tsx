import { projectDetails, type Project } from '@/content';
import { metaLine } from '@/lib/projects';
import AppLink from './AppLink';
import { ArrowUpRight } from './icons';
import ProjectPreview from './ProjectPreview';

export default function ProjectCard({ project }: { project: Project }) {
  const liveUrl = projectDetails[project.slug]?.liveUrl;
  const body = (
    <>
      <ProjectPreview project={project} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
        <div className="cardhead">
          <h3 className="cardtitle">
            {liveUrl ? (
              <>
                <span className="nm">{project.name}</span>
                {/* Laid out but invisible until hover / focus, so the title never shifts. */}
                <span className="cardgo">
                  <ArrowUpRight size={14} strokeWidth={1.8} />
                </span>
              </>
            ) : (
              project.name
            )}
          </h3>
          <span className="mono meta">{metaLine(project)}</span>
        </div>
        <p className="desc" title={project.description}>
          {project.description}
        </p>
      </div>
    </>
  );
  // Projects with a live site link out (new tab): the name underlines and a ↗ shows on hover / focus.
  return liveUrl ? (
    <AppLink className="card" href={liveUrl}>
      {body}
    </AppLink>
  ) : (
    <article className="card">{body}</article>
  );
}
