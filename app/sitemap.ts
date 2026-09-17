import type { MetadataRoute } from 'next';
import { caseStudies } from '@/content/case-studies';
import { LOCALES, LOCALE_TAGS, SITE_URL } from '@/lib/site';

/** Same entry in every locale, with the hreflang map pointing at its siblings. */
function entry(path: string, priority: number, lastModified: Date): MetadataRoute.Sitemap {
  return LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}${path}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: locale === 'en' ? priority : priority - 0.1,
    alternates: {
      languages: Object.fromEntries(LOCALES.map((other) => [LOCALE_TAGS[other], `${SITE_URL}/${other}${path}`])),
    },
  }));
}

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

  return [
    ...entry('', 1, lastModified),
    ...caseStudies.flatMap((study) => entry(`/projects/${study.slug}`, 0.8, lastModified)),
  ];
}
