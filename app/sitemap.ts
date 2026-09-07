import type { MetadataRoute } from 'next';
import { LOCALES, LOCALE_TAGS, SITE_URL } from '@/lib/site';

// Emitted as a static /sitemap.xml by the export build. "/" is left out on
// purpose: it only redirects and is marked noindex.
//
// Note: `next dev` answers 500 here ("missing exported function
// generateStaticParams", because it routes the sitemap as a dynamic
// /sitemap.xml/[[...id]] and `output: 'export'` demands params for it). Only the
// dev server is affected — `npm run build` writes the file correctly. Check the
// real output in out/sitemap.xml.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? 1 : 0.9,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((other) => [LOCALE_TAGS[other], `${SITE_URL}/${other}`])),
    },
  }));
}
