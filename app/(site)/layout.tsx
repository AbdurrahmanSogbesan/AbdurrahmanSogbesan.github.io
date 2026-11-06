import type { ReactNode } from 'react';
import Header from '@/components/Header';

// Home and About. The 404 renders outside this group so it gets none of the site-wide extras.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="col">
      <Header />
      {children}
    </div>
  );
}
