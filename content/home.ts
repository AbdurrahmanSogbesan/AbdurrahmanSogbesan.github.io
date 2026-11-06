import type { RichParagraph } from './types';

// Home intro. The first paragraph renders in the heading colour (--fg); the rest in body grey (--body).
// { company: key } renders a CompanyLink (logo chip + name, hover card on desktop).
export const homeIntro: RichParagraph[] = [
  ["I'm a full-stack engineer with 5+ years of experience, building web and mobile products end to end."],
  [
    'Most recently, at ',
    { company: 'tempo' },
    ', I built a crypto trading terminal and worked across the stack on a HIPAA-compliant guidance app.',
  ],
  [
    'Before that, I built analytics dashboards for a Web3 marketing platform at ',
    { company: 'codygo' },
    ', shipped four products spanning AI, fintech and online learning at ',
    { company: 'zerocomplex' },
    ', and built scheduling and ticketing products at ',
    { company: 'pramie' },
    '.',
  ],
];
