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
  coverPosition?: string;
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
    title: "Ujima Pitch Portal",
    kind: "Application development",
    tag: "Non-profit",
    period: "Jun 2026 — Present",
    place: "Hybrid · Newark, NJ",
    status: "In progress",
    oneLiner:
      "Building a no-code portal so IGA can run its student pitch competition, and manage it themselves, long after the internship ends.",
    did: [
      "Designed and built a three-role portal (students, judges, admins) in Softr with no custom code",
      "Replaced a fully manual pitch day process with one app covering submissions, scoring, and prize tracking",
      "Filtered every decision through whether non-technical IGA staff could maintain it independently",
    ],
    stack: ["Softr", "No-code", "Product design"],
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
    cover: "/assets/blocked-cover.png",
    coverPosition: "left center",
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

export interface CasePoint {
  h: string;
  p: string;
}

export type CaseText = string | { b: string; t: string };

export interface CaseSection {
  h: string;
  p: CaseText[];
  research?: boolean;
  table?: { cols: string[]; rows: string[][] };
  callout?: string;
  points?: CasePoint[];
}

export interface CaseMockup {
  lead: string;
  shots: { label: string; note: string; slot: string; img?: string }[];
}

export type MatrixState = 'y' | 'p' | 'n' | 'o';
export type MatrixCell = MatrixState | [MatrixState, string];

export interface CaseResearch {
  map: {
    sub: string;
    alt: string;
    points: { n: string; x: number; y: number; c: string; end?: boolean }[];
    legend: [string, string, boolean?][];
  };
  prices: {
    sub: string;
    rows: { n: string; w: number; free?: boolean; p: string; note: string }[];
  };
  overview: { sub: string; cols: string[]; rows: string[][] };
  matrix: {
    sub: string;
    cols: string[];
    rows: [string, ...MatrixCell[]][];
    legend: [MatrixState, string][];
  };
  limits: string;
  sources: [string, string][];
}

export interface CaseStudy {
  role: string;
  timeline: string;
  team: string;
  sections: CaseSection[];
  mockups?: CaseMockup;
  research?: CaseResearch;
  takeaways: string[];
}

// Data behind the Blocked competitor-research visuals.
// Matrix cells: "y" yes · "p" partial · "n" no · "o" open — or [state, label] to override the label.
export const BLOCKED_RESEARCH: CaseResearch = {
  map: {
    sub: "Placement is my judgment from each product's features, not measured data. Blocked is aiming for the empty top-right corner.",
    points: [
      { n: "Sunsama", x: 268, y: 365, c: "blue" },
      { n: "Motion", x: 169, y: 417, c: "blue" },
      { n: "Todoist", x: 400, y: 331, c: "blue" },
      { n: "Finch", x: 189, y: 125, c: "teal" },
      { n: "Habitica", x: 347, y: 168, c: "teal" },
      { n: "Notion", x: 677, y: 224, c: "amber", end: true },
    ],
    legend: [["blue", "Planners and task managers"], ["teal", "Habit and self-care apps"], ["amber", "Flexible workspace"], ["violet", "Blocked (target)", true]],
    alt: "Positioning map. Horizontal axis runs from fixed structure to fully customizable. Vertical axis runs from work and tasks to whole life. Motion, Sunsama and Todoist sit low on the left and middle. Finch and Habitica sit higher on the left. Notion sits far right at mid height. Blocked is planned for the top right.",
  },
  prices: {
    sub: "Cheapest individual paid plan, on monthly billing. Finch is left out because its Plus pricing varies widely by region and billing period.",
    rows: [
      { n: "Habitica", w: 10, free: true, p: "$4.99", note: "a month, optional. $47.99 a year. Free plan has the full game." },
      { n: "Todoist", w: 14, free: true, p: "$7", note: "a month for Pro, or $5 billed yearly. Free plan capped at 5 projects." },
      { n: "Notion", w: 24, free: true, p: "$12", note: "a month for Plus. Free for students with a school email." },
      { n: "Sunsama", w: 50, p: "$25", note: "a month, or $20 billed yearly. 14-day trial, no free plan." },
      { n: "Motion", w: 98, p: "$49", note: "a month, or $29 billed yearly, plus charges for heavy AI-credit use. 7-day trial needs a card." },
    ],
  },
  overview: {
    sub: "What each tool is for, what it costs, and where it falls short for a student who wants balance.",
    cols: ["Tool", "Built for", "Free option", "AI", "Where it falls short"],
    rows: [
      ["Notion", "Flexible workspace for notes, databases, and wikis", "Yes. Free Plus plan for students with a school email", "Notion AI, limited trial on the free plan", "Blank canvas. Life tracking comes from templates people buy, and setup takes real effort."],
      ["Sunsama", "Guided daily planning for busy professionals", "No. 14-day trial", "Yes, on the single individual plan", "Focused on work and calendars. Priced well above a student budget. No life-area tracking."],
      ["Motion", "AI that auto-schedules tasks and projects around meetings", "No. 7-day trial with a card", "Core feature, metered by credits", "Built for work and teams. Cost can climb with heavy AI use."],
      ["Todoist", "Fast, simple task lists", "Yes. 5 personal projects", "Yes, on Pro", "Tasks, not life areas. The 5-project cap is reached quickly once you split school, health, and social goals."],
      ["Finch", "Self-care habits with a virtual pet bird", "Yes. Plus adds customization and deeper tracking", "Not found", "Wellness only. No academics, career, or time scheduling."],
      ["Habitica", "Habits and to-dos as a role-playing game", "Yes. Optional subscription", "No", "The game style won't suit everyone. No time allocation or balance view."],
    ],
  },
  matrix: {
    sub: "Blocked's column is my current plan. \u201cOpen\u201d marks things I haven't decided yet.",
    cols: ["Notion", "Sunsama", "Motion", "Todoist", "Finch", "Habitica", "Blocked"],
    rows: [
      ["Tracks life areas beyond tasks", "p", "n", "n", "p", "p", "p", "y"],
      ["Customizable blocks and layout", "y", "n", "n", "p", "p", "p", "y"],
      ["Schedules your time", "p", "y", "y", "p", "n", "n", ["p", "Manual in v1"]],
      ["AI features", "y", "y", "y", "y", "n", "n", ["o", "Later"]],
      ["Games and rewards", "n", "n", "n", "n", "y", "y", ["o", "Open"]],
      ["Reflection or check-ins", "p", "y", "n", "n", "y", "n", ["y", "Weekly survey"]],
      ["Free for students", "y", "n", "n", ["p", "Limited"], "y", "y", ["o", "Open"]],
      ["Built for students", "p", "n", "n", "n", "n", "n", "y"],
    ],
    legend: [["y", "Yes"], ["p", "Partial or limited"], ["n", "No or not found"], ["o", "Not built yet or undecided"]],
  },
  limits: "Some pricing comes from Morgen's blog, and Morgen sells a rival planner, so confirm numbers on the official pages before quoting them. Feature cells combine these pages with general product knowledge. I didn't mine app-store reviews, so the complaint evidence is thin: one grad-student post about Notion being too complex, and the existence of the template market. Five short chats with students would firm it up.",
  sources: [
    ["Sunsama pricing, Morgen", "https://www.morgen.so/blog-posts/sunsama-pricing"],
    ["Motion pricing, Morgen", "https://morgen.so/blog-posts/motion-pricing"],
    ["Todoist pricing, Hack'celeration", "https://hackceleration.com/labs/todoist-pricing"],
    ["Notion free plan, CostBench", "https://www.costbench.com/software/project-management/notion/free-plan/"],
    ["Notion for Education deal, Subger", "https://subger.com/en/deal/notion"],
    ["Finch App Store data, App Pricing Lab", "https://apppricinglab.com/app/apple/1528595748"],
    ["Finch overview, Internet Matters", "https://www.internetmatters.org/advice/apps-and-platforms/wellbeing/finch/"],
    ["Habitica, App Store listing", "https://apps.apple.com/tr/app/id994882113"],
    ["Student Life OS Notion template, Gumroad", "https://organizeddashboard.gumroad.com/l/qkyzwu"],
    ["Grad student on Notion being too complex, Lemon8", "https://www.lemon8-app.com/@ryanne_erin/7434627037299638839?region=us"],
  ],
};

export const CASES: Record<string, CaseStudy> = {
  "girls-academy": {
    role: "Intern, No-Code App Developer",
    timeline: "6 weeks · Jun 2026 — Present",
    team: "Solo build",
    sections: [
      {
        h: "Overview",
        p: [
          "IGA's Ujima Business Program teaches students entrepreneurship, leadership, and community responsibility. Each cohort ends with students pitching business ideas to a live panel of judges for seed capital and prizes.",
          "Running that pitch day was entirely manual: decks came in over email, judges scored on paper, staff tallied averages by hand, and prizes had no tracking. My task was to design and build a single web app to run the whole event — for students, judges, and admins — using no-code tools, so IGA staff could keep running it themselves.",
        ],
      },
      {
        h: "The challenge",
        p: [],
        table: {
          cols: ["", "Students", "Judges", "Admins"],
          rows: [
            ["Access", "Submitting decks by email is easy to lose track of", "Need to score on their phone, live, with no password friction", "Need one place to see everything, not scattered emails"],
            ["Data", "No way to track submission or prize status", "Scores never end up in one clean place", "Averaging scores by hand under time pressure"],
            ["Sustainability", "", "", "Whatever gets built has to be maintainable by non-technical staff"],
          ],
        },
        callout: "How might we replace a manual, error-prone pitch day with one app — built so a nonprofit with no dev team can keep running it themselves?",
      },
      {
        h: "Key decisions",
        p: [],
        points: [
          {
            h: "Chose no-code on purpose, not as a shortcut",
            p: "As a nonprofit, IGA can't hire a developer to maintain a custom app. Building in Softr means their own staff can edit content, add cohorts, or tweak the rubric without touching code.",
          },
          {
            h: "Softr for the frontend and database",
            p: "Softr's built-in database holds all four tables (Users, Submissions, Scores, Prizes) and links them relationally, so I didn't need a separate backend tool. Its free tier includes magic link login, so judges can access their scoring panel from a phone with no password to remember — a hard requirement for a live event.",
          },
          {
            h: "Wireframe before build",
            p: "I mapped all 9 screens the app needed (Login, Student Home, Upload Deck, My Pitch/Prizes, Judge Queue, Scoring Rubric, Admin Leaderboard, Submissions, and Submission Detail) before building anything in Softr.",
          },
        ],
      },
      {
        h: "Status",
        p: [
          "Schema and wireframes are finalized; the build is in progress. Still open: confirming with my supervisor whether IGA's Softr tier supports the permission groups needed to properly separate the three user roles.",
        ],
      },
      {
        h: "Reflection",
        p: [
          "The hardest part wasn't picking tools — it was designing around a constraint most projects don't have: whoever inherits this app afterward won't be a developer. Every decision, from the platform choice to the schema shape, was filtered through whether IGA staff could maintain it in six months, not just whether it worked now.",
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
      "Chose no-code on purpose — Softr lets non-technical IGA staff maintain and extend the app after the internship ends.",
      "Free-tier features like magic links can outperform paid options when they solve a real constraint (no-friction judge access on a live event day).",
      "Designing for maintainability meant filtering every decision through whether staff could own it in six months, not just whether it worked now.",
    ],
  },
  "productivity-app": {
    role: "Product design & build",
    timeline: "2026 · In design",
    team: "Solo",
    research: BLOCKED_RESEARCH,
    sections: [
      {
        h: "Problem",
        p: [
          "Students juggle goals across many parts of life (academics, health, relationships, career) but tools like calendars and to-do lists only track tasks, not balance. Non-academic goals quietly get dropped when things get busy, and there's no easy way to see it happening or fix it.",
        ],
      },
      {
        h: "Competitor research",
        research: true,
        p: [
          "I compared six tools a student might use instead of Blocked: Notion, Sunsama, Motion, Todoist, Finch, and Habitica. Prices checked Sept 21, 2026.",
          { b: "The gap is setup, not features.", t: "Notion already does what Blocked plans, and students get its Plus plan free with a school email. Yet people sell ready-made student-life templates for roughly $2 to $27, so an opinionated, ready-to-use version is the opening." },
          { b: "The paid planners are built for work.", t: "Sunsama ($20–25/mo) and Motion ($29–49/mo) center on calendars and tasks, not health or relationships, and neither has a free plan." },
          { b: "Free is the price to beat.", t: "Notion for students, Todoist, Finch, and Habitica all have a free tier. Finch holds a 4.9-star rating across about 656K App Store reviews, so a gentle, motivating habit app clearly has an audience." },
        ],
      },
      {
        h: "How it shaped Blocked",
        p: [
          { b: "Sell Notion's flexibility without the setup.", t: "A handful of ready-made life-aspect blocks gets a new user set up in minutes." },
          { b: "Keep the core free.", t: "Every close rival has a free path for students. Any paid tier waits for later extras like AI." },
          { b: "Stay out of AI for now.", t: "The AI planners focus on work calendars. Allocating time across life areas is something none of the six do, so it's worth doing well later." },
          { b: "Borrow lightly from Finch and Habitica.", t: "Small rewards and check-ins keep people coming back, and the weekly survey fits the reflection habit Sunsama and Finch build around." },
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
        { label: "Dashboard", note: "Blocks the student chose", slot: "blk-dashboard", img: "/assets/blocked/01-dashboard-week-1.png" },
        { label: "Balance", note: "Where the week actually went", slot: "blk-balance", img: "/assets/blocked/02-balance.png" },
        { label: "Weekly check-in", note: "Sunday survey on how the week felt", slot: "blk-checkin", img: "/assets/blocked/03-weekly-check-in.png" },
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
