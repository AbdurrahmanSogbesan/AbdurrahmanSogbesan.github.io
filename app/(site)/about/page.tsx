import type { Metadata } from 'next';
import ExperienceList from '@/components/ExperienceList';
import LogoChip from '@/components/LogoChip';
import ToolboxRow from '@/components/ToolboxRow';
import { about, site, tools } from '@/content';

export const metadata: Metadata = { title: site.meta.titles.about };

export default function AboutPage() {
  const { education } = about;
  return (
    <main>
      <section
        className="rise"
        style={{ padding: '88px 0 0', display: 'flex', flexDirection: 'column', gap: '18px', animationDelay: '0ms' }}
      >
        <h1
          style={{
            margin: '0 0 6px',
            fontSize: '22px',
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: '-.015em',
            color: 'var(--fg)',
          }}
        >
          {about.heading}
        </h1>
        {about.paragraphs.map((text) => (
          <p key={text} style={{ margin: 0 }}>
            {text}
          </p>
        ))}
      </section>

      <section className="rise" aria-labelledby="exp-label" style={{ padding: '96px 0 0', animationDelay: '50ms' }}>
        <h2 id="exp-label" className="label spaced">
          {about.labels.experience}
        </h2>
        <ExperienceList />
      </section>

      <section className="rise" aria-labelledby="tool-label" style={{ padding: '96px 0 0', animationDelay: '100ms' }}>
        <h2 id="tool-label" className="label spaced">
          {about.labels.toolbox}
        </h2>
        <div style={{ borderBottom: '1px solid var(--line)' }}>
          {tools.map((row) => (
            <ToolboxRow key={row.label} row={row} />
          ))}
        </div>
      </section>

      <section className="rise" aria-labelledby="edu-label" style={{ padding: '96px 0 0', animationDelay: '150ms' }}>
        <h2 id="edu-label" className="label spaced">
          {about.labels.education}
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '18px 4px',
            borderTop: '1px solid var(--line)',
            borderBottom: '1px solid var(--line)',
          }}
        >
          <LogoChip logo={education.logo} initials={education.initials} />
          <span style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '4px 10px' }}>
            <span style={{ fontSize: '15.5px', fontWeight: 500, color: 'var(--fg)' }}>{education.degree}</span>
            <span style={{ fontSize: '14px', color: 'var(--muted)' }}>{education.school}</span>
          </span>
        </div>
      </section>
    </main>
  );
}
