import type { ToolRow } from './types';

// About › Toolbox. Icons: `simple-icons` npm package (slug), AWS from `devicon` (amazonwebservices-plain),
// CI/CD is a custom stroke loop icon (see HANDOFF.md). All icons render monochrome in currentColor at 14px.
export const tools: ToolRow[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript', icon: { set: 'simple-icons', slug: 'typescript' } },
      { name: 'JavaScript', icon: { set: 'simple-icons', slug: 'javascript' } },
      { name: 'Python', icon: { set: 'simple-icons', slug: 'python' } },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'React', icon: { set: 'simple-icons', slug: 'react' } },
      { name: 'Next.js', icon: { set: 'simple-icons', slug: 'nextdotjs' } },
      { name: 'Vue', icon: { set: 'simple-icons', slug: 'vuedotjs' } },
      { name: 'React Native', icon: { set: 'simple-icons', slug: 'react' } },
    ],
  },
  {
    label: 'Backend',
    items: [
      { name: 'Node.js', icon: { set: 'simple-icons', slug: 'nodedotjs' } },
      { name: 'NestJS', icon: { set: 'simple-icons', slug: 'nestjs' } },
      { name: 'GraphQL', icon: { set: 'simple-icons', slug: 'graphql' } },
      { name: 'Supabase', icon: { set: 'simple-icons', slug: 'supabase' } },
    ],
  },
  {
    label: 'Data',
    items: [
      { name: 'PostgreSQL', icon: { set: 'simple-icons', slug: 'postgresql' } },
      { name: 'MongoDB', icon: { set: 'simple-icons', slug: 'mongodb' } },
    ],
  },
  {
    label: 'Tooling',
    items: [
      { name: 'AWS', icon: { set: 'devicon', name: 'amazonwebservices-plain' } },
      { name: 'Jest', icon: { set: 'simple-icons', slug: 'jest' } },
      { name: 'Sentry', icon: { set: 'simple-icons', slug: 'sentry' } },
      { name: 'Storybook', icon: { set: 'simple-icons', slug: 'storybook' } },
      { name: 'CI/CD', icon: { set: 'custom', name: 'cicd' } },
    ],
  },
];
