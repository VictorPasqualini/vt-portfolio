'use client';

import { useLocale } from '@/lib/i18n-context';

export default function Footer({ wide = false }: { wide?: boolean }) {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="footer-band border-t border-white/10 py-7">
      <div className={`mx-auto ${wide ? 'max-w-wide' : 'max-w-content'} px-6 font-mono text-[11px] uppercase tracking-[0.14em]`}>
        {t.meta.name} · © {year}. {t.footer.rights}
      </div>
    </footer>
  );
}
