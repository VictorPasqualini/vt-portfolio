# Backlog

Future work for vt-portfolio, roughly prioritized. Nothing here is scheduled — pick items up as time/interest allows.

## High priority

### Deploy pipeline

Hosting decided: **Netlify**. `netlify.toml` at repo root sets build command (`npm run build`) and publish dir (`out`) — connect the repo in Netlify's UI and it should build with no manual config. Remaining: set up a custom domain if Victor wants one, and decide whether PR/branch deploy previews are wanted (Netlify does this by default once the repo is connected).

## Medium priority

- **OG image / social preview card** — `app/layout.tsx` metadata has no `openGraph`/`twitter` image yet.

## Done

- ~~Skill icons~~ — shipped 2026-09-07. Icons are vendored in `public/icons/` (Simple Icons for OSS brands, the official AWS Architecture and GCP product icon sets via `icon.icepanel.io`, Devicon for Oracle/Cobol) and resolved by keyword in `lib/skill-icons.ts`. AWS has pulled its logos from Simple Icons, which is why the cloud icons come from a different source. A handful of monochrome brand marks were re-colored into a mid-luminance band so they stay readable on both the cream and coffee backgrounds. Skills with no logo anywhere (SQL, DB2, Delta Lake, Power BI, Terragrunt, Ctrl-M, CI/CD, CDC, Medallion) still use the hand-drawn glyphs in `lib/icons.tsx`.
- ~~Hero letter-curtain effect~~ — shipped 2026-09-07. `components/LetterCurtain.tsx` + `.curtain*` rules in `app/globals.css`. Grid of monospace characters behind the hero text, built imperatively on mount (no SSR markup, so it can't block LCP). Columns sway via a CSS keyframe animation (compositor-only, one animation per column); JS runs a spring simulation only for letters within the pointer's reach, so an idle page costs nothing per frame. The pointer drags the fabric: letters are thrown against the direction of travel (moving right pushes them left), weighted so the bottom of the curtain swings more than the top, then return on a slow, lightly damped spring with per-letter jitter. Respects `prefers-reduced-motion` (static grid, no listeners, no rAF) and degrades to the same static grid on touch devices.
- ~~Project thumbnails~~ — reverted 2026-09-07. The GitHub OG-image banners made the cards too tall and pushed the description into a 2-line clamp; cards now show the full description instead. The banners came from GitHub's OG endpoint (`https://opengraph.githubassets.com/1/VictorPasqualini/<repo>`), derived from the repo URL — nothing to restore in `content/projects.ts` if this is ever revisited.
- ~~Dark mode~~ — shipped 2026-09-07. `lib/theme-context.tsx` (`ThemeProvider`/`useTheme`), CSS variables in `app/globals.css`, `dark` class default in `app/layout.tsx`. Dark is the default regardless of OS preference; toggle in `Nav.tsx` persists to `localStorage` (`vt-portfolio-theme`).
- ~~Auto-detect browser locale~~ — shipped 2026-09-07. `lib/i18n-context.tsx` reads `navigator.languages` on first load (no stored preference yet) and picks `pt` if any tag starts with `pt`, else `en`. A stored `localStorage` choice always wins over detection.
- ~~Favicon~~ — shipped 2026-09-07. `app/icon.svg` (VP monogram), picked up automatically by Next's file-convention metadata.

## Won't do (for now)

- **Writing/blog section** — decided 2026-09-07: skip until Victor actually starts writing; revisit then instead of building it speculatively.

## Low priority

- Contact form or booking link (Calendly-style) instead of just `mailto:`.
- Automate `content/projects.ts` refresh (language/topics/stars) via a small script hitting the GitHub API, instead of manual `curl` updates (see `docs/CONTENT_GUIDE.md`).
