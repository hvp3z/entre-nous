import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://le-middle.fr';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Conditions Générales d\'Utilisation - Le Middle'
    : 'Terms of Service - Le Middle';

  const description = isFr
    ? 'Conditions générales d\'utilisation du service Le Middle — trouveur de points de rencontre équidistants à Paris et petite couronne.'
    : 'Terms of service for Le Middle — equidistant meeting point finder in Paris and inner suburbs.';

  const url = `${SITE_URL}/${locale}/legal/terms`;

  return {
    title,
    description,
    robots: {
      index: false,
      follow: true,
    },
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
        fr: `${SITE_URL}/fr/legal/terms`,
        en: `${SITE_URL}/en/legal/terms`,
      },
    },
  };
}

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
