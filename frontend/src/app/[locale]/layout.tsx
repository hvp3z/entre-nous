import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales, Locale } from '@/i18n/request';
import { PWAInstall } from '@/components/common/PWAInstall';
import { OfflineIndicator } from '@/components/common/OfflineIndicator';
import { Analytics } from '@/components/common/Analytics';
import { Footer } from '@/components/common/Footer';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildWebApplicationJsonLd } from '@/components/seo/jsonLdBuilders';
import '../globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://le-middle.fr';

const ogLocaleMap: Record<Locale, string> = {
  fr: 'fr_FR',
  en: 'en_US',
};

const appDescriptions: Record<Locale, string> = {
  fr: 'Trouvez le lieu parfait pour vous retrouver en transport en commun à Paris et petite couronne (75, 92, 93, 94).',
  en: 'Find the perfect equidistant meeting spot by public transit in Paris and inner suburbs (75, 92, 93, 94).',
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const validLocale = locales.includes(locale as Locale) ? (locale as Locale) : 'fr';
  const canonicalUrl = `${SITE_URL}/${validLocale}`;

  const alternateLanguages: Record<string, string> = {};
  for (const l of locales) {
    alternateLanguages[l] = `${SITE_URL}/${l}`;
  }
  alternateLanguages['x-default'] = `${SITE_URL}/fr`;

  return {
    metadataBase: new URL(SITE_URL),
    title: 'Le Middle - Point de rencontre Paris & petite couronne',
    description:
      'Trouvez le lieu parfait pour vous retrouver en transport en commun. Paris et petite couronne (75, 92, 93, 94) - Île-de-France. Find the perfect equidistant meeting spot in Paris and inner suburbs.',
    manifest: '/site.webmanifest',
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: 'Le Middle',
    },
    keywords: [
      'Paris',
      'petite couronne',
      'point de rencontre',
      'meeting point',
      'équidistant',
      'transport en commun',
      'métro',
      'Île-de-France',
    ],
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title: 'Le Middle - Point de rencontre Paris & petite couronne',
      description:
        'Trouvez le lieu parfait pour vous retrouver en transport en commun à Paris et petite couronne.',
      url: canonicalUrl,
      locale: ogLocaleMap[validLocale],
      alternateLocale: locales
        .filter((l) => l !== validLocale)
        .map((l) => ogLocaleMap[l]),
      type: 'website',
    },
  };
}

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

  const validLocale = locale as Locale;
  const messages = await getMessages();
  const webAppJsonLd = buildWebApplicationJsonLd(
    SITE_URL,
    validLocale,
    appDescriptions[validLocale]
  );

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
        {/* Preconnect to critical third-party origins */}
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://maps.googleapis.com" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <>
            <link rel="preconnect" href="https://plausible.io" crossOrigin="anonymous" />
            <link rel="dns-prefetch" href="https://plausible.io" />
          </>
        )}
        {process.env.NEXT_PUBLIC_UMAMI_URL && (
          <>
            <link rel="preconnect" href={process.env.NEXT_PUBLIC_UMAMI_URL} crossOrigin="anonymous" />
            <link rel="dns-prefetch" href={process.env.NEXT_PUBLIC_UMAMI_URL} />
          </>
        )}
        <JsonLd data={webAppJsonLd} />
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

