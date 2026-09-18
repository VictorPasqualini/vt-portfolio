'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from '@/lib/icons';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/lib/site';
import Section from './Section';

/**
 * Until sm the three pills split one row between them, so each is a third of
 * the address above it: flex-1 for the width, and smaller type and padding
 * because a third of a 320px screen is 87px. From sm they go back to being as
 * wide as their words.
 */
const LINK_CLASS =
  'flex h-10 min-w-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line/15 bg-bg px-1 text-[11px] text-fg-2 transition-colors hover:border-fg hover:text-fg sm:flex-none sm:gap-2 sm:px-4 sm:text-sm';

const LINK_ICON = 'h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4';

export default function Contact() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);

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

  return (
    <Section id="contact" index="05" title={t.sections.contact} band>
      <p className="-mt-4 mb-8 max-w-lg leading-relaxed text-fg-2">{t.contact.intro}</p>
      {/* Stacked on a phone, one row from sm. w-fit keeps the stack as wide as
          the address and no wider — the three links line up with it instead of
          being stretched across the screen — and max-w-full caps that at the
          screen when the address alone is wider. */}
      <div className="flex w-fit max-w-full flex-col gap-3 text-sm sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
        {/* A breakable address: the pill is wider than a 320px screen, and
            without this it pushes the whole page sideways instead of growing a
            second line. */}
        <div className="flex w-full max-w-full items-center rounded-full border border-line/15 bg-bg transition-colors hover:border-fg sm:w-auto">
          {/* flex-1 for the wrapped case, where the pill is wider than the
              address: it keeps the copy button pinned to the right edge. */}
          <a href={`mailto:${CONTACT_EMAIL}`} className="min-w-0 flex-1 break-all py-2 pl-4 pr-3 sm:flex-none">
            {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            title={copied ? t.contact.copied : t.contact.copy}
            className="flex shrink-0 items-center gap-1.5 self-stretch border-l border-line/15 py-2 pl-3 pr-4 text-fg-3 transition-colors hover:text-fg"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            <span className="font-mono text-[11px]" aria-live="polite">
              {copied ? t.contact.copied : t.contact.copy}
            </span>
          </button>
        </div>
        <div className="flex w-full items-center gap-2 sm:w-auto sm:gap-3">
          <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            <LinkedinIcon className={LINK_ICON} />
            LinkedIn
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            <GithubIcon className={LINK_ICON} />
            GitHub
          </a>
          <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
            <WhatsappIcon className={LINK_ICON} />
            WhatsApp
          </a>
        </div>
      </div>
    </Section>
  );
}
