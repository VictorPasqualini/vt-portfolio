'use client';

import { HurcaneWidget } from 'hurcane-react';
import { useLocale } from '@/lib/i18n-context';
import { HURCANE_AGENT_IDS } from '@/lib/site';
import { useTheme, type Theme } from '@/lib/theme-context';

/**
 * The `--accent` token from app/globals.css, resolved to hex because the widget
 * renders in its own iframe and can't read the page's CSS variables.
 */
const ACCENT: Record<Theme, string> = { light: '#b45309', dark: '#d99e5c' };

/**
 * Floating Hurcane agent button.
 *
 * Each locale has its own agent, so switching language swaps the whole widget —
 * `key` forces the remount rather than letting React reuse an iframe still
 * pointing at the other language's agent.
 *
 * It also follows the site's theme toggle instead of the widget's own light
 * default, so the popup never opens light on a dark page.
 *
 * Everything it does happens in the browser (an iframe pointing at hurcane.com
 * plus one metadata request for the bubble icon), which is why this is a client
 * component and why the static export is unaffected.
 */
export default function HurcaneAgent() {
  const { locale } = useLocale();
  const { theme } = useTheme();
  const agentId = HURCANE_AGENT_IDS[locale];

  return <HurcaneWidget key={agentId} agentId={agentId} theme={theme} color={ACCENT[theme]} />;
}
