import { site, type Project } from '@/content';
import AppLink from './AppLink';
import { ArrowUpRight } from './icons';
import ProjectPreview from './ProjectPreview';

/** "Web + Mobile · 2023" */
function metaLine(project: Project) {
  const platforms = project.platforms.map((p) => site.ui.filters[p]).join(' + ');
  return project.year ? `${platforms} · ${project.year}` : platforms;
}

export default function ProjectCard({ project }: { project: Project }) {
  const body = (
    <>
      <ProjectPreview project={project} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
        <div className="cardhead">
          <h3 className="cardtitle">
            {project.url ? (
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
  return project.url ? (
    <AppLink className="card" href={project.url}>
      {body}
    </AppLink>
  ) : (
    <article className="card">{body}</article>
  );
}
