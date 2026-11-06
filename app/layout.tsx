import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { site } from '@/content';
import { themeBootstrapScript } from '@/lib/theme';
import './globals.css';

const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-geist-mono' });
// Subset to the letters "AS": used only by the monogram.
const unbounded = localFont({ src: './fonts/unbounded-as.woff2', weight: '800', variable: '--font-unbounded' });

export const metadata: Metadata = {
  title: site.meta.titles.home,
  description: site.meta.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    // `dark` (and later `retro`) are toggled on <html> outside React, hence suppressHydrationWarning.
    <html
      lang="en"
      className={`site ${geist.variable} ${geistMono.variable} ${unbounded.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
