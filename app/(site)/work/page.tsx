import type { Metadata } from 'next';
import Link from 'next/link';
import Footer from '@/components/Footer';
import WorkGrid from '@/components/WorkGrid';
import { site } from '@/content';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('work', '/work/');

// design/Work.dc.html: back link, "Work" with the filters, every project.
export default function WorkPage() {
  return (
    <>
      <main style={{ padding: '88px 0 0' }}>
        <section className="rise" aria-labelledby="work-title" style={{ animationDelay: '0ms' }}>
          <Link className="pd-back" href="/">
            <span aria-hidden="true">←</span>
            {site.ui.backHome}
          </Link>
          <WorkGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
