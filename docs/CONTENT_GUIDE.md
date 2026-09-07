# Content guide

How to update the site whenever the resume, experience, or project list changes.

## Resume changed (new job, updated summary, new certification, etc.)

1. Drop the new PDF(s) into `resumes/` (source of truth) and `public/resumes/` (served to visitors — filenames are referenced directly in `components/Hero.tsx`).
2. Update **both** `content/en.ts` and `content/pt.ts` — they are independent objects, not translations generated from one another, so nothing keeps them in sync automatically. Update:
   - `hero.summary` — the top summary paragraph.
   - `experience[]` — add new entries at the top (array order = display order, newest first). Each entry: `period`, `role`, `company`, `description`, `stack[]`.
   - `education[]`, `certifications[]` if applicable.
   - `skills[]` — grouped tag lists; add new tools to the right group or create a new group.
3. Check `lib/types.ts` (`SiteContent`) if a new *field* (not just new content) is needed — TypeScript will fail the build if `en.ts`/`pt.ts` don't satisfy the shape, which is intentional (catches missing translations).

## Project added, removed, or its GitHub metadata changed

Edit `content/projects.ts`. Each `ProjectData` entry:

- `slug`, `name`, `githubUrl` — manual.
- `homepage` — optional, only set if the repo has a live demo/site.
- `language`, `topics`, `stars` — refresh from the GitHub API:
  ```bash
  curl -s https://api.github.com/repos/VictorPasqualini/<repo> | jq '{language, topics, stargazers_count, homepage}'
  ```
- `description.en` / `description.pt` — written by hand, kept short (1-3 sentences); doesn't need to match the GitHub repo description verbatim.

A project with no `language`/`topics` (like an early-stage repo) automatically falls back to showing `t.projects.fewDetails` instead of an empty badge row — see `components/ProjectCard.tsx`. No need to fake tech badges for a project that doesn't have them yet.

## Adding a new locale

Not currently supported by the type system (`Locale = 'en' | 'pt'` in `lib/types.ts`) or the UI (`Nav.tsx` hardcodes an EN/PT toggle). Adding a third locale means: extend `Locale`, add `content/<locale>.ts` satisfying `SiteContent`, extend the `DICTIONARIES` map in `lib/i18n-context.tsx`, and extend the toggle in `Nav.tsx`.
