'use client';

import { getCaseStudy } from '@/content/case-studies';
import { useLocale } from '@/lib/i18n-context';
import { ArrowRightIcon, GithubIcon, GlobeIcon } from '@/lib/icons';
import type { ProjectData } from '@/lib/types';
import ProjectCover from './ProjectCover';

/**
 * The repo and site links, as icon buttons. They are the two links every card
 * repeats, so they say what they are with a mark rather than with a word:
 * the label would be read once and then be noise on every card below it.
 * They sit above the stretched case-study link, which otherwise covers the
 * whole card and would swallow them.
 */
const ICON_LINK =
  'relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-line/20 text-fg-3 transition-colors hover:border-fg/40 hover:text-fg';

export default function ProjectCard({ project }: { project: ProjectData }) {
  const { locale, t } = useLocale();
  // Only projects with a write-up get a case study link; the rest stay a card
  // and a repo link, which is all their public detail supports.
  const study = getCaseStudy(project.slug);

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line/10 transition-colors hover:border-fg/25">
      {/* The name lives on the cover, where it has the gradient to sit on and
          can be set at a size a card heading never gets. */}
      <ProjectCover project={project} />

      <div className="flex min-w-0 flex-1 flex-col gap-4 p-5">
        <p className="text-sm leading-relaxed text-fg-2">{project.description[locale]}</p>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span key={tech} className="rounded-full border border-line/15 px-2 py-0.5 font-mono text-[11px] text-fg-3">
              {tech}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          {study ? (
            // The one real link on the card, stretched over the whole article
            // by a pseudo-element: anywhere that isn't one of the icon buttons
            // opens the case study.
            <a
              href={`/${locale}/projects/${project.slug}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.12em] text-accent underline decoration-accent/30 underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:decoration-accent"
            >
              {t.projects.caseStudy}
              <ArrowRightIcon className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
          ) : (
            // Nothing on the left, but the buttons stay on the right.
            <span />
          )}
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name}: ${t.projects.viewRepo}`}
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
                aria-label={`${project.name}: ${t.projects.website}`}
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
