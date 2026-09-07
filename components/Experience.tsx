'use client';

import { useLocale } from '@/lib/i18n-context';

export default function Experience() {
  const { t } = useLocale();

  return (
    <section id="experience" className="py-16">
      <h2 className="mb-8 text-xl font-semibold tracking-tight">{t.sections.experience}</h2>
      <ol className="space-y-10 border-l border-line/10 pl-6">
        {t.experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            <span className="absolute -left-[29px] top-1.5 h-2 w-2 rounded-full bg-fg" />
            <p className="text-xs uppercase tracking-wide text-fg/50">{job.period}</p>
            <h3 className="mt-1 text-base font-medium">
              {job.role} · <span className="text-fg/70">{job.company}</span>
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg/70">{job.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {job.stack.map((tech) => (
                <span key={tech} className="rounded-full bg-soft/10 px-2.5 py-1 text-xs text-fg/70">
                  {tech}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
