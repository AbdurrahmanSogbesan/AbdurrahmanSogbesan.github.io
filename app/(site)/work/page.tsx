import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import WorkGrid from '@/components/WorkGrid';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata('work', '/work/');

// design/Work.dc.html minus its "← Home" link (dropped once Work joined the nav): "Work" with the filters, every project.
export default function WorkPage() {
  return (
    <>
      <main style={{ padding: '88px 0 0' }}>
        <section className="rise" aria-labelledby="work-title" style={{ animationDelay: '0ms' }}>
          <WorkGrid />
        </section>
      </main>
      <Footer />
    </>
  );
}
