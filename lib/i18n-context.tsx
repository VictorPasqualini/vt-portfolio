'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Locale, SiteContent } from './types';
import { en } from '@/content/en';
import { pt } from '@/content/pt';

const DICTIONARIES: Record<Locale, SiteContent> = { en, pt };
const STORAGE_KEY = 'vt-portfolio-locale';

/**
 * Best guess for a visitor who hasn't picked a language yet: their stored
 * preference, then the browser's language list, then English. Only used by the
 * "/" entry page — every other page takes its locale from the URL.
 */
export function detectLocale(): Locale {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'pt') return stored;
  } catch {
    // localStorage unavailable (private mode, blocked storage) — fall through
  }

  const browserLanguages = window.navigator.languages ?? [window.navigator.language];
  return browserLanguages.some((lang) => lang.toLowerCase().startsWith('pt')) ? 'pt' : 'en';
}

function rememberLocale(locale: Locale) {
  try {
    window.localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    // ignore write failures (private mode, etc.)
  }
}

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: SiteContent;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

/**
 * The URL is the source of truth for the language: `initialLocale` comes from the
 * `[locale]` route segment, and switching languages navigates to the sibling URL
 * rather than only flipping state, so the address bar and the content never disagree.
 */
export function LocaleProvider({
  initialLocale,
  titles,
  children,
}: {
  initialLocale: Locale;
  /**
   * Document title per locale, for pages that are not the home page. Without it
   * a language switch on a case study page would retitle the tab with the home
   * page's title, since that is all the dictionary carries.
   */
  titles?: Record<Locale, string>;
  children: ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  // A client-side navigation between /en and /pt can reuse this provider
  // instance, so follow the segment instead of assuming a remount.
  useEffect(() => {
    setLocaleState(initialLocale);
    // Landing on a locale URL directly (a shared link, a bookmark) is an explicit
    // choice, so it also becomes the preference "/" will redirect to next time.
    rememberLocale(initialLocale);
  }, [initialLocale]);

  const setLocale = useCallback(
    (next: Locale) => {
      setLocaleState(next);
      rememberLocale(next);
      // Swap the locale segment and keep the rest of the path, so switching
      // language on a case study page stays on that case study instead of
      // dropping the reader back on the home page.
      const rest = pathname.split('/').slice(2).filter(Boolean).join('/');
      // scroll: false — switching language is not navigating somewhere new, so
      // the reader should stay on the section they were reading. Without it the
      // App Router's default jumps both locale pages back to the top.
      router.push(rest ? `/${next}/${rest}` : `/${next}`, { scroll: false });
    },
    [pathname, router],
  );

  useEffect(() => {
    // app/layout.tsx is shared by both locales, so its prerendered lang="en" is
    // wrong on /pt until this runs. Same for the title on a client-side switch.
    document.documentElement.lang = locale;
    document.title = titles ? titles[locale] : DICTIONARIES[locale].meta.pageTitle;
  }, [locale, titles]);

  const value = useMemo(() => ({ locale, setLocale, t: DICTIONARIES[locale] }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
