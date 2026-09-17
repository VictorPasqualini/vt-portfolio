'use client';

import { useLocale } from '@/lib/i18n-context';

export default function Footer({ wide = false }: { wide?: boolean }) {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/10 py-10">
      <div className={`mx-auto ${wide ? 'max-w-wide' : 'max-w-content'} px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-fg-3`}>
        {t.meta.name} — © {year}. {t.footer.rights}
      </div>
    </footer>
  );
}
