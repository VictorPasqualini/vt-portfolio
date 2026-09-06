'use client';

import { useLocale } from '@/lib/i18n-context';

export default function Footer() {
  const { t } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 py-8">
      <div className="mx-auto max-w-content px-6 text-xs text-black/50">
        {t.meta.name} — © {year}. {t.footer.rights}
      </div>
    </footer>
  );
}
