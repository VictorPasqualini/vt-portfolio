'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/lib/i18n-context';
import { useTheme } from '@/lib/theme-context';
import { DownloadIcon, SunIcon, MoonIcon } from '@/lib/icons';
import { resumeFor } from '@/lib/site';

const LINKS = [
  { id: 'experience', key: 'experience' as const },
  { id: 'projects', key: 'projects' as const },
  { id: 'skills', key: 'skills' as const },
  { id: 'education', key: 'education' as const },
  { id: 'contact', key: 'contact' as const },
];

/** How far below the sticky header a section counts as the one being read. */
const PROBE_OFFSET = 140;

/**
 * @param onHome false on a case study page, where the section ids do not exist:
 * the links become absolute so they navigate home first, and the scroll spy is
 * switched off because there is nothing for it to track.
 */
/** @param wide matches the header column to a page that uses the wide layout. */
export default function Nav({ onHome = true, wide = false }: { onHome?: boolean; wide?: boolean }) {
  const { locale, setLocale, t } = useLocale();
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState('');

  useEffect(() => {
    if (!onHome) return;

    const sync = () => {
      const probe = window.scrollY + PROBE_OFFSET;
      // Last section whose top has passed the probe line — sections are stacked
      // siblings, so the one furthest down that still qualifies is the one on
      // screen.
      let current = '';
      for (const link of LINKS) {
        const el = document.getElementById(link.id);
        if (el && el.offsetTop <= probe) current = link.id;
      }
      setActive(current);
    };

    sync();
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    return () => {
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [onHome]);

  const home = `/${locale}`;

  return (
    <header className="sticky top-0 z-50 border-b border-line/10 bg-bg/80 backdrop-blur">
      <div className={`mx-auto flex ${wide ? 'max-w-wide' : 'max-w-content'} items-center justify-between gap-4 px-6 py-4`}>
        {/* The short name: the header is the one row that cannot wrap, and the
            middle name buys nothing here — the hero and the footer still sign
            in full. */}
        <a href={onHome ? '#top' : home} className="text-sm font-semibold tracking-tight">
          {t.meta.shortName}
        </a>
        {/* Shown from md up, but tighter until lg: at 768px the name, the five
            labels and the three controls fill the row almost exactly, and the
            header is the one row on the page that cannot wrap. The smaller type
            and narrower gaps buy the breathing room back. */}
        <nav className="hidden gap-3 font-mono text-[10px] uppercase tracking-[0.1em] md:flex lg:gap-7 lg:text-xs lg:tracking-[0.14em]">
          {LINKS.map((link) => {
            const isActive = onHome && active === link.id;
            return (
              <a
                key={link.id}
                href={`${onHome ? '' : home}#${link.id}`}
                aria-current={isActive ? 'true' : undefined}
                className={`relative py-1 transition-colors ${isActive ? 'text-fg' : 'text-fg-2 hover:text-fg'}`}
              >
                {t.nav[link.key]}
                {/* The rule is always mounted and only scales in, so the label
                    never shifts when a section becomes the active one. */}
                <span
                  aria-hidden
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-200 ${
                    isActive ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2 text-sm lg:gap-3">
          {/* The one action the header exists to keep reachable: the hero's
              button scrolls away, this one does not. Same height and shape as
              the two toggles beside it, but painted like their selected knob —
              it belongs to that set of controls and is still the one thing in
              the header worth pressing. Below lg the label shortens to CV: the
              full word is what pushes this row past a tablet's width. */}
          <a
            href={resumeFor(locale)}
            download
            // Below lg the label reads CV, which a screen reader would spell
            // out letter by letter, so the name is written in full here.
            aria-label={`${t.nav.resume} (PDF)`}
            className="flex h-7 shrink-0 items-center justify-center gap-1.5 rounded-full border border-fg bg-fg px-2.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-bg shadow-sm transition-opacity hover:opacity-90 lg:gap-2 lg:px-3"
          >
            <span className="lg:hidden">CV</span>
            <span className="hidden lg:inline">{t.nav.resume}</span>
            <DownloadIcon className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            role="switch"
            aria-checked={theme === 'dark'}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label={
              theme === 'dark'
                ? locale === 'pt'
                  ? 'Tema escuro ativo — mudar para claro'
                  : 'Dark theme active — switch to light'
                : locale === 'pt'
                  ? 'Tema claro ativo — mudar para escuro'
                  : 'Light theme active — switch to dark'
            }
            className="relative flex h-7 w-[52px] shrink-0 items-center rounded-full border border-line/15 bg-surface transition-colors"
          >
            <SunIcon className="absolute left-1.5 h-3.5 w-3.5 text-fg-4" />
            <MoonIcon className="absolute right-1.5 h-3.5 w-3.5 text-fg-4" />
            <span
              className={`absolute left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-fg text-bg shadow-sm transition-transform duration-200 ease-out ${
                theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {theme === 'dark' ? <MoonIcon className="h-3.5 w-3.5" /> : <SunIcon className="h-3.5 w-3.5" />}
            </span>
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={locale === 'pt'}
            onClick={() => setLocale(locale === 'en' ? 'pt' : 'en')}
            aria-label={locale === 'en' ? 'English active — switch to Portuguese' : 'Português ativo — mudar para inglês'}
            className="relative flex h-7 w-[52px] shrink-0 items-center rounded-full border border-line/15 bg-surface text-[10px] font-semibold transition-colors"
          >
            <span className="absolute left-1.5 text-fg-4">EN</span>
            <span className="absolute right-1.5 text-fg-4">PT</span>
            <span
              className={`absolute left-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-fg text-bg shadow-sm transition-transform duration-200 ease-out ${
                locale === 'pt' ? 'translate-x-6' : 'translate-x-0'
              }`}
            >
              {locale === 'pt' ? 'PT' : 'EN'}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
