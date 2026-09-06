# Architecture

## Overview

Single-page Next.js (App Router) site, statically exported. No backend, no database, no CMS — all content is checked into the repo as TypeScript objects.

```
app/layout.tsx     wraps everything in <LocaleProvider>, sets font + metadata
app/page.tsx       composes the sections in order: Nav, Hero, Experience, Projects, Skills, Education, Contact, Footer
```

## i18n

`lib/i18n-context.tsx` exposes a `LocaleProvider` and `useLocale()` hook:

- `locale: 'en' | 'pt'`, defaults to `'en'` on first load (no browser-locale auto-detection — this is an explicit product decision, see BACKLOG.md if that should change).
- `setLocale(locale)` updates state and persists the choice to `localStorage` (`vt-portfolio-locale`) so it survives reloads.
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

Tailwind CSS utility classes only, no component library. Palette: white background, near-black text (`#111111`), a single blue accent (`accent: #2563eb`) reserved for links. Layout is constrained to a `max-w-content` (760px) column, mirroring the reference site's single-column, generous-whitespace look.

## Static export

`next.config.js` sets `output: 'export'` and `images.unoptimized: true` so `npm run build` produces a fully static `out/` directory with no Node server required — deployable to GitHub Pages, Vercel, Netlify, S3, etc. No deploy workflow is configured yet (hosting target undecided — see BACKLOG.md).
