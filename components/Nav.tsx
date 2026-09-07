'use client';

import { useLocale } from '@/lib/i18n-context';
import { useTheme } from '@/lib/theme-context';
import { SunIcon, MoonIcon } from '@/lib/icons';

const LINKS = [
  { id: 'experience', key: 'experience' as const },
  { id: 'projects', key: 'projects' as const },
  { id: 'skills', key: 'skills' as const },
  { id: 'education', key: 'education' as const },
  { id: 'contact', key: 'contact' as const },
];

export default function Nav() {
  const { locale, setLocale, t } = useLocale();
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b border-line/10 bg-bg/80 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {t.meta.name}
        </a>
        <nav className="hidden gap-5 text-sm text-fg/70 sm:flex">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="hover:text-fg">
              {t.nav[link.key]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
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
            className="relative flex h-7 w-[52px] shrink-0 items-center rounded-full border border-line/15 bg-soft/10 transition-colors"
          >
            <SunIcon className="absolute left-1.5 h-3.5 w-3.5 text-fg/40" />
            <MoonIcon className="absolute right-1.5 h-3.5 w-3.5 text-fg/40" />
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
            className="relative flex h-7 w-[52px] shrink-0 items-center rounded-full border border-line/15 bg-soft/10 text-[10px] font-semibold transition-colors"
          >
            <span className="absolute left-1.5 text-fg/40">EN</span>
            <span className="absolute right-1.5 text-fg/40">PT</span>
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
