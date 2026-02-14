import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://le-middle.fr';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Mentions légales - Le Middle'
    : 'Legal - Le Middle';

  const description = isFr
    ? 'Mentions légales, conditions générales d\'utilisation et politique de confidentialité de Le Middle.'
    : 'Legal notices, terms of service and privacy policy for Le Middle.';

  const url = `${SITE_URL}/${locale}/legal`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: isFr ? 'fr_FR' : 'en_US',
      siteName: 'Le Middle',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/legal`,
        en: `${SITE_URL}/en/legal`,
      },
    },
  };
}

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
