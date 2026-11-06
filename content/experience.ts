import type { ExperienceEntry } from './types';

// About › Experience, newest first. The first entry starts expanded.
export const experience: ExperienceEntry[] = [
  {
    company: 'tempo',
    role: 'Full-stack Developer',
    dates: '2025–2026',
    summary: 'Full-stack work across client products, from a crypto trading terminal to a HIPAA-compliant guidance platform.',
    bullets: [
      'For Hyblock Capital, led the frontend of an algorithmic trading terminal as its sole frontend engineer: strategy builder, indicator configurator and backtesting charts, with real-time data and a deeply linked multi-step form. Worked with 2–3 backend engineers, the product owner and a designer.',
      'For TruePresence, built subscription feature gating across server, web and mobile, with Stripe and RevenueCat billing kept in sync between platforms.',
      'Also on TruePresence, shipped a rule-based messaging automation engine with optional approvals, replacing manual client follow-ups.',
      'Built a typed API layer on Supabase Edge Functions, with generated types, validation and role-based access, for an internal engineering-productivity tool.',
    ],
  },
  {
    company: 'codygo',
    role: 'Full-stack Developer',
    dates: '2024–2026',
    summary: 'Built and sped up the analytics dashboards at the core of Addressable, a Web3 marketing platform.',
    bullets: [
      'Owned the campaign performance, event analytics, campaign management and channel attribution dashboards, built on ECharts over large data volumes.',
      'When pages slowed down and the backend had nothing left to give, added caching at the Lambda layer and in the client, memoised heavy components and reworked queries to keep things fast.',
      'Shipped ad-channel integrations in campaign creation: display banners, social targeting, custom audiences and geo-targeting.',
      'Wrote ESLint rules for recurring bugs (silent failures, deep imports) in a shared package used on every company codebase.',
    ],
  },
  {
    company: 'zerocomplex',
    role: 'Frontend Developer',
    dates: '2023–2024',
    summary: 'Frontend on client products: AI document extraction, assessments, payments and fintech admin tools.',
    bullets: [
      'Owned the templates feature on Doculess, letting users reuse or build their own extraction templates, on a platform that processed 10,000+ documents.',
      'Built a couples assessment product from the data model to the final screen, plus its landing page.',
      'Integrated Stripe and Paystack: wallet top-ups, auto-reload, card management and checkout for 500+ active users.',
      'Shipped admin tooling for a savings and lending app, including loan approvals, KYC review and product dashboards.',
    ],
  },
  {
    company: 'pramie',
    role: 'Full-stack Developer',
    dates: '2021–2023',
    summary: 'Joined as a frontend developer, learned the backend, and ended up owning one.',
    bullets: [
      'Sole backend developer on Knextt, a roster scheduling app: NestJS GraphQL API with a rotation engine, invites, reminders and Google Calendar sync.',
      'Led the frontend integration on Knextt, setting up GraphQL codegen and guiding the other frontend developers on the approach.',
      'Cut backend setup time by 50% with automated database seeders and provisioning scripts.',
      'Shipped across BLOCO, a ticketing platform with $7M+ in sales: admin dashboard modules, promoter pages and checkout fixes.',
    ],
  },
];
