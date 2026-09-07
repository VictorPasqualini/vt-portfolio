# Architecture

## Overview

Single-page Next.js (App Router) site, statically exported. No backend, no database, no CMS — all content is checked into the repo as TypeScript objects.

```
app/layout.tsx     wraps everything in <ThemeProvider><LocaleProvider>, sets font + metadata,
                   renders <html className="dark"> so the default theme never flashes light
app/page.tsx       composes the sections in order: Nav, Hero, Experience, Projects, Skills, Education, Contact, Footer
```

## Theme (dark/light)

`lib/theme-context.tsx` exposes a `ThemeProvider` and `useTheme()` hook:

- `theme: 'light' | 'dark'`, **defaults to `'dark'`** regardless of the OS/browser `prefers-color-scheme` — this is an explicit product decision, not an accident of following the system.
- On mount, checks `localStorage` (`vt-portfolio-theme`) for a stored choice and applies it if present; otherwise stays on the default.
- `setTheme`/`toggleTheme` update state, persist to `localStorage`, and toggle the `dark` class on `document.documentElement`.
- Colors are CSS variables (`--bg`, `--fg`, `--line`, `--soft`, `--accent`, RGB triplets) defined in `app/globals.css` under `:root` (light values) and `.dark` (dark values, which match the default). Tailwind exposes them as the `bg`/`fg`/`line`/`soft`/`accent` colors (`tailwind.config.ts`, `darkMode: 'class'`) so components use e.g. `bg-fg`, `text-fg/70`, `border-line/10` and get both themes for free — no `dark:` variant classes needed anywhere.
- `app/layout.tsx` server-renders `<html className="dark">` so static/SSR output already matches the default theme; `ThemeProvider` only needs to *change* the class when a visitor has stored `'light'`, not add it on first paint — avoiding a flash of the wrong theme.

## i18n

`lib/i18n-context.tsx` exposes a `LocaleProvider` and `useLocale()` hook:

- `locale: 'en' | 'pt'`. On mount: if `localStorage` (`vt-portfolio-locale`) has a stored choice, use it; otherwise auto-detect from `navigator.languages` — any tag starting with `pt` selects `pt`, everything else falls back to `en`. A stored choice always overrides detection.
- `setLocale(locale)` updates state and persists the choice to `localStorage` so it survives reloads and future auto-detection.
- `t: SiteContent` — the full resolved dictionary for the active locale (`content/en.ts` or `content/pt.ts`).

Every section component is a client component (`'use client'`) that calls `useLocale()` and reads its copy from `t`. There is no per-key translation function (`t('foo.bar')`) — instead each locale file is a fully-typed `SiteContent` object (see `lib/types.ts`), so a missing translation is a TypeScript compile error, not a silent runtime fallback.

Project descriptions are the one exception: `content/projects.ts` keeps `description: { en, pt }` inline per project, since project data (language, topics, stars) is locale-independent and only the description needs both languages.

## Content flow

```
content/en.ts, content/pt.ts   -> SiteContent (resume-derived copy)
content/projects.ts            -> ProjectData[] (GitHub-derived copy, locale-independent fields + bilingual description)
components/*                   -> pure presentation, no data fetching, no hardcoded copy
```

Nothing is fetched at runtime or at build time from the GitHub API — repo metadata (language, topics, stars, homepage) was captured manually into `content/projects.ts` and should be refreshed by hand when it goes stale (see CONTENT_GUIDE.md).

## Styling

Tailwind CSS utility classes only, no component library. Palette is theme-aware via CSS variables (see Theme section above): dark by default (near-black `#0a0a0a` background, near-white `#f5f5f5` text), with a light theme (`#fff`/`#111`) available via the toggle. A single blue accent (lighter in dark mode for contrast) is reserved for links. Layout is constrained to a `max-w-content` (760px) column, mirroring the reference site's single-column, generous-whitespace look.

## Static export

`next.config.js` sets `output: 'export'` and `images.unoptimized: true` so `npm run build` produces a fully static `out/` directory with no Node server required — deployable to GitHub Pages, Vercel, Netlify, S3, etc. No deploy workflow is configured yet (hosting target undecided — see BACKLOG.md).
