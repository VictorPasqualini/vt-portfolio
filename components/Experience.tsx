'use client';

import { useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { ChevronDownIcon, ExternalLinkIcon } from '@/lib/icons';
import type { ExperienceEntry } from '@/lib/types';
import Section from './Section';

const LINK_CLASS = 'inline-flex items-center gap-1 text-fg-2 transition-colors hover:text-accent';

function Row({ job, viaWord }: { job: ExperienceEntry; viaWord: string }) {
  const [open, setOpen] = useState(false);
  const panelId = `job-${job.company}-${job.period}`.replace(/\W+/g, '-').toLowerCase();

  return (
    <li>
      {/* A plain button, with no link inside it: an anchor nested in a button is
          invalid markup, and the company links belong next to the description
          they explain anyway. */}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        className="group grid w-full grid-cols-[1fr_auto] items-start gap-x-10 gap-y-2 py-6 text-left sm:grid-cols-[9rem_1fr_auto]"
      >
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-fg-3 sm:pt-1">{job.period}</p>
        <h3 className="col-start-1 text-lg font-medium tracking-[-0.01em] sm:col-start-2">
          {job.role}
          <span className="text-fg-3"> · </span>
          <span className="text-fg-2">{job.company}</span>
          {job.viaCompany && <span className="text-fg-3"> ({viaWord} {job.viaCompany})</span>}
        </h3>
        <ChevronDownIcon
          className={`col-start-2 row-start-1 mt-1 h-4 w-4 shrink-0 text-fg-3 transition-transform duration-200 group-hover:text-fg sm:col-start-3 ${
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
          <div className="pb-8 sm:pl-[calc(9rem+2.5rem)]">
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

export default function Experience() {
  const { t, locale } = useLocale();
  const viaWord = locale === 'pt' ? 'pela' : 'via';

  return (
    <Section id="experience" index="01" title={t.sections.experience}>
      {/* Collapsed by default: the section is a scannable index of roles, and
          the description is one click away rather than five screens of prose. */}
      <ol className="divide-y divide-line/10 border-y border-line/10">
        {t.experience.map((job) => (
          <Row key={`${job.company}-${job.period}`} job={job} viaWord={viaWord} />
        ))}
      </ol>
    </Section>
  );
}
