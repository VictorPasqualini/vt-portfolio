'use client';

import { useLocale } from '@/lib/i18n-context';
import Section from './Section';

/**
 * Section 04: the academic record, and only that.
 *
 * Certifications used to sit under this list. One certification under four
 * degrees read as an afterthought; beside the core stack in section 01 it
 * reads as evidence for the stack, which is what it is. Skill badges moved to
 * Skills for the same reason.
 */
export default function Education() {
  const { t } = useLocale();

  return (
    <Section id="education" index="04" heading={t.sections.education}>
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
    </Section>
  );
}
