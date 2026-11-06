'use client';

import { useState } from 'react';
import { projects, site, type Platform } from '@/content';
import ProjectCard from './ProjectCard';

type Filter = 'all' | Platform;
const FILTERS: Filter[] = ['all', 'web', 'mobile'];

const matches = (filter: Filter) =>
  filter === 'all' ? projects : projects.filter((p) => p.platforms.includes(filter));

export default function ProjectGrid() {
  const [filter, setFilter] = useState<Filter>('all');
  const [expanded, setExpanded] = useState(false);

  const limit = site.ui.initialProjectCount;
  const matching = matches(filter);
  const visible = filter === 'all' && !expanded ? matching.slice(0, limit) : matching;
  const hidden = Math.max(0, projects.length - limit);

  return (
    <section className="rise" aria-labelledby="work-label" style={{ padding: '104px 0 0', animationDelay: '100ms' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          marginBottom: '28px',
        }}
      >
        <h2 id="work-label" className="label">
          {site.ui.selectedWorkLabel}
        </h2>
        <div
          role="group"
          aria-label={site.ui.a11y.filterProjects}
          style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}
        >
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              className={f === filter ? 'filter on' : 'filter'}
              aria-pressed={f === filter}
              onClick={() => setFilter(f)}
            >
              {site.ui.filters[f]}
              <span className="mono">{matches(f).length}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid">
        {visible.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>

      {filter === 'all' && hidden > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '40px' }}>
          <button type="button" className="quiet" onClick={() => setExpanded((e) => !e)} aria-expanded={expanded}>
            {expanded ? site.ui.showLess : site.ui.showAll}
            <span className="mono" style={{ color: 'var(--muted)', fontSize: '11px' }}>
              {expanded ? '' : `+${hidden}`}
            </span>
          </button>
        </div>
      )}
    </section>
  );
}
