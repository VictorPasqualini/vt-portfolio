'use client';

import { useLocale } from '@/lib/i18n-context';

export default function Skills() {
  const { t } = useLocale();

  return (
    <section id="skills" className="py-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{t.sections.skills}</h2>
      <div className="grid gap-6 sm:grid-cols-2">
        {t.skills.map((group) => (
          <div key={group.label}>
            <h3 className="mb-2 text-sm font-medium text-black/50">{group.label}</h3>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="rounded-full bg-black/5 px-2.5 py-1 text-xs text-black/70">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
