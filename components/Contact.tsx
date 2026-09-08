'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { CheckIcon, CopyIcon, GithubIcon, LinkedinIcon, WhatsappIcon } from '@/lib/icons';
import { CONTACT_EMAIL, GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '@/lib/site';

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
    <section id="contact" className="py-16">
      <h2 className="mb-4 text-xl font-semibold tracking-tight">{t.sections.contact}</h2>
      <p className="mb-6 max-w-lg text-sm leading-relaxed text-fg/70">{t.contact.intro}</p>
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center rounded-full border border-line/15 hover:border-fg">
          <a href={`mailto:${CONTACT_EMAIL}`} className="py-2 pl-4 pr-3">
            {t.contact.emailLabel}: {CONTACT_EMAIL}
          </a>
          <button
            type="button"
            onClick={copyEmail}
            title={copied ? t.contact.copied : t.contact.copy}
            className="flex items-center gap-1.5 self-stretch border-l border-line/15 py-2 pl-3 pr-4 text-fg/60 transition-colors hover:text-fg"
          >
            {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
            <span className="text-xs" aria-live="polite">
              {copied ? t.contact.copied : t.contact.copy}
            </span>
          </button>
        </div>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 hover:border-fg"
        >
          <LinkedinIcon className="h-4 w-4" />
          LinkedIn
        </a>
        <a
          href={GITHUB_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 hover:border-fg"
        >
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-line/15 px-4 py-2 hover:border-fg"
        >
          <WhatsappIcon className="h-4 w-4" />
          WhatsApp
        </a>
      </div>
    </section>
  );
}
