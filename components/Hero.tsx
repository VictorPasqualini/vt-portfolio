'use client';

import { useLocale } from '@/lib/i18n-context';
import { DownloadIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from '@/lib/icons';
import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/lib/site';
import LetterCurtain from './LetterCurtain';

export default function Hero() {
  const { locale, t } = useLocale();
  const resumeFile =
    locale === 'pt' ? '/resumes/Curriculo_VictorRamosPasqualini.pdf' : '/resumes/Resume_VictorRamosPasqualini.pdf';

  return (
    <section id="top" className="relative py-16 sm:py-24">
      <LetterCurtain />
      <div className="relative flex flex-col gap-6">
        <p className="text-sm text-fg/50">{t.meta.location}</p>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {t.hero.greeting} <span className="text-fg/60">{t.meta.role}.</span>
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-fg/70">{t.hero.summary}</p>
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-line/15 bg-bg px-4 py-2 hover:border-fg"
          >
            <GithubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-line/15 bg-bg px-4 py-2 hover:border-fg"
          >
            <LinkedinIcon className="h-4 w-4" />
            LinkedIn
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-full border border-line/15 bg-bg px-4 py-2 hover:border-fg"
          >
            <WhatsappIcon className="h-4 w-4" />
            WhatsApp
          </a>
          {/* `download` makes the arrow icon tell the truth: the browser saves the
              PDF (under its already descriptive filename) instead of opening it
              in a viewer tab. */}
          <a
            href={resumeFile}
            download
            className="flex items-center gap-2 rounded-full bg-fg px-4 py-2 text-bg hover:opacity-80"
          >
            <DownloadIcon className="h-4 w-4" />
            {t.nav.resume} (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
