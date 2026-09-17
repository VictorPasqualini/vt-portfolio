import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CaseStudyView from '@/components/CaseStudyView';
import HurcaneAgent from '@/components/HurcaneAgent';
import { caseStudies, getCaseStudy } from '@/content/case-studies';
import { projects } from '@/content/projects';
import { en } from '@/content/en';
import { pt } from '@/content/pt';
import { LocaleProvider } from '@/lib/i18n-context';
import { LOCALES, LOCALE_TAGS, SITE_URL, resolveLocale } from '@/lib/site';
import type { Locale, SiteContent } from '@/lib/types';

const DICTIONARIES: Record<Locale, SiteContent> = { en, pt };

/** Tab and Open Graph title for a case study, in one place. */
function titleFor(locale: Locale, projectName: string) {
  return `${projectName} — ${DICTIONARIES[locale].meta.name}`;
}

/** Every locale × every project that actually has a write-up. */
export function generateStaticParams() {
  return LOCALES.flatMap((locale) => caseStudies.map((study) => ({ locale, slug: study.slug })));
}

export function generateMetadata({ params }: { params: { locale: string; slug: string } }): Metadata {
  const locale = resolveLocale(params.locale);
  const study = getCaseStudy(params.slug);
  const project = projects.find((entry) => entry.slug === params.slug);
  if (!study || !project) return {};

  const title = titleFor(locale, project.name);
  const description = study[locale].tagline;
  const path = `projects/${study.slug}`;
  const url = `${SITE_URL}/${locale}/${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((other) => [LOCALE_TAGS[other], `${SITE_URL}/${other}/${path}`])),
        'x-default': `${SITE_URL}/en/${path}`,
      },
    },
    openGraph: {
      type: 'article',
      url,
      siteName: DICTIONARIES[locale].meta.name,
      title,
      description,
      locale: LOCALE_TAGS[locale].replace('-', '_'),
      // No per-case image is rendered yet, so the site card is reused rather
      // than letting the crawler fall back to nothing.
      images: [{ url: `${SITE_URL}/og-${locale}.png`, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${SITE_URL}/og-${locale}.png`],
    },
  };
}

export default function CaseStudyPage({ params }: { params: { locale: string; slug: string } }) {
  const locale = resolveLocale(params.locale);
  const study = getCaseStudy(params.slug);
  const project = projects.find((entry) => entry.slug === params.slug);
  // Unreachable with the params above, but it keeps the types honest and turns a
  // stale link into a 404 instead of a render crash.
  if (!study || !project) notFound();

  // Wraps around, so the last page still points forward instead of back.
  // Undefined while there is only one study, and the block is then not drawn.
  const position = caseStudies.findIndex((entry) => entry.slug === study.slug);
  const nextStudy = caseStudies[(position + 1) % caseStudies.length];
  const nextProject = projects.find((entry) => entry.slug === nextStudy.slug);
  const next = nextStudy.slug === study.slug || !nextProject ? undefined : { project: nextProject, study: nextStudy };

  const softwareLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.name,
    description: study[locale].tagline,
    codeRepository: project.githubUrl,
    programmingLanguage: project.language,
    url: `${SITE_URL}/${locale}/projects/${study.slug}`,
    author: {
      '@type': 'Person',
      name: DICTIONARIES[locale].meta.name,
      url: `${SITE_URL}/${locale}`,
    },
  };

  return (
    <LocaleProvider
      initialLocale={locale}
      titles={{
        en: titleFor('en', project.name),
        pt: titleFor('pt', project.name),
      }}
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }} />
      <CaseStudyView project={project} study={study} next={next} />
      <HurcaneAgent />
    </LocaleProvider>
  );
}
