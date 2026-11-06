import type { ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Providers from '@/components/Providers';

// Home and About. The 404 renders outside this group so it gets none of the site-wide extras.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="col">
        <Header />
        {children}
        <Footer />
      </div>
    </Providers>
  );
}
