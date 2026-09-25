'use client';

import { useEffect, useRef, useState } from 'react';
import { withEmphasis } from '@/lib/emphasis';
import { useLocale } from '@/lib/i18n-context';
import { ChevronDownIcon, ExternalLinkIcon } from '@/lib/icons';
import type { Certification, ExperienceEntry } from '@/lib/types';
import Section from './Section';

const LINK_CLASS = 'inline-flex items-center gap-1 text-fg-2 transition-colors hover:text-accent';

const RAIL_HEADING = 'mb-3 mt-8 border-b border-line/10 pb-2 font-mono text-xs uppercase tracking-[0.14em] text-fg-3';

const CERT_ROW = 'flex items-baseline gap-2.5';

const CERT_ISSUER = 'font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3';

const PERIOD = 'font-mono text-xs uppercase tracking-[0.12em] text-fg-3';

/** Clearance under the fixed header, matching the rest of the page. */
const RAIL_TOP = 96;

/** Breathing room under the rail when it is pinned by its bottom edge. */
const RAIL_GAP = 32;

/**
 * The sticky offset for the about rail, measured rather than fixed.
 *
 * A sticky box taller than the viewport that is pinned with a positive `top`
 * never scrolls its own bottom into view: the last certification would sit
 * below the fold for good. A negative `top` inverts that — the rail scrolls up
 * with the page until its bottom edge clears the viewport, and pins from there
 * — but the right value is `viewportHeight - railHeight`, which only the
 * browser knows. So it is measured, and re-measured whenever the rail or the
 * window changes size. `top` is inert until `lg:sticky` makes the rail sticky,
 * so the narrow layout is unaffected.
 */
function useRailOffset() {
  const ref = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState(RAIL_TOP);

  useEffect(() => {
    const rail = ref.current;
    if (!rail) return;

    const measure = () => setTop(Math.min(RAIL_TOP, window.innerHeight - rail.offsetHeight - RAIL_GAP));
    measure();

    // The rail grows when a badge image loads or the font swaps; the window
    // listener is for a viewport that changes height without the rail changing
    // size, which the observer alone would miss.
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return { ref, top };
}

/**
 * Certifications, grouped by whoever issued them.
 *
 * Six credentials from four issuers, and the two longest names are
 * "Databricks Data Governance Fundamentals" and "Databricks Generative AI
 * Fundamentals": one per row, each behind its own copy of the same logo, the
 * word Databricks ran down the left edge three times and the names ran off the
 * right of a 22rem column. Folding a run of one issuer into one logo and one
 * header buys back the width the repetition was spending, so the names fit on
 * one line and the rail gets shorter as credentials are added rather than
 * taller.
 *
 * Only consecutive entries fold, so the content files stay in charge of the
 * order — they already list each issuer's credentials together.
 */
interface CertificationGroup {
  issuer: string;
  icon?: string;
  items: Certification[];
}

function groupByIssuer(certs: Certification[]): CertificationGroup[] {
  const groups: CertificationGroup[] = [];

  for (const cert of certs) {
    const open = groups.at(-1);

    if (open?.issuer === cert.issuer) {
      // The logo belongs to the issuer, so the first entry that carries one
      // speaks for the whole run and the rest can leave the field out.
      open.icon ??= cert.icon;
      open.items.push(cert);
    } else {
      groups.push({ issuer: cert.issuer, icon: cert.icon, items: [cert] });
    }
  }

  return groups;
}

/**
 * Logos rather than the issuers' badge artwork, which is what this showed
 * first: a badge is a seal with the credential's name written around its rim,
 * so at 32px the lettering is unreadable and three of them in a column are
 * three different shapes in three different palettes. The name is already
 * spelled out beside the mark, which leaves the mark only one job — saying
 * whose credential it is — and a plain logo does that at any size.
 */
function CertificationGroupRow({ group }: { group: CertificationGroup }) {
  return (
    <li className="flex gap-3 py-3.5">
      {/* Fixed box, so every group starts at the same left edge whatever shape
          the logo is. Aligned to the header rather than centred on the run:
          a three-credential group would otherwise float its logo halfway down. */}
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">
        {group.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={group.icon} alt="" loading="lazy" className="h-6 w-6 object-contain" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className={CERT_ISSUER}>{group.issuer}</p>
        <ul className="mt-2 flex flex-col gap-1.5">
          {group.items.map((cert) => (
            <CertificationRow key={cert.name} cert={cert} issuer={group.issuer} />
          ))}
        </ul>
      </div>
    </li>
  );
}

function CertificationRow({ cert, issuer }: { cert: Certification; issuer: string }) {
  // The year is pushed to the right edge instead of trailing the name, so the
  // years read as a column of their own down the rail.
  const body = (
    <>
      <span className="min-w-0 flex-1 text-sm leading-snug">{cert.name}</span>
      <span className="shrink-0 font-mono text-[11px] text-fg-3">{cert.year}</span>
    </>
  );

  if (!cert.url) return <li className={CERT_ROW}>{body}</li>;

  return (
    <li>
      <a
        href={cert.url}
        target="_blank"
        rel="noreferrer"
        // The issuer is in the group header, not in the link text: put it back
        // for anyone reading the links out of context, unless the name already
        // opens with it: "Databricks Fundamentals", or "dbt Fundamentals" under
        // dbt Labs, which names the product rather than the company.
        aria-label={cert.name.startsWith(issuer.split(' ')[0]) ? cert.name : `${issuer} ${cert.name}`}
        className={`group ${CERT_ROW} transition-colors hover:text-accent`}
      >
        {body}
        {/* One of these on every row permanently was the clutter the grouping
            is meant to clear, and the row is the only link in reach, so the
            mark shows on hover and on keyboard focus. The space it takes is
            reserved either way, or every row would shift under the pointer. */}
        <ExternalLinkIcon className="h-3 w-3 shrink-0 self-center text-fg-4 opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
      </a>
    </li>
  );
}

/**
 * The period, with an open-ended end picked out. "Hoje" and "now" are not a
 * second date, they are a state: the row they belong to is the job he is in,
 * and that is worth seeing in the accent with a live dot beside it rather than
 * reading as grey metadata like every closed range above it.
 *
 * Which end is open is read off the string instead of being flagged in the
 * content, because a range that ends in a year always ends in digits and one
 * that is still running never does. The dot only pulses where motion is
 * welcome.
 */
function Period({ value }: { value: string }) {
  const open = value.match(/^(.*\s)(\D+)$/);

  if (!open) return <p className={PERIOD}>{value}</p>;

  // A flex row rather than inline spans: the dot has no baseline of its own,
  // so inline it floats against the cap height of the text beside it.
  return (
    <p className={`${PERIOD} flex items-center gap-1.5`}>
      <span>{open[1].trimEnd()}</span>
      <span className="text-accent">{open[2]}</span>
      <span aria-hidden className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
    </p>
  );
}

function Row({ job, viaWord, defaultOpen = false }: { job: ExperienceEntry; viaWord: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `job-${job.company}-${job.period}`.replace(/\W+/g, '-').toLowerCase();

  return (
    <li>
      {/* A plain button, with no link inside it: an anchor nested in a button is
          invalid markup, and the company links belong next to the description
          they explain anyway.

          One column narrower than it used to be: the row now shares the section
          with the about column, so the period sits above the role rather than
          in a fixed gutter beside it. */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-6 gap-y-1.5 py-5 text-left"
      >
        <Period value={job.period} />
        <h4 className="col-start-1 text-base font-medium tracking-[-0.01em] sm:text-lg">
          {job.role}
          <span className="text-fg-3"> · </span>
          <span className="text-fg-2">{job.company}</span>
          {job.viaCompany && (
            <span className="text-fg-3">
              {' '}
              ({viaWord} {job.viaCompany})
            </span>
          )}
        </h4>
        <ChevronDownIcon
          className={`col-start-2 row-start-1 mt-0.5 h-4 w-4 shrink-0 text-fg-3 transition-transform duration-200 group-hover:text-fg ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Left in the markup when collapsed: 0fr/1fr animates the height, and a
          crawler still reads every description without opening anything. */}
      <div
        id={panelId}
        aria-hidden={!open}
        className={`grid transition-all duration-300 ease-out ${
          open ? 'grid-rows-[1fr] opacity-100' : 'invisible grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="pb-7">
            <p className="max-w-2xl text-sm leading-relaxed text-fg-2">{job.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {job.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-line/15 px-2.5 py-1 font-mono text-[11px] text-fg-3"
                >
                  {tech}
                </span>
              ))}
            </div>
            {(job.companyUrl || job.viaCompanyUrl) && (
              <div className="mt-5 flex flex-wrap gap-5 text-sm">
                {job.companyUrl && (
                  <a href={job.companyUrl} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                    {job.company}
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </a>
                )}
                {job.viaCompany && job.viaCompanyUrl && (
                  <a href={job.viaCompanyUrl} target="_blank" rel="noreferrer" className={LINK_CLASS}>
                    {job.viaCompany}
                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Section 01: the résumé summary and the job history, side by side.
 *
 * They were two ideas stacked into one long scroll before. Read together they
 * answer the two questions in the same order a recruiter asks them — who is
 * this, and what has he actually done — so the prose column states the case and
 * the list beside it is the evidence. The prose sticks while the list scrolls,
 * which is what keeps the claim in view while the roles go past.
 */
export default function About() {
  const { t, locale } = useLocale();
  const viaWord = locale === 'pt' ? 'pela' : 'via';
  const rail = useRailOffset();

  return (
    <Section id="about" index="01" heading={t.sections.about} band>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
        {/* Follows the job list as it scrolls. The offset is measured because
            the column is taller than a laptop viewport — see useRailOffset. */}
        <div ref={rail.ref} style={{ top: rail.top }} className="lg:sticky lg:self-start">
          <div className="flex flex-col gap-4 text-sm leading-relaxed text-fg-2 sm:text-[0.9375rem]">
            {t.about.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{withEmphasis(paragraph)}</p>
            ))}
          </div>
          <h3 className={RAIL_HEADING}>{t.about.stackLabel}</h3>
          {/* The short list, not the Skills section: these are the twelve names
              worth reading before the job history, and the full inventory is
              two sections down. */}
          <div className="flex flex-wrap gap-1.5">
            {t.about.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-line/15 px-2.5 py-1 font-mono text-[11px] text-fg-2"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* More evidence for the stack above, not a section of its own. */}
          {t.certifications.length > 0 && (
            <>
              <h3 className={RAIL_HEADING}>{t.sections.certifications}</h3>
              <ul className="divide-y divide-line/10">
                {groupByIssuer(t.certifications).map((group) => (
                  <CertificationGroupRow key={group.issuer} group={group} />
                ))}
              </ul>
            </>
          )}
        </div>

        {/* A scannable index of roles: every description past the current one
            is a click away rather than five screens of prose. */}
        <div>
          <h3 className="mb-1 font-mono text-xs uppercase tracking-[0.14em] text-fg-3">
            {t.about.experienceLabel}
          </h3>
          <ol className="divide-y divide-line/10 border-b border-line/10">
            {/* The current role starts expanded: it is the one entry a reader
                came for, and an all-collapsed list gives the section nothing
                to show until it is clicked. Still a toggle, so it closes. */}
            {t.experience.map((job, index) => (
              <Row key={`${job.company}-${job.period}`} job={job} viaWord={viaWord} defaultOpen={index === 0} />
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
