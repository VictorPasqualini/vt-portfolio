import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        // Carries the small uppercase labels — section indexes, periods, nav —
        // so they read as an editorial layer instead of as shrunken body text.
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        accent: 'rgb(var(--accent) / <alpha-value>)',
        'accent-fg': 'rgb(var(--accent-fg) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        'fg-2': 'rgb(var(--fg-2) / <alpha-value>)',
        'fg-3': 'rgb(var(--fg-3) / <alpha-value>)',
        'fg-4': 'rgb(var(--fg-4) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
      },
      borderRadius: {
        // Cards and credential pills. Deliberately tight: the only round things
        // on the page are the ones that really are pills (tags, toggles, CTA).
        card: '6px',
      },
      maxWidth: {
        content: '1080px',
        // The case study layout runs a sticky card beside the prose, which needs
        // more room than a single reading column does.
        wide: '1240px',
      },
    },
  },
  plugins: [],
};

export default config;
