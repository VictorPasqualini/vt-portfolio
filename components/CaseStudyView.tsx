'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, GithubIcon, ZoomInIcon } from '@/lib/icons';
import type { CaseSample, CaseShot, CaseStudy, ProjectData } from '@/lib/types';
import Footer from './Footer';
import Lightbox from './Lightbox';
import Nav from './Nav';

/**
 * Case study copy is plain text with exactly one piece of markup: backticks
 * around identifiers, because most sentences in a write-up like this name a
 * function, a key or a package. A full markdown parser would be a dependency
 * and a sanitising problem for one span.
 */
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split('`').map((part, index) =>
        index % 2 === 0 ? (
          part
        ) : (
          <code
            key={index}
            className="rounded border border-line/10 bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
          >
            {part}
          </code>
        ),
      )}
    </>
  );
}

/** A demo, captioned like a window title so it reads as a thing, not a blockquote. */
function Sample({ sample }: { sample: CaseSample }) {
  return (
    <figure className="mt-6 overflow-hidden rounded-card border border-line/10">
      <figcaption className="border-b border-line/10 bg-surface px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
        {sample.caption}
      </figcaption>
      {/* Scrolls on its own instead of widening the page: the code is wrapped
          for a phone, but the ASCII tables in it are not. */}
      <pre className="overflow-x-auto px-4 py-4 font-mono text-[12.5px] leading-relaxed text-fg-2">
        <code>{sample.code}</code>
      </pre>
    </figure>
  );
}

/**
 * A screenshot of the thing actually running. Width and height are set so the
 * page reserves the space before the file arrives, and the caption doubles as
 * the alt text: it says what the screen shows, which is what a reader who
 * cannot see it needs.
 *
 * Inline it is a column wide at most, which is too small to read a dashboard
 * in, so the whole thing is a button into the full-screen viewer.
 */
function Shot({ shot }: { shot: CaseShot }) {
  const { t } = useLocale();
  const [open, setOpen] = useState(false);

  return (
    <figure className="mt-6">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${t.viewer.expand}: ${shot.caption}`}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-card border border-line/10 bg-surface transition-colors hover:border-fg/30"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={shot.src}
          alt={shot.caption}
          width={shot.width}
          height={shot.height}
          loading="lazy"
          decoding="async"
          className="block h-auto w-full"
        />
        {/* Always visible on a touch screen, where there is no hover to reveal
            it, and where tapping an image is the least obvious of the two. */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-bg/85 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-fg-2 backdrop-blur transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
        >
          <ZoomInIcon className="h-3.5 w-3.5" />
          {t.viewer.expand}
        </span>
      </button>
      <figcaption className="mt-2.5 font-mono text-[11px] uppercase tracking-[0.12em] text-fg-3">
        {shot.caption}
      </figcaption>
      {open && <Lightbox src={shot.src} alt={shot.caption} onClose={() => setOpen(false)} />}
    </figure>
  );
}

const CTA_BASE = 'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-colors';
const CTA_PRIMARY = `${CTA_BASE} bg-accent font-medium text-accent-fg hover:opacity-90`;
const CTA_GHOST = `${CTA_BASE} border border-line/20 text-fg-2 hover:border-fg hover:text-fg`;

export default function CaseStudyView({
  project,
  study,
  next,
}: {
  project: ProjectData;
  study: CaseStudy;
  /** The project suggested at the end of the page, with its study for the pitch. */
  next?: { project: ProjectData; study: CaseStudy };
}) {
  const { locale, t } = useLocale();
  const content = study[locale];
  const home = `/${locale}`;

  return (
    <>
      {/* onHome={false}: none of the section ids exist on this page, so the nav
          links have to navigate home before jumping to one. */}
      <Nav onHome={false} wide />
      <main className="mx-auto max-w-wide px-6">
        <a
          href={`${home}#projects`}
          className="inline-flex items-center gap-2 py-6 font-mono text-xs uppercase tracking-[0.14em] text-fg-3 transition-colors hover:text-fg"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5" />
          {t.projects.back}
        </a>

        {/* Identity on the left, argument on the right: the card holds everything
            that stays true for the whole page — name, pitch, links, numbers — so
            the reader never has to scroll back up to remember what they are
            reading about. It sticks on a wide screen and stacks on a phone. */}
        {/* min-w-0 on both columns: a grid item refuses to shrink below its
            content's min-content width by default, and the code blocks below
            are wider than a phone — without it the whole page grows to fit
            them and has to be dragged sideways. */}
        <div className="grid items-start gap-10 pb-16 lg:grid-cols-[21rem_1fr] lg:gap-14">
          <aside className="min-w-0 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-card border border-line/10 bg-surface">
              <span
                aria-hidden
                className="block h-1 w-full"
                style={{ background: `linear-gradient(90deg, ${project.accent[0]}, ${project.accent[1]})` }}
              />
              <div className="flex flex-col gap-6 p-6">
                <div>
                  <h1 className="text-3xl font-medium leading-none tracking-[-0.035em]">{project.name}</h1>
                  <p className="mt-3 text-sm leading-relaxed text-fg-2">{content.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className={CTA_PRIMARY}>
                    <GithubIcon className="h-4 w-4" />
                    {t.projects.viewRepo}
                  </a>
                  {project.homepage && (
                    <a href={project.homepage} target="_blank" rel="noreferrer" className={CTA_GHOST}>
                      <ExternalLinkIcon className="h-4 w-4" />
                      {t.projects.website}
                    </a>
                  )}
                </div>

                {content.highlights.length > 0 && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 border-t border-line/10 pt-6">
                    {content.highlights.map((highlight) => (
                      <div key={highlight.label}>
                        <p className="text-3xl font-medium leading-none tracking-[-0.04em] text-accent">
                          {highlight.value}
                        </p>
                        <p className="mt-2 text-xs leading-snug text-fg-2">{highlight.label}</p>
                      </div>
                    ))}
                  </div>
                )}

                <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-line/10 pt-6">
                  {content.facts.map((fact) => (
                    <div key={fact.label}>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">{fact.label}</dt>
                      <dd className="mt-1 break-words text-sm text-fg">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            {content.sections.map((section, index) => (
              <section key={section.title} className="border-t border-line/10 py-10 first:border-t-0 first:pt-0">
                <div className="flex items-baseline gap-3">
                  <span aria-hidden className="font-mono text-xs tracking-[0.18em] text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h2 className="text-2xl font-medium leading-tight tracking-[-0.03em]">{section.title}</h2>
                </div>

                {section.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="mt-4 max-w-3xl leading-relaxed text-fg-2">
                    <RichText text={paragraph} />
                  </p>
                ))}

                {section.bullets && (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-sm leading-relaxed text-fg-2">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        <span>
                          <RichText text={bullet} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {section.sample && <Sample sample={section.sample} />}

                {section.shot && <Shot shot={section.shot} />}
              </section>
            ))}

            {next && (
              <a
                href={`${home}/projects/${next.project.slug}`}
                className="group mt-4 block overflow-hidden rounded-card border border-line/10 transition-colors hover:border-fg/25"
              >
                <span
                  aria-hidden
                  className="block h-1 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${next.project.accent[0]}, ${next.project.accent[1]})`,
                  }}
                />
                <div className="p-6">
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3">
                    {t.projects.nextCase}
                  </span>
                  <span className="mt-2 flex items-center gap-3 text-2xl font-medium tracking-[-0.03em] transition-colors group-hover:text-accent">
                    {next.project.name}
                    <ArrowRightIcon className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-1" />
                  </span>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-fg-2">{next.study[locale].tagline}</p>
                </div>
              </a>
            )}
          </div>
        </div>
      </main>
      <Footer wide />
    </>
  );
}
