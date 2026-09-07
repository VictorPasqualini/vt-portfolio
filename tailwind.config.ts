import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: 'rgb(var(--accent) / <alpha-value>)',
        bg: 'rgb(var(--bg) / <alpha-value>)',
        fg: 'rgb(var(--fg) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        soft: 'rgb(var(--soft) / <alpha-value>)',
      },
      maxWidth: {
        content: '760px',
      },
    },
  },
  plugins: [],
};

export default config;
