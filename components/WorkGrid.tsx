'use client';

import { useState } from 'react';
import { projects, site, type Platform } from '@/content';
import ProjectCard from './ProjectCard';

type Filter = 'all' | Platform;
const FILTERS: Filter[] = ['all', 'web', 'mobile'];

const matches = (filter: Filter) =>
  filter === 'all' ? projects : projects.filter((p) => p.platforms.includes(filter));

/** /work/: the page title with the All / Web / Mobile filters beside it, then every matching project. */
export default function WorkGrid() {
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px 16px',
          margin: '0 0 32px',
        }}
      >
        <h1
          id="work-title"
          style={{
            margin: 0,
            fontSize: '22px',
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: '-.015em',
            color: 'var(--fg)',
          }}
        >
          {site.ui.workTitle}
        </h1>
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
        {matches(filter).map((p) => (
          <ProjectCard key={p.slug} project={p} heading="h2" />
        ))}
      </div>
    </>
  );
}
