'use client';

import { getCaseStudy } from '@/content/case-studies';
import { useLocale } from '@/lib/i18n-context';
import { ArrowRightIcon, GithubIcon, GlobeIcon } from '@/lib/icons';
import type { ProjectData } from '@/lib/types';

const ACCENT_LINK = 'text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent';

/**
 * The repo and site links, as icon buttons. They are the two links every card
 * repeats, so they say what they are with a mark rather than with a word:
 * the label would be read once and then be noise on every card below it.
 * pointer-events come back on here because the row around them switches them
 * off, so that the gaps fall through to the card's own link.
 */
const ICON_LINK =
  'pointer-events-auto flex h-8 w-8 items-center justify-center rounded-full border border-line/20 text-fg-3 transition-colors hover:border-fg/40 hover:text-fg';

export default function ProjectCard({ project }: { project: ProjectData }) {
  const { locale, t } = useLocale();
  // Only projects with a write-up get a case study link; the rest stay a card
  // and a repo link, which is all their public detail supports.
  const study = getCaseStudy(project.slug);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line/10 transition-colors hover:border-fg/25">
      {/* The repo's own accent pair, as a rule across the top of the card: it
          tells the cards apart at a glance without colouring any of the text. */}
      <span
        aria-hidden
        className="h-0.5 w-full shrink-0"
        style={{ background: `linear-gradient(90deg, ${project.accent[0]}, ${project.accent[1]})` }}
      />
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="truncate text-base font-medium tracking-[-0.01em]">
            {study ? (
              // One real link, stretched over the card by a pseudo-element, so
              // anywhere on the card opens the case study and the repo link is
              // still a link rather than an anchor nested inside another one.
              <a
                href={`/${locale}/projects/${project.slug}`}
                className="transition-colors after:absolute after:inset-0 after:content-[''] group-hover:text-accent"
              >
                {project.name}
              </a>
            ) : (
              project.name
            )}
          </h3>
          {project.stars > 0 && <span className="shrink-0 font-mono text-xs text-fg-3">★ {project.stars}</span>}
        </div>
        <p className="text-sm leading-relaxed text-fg-2">{project.description[locale]}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-line/15 px-2 py-0.5 font-mono text-[11px] text-fg-3">
              {tech}
            </span>
          ))}
        </div>
        {/* Above the stretched link, or the repo and site links would not be
            reachable: the card's own link covers everything below it. The row
            itself takes no clicks, so everything in it that is not a real link
            — the gaps, and the case study label — falls through to the card. */}
        <div className="pointer-events-none relative z-10 mt-auto flex items-center justify-between gap-3 pt-3">
          {study ? (
            // A label, not a link: the card is the link.
            <span
              className={`inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] ${ACCENT_LINK}`}
            >
              {t.projects.caseStudy}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          ) : (
            // Nothing on the left, but the buttons stay on the right.
            <span />
          )}
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} — ${t.projects.viewRepo}`}
              title={t.projects.viewRepo}
              className={ICON_LINK}
            >
              <GithubIcon className="h-4 w-4" />
            </a>
            {project.homepage && (
              <a
                href={project.homepage}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.name} — ${t.projects.website}`}
                title={t.projects.website}
                className={ICON_LINK}
              >
                <GlobeIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
