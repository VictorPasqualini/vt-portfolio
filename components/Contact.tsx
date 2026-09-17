'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from '@/lib/icons';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/lib/site';
import Section from './Section';

const LINK_CLASS =
  'flex items-center gap-2 rounded-full border border-line/15 bg-bg px-4 py-2 text-fg-2 transition-colors hover:border-fg hover:text-fg';

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
      <div className="flex flex-wrap gap-3 text-sm">
        <div className="flex items-center rounded-full border border-line/15 bg-bg transition-colors hover:border-fg">
          <a href={`mailto:${CONTACT_EMAIL}`} className="py-2 pl-4 pr-3">
            {t.contact.emailLabel}: {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            title={copied ? t.contact.copied : t.contact.copy}
            className="flex items-center gap-1.5 self-stretch border-l border-line/15 py-2 pl-3 pr-4 text-fg-3 transition-colors hover:text-fg"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            <span className="font-mono text-[11px]" aria-live="polite">
              {copied ? t.contact.copied : t.contact.copy}
            </span>
          </button>
        </div>
        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
        <a href={GITHUB_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
        <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className={LINK_CLASS}>
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </Section>
  );
}
