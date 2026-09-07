'use client';

import { useLocale } from '@/lib/i18n-context';
import { GithubIcon, LinkedinIcon } from '@/lib/icons';

export default function Contact() {
  const { t } = useLocale();

  return (
    <section id="contact" className="py-16">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{t.sections.contact}</h2>
      <p className="mb-6 max-w-lg text-sm leading-relaxed text-fg/70">{t.contact.intro}</p>
      <div className="flex flex-wrap gap-4 text-sm">
        <a href="mailto:victor.pasqualini@outlook.com" className="rounded-full border border-line/15 px-4 py-2 hover:border-fg">
          {t.contact.emailLabel}: victor.pasqualini@outlook.com
        </a>
        <a
          href="https://www.linkedin.com/in/victor-ramos-pasqualini-b459b51b0"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 hover:border-fg"
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href="https://github.com/VictorPasqualini"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 hover:border-fg"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
      </div>
    </section>
  );
}
