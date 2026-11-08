import type { Metadata } from 'next';
import ExperienceList from '@/components/ExperienceList';
import Footer from '@/components/Footer';
import ToolboxRow from '@/components/ToolboxRow';
import { about, tools } from '@/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('about', '/about/', 'about');

export default function AboutPage() {
  return (
    <>
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

        <section className="rise" aria-labelledby="exp-label" style={{ padding: '72px 0 0', animationDelay: '50ms' }}>
          <h2 id="exp-label" className="label spaced">
            {about.labels.experience}
          </h2>
          <ExperienceList />
        </section>

        <section className="rise" aria-labelledby="tool-label" style={{ padding: '72px 0 0', animationDelay: '100ms' }}>
          <h2 id="tool-label" className="label spaced">
            {about.labels.toolbox}
          </h2>
          <div style={{ borderBottom: '1px solid var(--line)' }}>
            {tools.map((row) => (
              <ToolboxRow key={row.label} row={row} />
            ))}
          </div>
        </section>
      </main>
      <Footer divider={false} />
    </>
  );
}
