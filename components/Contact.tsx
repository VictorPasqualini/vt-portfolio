'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, MapPinIcon, WhatsappIcon } from '@/lib/icons';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, LOCALE_TAGS, WHATSAPP_URL } from '@/lib/site';
import type { Locale } from '@/lib/types';
import Footer from './Footer';
import Section from './Section';

/** Where the clock in the aside is telling the time for. */
const TIME_ZONE = 'America/Sao_Paulo';

const ASIDE_LABEL = 'font-mono text-[11px] uppercase tracking-[0.16em] text-fg-3';

/**
 * One channel, as a pill. Back to the shape the section had before the
 * rebuild: a row of outlined pills that are obviously links, rather than a
 * four-cell grid that reads as a table of data. A pill is also the only shape
 * that takes the brand mark and its name on one line, which is what makes the
 * row scannable without labels above it.
 */
const PILL =
  'flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 transition-colors hover:border-fg/50 hover:text-fg';

function Channel({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: (props: { className?: string }) => JSX.Element;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className={PILL}>
      <Icon className="h-4 w-4" />
      {label}
    </a>
  );
}

/**
 * The time where he is, refreshed on the minute.
 *
 * Rendered as a placeholder until the effect runs: the server has no way to
 * know what `new Date()` will say in the browser, and printing a time during
 * the render would be a hydration mismatch every single load.
 */
function useLocalTime(locale: Locale) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = new Intl.DateTimeFormat(LOCALE_TAGS[locale], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: TIME_ZONE,
    });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const timer = setInterval(tick, 30_000);
    return () => clearInterval(timer);
  }, [locale]);

  return time;
}

export default function Contact() {
  const { t, locale } = useLocale();
  const [copied, setCopied] = useState(false);
  const localTime = useLocalTime(locale);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
    } catch {
      // Clipboard blocked (insecure origin, denied permission) — the address is
      // right there as a mailto link, so there is nothing to fall back to.
    }
  };

  // The footer is passed in rather than left as a band of its own: it is one
  // line of small print, and on its own background it read as a sixth
  // section. Inside this one it closes the page.
  return (
    <Section id="contact" index="05" heading={t.sections.contact} band footer={<Footer />}>
      {/* The invitation, set at hero scale. No button beside it: the address is
          in the row below and is the same action, and a disc that large next to
          the headline made the reader choose between two versions of one
          thing. */}
      <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end md:gap-16">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="text-[clamp(2rem,5.5vw,4rem)] font-medium leading-[0.98] tracking-[-0.04em]">
            {t.contact.headline.map((line, index) => (
              <span key={line} className="block">
                {index === t.contact.headline.length - 1 ? <span className="text-accent">{line}</span> : line}
              </span>
            ))}
          </p>
          <p className="max-w-xl text-base leading-relaxed text-fg-2">{t.contact.intro}</p>
        </div>

        {/* What the headline leaves out: where he is, and what time it is
            there — the two things worth knowing before writing to someone in
            another timezone. The clock is the one number on the page that
            moves, which is what keeps this column from reading as filler. The
            résumé is not repeated here; it is a button in the header on every
            screen. */}
        <div className="flex shrink-0 flex-col gap-2 md:items-end md:text-right">
          <span className={`flex items-center gap-2 ${ASIDE_LABEL}`}>
            <MapPinIcon className="h-3.5 w-3.5" />
            {t.meta.location}
          </span>
          {/* Tabular figures: proportional ones make the whole clock jump
              sideways every time a 1 comes or goes. */}
          <span className="font-mono text-[clamp(2.5rem,6vw,3.5rem)] font-medium leading-none tracking-tight tabular-nums">
            {localTime ?? '--:--'}
          </span>
          <span className={ASIDE_LABEL}>{t.contact.localTime}</span>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap gap-3 text-sm">
        {/* The email pill is split rather than doubled: the address is the
            link, the copy control sits behind a hairline in the same pill. A
            button cannot be nested inside an anchor, which is why this one is
            assembled by hand instead of going through Channel. */}
        <div className="flex items-center rounded-full border border-line/15 transition-colors hover:border-fg/50">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="min-w-0 truncate py-2 pl-4 pr-3 transition-colors hover:text-accent"
          >
            {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            title={copied ? t.contact.copied : t.contact.copy}
            className="flex items-center gap-1.5 self-stretch border-l border-line/15 py-2 pl-3 pr-4 text-fg-3 transition-colors hover:text-fg"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            <span className="text-xs" aria-live="polite">
              {copied ? t.contact.copied : t.contact.copy}
            </span>
          </button>
        </div>
        <Channel href={LINKEDIN_URL} label="LinkedIn" icon={LinkedinIcon} />
        <Channel href={GITHUB_URL} label="GitHub" icon={GithubIcon} />
        <Channel href={WHATSAPP_URL} label="WhatsApp" icon={WhatsappIcon} />
      </div>
    </Section>
  );
}
