import type { Metadata } from 'next';
import LocaleRedirect from '@/components/LocaleRedirect';
import { SITE_URL } from '@/lib/site';

// Entry point only: it forwards to /en or /pt, so it must not compete with them
// in search results — hence noindex plus a canonical pointing at the default.
export const metadata: Metadata = {
  alternates: { canonical: `${SITE_URL}/en` },
  robots: { index: false, follow: true },
};

export default function RootPage() {
  return <LocaleRedirect />;
}
