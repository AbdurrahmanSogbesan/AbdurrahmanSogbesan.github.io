// Detail-page content for /work/[slug]/, keyed by the slug used in content/projects.ts.
// `did` lines are final copy; use them verbatim. `liveUrl` is the only source for a project's live site.
import type { ProjectDetails } from './types';

export const projectDetails: Record<string, ProjectDetails> = {
  "addressable": {
    company: "Codygo",
    role: "Full-stack Developer",
    stack: ["React", "TypeScript", "AWS Lambda", "AWS CDK", "ECharts", "React Query"],
    liveUrl: "https://www.addressable.io/",
    did: [
      "I built most of the dashboards brands use to see how their campaigns are doing, from event analytics to channel attribution. The platform serves over 100 brands and 23 million matched wallets across 7 chains, so these pages handle a lot of data.",
      "When some of those pages started to slow down and there wasn't much left to fix on the backend, I added caching at the Lambda layer and in the browser, cut out unnecessary re-renders and tightened how we queried data.",
      "I also added new ad channels to campaign creation, so brands could run display banners, target social audiences and narrow campaigns down by region.",
    ],
  },
  "bloco": {
    company: "Pramie Technologies",
    role: "Full-stack Developer",
    stack: ["Next.js", "TypeScript", "React Query", "Stripe"],
    liveUrl: "https://bloco.co.uk/",
    did: [
      "I worked on the admin dashboard promoters use to run their events, building team management, commission tracking and the pages where they brand their own storefront.",
      "On the customer side, I built the pages where people discover promoters and follow the brands they like.",
      "I also hooked Stripe into the refunds flow and smoothed out rough edges in checkout, where most of the platform's traffic lands.",
    ],
  },
  "truepresence": {
    company: "Tempo",
    role: "Full-stack Developer",
    stack: ["Next.js", "React Native", "Expo", "Supabase", "Stripe", "RevenueCat", "TypeScript"],
    liveUrl: "https://truepresence.com/",
    did: [
      "I built the system that decides what each person can access based on their plan, including a grace period when a payment fails and limits on how many people an organisation can add.",
      "Payments run through Stripe on the web and RevenueCat on mobile, and I kept the two in sync so people can change their plan from any device.",
      "I also built an automation engine that sends follow-up messages to clients when specific events are triggered, with an optional approval step before anything goes out.",
    ],
  },
  "first-active-365": {
    company: "Pramie Technologies",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "React Query"],
    liveUrl: "https://firstactive365.co.uk/",
    did: [
      "I maintained the web app staffing operators use every day, fixing issues and improving it as new needs came up.",
      "Some of the busier screens were slow to load, so I added caching with React Query that made those queries about 30% faster.",
    ],
  },
  "hyblock-capital": {
    company: "Tempo",
    role: "Frontend Lead",
    stack: ["Next.js", "TypeScript", "RTK Query", "WebSockets"],
    liveUrl: "https://hyblockcapital.com/",
    did: [
      "I built the parts traders use to create a strategy, from picking indicators and setting conditions to running it and seeing the backtest results on a chart.",
      "The hardest part was keeping live market data and a long, interconnected form in sync, all the way from setting up a strategy to funding a wallet and placing the trade.",
      "I also fixed high-priority bugs on a tight turnaround in Hyblock's production analytics platform, which serves over 100,000 clients worldwide.",
    ],
  },
  "debt-tracker": {
    company: null,
    role: "Full-stack Developer",
    stack: ["React Native", "Expo", "NestJS", "Prisma", "PostgreSQL"],
    liveUrl: null,
    did: [
      "I built a mobile app for tracking shared expenses and loans within groups, with a NestJS backend behind it.",
      "You can split one expense across a group and keep track of what each person owes, or hand a debt over to someone else.",
      "Groups can invite people by email, everyone gets notified when something changes, and there's a simple way to log bills and other spending.",
    ],
  },
  "knextt": {
    company: "Pramie Technologies",
    role: "Lead Backend Developer, Frontend Developer",
    stack: ["NestJS", "TypeGraphQL", "PostgreSQL", "Prisma", "Next.js", "Apollo Client", "GraphQL Codegen"],
    liveUrl: null,
    did: [
      "I built the NestJS GraphQL API that rotates team members through their turns, sends scheduled reminders and syncs with Google Calendar.",
      "On the frontend, I set up a type-safe data layer with Apollo Client and GraphQL Code Generator, so every query and mutation got TypeScript types generated from the schema, and got the other frontend developers working the same way.",
      "Getting the backend running used to take a lot of manual steps, so I automated them with database seeders and provisioning scripts and cut the setup time in half.",
    ],
  },
  "doculess": {
    company: "ZeroComplex AI",
    role: "Frontend Developer",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Paystack"],
    liveUrl: null,
    did: [
      "I built the billing side of an AI document extraction platform that has processed over 10,000 documents, including billing history, card validation and adding cards through both Paystack and Stripe.",
      "I rebuilt the model settings and training screens, showing each model's training status on its card and adding a way to publish a model once it's ready.",
      "I built the templates pages and connected them to the backend, so people could reuse an extraction setup for a type of document or request a new one.",
      "I also built the teams page for managing members, and tightened login validation and error messages across the app.",
    ],
  },
  "triage-clinic": {
    company: null,
    role: "Full-stack Developer",
    stack: ["Next.js", "Supabase", "Vercel AI SDK", "Gemini 2.5 Flash", "gpt-oss-120b"],
    liveUrl: "https://www.triageclinic.me/",
    did: [
      "Patients answer questions from an AI interviewer in English, Pidgin, Yoruba, Igbo or Hausa, and it writes up a SOAP note with a Manchester Triage System urgency level for a clinician to confirm.",
      "A second model from a different family audits each note against the full transcript and scores its confidence, and low-confidence cases get flagged for closer review.",
      "Model outputs are validated against Zod schemas, transcripts are encrypted at rest, and row-level security limits each clinician to their own cases.",
      "On synthetic patient cases it reached 96.7% triage accuracy, without under-triaging a single patient.",
    ],
  },
};
