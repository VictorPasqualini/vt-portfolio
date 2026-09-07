'use client';

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Locale, SiteContent } from './types';
import { en } from '@/content/en';
import { pt } from '@/content/pt';

const DICTIONARIES: Record<Locale, SiteContent> = { en, pt };
const STORAGE_KEY = 'vt-portfolio-locale';

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: SiteContent;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'en' || stored === 'pt') {
        setLocaleState(stored);
        return;
      }
    } catch {
      // localStorage unavailable, fall through to browser detection
    }

    const browserLanguages = window.navigator.languages ?? [window.navigator.language];
    const detected = browserLanguages.some((lang) => lang.toLowerCase().startsWith('pt')) ? 'pt' : 'en';
    setLocaleState(detected);
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore write failures (private mode, etc.)
    }
  };

  useEffect(() => {
    document.documentElement.lang = locale;
    // Locale is client-side only, so the static <title> from app/layout.tsx is
    // swapped here to match the language the visitor actually sees.
    document.title = DICTIONARIES[locale].meta.pageTitle;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t: DICTIONARIES[locale] }), [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within LocaleProvider');
  return ctx;
}
