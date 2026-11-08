// About page copy (intro). Experience and Toolbox live in experience.ts and tools.ts.
import { site } from './site';

export const about = {
  heading: "I'm Abdurrahman, a full-stack engineer based in Lagos.",
  paragraphs: [
    "I joined Pramie as a frontend developer and ended up as the only backend developer on one of its products, which is pretty much how I like to work: I'd rather take a feature from the schema all the way to the screen than hand it off halfway. I'm usually the one who grabs the vague ticket nobody's sure about yet and turns it into something that ships.",
    "The products have varied a lot: a crypto trading terminal, a ticketing platform that's sold over $7M in tickets, a HIPAA-compliant health app and the analytics side of a Web3 marketing tool. I've also got a soft spot for tooling that saves a team time; at Codygo I wrote ESLint rules for the bugs we kept hitting, like silent failures and deep imports, and they ended up in a shared package every Codygo codebase uses.",
    "Most of my best ideas turn up on long walks, which is my excuse for taking so many. When I'm not walking I'm at the gym or working through far too many TV shows at once, and FIFA is the one game I still make time for.",
  ],
  labels: { experience: 'Experience', toolbox: 'Toolbox' },
};

// 404 page copy (editorial direction "A").
export const notFound = {
  label: 'Error 404',
  heading: 'Nothing lives here.',
  body: 'This page was moved, renamed, or never existed. Everything that does is listed below.',
  index: [
    { n: '01', label: 'Home', href: '/', note: 'What I build, and selected work' },
    { n: '02', label: 'Work', href: '/work/', note: 'All projects' },
    { n: '03', label: 'About', href: '/about', note: 'Experience and toolbox' },
    { n: '04', label: 'Résumé', href: site.resumeUrl, note: 'PDF' },
    { n: '05', label: 'Email', href: 'mailto:abdurrahmansogbesan@gmail.com', note: 'abdurrahmansogbesan@gmail.com' },
  ],
};
