import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#2563eb',
        ink: '#111111',
      },
      maxWidth: {
        content: '760px',
      },
    },
  },
  plugins: [],
};

export default config;
