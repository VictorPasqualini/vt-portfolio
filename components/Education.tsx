'use client';

import { useLocale } from '@/lib/i18n-context';

export default function Education() {
  const { t } = useLocale();

  return (
    <section id="education" className="py-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{t.sections.education}</h2>
      <ul className="space-y-4">
        {t.education.map((entry) => (
          <li key={`${entry.institution}-${entry.period}`} className="flex flex-col gap-0.5">
            <p className="text-xs uppercase tracking-wide text-black/50">{entry.period}</p>
            <p className="text-sm font-medium">{entry.institution}</p>
            <p className="text-sm text-black/70">{entry.program}</p>
          </li>
        ))}
      </ul>

      {t.certifications.length > 0 && (
        <div className="mt-8">
          <h3 className="mb-2 text-sm font-medium text-black/50">{t.sections.certifications}</h3>
          <ul className="list-inside list-disc text-sm text-black/70">
            {t.certifications.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
