import type { Locale } from './types';

/**
 * Absolute origin the site is served from. Everything that has to be absolute —
 * canonical URLs, hreflang alternates, sitemap entries, Open Graph tags — is
 * built from it.
 *
 * Nothing is deployed yet, so this falls back to a placeholder. Set
 * NEXT_PUBLIC_SITE_URL in the Vercel project settings to the real deployment
 * domain; it is inlined at build time, so changing it needs a rebuild.
 *
 * A variable that exists but holds an empty string counts as unset — that is how
 * hosting dashboards store a variable created without a value, and `??` would
 * happily pass the empty string through to `new URL()` in app/layout.tsx, which
 * throws ERR_INVALID_URL and fails the whole build.
 */
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const SITE_URL = (configuredSiteUrl || 'https://victorpasqualini.vercel.app').replace(/\/+$/, '');

/** Every locale that gets its own URL. Order matters: the first one is the default. */
export const LOCALES: readonly Locale[] = ['en', 'pt'];

/** BCP 47 tags for hreflang and Open Graph, which want more than the bare language. */
export const LOCALE_TAGS: Record<Locale, string> = { en: 'en-US', pt: 'pt-BR' };

export const CONTACT_EMAIL = 'victor.pasqualini@outlook.com';
export const GITHUB_URL = 'https://github.com/VictorPasqualini';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/victor-pasqualini-b459b51b0/';

/**
 * WhatsApp, as the same phone number in two shapes: the one people read, and the
 * one wa.me needs (digits only, country code included — 55 for Brazil).
 */
export const WHATSAPP_NUMBER = '+55 11 99735-6148';
export const WHATSAPP_URL = 'https://wa.me/5511997356148';

/**
 * The MongoDB SI Associate certificate PDF, as issued. It is the same document
 * in both locales, so it lives here instead of being duplicated in content/.
 */
export const MONGODB_CERTIFICATE_URL =
  'https://ti-user-certificates.s3.amazonaws.com/ae62dcd7-abdc-4e90-a570-83eccba49043/86bec6ac-b1ee-4832-8fb9-08ceba5c908e-victor-ramos-pasqualini-4ac01021-586b-4780-ba40-c917289b580f-certificate.pdf';

/**
 * Credly verification pages for the MongoDB skill badges, keyed by the art
 * vendored under public/badges/. Credly's own embed is a fixed-size iframe
 * injected by a third-party script, which neither the static export nor the dark
 * theme get on well with, so the art is served from here and these URLs are only
 * what the badges link out to.
 */
/**
 * Accredible verification pages, one per credential. Both issuers host on
 * Accredible under their own domain, and both pages are client-rendered, so
 * there is nothing to scrape from them — the names and years below live in the
 * content files and have to be kept right by hand.
 */
export const CERTIFICATE_URLS = {
  databricksFundamentals:
    'https://credentials.databricks.com/5ff71246-0ed0-4f7b-8a36-2275a5cdbd8c#acc.x2DEWwuj',
  confluentFlinkEngineer:
    'https://certificates.confluent.io/eb151eb7-e858-4607-a9f5-1d5885f5ef91#acc.C4WIa82H',
} as const;

export const CREDLY_BADGE_URLS = {
  mongodbOverview: 'https://www.credly.com/badges/c0c168d2-8a50-4a16-81c1-977c5a6fa12a/public_url',
  mongodbDocumentModel: 'https://www.credly.com/badges/bbd164cc-0e82-45f3-b249-9cfb7d4cd1bd/public_url',
  mongodbClusterReliability: 'https://www.credly.com/badges/43769d0f-9614-4fc5-bbbc-b332bc52a337/public_url',
} as const;

/**
 * Hurcane agent embedded by components/HurcaneAgent.tsx — one per locale, since
 * each agent is configured to answer in its own language. The ids are visible in
 * the page anyway (the widget puts them in an iframe URL), so they are constants
 * rather than environment variables.
 */
export const HURCANE_AGENT_IDS: Record<Locale, string> = {
  en: 'pasu-1788828686223',
  pt: 'pasu-1788825510599',
};

/**
 * The résumé PDF for a locale, under public/resumes. Two places link to it —
 * the hero and the header — and the filenames are not a pattern, so they are
 * resolved here instead of being spelled out at each call site.
 */
export function resumeFor(locale: Locale): string {
  return locale === 'pt'
    ? '/resumes/Curriculo_VictorRamosPasqualini.pdf'
    : '/resumes/Resume_VictorRamosPasqualini.pdf';
}

/** Narrows an unknown route segment to a supported locale, defaulting to English. */
export function resolveLocale(segment: string): Locale {
  return segment === 'pt' ? 'pt' : 'en';
}
