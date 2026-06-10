// Shared tweaks state — accent color, font pairing, card layout.
// All three directions read from this so the user can A/B across them.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#E5739A",
  "fontPair": "editorial"
}/*EDITMODE-END*/;

const ACCENT_OPTIONS = [
  "#E5739A", // soft rose
  "#D96C4F", // warm coral
  "#B07AC9", // dusty lilac
  "#7FA88F", // sage green
];

const FONT_PAIRS = {
  modern: {
    label: "Modern (Bricolage + Geist Mono)",
    display: '"Bricolage Grotesque", system-ui, sans-serif',
    body: '"Geist", system-ui, sans-serif',
    mono: '"Geist Mono", ui-monospace, monospace',
    displayWeight: 700,
    displayTracking: '-0.04em',
  },
  editorial: {
    label: "Editorial (Instrument Serif + IBM Plex)",
    display: '"Instrument Serif", "Times New Roman", serif',
    body: '"IBM Plex Sans", system-ui, sans-serif',
    mono: '"IBM Plex Mono", ui-monospace, monospace',
    displayWeight: 400,
    displayTracking: '-0.02em',
  },
  romance: {
    label: "Romance (Italiana + Bricolage)",
    display: '"Italiana", "Times New Roman", serif',
    body: '"Bricolage Grotesque", system-ui, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, monospace',
    displayWeight: 400,
    displayTracking: '-0.01em',
  },
};

const CARD_LAYOUTS = ["asymmetric", "grid", "list"];

// Work history — pulled from Mariya's April 2026 resume.
const WORK_HISTORY = [
  {
    role: "Application Development Intern",
    company: "The International Girls Academy",
    period: "Jun 2026 — Present",
    location: "Hybrid · Newark, NJ",
    summary: "Building and shipping application features for the academy's web platform — turning needs into clean, responsive front-end interfaces.",
  },
  {
    role: "Website Development Intern",
    company: "Innocuous AI",
    period: "Feb 2025 — May 2026",
    location: "Remote",
    summary: "Contributed to the front-end of the Innocuous AI platform with HTML, CSS, JavaScript, and Django — building responsive, accessible interfaces and refining layouts, navigation, and branding elements for a consistent UI/UX.",
  },
  {
    role: "Junior Videographer / Social Media",
    company: "Twilight Media",
    period: "Jun 2023 — Aug 2024",
    location: "New Milford, NJ",
    summary: "Covered live conventions on location with photo and video, ran live-monitoring and on-the-fly editing to keep broadcasts seamless, and managed social posts around each event.",
  },
];

window.WORK_HISTORY = WORK_HISTORY;

// Shared project data — same across all 3 directions for fair comparison.
const PROJECTS = [
  {
    n: "01",
    slug: "skillsync",
    title: "SkillSync",
    subtitle: "A credit-based platform where you trade skills, not money",
    tag: "Product",
    year: "2026",
    context: "Founding project · in progress",
    badges: ["2026", "Hi-fi flows", "Solo product lead"],
    blurb: "A credit-based platform where people trade the skills they have for the skills they need — tutoring, design help, fitness training, web work — without money in the loop.",
    about: "SkillSync solves a simple problem: people need services they can't always afford, but everyone has something to offer in return. The platform matches members by what they can give and what they want to learn, handles the trade through a credit system, and keeps sessions safe and easy to schedule. The end-to-end flow is designed across 12 hi-fi screens — onboarding, search & browse, skill detail, reviews, chat, booking, profile, and listing — plus three explored directions for the home screen.",
    features: [
      "Credit-based bartering — earn credits by teaching, spend them on what you need",
      "Skill profiles with verifiable endorsements from past trades",
      "Smart matching between complementary skill offers and needs",
      "In-app scheduling, session notes, and safety guardrails",
      "Reputation system to keep the marketplace trustworthy",
    ],
    stack: ["Figma", "User research", "React (planned)", "Supabase (planned)"],
    meta: [
      { label: "Founding product" },
      { label: "Hi-fi UI" },
      { label: "Pre-launch" },
    ],
    links: [
      { label: "Case study", href: "#" },
    ],
    shotsLayout: "phone",
    liveDemo: "skillsync-prototype.html",
    shotGroups: [
      {
        title: "Core flow",
        shots: [
          { src: window.__resources?.ss01 || "assets/skillsync/01-splash.png",          label: "Splash" },
          { src: window.__resources?.ss02 || "assets/skillsync/02-create-account.png",  label: "Create account" },
          { src: window.__resources?.ss03 || "assets/skillsync/03-login.png",           label: "Log in" },
          { src: window.__resources?.ss04 || "assets/skillsync/04-pick-skills.png",      label: "Pick your skills" },
          { src: window.__resources?.ss05 || "assets/skillsync/05-search-browse.png",   label: "Search & browse" },
          { src: window.__resources?.ss06 || "assets/skillsync/06-skill-detail.png",    label: "Skill detail" },
          { src: window.__resources?.ss07 || "assets/skillsync/07-reviews.png",         label: "Reviews" },
          { src: window.__resources?.ss08 || "assets/skillsync/08-notifications.png",   label: "Notifications" },
          { src: window.__resources?.ss09 || "assets/skillsync/09-chat.png",            label: "Chat" },
          { src: window.__resources?.ss10 || "assets/skillsync/10-booking.png",         label: "Book a session" },
          { src: window.__resources?.ss11 || "assets/skillsync/11-profile.png",         label: "Profile" },
          { src: window.__resources?.ss12 || "assets/skillsync/12-list-a-skill.png",    label: "List a skill" },
        ],
      },
      {
        title: "Home screen — three directions explored",
        shots: [
          { src: window.__resources?.ssHomeA || "assets/skillsync/home-a-social-feed.png",   label: "Social feed" },
          { src: window.__resources?.ssHomeB || "assets/skillsync/home-b-match-deck.png",    label: "Match deck" },
          { src: window.__resources?.ssHomeC || "assets/skillsync/home-c-browse-first.png",  label: "Browse-first" },
        ],
      },
    ],
    tags: ["Product", "UX", "Marketplace"],
    hue: 200,
  },
  {
    n: "02",
    slug: "ats-for-candidates",
    title: "ATS for Candidates",
    subtitle: "Full-stack job application tracking web app",
    tag: "Engineering",
    year: "2026",
    context: "CS490 Software Engineering · NJIT",
    badges: ["Spring 2026", "Team of 5", "3 Sprints"],
    blurb: "A web app that helps candidates manage their entire job search pipeline — from saving a listing to tracking interviews, generating AI-tailored documents, and monitoring application status.",
    about: "A web app that helps candidates manage their entire job search pipeline — from saving a listing to tracking interviews, generating AI-tailored documents, and monitoring application status.",
    features: [
      "Job board with filtering, sorting, and pipeline stages",
      "AI-powered resume & cover letter generation via Gemini",
      "Profile management with completion tracking",
      "Document library with version history",
      "Per-user data isolation and auth via Supabase",
    ],
    stack: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "Gemini AI", "Jest", "GitHub Actions", "Vercel"],
    meta: [
      { label: "The Infinite Loops" },
      { label: "261 commits" },
      { label: "Live on Vercel" },
    ],
    links: [
      { label: "GitHub", href: "https://github.com/digislav/The-Infinite-Loops" },
    ],
    screenshots: [window.__resources?.atsDashboard || "/assets/ats-dashboard.png"],
    tags: ["Next.js", "TypeScript", "Supabase"],
    hue: 20,
  },
  {
    n: "03",
    slug: "personal-portfolio",
    title: "Personal Portfolio",
    subtitle: "A responsive site that shows my work through motion and considered UI",
    tag: "Design",
    year: "2024",
    context: "Solo build · 07/2024",
    badges: ["2024", "Solo build", "Live"],
    blurb: "A responsive portfolio that showcases my projects through dynamic animations and considered UX/UI — built with React, Tailwind CSS, and Framer Motion for seamless interactivity.",
    about: "Designed and coded from scratch as my home base on the web. Each project gets its own scroll-driven case study; motion is used to direct the eye, never decorate. Built with React, Tailwind, and Framer Motion.",
    features: [
      "Responsive layout that holds up from 320px to ultrawide",
      "Scroll- and viewport-triggered motion via Framer Motion",
      "Per-project case-study pages with image lightboxes",
      "Accessible navigation and reduced-motion fallbacks",
    ],
    stack: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    meta: [
      { label: "Solo" },
      { label: "Live" },
      { label: "Open source" },
    ],
    links: [
      { label: "Live site", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    tags: ["React", "Tailwind", "Framer"],
    hue: 280,
  },
];

window.TWEAK_DEFAULTS = TWEAK_DEFAULTS;
window.ACCENT_OPTIONS = ACCENT_OPTIONS;
window.FONT_PAIRS = FONT_PAIRS;
window.CARD_LAYOUTS = CARD_LAYOUTS;
window.PROJECTS = PROJECTS;
window.WORK_HISTORY = WORK_HISTORY;
