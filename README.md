# Mariya Shijo — Portfolio

Static single-page site. No build step.

## Deploy to Vercel

1. Drag this `site/` folder into the Vercel dashboard, or run `vercel` from inside it.
2. Pick **Other** as the framework when prompted.
3. Leave Build Command empty and Output Directory empty (or set Output Directory to `.`).
4. Deploy.

That's it — Vercel serves `index.html` from the root and the JSX files are loaded by Babel at runtime.

## Files

- `index.html` — entry point, loads React + Babel from CDN
- `tokens.jsx` — shared data (projects, work history, font pairs, accent colors)
- `direction-2-kinetic.jsx` — main page component (hero, projects, experience, footer)
- `direction-2-detail.jsx` — project detail view
- `assets/` — resume PDF, project screenshots
