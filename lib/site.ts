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

/** Narrows an unknown route segment to a supported locale, defaulting to English. */
export function resolveLocale(segment: string): Locale {
  return segment === 'pt' ? 'pt' : 'en';
}
