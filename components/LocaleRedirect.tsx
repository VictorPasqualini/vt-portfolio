'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { detectLocale } from '@/lib/i18n-context';

/**
 * The content lives at /en and /pt; "/" only picks one. Visible for the instant
 * before the redirect fires, and permanently for visitors without JavaScript,
 * who would otherwise get a blank page.
 */
export default function LocaleRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${detectLocale()}`);
  }, [router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-sm text-fg/50">Victor Pasqualini — Data Engineer</p>
      <div className="flex gap-3 text-sm">
        <a href="/en" className="rounded-full border border-line/15 px-4 py-2 hover:border-fg">
          English
        </a>
        <a href="/pt" className="rounded-full border border-line/15 px-4 py-2 hover:border-fg">
          Português
        </a>
      </div>
    </main>
  );
}
