'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from '@/lib/icons';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/lib/site';
import Section from './Section';

/**
 * Smaller and tighter until sm, where the three pills have to share a 320px
 * screen: same pill, same words, just enough shaved off the padding and the
 * type to fit them on one line.
 */
const LINK_CLASS =
  'flex h-10 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-line/15 bg-bg px-2 text-[11px] text-fg-2 transition-colors hover:border-fg hover:text-fg sm:gap-2 sm:px-4 sm:text-sm';

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
      {/* Stacked on a phone, one row from sm: the address takes its own line so
          the three links can sit together underneath it. */}
      <div className="flex flex-col items-start gap-3 text-sm sm:flex-row sm:flex-wrap sm:items-center">
        {/* max-w-full and a breakable address: the pill is wider than a 320px
            screen, and without these it pushes the whole page sideways instead
            of growing a second line. */}
        <div className="flex max-w-full items-center rounded-full border border-line/15 bg-bg transition-colors hover:border-fg">
          <a href={`mailto:${CONTACT_EMAIL}`} className="min-w-0 break-all py-2 pl-4 pr-3">
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
        <div className="flex items-center gap-2 sm:gap-3">
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
