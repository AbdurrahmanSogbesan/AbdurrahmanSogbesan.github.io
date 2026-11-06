import type { Metadata } from 'next';
import { site } from '@/content';

export const metadata: Metadata = { title: site.meta.titles.about };

export default function AboutPage() {
  return <main />;
}
