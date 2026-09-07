'use client';

import { useLocale } from '@/lib/i18n-context';
import { ExternalLinkIcon } from '@/lib/icons';
import type { Certification } from '@/lib/types';

const BADGE_CLASS = 'flex items-center gap-3 rounded-xl border border-line/15 px-4 py-2.5';

/** Issuer logo + title + year. Wrapped in a link only when there is a certificate to open. */
function CertificationBadge({ cert }: { cert: Certification }) {
  const body = (
    <>
      {cert.icon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cert.icon} alt="" loading="lazy" className="h-6 w-6 shrink-0 object-contain" />
      )}
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-medium">{cert.name}</span>
        <span className="text-xs text-fg/50">{cert.year}</span>
      </span>
    </>
  );

  if (!cert.url) return <div className={BADGE_CLASS}>{body}</div>;

  return (
    <a href={cert.url} target="_blank" rel="noreferrer" className={`${BADGE_CLASS} hover:border-fg`}>
      {body}
      <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 text-fg/40" />
    </a>
  );
}

export default function Education() {
  const { t } = useLocale();

  return (
    <section id="education" className="py-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{t.sections.education}</h2>
      <ul className="space-y-4">
        {t.education.map((entry) => (
          <li key={`${entry.institution}-${entry.period}`} className="flex flex-col gap-0.5">
            <p className="text-xs uppercase tracking-wide text-fg/50">{entry.period}</p>
            <p className="text-sm font-medium">{entry.institution}</p>
            <p className="text-sm text-fg/70">{entry.program}</p>
          </li>
        ))}
      </ul>

      {t.certifications.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-3 text-sm font-medium text-fg/50">{t.sections.certifications}</h3>
          <div className="flex flex-wrap gap-3">
            {t.certifications.map((cert) => (
              <CertificationBadge key={cert.name} cert={cert} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
