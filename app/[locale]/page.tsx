import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import HurcaneAgent from '@/components/HurcaneAgent';
import { en } from '@/content/en';
import { pt } from '@/content/pt';
import { LocaleProvider } from '@/lib/i18n-context';
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  LOCALES,
  LOCALE_TAGS,
  SITE_URL,
  WHATSAPP_NUMBER,
  WHATSAPP_URL,
  resolveLocale,
} from '@/lib/site';
import type { Locale, SiteContent } from '@/lib/types';

const DICTIONARIES: Record<Locale, SiteContent> = { en, pt };

/** hreflang map, plus x-default pointing at English for everyone else. */
const LANGUAGE_ALTERNATES = {
  ...Object.fromEntries(LOCALES.map((locale) => [LOCALE_TAGS[locale], `${SITE_URL}/${locale}`])),
  'x-default': `${SITE_URL}/en`,
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = resolveLocale(params.locale);
  const t = DICTIONARIES[locale];
  const url = `${SITE_URL}/${locale}`;
  // Pre-rendered by `npm run og` — see scripts/render-og.mjs for why they are
  // committed files instead of a Next opengraph-image route.
  const image = {
    url: `${SITE_URL}/og-${locale}.png`,
    width: 1200,
    height: 630,
    alt: `${t.meta.name} — ${t.meta.role}`,
  };

  return {
    title: t.meta.pageTitle,
    description: t.meta.description,
    alternates: {
      canonical: url,
      languages: LANGUAGE_ALTERNATES,
    },
    openGraph: {
      type: 'profile',
      url,
      siteName: t.meta.name,
      title: t.meta.pageTitle,
      description: t.meta.description,
      locale: LOCALE_TAGS[locale].replace('-', '_'),
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title: t.meta.pageTitle,
      description: t.meta.description,
      images: [image],
    },
  };
}

export default function LocalePage({ params }: { params: { locale: string } }) {
  const locale = resolveLocale(params.locale);
  const t = DICTIONARIES[locale];

  // schema.org Person, so search engines and AI crawlers get the name, role and
  // profile links as data instead of having to infer them from the markup.
  const personLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: t.meta.name,
    alternateName: 'Victor Pasqualini',
    jobTitle: t.meta.role,
    description: t.meta.description,
    url: `${SITE_URL}/${locale}`,
    email: `mailto:${CONTACT_EMAIL}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'São Paulo',
      addressCountry: 'BR',
    },
    knowsLanguage: ['pt-BR', 'en'],
    knowsAbout: [
      'Data Engineering',
      'Apache Spark',
      'Apache Kafka',
      'Apache Airflow',
      'Databricks',
      'Amazon Web Services',
      'Google Cloud Platform',
      'Python',
      'Scala',
      'SQL',
    ],
    telephone: WHATSAPP_NUMBER,
    sameAs: [GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL],
  };

  return (
    <LocaleProvider initialLocale={locale}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      <main>
        <Nav />
        <div className="mx-auto max-w-content px-6">
          <Hero />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </div>
        <Footer />
      </main>
      <HurcaneAgent />
    </LocaleProvider>
  );
}
