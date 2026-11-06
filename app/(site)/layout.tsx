import type { ReactNode } from 'react';
import Header from '@/components/Header';
import Providers from '@/components/Providers';

// Home and About. The 404 renders outside this group so it gets none of the site-wide extras.
// Each page renders its own Footer (About drops the footer's divider).
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="col">
        <Header />
        {children}
      </div>
    </Providers>
  );
}
