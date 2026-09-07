'use client';

import { useLocale } from '@/lib/i18n-context';

export default function Hero() {
  const { locale, t } = useLocale();
  const resumeFile =
    locale === 'pt' ? '/resumes/Curriculo_VictorRamosPasqualini.pdf' : '/resumes/Resume_VictorRamosPasqualini.pdf';

  return (
    <section id="top" className="flex flex-col gap-6 py-16 sm:py-24">
      <p className="text-sm text-fg/50">{t.meta.location}</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {t.hero.greeting} <span className="text-fg/60">{t.meta.role}.</span>
      </h1>
      <p className="max-w-xl text-base leading-relaxed text-fg/70">{t.hero.summary}</p>
      <div className="flex flex-wrap gap-4 text-sm">
        <a
          href="https://github.com/VictorPasqualini"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line/15 px-4 py-2 hover:border-fg"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/victor-ramos-pasqualini-b459b51b0"
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-line/15 px-4 py-2 hover:border-fg"
        >
          LinkedIn
        </a>
        <a href={resumeFile} target="_blank" rel="noreferrer" className="rounded-full bg-fg px-4 py-2 text-bg hover:opacity-80">
          {t.nav.resume} (PDF)
        </a>
      </div>
    </section>
  );
}
