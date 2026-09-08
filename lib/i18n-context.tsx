'use client';

import { useRouter } from 'next/navigation';
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
export function LocaleProvider({ initialLocale, children }: { initialLocale: Locale; children: ReactNode }) {
  const router = useRouter();
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
      // scroll: false — switching language is not navigating somewhere new, so
      // the reader should stay on the section they were reading. Without it the
      // App Router's default jumps both locale pages back to the top.
      router.push(`/${next}`, { scroll: false });
    },
    [router],
  );

  useEffect(() => {
    // app/layout.tsx is shared by both locales, so its prerendered lang="en" is
    // wrong on /pt until this runs. Same for the title on a client-side switch.
    document.documentElement.lang = locale;
    document.title = DICTIONARIES[locale].meta.pageTitle;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t: DICTIONARIES[locale] }), [locale, setLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
