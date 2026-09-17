'use client';

import type { ReactNode } from 'react';

import { useLocale } from '@/lib/i18n-context';
import { ExternalLinkIcon } from '@/lib/icons';
import type { Certification, SkillBadge } from '@/lib/types';

/**
 * How loudly a credential group is drawn. Certifications are earned by sitting
 * an exam and skill badges are not, so the two are not given equal weight: the
 * certification pill is padded, tinted and set in a larger type, while the badge
 * row is deliberately quieter so its colourful art does not outshout it.
 */
type Tone = 'primary' | 'secondary';

const TONE: Record<Tone, { group: string; title: string; pill: string; name: string }> = {
  primary: {
    group: 'mt-10',
    title: 'mb-3 text-sm font-semibold text-fg/70',
    pill: 'border-line/30 bg-fg/[0.03] px-5 py-3.5',
    name: 'text-base font-semibold',
  },
  secondary: {
    group: 'mt-8',
    title: 'mb-3 text-sm font-medium text-fg/40',
    pill: 'border-line/15 px-4 py-2.5',
    name: 'text-sm font-medium',
  },
};

const PILL_BASE = 'flex items-center gap-3 rounded-xl border';

/**
 * Shared shell for anything listed under Education as a credential: an image,
 * the title over the year, and — only when there is something to open — a link
 * out to it.
 */
function CredentialPill({
  image,
  name,
  year,
  url,
  tone,
}: {
  image: ReactNode;
  name: string;
  year: string;
  url?: string;
  tone: Tone;
}) {
  const style = TONE[tone];
  const body = (
    <>
      {image}
      <span className="flex flex-col leading-tight">
        <span className={style.name}>{name}</span>
        <span className="text-xs text-fg/50">{year}</span>
      </span>
    </>
  );

  if (!url) return <div className={`${PILL_BASE} ${style.pill}`}>{body}</div>;

  return (
    <a href={url} target="_blank" rel="noreferrer" className={`${PILL_BASE} ${style.pill} hover:border-fg`}>
      {body}
      <ExternalLinkIcon className="h-3.5 w-3.5 shrink-0 text-fg/40" />
    </a>
  );
}

/** A certification, fronted by the issuer's logo when one is vendored. */
function CertificationPill({ cert }: { cert: Certification }) {
  return (
    <CredentialPill
      tone="primary"
      name={cert.name}
      year={cert.year}
      url={cert.url}
      image={
        cert.icon && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cert.icon} alt="" loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
        )
      }
    />
  );
}

/** A skill badge, fronted by the badge art the issuer hands out. */
function SkillBadgePill({ badge }: { badge: SkillBadge }) {
  return (
    <CredentialPill
      tone="secondary"
      name={badge.name}
      year={badge.year}
      url={badge.url}
      image={
        // The art carries its own rounded shape on a transparent background, so
        // it is left unclipped instead of being masked into the pill's radius.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={badge.art} alt="" loading="lazy" className="h-8 w-8 shrink-0 object-contain" />
      }
    />
  );
}

function CredentialGroup({ title, tone, children }: { title: string; tone: Tone; children: ReactNode }) {
  const style = TONE[tone];

  return (
    <div className={style.group}>
      <h3 className={style.title}>{title}</h3>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
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
        <CredentialGroup title={t.sections.certifications} tone="primary">
          {t.certifications.map((cert) => (
            <CertificationPill key={cert.name} cert={cert} />
          ))}
        </CredentialGroup>
      )}

      {t.badges.length > 0 && (
        <CredentialGroup title={t.sections.badges} tone="secondary">
          {t.badges.map((badge) => (
            <SkillBadgePill key={badge.name} badge={badge} />
          ))}
        </CredentialGroup>
      )}
    </section>
  );
}
