'use client';

import { withEmphasis } from '@/lib/emphasis';
import { useLocale } from '@/lib/i18n-context';
import { ChevronDownIcon, DownloadIcon, GithubIcon, LinkedinIcon, MapPinIcon, WhatsappIcon } from '@/lib/icons';
import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL, resumeFor } from '@/lib/site';
import LetterCurtain from './LetterCurtain';

const SOCIAL_CLASS =
  'flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 text-fg-2 transition-colors hover:border-fg hover:text-fg';

export default function Hero() {
  const { locale, t } = useLocale();
  const resumeFile = resumeFor(locale);

  return (
    <section
      id="top"
      className="relative flex min-h-[calc(100svh-var(--header-h))] flex-col overflow-hidden"
    >
      <LetterCurtain />
      {/* One full screen, header excluded: the name and the portrait are the
          whole first impression, and anything showing under them turns that
          into a preview of the next section instead.

          `svh` on the section rather than `vh` so a mobile browser measures the
          viewport it actually leaves visible with its toolbars out. This row
          takes the space the meta strip below it does not want (`flex-1`) and
          centres in it; the padding is a floor, so a short screen pushes past
          the minimum instead of clipping. */}
      <div className="relative mx-auto grid w-full max-w-content flex-1 content-center items-center gap-8 px-6 py-12 sm:gap-12 sm:py-20 lg:grid-cols-[1fr_auto] lg:gap-16">
        {/* Tighter on a phone for the same reason as the padding above. */}
        <div className="flex flex-col gap-5 sm:gap-7">
          {/* The role, as a rule and a line of mono. It was a location badge in
              the accent, which announced the least interesting fact on the
              screen; the location is a footnote now and this says what he is
              before the name says who. */}
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-fg-3">
            <span aria-hidden className="h-px w-10 bg-accent" />
            {t.meta.role}
          </p>
          {/* The name is the largest thing on the page. It reads as one line of
              type set over two rows, so the surname carries the accent rather
              than a separate coloured word further down.

              Sized in vw so it still fills the column on a phone and stops
              growing before it outruns the 1080px measure on a wide screen. */}
          <h1 className="text-[clamp(3.25rem,9.5vw,7.5rem)] font-semibold leading-[0.88] tracking-[-0.05em]">
            {t.meta.firstName}
            <br />
            <span className="text-accent">{t.meta.lastName}</span>
          </h1>
          {/* Who he is and what he does, in one paragraph. Set above body size
              because it is the only prose on the first screen, and the words
              worth catching in a glance are marked in the copy itself. */}
          <p className="max-w-xl text-base leading-relaxed text-fg-2 sm:text-lg sm:leading-[1.7]">
            {withEmphasis(t.hero.tagline)}
          </p>
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
            what gives the portrait a footing on the page.

            Stacked above the name until lg, which is the usual way round on a
            phone, and small enough there that the name, the summary and the
            buttons all still land on the first screen. The order is visual
            only: in the markup the name comes first, which is the order a
            screen reader and a crawler read. */}
        <div className="relative order-first mx-auto w-40 shrink-0 sm:w-72 lg:order-none lg:mx-0 lg:w-[22rem]">
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

      {/* The bottom edge of the first screen, so that a full-height hero ends
          on a line instead of on whitespace. It carries the two things the
          removed badge was carrying — where he is, and that there is more
          below — and the arrow is a real link, not a decoration. */}
      <div className="relative mx-auto w-full max-w-content px-6 pb-8">
        <div className="flex items-center justify-between gap-4 border-t border-line/10 pt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3">
          <span className="flex items-center gap-2">
            <MapPinIcon className="h-3.5 w-3.5 text-accent" />
            {t.meta.location}
          </span>
          <a
            href="#about"
            aria-label={t.nav.about}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-line/15 transition-colors hover:border-fg/40 hover:text-fg"
          >
            <ChevronDownIcon className="h-4 w-4 motion-safe:animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
