import type { Metadata } from 'next';
import { LocaleProvider } from '@/lib/i18n-context';
import './globals.css';

export const metadata: Metadata = {
  title: 'Victor Ramos Pasqualini — Data Engineer',
  description:
    'Data Engineer with 5+ years of experience building robust pipelines in cloud architectures (AWS/GCP), specialized in Spark, Kafka and Airflow.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
