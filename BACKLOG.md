# Backlog

Future work for vt-portfolio, roughly prioritized. Nothing here is scheduled — pick items up as time/interest allows.

## High priority

### Deploy pipeline

Hosting decided: **Netlify**. `netlify.toml` at repo root sets build command (`npm run build`) and publish dir (`out`) — connect the repo in Netlify's UI and it should build with no manual config. Remaining: set up a custom domain if Victor wants one, and decide whether PR/branch deploy previews are wanted (Netlify does this by default once the repo is connected).

## Medium priority

- **Per-locale `<html lang>` in the served HTML** — `app/layout.tsx` is shared by both locales, so `/pt` ships `lang="en"` and `LocaleProvider` fixes it on hydration. Making `app/[locale]/layout.tsx` the root layout would fix it at build time, but then `/` has no page: the export would emit no `index.html` and `next dev` would 404 at the root. Revisit if a host-level redirect from `/` becomes acceptable.
- **`next/og` at build time instead of committed PNGs** — see the Done entry below; the workaround exists because `@vercel/og` can't resolve its own assets on Windows.

## Done

- ~~URL per language~~ — shipped 2026-09-07. `/en` and `/pt` are prerendered from `app/[locale]/page.tsx`; `/` is a noindex stub that detects a language and redirects (`components/LocaleRedirect.tsx`). `LocaleProvider` takes its locale from the route segment and its `setLocale` navigates, so the address bar and the content can't disagree.
- ~~OG image + SEO~~ — shipped 2026-09-07. Per-locale social cards (`public/og-en.png`, `public/og-pt.png`, regenerate with `npm run og`), a schema.org `Person` JSON-LD block on both pages, canonical + hreflang alternates, `app/sitemap.ts` and `app/robots.ts`. Absolute URLs come from `NEXT_PUBLIC_SITE_URL` via `lib/site.ts`. The cards are committed PNGs rather than a Next `opengraph-image` route because the bundled `@vercel/og` resolves its font and wasm assets with `path.join(import.meta.url, ...)`, which is an invalid file URL on Windows and fails the export; `scripts/render-og.mjs` patches a copy of that bundle and renders the same design.
- ~~Open to opportunities badge~~ — reverted 2026-09-07, same day it shipped. Victor doesn't want the site advertising availability, so the hero pill, the `hero.availability` strings and the matching line on the social cards are gone (the cards now lead with "5+ years building data pipelines" instead).
- ~~Copy-email button~~ — shipped 2026-09-07. `components/Contact.tsx`, with a 2-second "copied" confirmation and a silent no-op if the clipboard API is unavailable.
- ~~Lightweight analytics~~ — shipped 2026-09-07. `components/Analytics.tsx` injects a single script only when `NEXT_PUBLIC_ANALYTICS_SRC` is set, and passes both Umami's `data-website-id` and Plausible's `data-domain` so either provider works. Provider still to be chosen; nothing loads until then.
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
