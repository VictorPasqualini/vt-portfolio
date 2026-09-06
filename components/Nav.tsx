'use client';

import { useLocale } from '@/lib/i18n-context';

const LINKS = [
  { id: 'experience', key: 'experience' as const },
  { id: 'projects', key: 'projects' as const },
  { id: 'skills', key: 'skills' as const },
  { id: 'education', key: 'education' as const },
  { id: 'contact', key: 'contact' as const },
];

export default function Nav() {
  const { locale, setLocale, t } = useLocale();

  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-4">
        <a href="#top" className="text-sm font-semibold tracking-tight">
          {t.meta.name}
        </a>
        <nav className="hidden gap-5 text-sm text-black/70 sm:flex">
          {LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} className="hover:text-black">
              {t.nav[link.key]}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex overflow-hidden rounded-full border border-black/15 text-xs">
            <button
              onClick={() => setLocale('en')}
              aria-pressed={locale === 'en'}
              className={`px-2 py-1 ${locale === 'en' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale('pt')}
              aria-pressed={locale === 'pt'}
              className={`px-2 py-1 ${locale === 'pt' ? 'bg-black text-white' : 'text-black/60 hover:text-black'}`}
            >
              PT
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
