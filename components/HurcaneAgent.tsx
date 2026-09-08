'use client';

import { HurcaneWidget } from 'hurcane-react';
import { HURCANE_AGENT_ID } from '@/lib/site';
import { useTheme, type Theme } from '@/lib/theme-context';

/**
 * The `--accent` token from app/globals.css, resolved to hex because the widget
 * renders in its own iframe and can't read the page's CSS variables.
 */
const ACCENT: Record<Theme, string> = { light: '#b45309', dark: '#d99e5c' };

/**
 * Floating Hurcane agent button. It follows the site's theme toggle rather than
 * the widget's own default, so the popup never opens light on a dark page.
 *
 * Everything it does happens in the browser (an iframe pointing at hurcane.com
 * plus one metadata request for the bubble icon), which is why this is a client
 * component and why the static export is unaffected.
 */
export default function HurcaneAgent() {
  const { theme } = useTheme();

  return <HurcaneWidget agentId={HURCANE_AGENT_ID} theme={theme} color={ACCENT[theme]} />;
}
