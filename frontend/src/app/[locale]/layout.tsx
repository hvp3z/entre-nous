import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import { PWAInstall } from '@/components/common/PWAInstall';
import { OfflineIndicator } from '@/components/common/OfflineIndicator';
import { Analytics } from '@/components/common/Analytics';
import { Footer } from '@/components/common/Footer';
import '../globals.css';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Le Middle - Point de rencontre Paris & petite couronne',
  description: 'Trouvez le lieu parfait pour vous retrouver en transport en commun. Paris et petite couronne (75, 92, 93, 94) - Île-de-France. Find the perfect equidistant meeting spot in Paris and inner suburbs.',
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Le Middle',
  },
  keywords: ['Paris', 'petite couronne', 'point de rencontre', 'meeting point', 'équidistant', 'transport en commun', 'métro', 'Île-de-France'],
  openGraph: {
    title: 'Le Middle - Point de rencontre Paris & petite couronne',
    description: 'Trouvez le lieu parfait pour vous retrouver en transport en commun à Paris et petite couronne.',
    locale: 'fr_FR',
    alternateLocale: 'en_US',
    type: 'website',
  },
};

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#0f172a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Le Middle" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <OfflineIndicator />
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <PWAInstall />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}

