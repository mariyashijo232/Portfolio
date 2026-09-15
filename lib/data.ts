export const PROFILE = {
  name: "Mariya Shijo",
  first: "Mariya",
  role: "Full-stack developer & UI designer",
  tagline:
    "Computer science student building interfaces with careful UX, considered motion, and a real love for the small details.",
  availability: "Open to new design or development roles",
  location: "NJ / NYC",
  focus: "Full-stack · Design · Development",
  studying: "Computer Science",
  links: {
    linkedin: "https://www.linkedin.com/in/mariya-s-b23743290/",
    github: "https://github.com/mariyashijo232",
    resume: "/assets/Mariya Shijo - Resume.pdf",
    phone: "",
  },
};

export interface WorkItem {
  slug: string;
  title: string;
  kind: string;
  tag?: string;
  period: string;
  place: string;
  status: string;
  oneLiner: string;
  did: string[];
  stack: string[];
  year: string;
  slot: string;
  tint: string;
  cover?: string;
  soon?: boolean;
}

export const WORK: WorkItem[] = [
  {
    slug: "innocuous-ai",
    title: "Innocuous AI",
    kind: "Platform front-end",
    period: "Feb 2025 — May 2026",
    place: "Remote · Internship",
    status: "Shipped",
    oneLiner:
      "Front-end work on an AI platform — responsive, accessible interfaces plus a branding pass that made the whole product finally read as one thing.",
    did: [
      "Built responsive, accessible interfaces in HTML, CSS, JavaScript and Django templates",
      "Refined layouts and navigation so dense pages became easier to move through",
      "Unified branding elements across the site so every page belonged to one system",
    ],
    stack: ["HTML", "CSS", "JavaScript", "Django"],
    year: "2025 — 26",
    slot: "ms-work-innocuous",
    tint: "lilac",
    cover: "/assets/innocuous-ai-cover.png",
  },
  {
    slug: "girls-academy",
    title: "The International Girls Academy",
    kind: "Application development",
    tag: "Non-profit",
    period: "Jun 2026 — Present",
    place: "Hybrid · Newark, NJ",
    status: "In progress",
    oneLiner:
      "Shipping application features for the academy's web platform — turning what staff and students actually need into clean, unfussy front-end.",
    did: [
      "Translating requests from non-technical staff into working, responsive UI",
      "Building and extending features on the academy's application platform",
      "Keeping every interaction simple enough to need no explanation",
    ],
    stack: ["Softr", "Google Sheets", "PM"],
    year: "2026",
    slot: "ms-work-academy",
    tint: "sky",
    cover: "/assets/girls-academy-cover.png",
  },
  {
    slug: "productivity-app",
    title: "Blocked",
    kind: "Product design",
    period: "2026",
    place: "Solo · design and build",
    status: "Coming soon",
    oneLiner:
      "A block-style planner where students build their own dashboard — and can see when one part of life is quietly getting dropped.",
    did: [],
    stack: ["Product design", "Figma", "React"],
    year: "2026",
    slot: "ms-work-productivity",
    tint: "peach",
    soon: true,
  },
];

export interface OtherItem {
  slug: string;
  title: string;
  kind: string;
  tag?: string;
  status: string;
  year: string;
  oneLiner: string;
  stack: string[];
  slot: string;
}

export const OTHER: OtherItem[] = [
  {
    slug: "aria",
    title: "ARIA",
    kind: "Capstone project management",
    tag: "withvidya.ai",
    status: "Shipped",
    year: "2026",
    oneLiner:
      "Project manager for a three-person capstone team — sprint planning, task delegation, and deliverable timelines, plus communication with an early-stage startup sponsor and faculty advisor as scope and availability shifted.",
    stack: ["Project management", "Stakeholder comms", "Agile"],
    slot: "ms-other-aria",
  },
  {
    slug: "ats",
    title: "Applicant Tracking System",
    kind: "Capstone project",
    tag: "Team of five",
    status: "Shipped",
    year: "2026",
    oneLiner:
      "Built backend APIs and responsive front-end components for a full-stack ATS, with a pass over application workflows to improve process efficiency, system organization, and overall user experience.",
    stack: ["React", "Django", "REST APIs", "SQL"],
    slot: "ms-other-ats",
  },
];

export interface CaseSection {
  h: string;
  p: string[];
}

export interface CaseMockup {
  lead: string;
  shots: { label: string; note: string; slot: string; img?: string }[];
}

export interface CaseStudy {
  role: string;
  timeline: string;
  team: string;
  sections: CaseSection[];
  mockups?: CaseMockup;
  takeaways: string[];
}

export const CASES: Record<string, CaseStudy> = {
  "girls-academy": {
    role: "Application Development Intern",
    timeline: "6 weeks · Jun 2026 — Present",
    team: "Solo build",
    sections: [
      {
        h: "Problem",
        p: [
          "IGA's pitch competition was run manually: decks by email, paper score sheets, hand-calculated averages, no prize tracking. IGA needed one secure app for three users — students, judges, and admins — built fast, with no custom code.",
        ],
      },
      {
        h: "Solution",
        p: [
          "I built the portal in Softr, with Google Sheets as the database. Softr's free tier gave judges password-free magic-link login. Since Sheets can't link tables natively, I used a four-table schema (Users, Submissions, Scores, Prizes) connected by ID matching.",
          "I mapped all 9 app screens into a build plan before coding started. The schema is finalized and the build is in progress. Still open: confirming with my supervisor whether our Softr tier supports the permissions needed to separate the three user roles.",
        ],
      },
    ],
    mockups: {
      lead: "Simplified views of the three portals:",
      shots: [
        { label: "Student portal", note: "Submit a deck, track status", slot: "iga-student", img: "/assets/girls-academy-student.png" },
        { label: "Judge portal", note: "Score submissions, magic-link entry", slot: "iga-judge", img: "/assets/girls-academy-judge.png" },
        { label: "Admin portal", note: "Averages, prize tracking", slot: "iga-admin", img: "/assets/girls-academy-leaderboard.png" },
      ],
    },
    takeaways: [
      "Worked around Sheets' lack of relational linking with an ID-matching pattern.",
      "Free-tier features (like magic links) can outweigh paid \"nicer\" options.",
      "Solo, six-week timeline meant locking the schema and wireframes early.",
    ],
  },
  "productivity-app": {
    role: "Product design & build",
    timeline: "2026 · In design",
    team: "Solo",
    sections: [
      {
        h: "Problem",
        p: [
          "Students juggle goals across many parts of life (academics, health, relationships, career) but tools like calendars and to-do lists only track tasks, not balance. Non-academic goals quietly get dropped when things get busy, and there's no easy way to see it happening or fix it.",
        ],
      },
      {
        h: "Solution",
        p: [
          "A block-style app where students assemble their own dashboard from modular blocks: aspect blocks (academics, health, career, etc.), a goal block, a schedule block, and a balance block. Onboarding sets up the fixed schedule and weekly time targets per aspect. A weekly survey captures upcoming deadlines and urgency, which shapes how time gets allocated that week. Users add, remove, and arrange only the blocks relevant to them, so the dashboard stays minimal instead of showing a fixed set of screens everyone doesn't need.",
        ],
      },
    ],
    mockups: {
      lead: "Screens go up as the build progresses:",
      shots: [
        { label: "Onboarding", note: "Schedule and weekly targets", slot: "blk-onboarding" },
        { label: "Dashboard", note: "Blocks the student chose", slot: "blk-dashboard" },
        { label: "Balance", note: "Where the week actually went", slot: "blk-balance" },
      ],
    },
    takeaways: [],
  },
};

export const EXPERIENCE = [
  {
    role: "Application Development Intern",
    company: "The International Girls Academy",
    period: "Jun 2026 — Present",
    place: "Hybrid · Newark, NJ",
  },
  {
    role: "Website Development Intern",
    company: "Innocuous AI",
    period: "Feb 2025 — May 2026",
    place: "Remote",
  },
  {
    role: "Junior Videographer / Social Media",
    company: "Twilight Media",
    period: "Jun 2023 — Aug 2024",
    place: "New Milford, NJ",
  },
];

export const LIFE = [
  { src: "/assets/life/travel-night.png", alt: "A-frame cabin lit up at night in the mountains", cap: "my fav place back home" },
  { src: "/assets/life/mariya-park.png", alt: "Portrait at the park", cap: "a face to the name", bubble: true },
  { src: "/assets/life/p01.jpg", alt: "Fish in clear green water", cap: "trip to DR" },
];

export const ABOUT = [
  "I love creating, and design is how I get to explore where art and utility meet. My favorite part of the process is the collaboration — the conversations and shared problem-solving that shape a product into something thoughtful and useful :)",
  "When I'm not building applications, you'll probably find me painting, heading into the city, or traveling somewhere new. Right now I'm looking for opportunities where I can keep learning and build products people actually enjoy using!",
];

export const TOOLBOX = [
  "HTML", "CSS", "JavaScript", "React", "Django", "Python",
  "Figma", "Tailwind", "Framer Motion", "Git", "UI/UX", "Accessibility",
];

export const RAIL_ITEMS = [
  { img: "/assets/logo-innocuous.jpeg", name: "Innocuous AI", sub: "Website development intern" },
  { img: "/assets/logo-njit.jpg", name: "NJIT", sub: "Computer science" },
  { img: "/assets/logo-academy.png", name: "The International Girls Academy", sub: "Application development intern" },
  { img: "/assets/nyc-central-park.jpg", name: "New York City", sub: "Where I live and work" },
];

export const AURA_BY_SLUG: Record<string, string> = {
  "innocuous-ai": "is-teal",
  "girls-academy": "is-pink",
  "productivity-app": "is-sunset",
  aria: "is-violet",
  ats: "is-pink",
};
