import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { site } from '@/content';
import { themeBootstrapScript } from '@/lib/theme';
import './globals.css';

const geist = Geist({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-geist' });
const geistMono = Geist_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-geist-mono' });
// Subset to the letters "AS": used only by the monogram.
const unbounded = localFont({ src: './fonts/unbounded-as.woff2', weight: '800', variable: '--font-unbounded' });

// Shared across every page. Per-page title, description, canonical and OG tags come from pageMetadata() in each page.
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: site.meta.titles.home,
  description: site.meta.descriptions.home,
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F6F4EF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
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
