import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import Analytics from '@/components/Analytics';
import { en } from '@/content/en';
import { GITHUB_URL, SITE_URL } from '@/lib/site';
import { ThemeProvider } from '@/lib/theme-context';
import './globals.css';

// Self-hosted at build time by next/font, which matters here: the export is
// static and previously named Inter in CSS without ever loading it, so the page
// silently fell back to whatever grotesk the visitor happened to have.
const sans = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', variable: '--font-mono' });

export const metadata: Metadata = {
  // Lets every page express canonical/OG URLs as absolute ones.
  metadataBase: new URL(SITE_URL),
  title: en.meta.pageTitle,
  description: en.meta.description,
  authors: [{ name: en.meta.name, url: GITHUB_URL }],
  creator: en.meta.name,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // This layout is shared by /en and /pt, so lang can only be a default here;
    // LocaleProvider corrects it on the client. The "dark" class is server-rendered
    // so the default theme never flashes light before ThemeProvider hydrates.
    <html lang="en" className={`dark ${sans.variable} ${mono.variable}`}>
      <body className="bg-bg font-sans text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
