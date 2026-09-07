# vt-portfolio

Victor Ramos Pasqualini's personal portfolio site — bilingual (English/Portuguese, default English), built with Next.js + TypeScript + Tailwind CSS. Visual style inspired by [joachimhodana.com](https://joachimhodana.com): minimalist, single-page, timeline + project grid.

## Stack

- Next.js 14 (App Router), static export (`output: 'export'`) — deployable to GitHub Pages, Vercel, Netlify, or any static host.
- TypeScript, Tailwind CSS.
- No routing-based i18n: a `LocaleProvider` React context holds `en`/`pt`, persisted in `localStorage`, defaulting to `en`.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
```

## Project structure

```
app/            Next.js App Router entry (layout, page, global styles)
components/     UI sections (Hero, Experience, Projects, Skills, Education, Contact, Nav, Footer)
content/        Typed content dictionaries: en.ts, pt.ts (resume-derived copy), projects.ts (GitHub project data)
lib/            Shared types + the i18n context/hook (useLocale)
public/resumes/ Downloadable resume PDFs (EN + PT)
docs/           Architecture notes and content update guide
BACKLOG.md      Prioritized future work, including deferred design ideas
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for how the pieces fit together, and [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md) for how to update the site when the resume or project list changes.

## Updating content

- **Resume-derived text** (summary, experience, education, skills, certifications): edit `content/en.ts` and `content/pt.ts` — keep both in sync.
- **Projects**: edit `content/projects.ts`. Data (language, topics, stars, homepage) can be refreshed from the GitHub API: `GET https://api.github.com/repos/VictorPasqualini/<repo>`.
- **Resume PDFs**: replace the files in `public/resumes/` and update the filenames referenced in `components/Hero.tsx` if they change.

## Roadmap

See [BACKLOG.md](BACKLOG.md) — includes the planned letter-curtain hero animation, deploy pipeline, dark mode, and more.
