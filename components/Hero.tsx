'use client';

import { useLocale } from '@/lib/i18n-context';
import { DownloadIcon, GithubIcon, LinkedinIcon, MapPinIcon, WhatsappIcon } from '@/lib/icons';
import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL, resumeFor } from '@/lib/site';
import LetterCurtain from './LetterCurtain';

const SOCIAL_CLASS =
  'flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 text-fg-2 transition-colors hover:border-fg hover:text-fg';

export default function Hero() {
  const { locale, t } = useLocale();
  const resumeFile = resumeFor(locale);

  return (
    <section id="top" className="relative overflow-hidden">
      <LetterCurtain />
      <div className="relative mx-auto grid max-w-content items-center gap-12 px-6 py-20 sm:py-28 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div className="flex flex-col gap-7">
          {/* Where he is matters to whoever is hiring, so it is a badge in the
              accent rather than a grey line above the name. */}
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            <MapPinIcon className="h-3.5 w-3.5" />
            {t.meta.location}
          </p>
          {/* Sized in vw so the name still fills the column on a phone and stops
              growing before it outruns the 1080px measure on a wide screen. */}
          <h1 className="text-[clamp(2.5rem,6vw,4.25rem)] font-medium leading-[0.95] tracking-[-0.045em]">
            {t.hero.greeting}
            <br />
            <span className="text-accent">{t.meta.role}.</span>
          </h1>
          <p className="max-w-xl leading-relaxed text-fg-2">{t.hero.summary}</p>
          <div className="flex flex-wrap gap-3 text-sm">
            {/* `download` makes the arrow icon tell the truth: the browser saves
                the PDF (under its already descriptive filename) instead of
                opening it in a viewer tab. */}
            <a
              href={resumeFile}
              download
              className="flex items-center gap-2 rounded-full bg-accent px-5 py-2 font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              <DownloadIcon className="h-4 w-4" />
              {t.nav.resume} (PDF)
            </a>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={SOCIAL_CLASS}>
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={SOCIAL_CLASS}>
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
            <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={SOCIAL_CLASS}>
              <WhatsappIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* The source picture is a cut-out that stops in a straight line
            across the chest. A disc turns that into a frame: nothing is left
            hanging, the crop is deliberate, and the accent ring outside it is
            what gives the portrait a footing on the page. */}
        <div className="relative mx-auto w-60 shrink-0 sm:w-72 lg:mx-0 lg:w-80">
          <span aria-hidden className="absolute -inset-3 rounded-full border border-accent/50" />
          {/* The disc is filled: the subject is cut out on transparency, and
              without a fill the curtain would run through the portrait rather
              than behind it. */}
          <div className="relative aspect-square overflow-hidden rounded-full bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/victor.webp"
              alt={t.meta.name}
              width={768}
              height={979}
              // object-top, not centre: the square crop is taken from the top
              // of a portrait frame, which is where the face is.
              className="h-full w-full object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
