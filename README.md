# vt-portfolio

Victor Ramos Pasqualini's personal portfolio site — bilingual (English/Portuguese, auto-detected from the browser), dark by default with a light mode toggle, built with Next.js + TypeScript + Tailwind CSS. Visual style inspired by [joachimhodana.com](https://joachimhodana.com): minimalist, single-page, timeline + project grid.

## Stack

- Next.js 14 (App Router), static export (`output: 'export'`), deployed on Vercel.
- TypeScript, Tailwind CSS (`darkMode: 'class'`, CSS-variable color tokens).
- One URL per language (`/en`, `/pt`) prerendered from an `app/[locale]` route; `/` only detects a language (stored preference, then `navigator.languages`) and redirects. A `LocaleProvider` React context takes the locale from the URL and navigates when it changes.
- Theme: a `ThemeProvider` React context holds `light`/`dark`, persisted in `localStorage`; **defaults to dark** regardless of OS preference.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
npm run og        # re-render the social preview cards into public/
```

Copy `.env.example` to `.env.local` if you need a different site URL or want analytics locally. All variables are read at build time.

## Project structure

```
app/            Next.js App Router entry (root layout, [locale] page, sitemap/robots, global styles)
components/     UI sections (Hero, Experience, Projects, Skills, Education, Contact, Nav, Footer)
content/        Typed content dictionaries: en.ts, pt.ts (resume-derived copy), projects.ts (GitHub project data)
lib/            Shared types, site-wide constants (URLs, locales) and the i18n/theme contexts
scripts/        One-off generators — render-og.mjs builds the social preview PNGs
public/resumes/ Downloadable resume PDFs (EN + PT)
docs/           Architecture notes and content update guide
BACKLOG.md      Prioritized future work, including deferred design ideas
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the pieces fit together, and [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) for how to update the site when the resume or project list changes.

## Updating content

- **Resume-derived text** (summary, experience, education, skills, certifications): edit `content/en.ts` and `content/pt.ts` — keep both in sync.
- **Projects**: edit `content/projects.ts`. Data (language, topics, stars, homepage) can be refreshed from the GitHub API: `GET https://api.github.com/repos/VictorPasqualini/<repo>`.
- **Resume PDFs**: replace the files in `public/resumes/` and update the filenames referenced in `components/Hero.tsx` if they change.

## Deploy

Hosted on Vercel. Import the repo and take the defaults — Vercel detects Next.js, runs `npm run build`, and serves the exported `out/` directory. No config file is needed, which is why there isn't one.

Set `NEXT_PUBLIC_SITE_URL` in the project's environment variables before the first real deploy — canonical URLs, hreflang alternates, Open Graph tags and `sitemap.xml` are all built from it, and it falls back to a placeholder domain when unset. It is read at build time, so redeploy after changing it.

## Analytics

Off unless configured. Set `NEXT_PUBLIC_ANALYTICS_SRC` (plus `NEXT_PUBLIC_ANALYTICS_WEBSITE_ID` for Umami or `NEXT_PUBLIC_ANALYTICS_DOMAIN` for Plausible) and `components/Analytics.tsx` injects that one script; with the variable unset, no third-party request is made at all. See `.env.example`.

## Roadmap

See [BACKLOG.md](BACKLOG.md) — includes the planned letter-curtain hero animation and more.
