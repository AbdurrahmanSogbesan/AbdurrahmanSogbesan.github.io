import type { Company, CompanyKey } from './types';

// Logos and screenshots are null until the real files are added to /public.
export const companies: Record<CompanyKey, Company> = {
  tempo: {
    key: 'tempo',
    name: 'Tempo',
    url: 'https://www.tempo.new/',
    initial: 'T',
    logo: '/logos/tempo.svg',
    card: { domain: 'tempo.new', blurb: 'AI software factory for product teams', screenshot: null },
  },
  codygo: {
    key: 'codygo',
    name: 'Codygo',
    url: 'https://codygo.com/',
    initial: 'C',
    logo: '/logos/codygo.svg',
    card: { domain: 'codygo.com', blurb: 'GenAI full-stack studio for AI apps and cloud systems', screenshot: null },
  },
  zerocomplex: {
    key: 'zerocomplex',
    name: 'ZeroComplex AI',
    url: 'https://www.zerocomplex.ai/',
    initial: 'Z',
    logo: '/logos/zerocomplex.png',
    card: { domain: 'zerocomplex.ai', blurb: 'Custom autonomous systems and software products', screenshot: null },
  },
  pramie: {
    key: 'pramie',
    name: 'Pramie Technologies',
    url: 'https://www.pramie.tech/',
    initial: 'P',
    logo: '/logos/pramie.png',
    card: { domain: 'pramie.tech', blurb: 'Web and mobile apps, from idea to launch', screenshot: null },
  },
};
