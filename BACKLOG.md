# Backlog

Future work for vt-portfolio, roughly prioritized. Nothing here is scheduled — pick items up as time/interest allows.

## High priority

### Hero letter-curtain effect (explicitly requested — deferred, not built yet)

Victor wants the hero section (top of the page, first thing visitors see) to open with a **curtain made of letters** — a wall/curtain of characters hanging across the hero — that **moves/reacts when the mouse passes over it**, like a physical curtain being brushed aside.

Not implemented in the current version — needs its own design + prototyping pass before going into the main hero, since it changes the "restrained, minimalist" look of the rest of the site and needs to stay readable/accessible (name + role text must remain legible, effect must degrade gracefully on mobile where there's no hover).

Implementation notes for whoever picks this up:
- Likely a `<canvas>` or absolutely-positioned `<span>` grid of characters covering the hero, with a `mousemove` listener computing per-letter displacement (e.g. distance-based push/parallax, or a wave that ripples outward from the cursor).
- Options: hand-rolled physics (simple spring/lerp per letter back to rest position), or a small library (e.g. a text-scramble/particle-text library) — evaluate bundle size cost before adding a dependency.
- Must respect `prefers-reduced-motion` (skip/tone down the animation).
- No mouse on touch devices — needs a fallback (static curtain, or a subtle scroll-triggered version).
- Should not block LCP — the real hero text should render immediately; the curtain is decorative and can hydrate/animate in after.

### Deploy pipeline

Hosting decided: **Netlify**. `netlify.toml` at repo root sets build command (`npm run build`) and publish dir (`out`) — connect the repo in Netlify's UI and it should build with no manual config. Remaining: set up a custom domain if Victor wants one, and decide whether PR/branch deploy previews are wanted (Netlify does this by default once the repo is connected).

## Medium priority

- **Writing/blog section** — the reference site (joachimhodana.com) has a "Writing" section linking Medium articles. Add if/when Victor starts publishing.
- **OG image / social preview card** — `app/layout.tsx` metadata has no `openGraph`/`twitter` image yet.

## Done

- ~~Dark mode~~ — shipped 2026-09-07. `lib/theme-context.tsx` (`ThemeProvider`/`useTheme`), CSS variables in `app/globals.css`, `dark` class default in `app/layout.tsx`. Dark is the default regardless of OS preference; toggle in `Nav.tsx` persists to `localStorage` (`vt-portfolio-theme`).
- ~~Auto-detect browser locale~~ — shipped 2026-09-07. `lib/i18n-context.tsx` reads `navigator.languages` on first load (no stored preference yet) and picks `pt` if any tag starts with `pt`, else `en`. A stored `localStorage` choice always wins over detection.

## Low priority

- Contact form or booking link (Calendly-style) instead of just `mailto:`.
- Automate `content/projects.ts` refresh (language/topics/stars) via a small script hitting the GitHub API, instead of manual `curl` updates (see `docs/CONTENT_GUIDE.md`).
- Add a favicon (currently using Next.js defaults).
- Project screenshots/thumbnails on project cards (reference site shows thumbnails).
