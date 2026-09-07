import type { Metadata } from 'next';
import Analytics from '@/components/Analytics';
import { en } from '@/content/en';
import { GITHUB_URL, SITE_URL } from '@/lib/site';
import { ThemeProvider } from '@/lib/theme-context';
import './globals.css';

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
    <html lang="en" className="dark">
      <body className="bg-bg font-sans text-fg antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
