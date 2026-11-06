// About page copy (intro + education). Experience and Toolbox live in experience.ts and tools.ts.

export const about = {
  heading: "I'm Abdurrahman, a full-stack engineer based in Lagos.",
  paragraphs: [
    "I'm happiest shipping: taking a feature from a rough idea to production, across the API, the types that hold it together and the interface people actually use. I've spent most of my career as a proactive individual contributor, the one who picks up the unclear thing and gets it moving.",
    "I've worked across fintech, Web3, AI, healthcare and event ticketing, on web and mobile, frontend and backend. I also like tooling that makes a team faster: at Codygo I wrote ESLint rules that ended up in every company codebase.",
    'Outside work I take long walks, train at the gym, play games, and catch up on TV shows.',
  ],
  labels: { experience: 'Experience', toolbox: 'Toolbox', education: 'Education' },
  education: {
    degree: 'BSc Computer Science',
    school: 'University of Lagos',
    initials: 'UL',
    /** Logo under /public once supplied. null = initials chip. */
    logo: '/logos/unilag.png' as string | null,
  },
};

// 404 page copy (editorial direction "A").
export const notFound = {
  label: 'Error 404',
  heading: 'Nothing lives here.',
  body: 'This page was moved, renamed, or never existed. Everything that does is listed below.',
  index: [
    { n: '01', label: 'Home', href: '/', note: 'What I build, and selected work' },
    { n: '02', label: 'About', href: '/about', note: 'Experience and toolbox' },
    { n: '03', label: 'Résumé', href: '/resume.pdf', note: 'One page, PDF' },
    { n: '04', label: 'Email', href: 'mailto:abdurrahmansogbesan@gmail.com', note: 'abdurrahmansogbesan@gmail.com' },
  ],
};
