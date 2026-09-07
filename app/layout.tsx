import type { Metadata } from 'next';
import { LocaleProvider } from '@/lib/i18n-context';
import { ThemeProvider } from '@/lib/theme-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Victor Ramos Pasqualini — Data Engineer',
  description:
    'Data Engineer with 5+ years of experience building robust pipelines in cloud architectures (AWS/GCP), specialized in Spark, Kafka and Airflow.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Server-rendered with the "dark" class already applied so the default theme
    // (dark) never flashes light before ThemeProvider hydrates and takes over.
    <html lang="en" className="dark">
      <body className="bg-bg font-sans text-fg antialiased">
        <ThemeProvider>
          <LocaleProvider>{children}</LocaleProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
