// Site-wide copy: identity, links, nav, footer and small UI strings.

/** Résumé on Google Drive (nav, link pill, 404 index). Update the file via Drive → Manage versions to keep this link. */
const resumeUrl = 'https://drive.google.com/file/d/153bzAcuj2GULm12cO3MLoM5uEnb0tsNz/view?usp=sharing';

export const site = {
  name: 'Abdurrahman Sogbesan',
  title: 'Full-stack Engineer',
  location: 'Lagos, Nigeria',
  email: 'abdurrahmansogbesan@gmail.com',
  copyrightYear: 2026,
  /** Production origin. metadataBase (OG/Twitter absolute URLs) derives from this. */
  url: 'https://abdurrahmansogbesan.github.io',
  resumeUrl,

  nav: [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Résumé', href: resumeUrl, external: true },
  ],

  availability: 'Open to full-time remote roles and contract work',

  /** Pill links under the availability line on Home. Order matters. */
  links: [
    { label: 'GitHub', href: 'https://github.com/AbdurrahmanSogbesan', icon: 'code' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdurrahman-sogbesan', icon: 'briefcase' },
    { label: 'Email', href: 'mailto:abdurrahmansogbesan@gmail.com', icon: 'mail' },
    { label: 'Résumé', href: resumeUrl, icon: 'file' },
  ],

  footer: {
    heading: 'Have a role or a project in mind?',
    cta: 'Email me',
    copiedToast: 'Copied',
  },

  ui: {
    selectedWorkLabel: 'Selected work',
    filters: { all: 'All', web: 'Web', mobile: 'Mobile' },
    showAll: 'Show all',
    showLess: 'Show less',
    /** Number of projects visible before "Show all". */
    initialProjectCount: 6,
    menuOpen: 'Menu',
    menuClose: 'Close',
    themeToDark: 'Switch to dark theme',
    themeToLight: 'Switch to light theme',
    retroToast: 'Retro mode unlocked · +30 lives',
    retroClose: 'Close and end retro mode',
    /** Hover-card placeholder tile until a screenshot is supplied: "<company name> landing page". */
    landingPageSuffix: 'landing page',
    /** Labels for assistive tech only (aria-label on links, navs and groups). */
    a11y: {
      homeLink: 'Abdurrahman Sogbesan, home',
      mainNav: 'Main',
      mobileNav: 'Mobile',
      filterProjects: 'Filter projects',
      pagesIndex: 'Pages on this site',
      /** Followed by the email address. */
      copyEmail: 'Copy email address',
    },
  },

  meta: {
    /** <meta name="description"> and og/twitter description, per page. Keep each under ~160 characters. */
    descriptions: {
      home: 'Abdurrahman Sogbesan, a full-stack engineer in Lagos building web and mobile products with TypeScript, React, Next.js and NestJS.',
      about:
        "Abdurrahman Sogbesan's work at Tempo, Codygo, ZeroComplex AI and Pramie, and the toolbox behind it, from database schema to screen.",
    },
    titles: {
      home: 'Abdurrahman Sogbesan',
      about: 'About · Abdurrahman Sogbesan',
      notFound: 'Page not found',
    },
    /** Stack line on the OG images (bottom right). */
    ogStack: 'TypeScript · React · Next.js · Node.js',
    /** og:image:alt / twitter:image:alt for og-default.png and og-about.png. */
    ogImageAlt: {
      default: 'Abdurrahman Sogbesan, Full-stack Engineer in Lagos',
      about: 'About Abdurrahman Sogbesan, Full-stack Engineer in Lagos',
    },
  },

  /** Printed once to the browser console on load (see HANDOFF.md, Easter eggs). */
  console: {
    heading: 'Hi, curious one.',
    lines: [
      "You're reading the console, so we'd probably get along.",
      "I'm Abdurrahman, a full-stack engineer in Lagos. If you're hiring or building something, say hi:",
      '',
      'abdurrahmansogbesan@gmail.com',
      'github.com/AbdurrahmanSogbesan',
    ],
    hint: 'P.S. Try ↑ ↑ ↓ ↓ ← → ← → B A on the page.',
  },
} as const;
