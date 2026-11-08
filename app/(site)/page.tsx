import type { Metadata } from 'next';
import Availability from '@/components/Availability';
import Footer from '@/components/Footer';
import LinkPills from '@/components/LinkPills';
import RichText from '@/components/RichText';
import SelectedWork from '@/components/SelectedWork';
import { homeIntro, site } from '@/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('home', '/');

export default function HomePage() {
  return (
    <>
      <main>
        <section
          className="rise"
          style={{ padding: '88px 0 0', display: 'flex', flexDirection: 'column', gap: '18px', animationDelay: '0ms' }}
        >
          {/* Inside the section, not before it: the ≤520px rule targets `main > section:first-child`.
            Absolutely positioned, so it takes no part in the flex gap. */}
          <h1 className="sr-only">
            {site.name}, {site.title}
          </h1>
          {homeIntro.map((paragraph, i) => (
            // First paragraph in the heading colour, the rest in body grey.
            <RichText
              key={i}
              paragraph={paragraph}
              style={i === 0 ? { margin: 0, color: 'var(--fg)' } : { margin: 0 }}
            />
          ))}
        </section>

        <section
          className="rise"
          style={{ padding: '36px 0 0', display: 'flex', flexDirection: 'column', gap: '22px', animationDelay: '50ms' }}
        >
          <Availability />
          <LinkPills />
        </section>

        <SelectedWork />
      </main>
      <Footer />
    </>
  );
}
