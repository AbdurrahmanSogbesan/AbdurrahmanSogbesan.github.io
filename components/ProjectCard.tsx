import { site, type Project } from '@/content';
import ProjectPreview from './ProjectPreview';

/** "Web + Mobile · 2023" */
function metaLine(project: Project) {
  const platforms = project.platforms.map((p) => site.ui.filters[p]).join(' + ');
  return project.year ? `${platforms} · ${project.year}` : platforms;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="card">
      <ProjectPreview project={project} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
        <div className="cardhead">
          <h3 className="cardtitle">{project.name}</h3>
          <span className="mono meta">{metaLine(project)}</span>
        </div>
        <p className="desc" title={project.description}>
          {project.description}
        </p>
      </div>
    </article>
  );
}
