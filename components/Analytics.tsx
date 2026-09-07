import Script from 'next/script';

/**
 * Opt-in, provider-agnostic analytics: nothing is injected unless
 * NEXT_PUBLIC_ANALYTICS_SRC is set at build time, so local builds and anyone
 * cloning the repo ship no third-party script at all.
 *
 * Umami reads data-website-id and Plausible reads data-domain; each ignores the
 * other's attribute, so one tag covers both. See .env.example for the values.
 */
export default function Analytics() {
  const src = process.env.NEXT_PUBLIC_ANALYTICS_SRC;
  if (!src) return null;

  return (
    <Script
      src={src}
      defer
      data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_WEBSITE_ID}
      data-domain={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
    />
  );
}
