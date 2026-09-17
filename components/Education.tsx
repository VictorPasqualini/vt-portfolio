'use client';

import { useLocale } from '@/lib/i18n-context';
import { ExternalLinkIcon } from '@/lib/icons';
import type { Certification } from '@/lib/types';
import Section from './Section';

const PILL_BASE = 'flex items-center gap-3 rounded-card border border-line/25 bg-surface px-5 py-3.5';

/**
 * A certification, fronted by the issuer's logo when one is vendored. Skill
 * badges used to sit beside these; they moved to Skills, where a credential
 * earned per skill reads as evidence for the skill lists rather than as a
 * quieter sibling of an exam.
 */
function CertificationPill({ cert }: { cert: Certification }) {
  const body = (
    <>
      {cert.icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cert.icon} alt="" loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
      )}
      <span className="flex flex-col leading-tight">
        <span className="text-base font-medium">{cert.name}</span>
        <span className="font-mono text-[11px] text-fg-3">{cert.year}</span>
      </span>
    </>
  );

  if (!cert.url) return <div className={PILL_BASE}>{body}</div>;

  return (
    <a href={cert.url} target="_blank" rel="noreferrer" className={`${PILL_BASE} transition-colors hover:border-fg/40`}>
      {body}
      <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 text-fg-4" />
    </a>
  );
}

export default function Education() {
  const { t } = useLocale();

  return (
    <Section id="education" index="04" title={t.sections.education}>
      <ul className="divide-y divide-line/10 border-y border-line/10">
        {t.education.map((entry) => (
          <li key={`${entry.institution}-${entry.period}`} className="grid gap-x-10 gap-y-1 py-6 sm:grid-cols-[9rem_1fr]">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-fg-3">{entry.period}</p>
            <div>
              <p className="font-medium">{entry.institution}</p>
              <p className="text-sm text-fg-2">{entry.program}</p>
            </div>
          </li>
        ))}
      </ul>

      {t.certifications.length > 0 && (
        <div className="mt-12">
          <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.14em] text-fg-2">{t.sections.certifications}</h3>
          <div className="flex flex-wrap gap-3">
            {t.certifications.map((cert) => (
              <CertificationPill key={cert.name} cert={cert} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
