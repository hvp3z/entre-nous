import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://le-middle.fr';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Politique de Confidentialité - Le Middle'
    : 'Privacy Policy - Le Middle';

  const description = isFr
    ? 'Politique de confidentialité de Le Middle — comment nous protégeons vos données sur notre trouveur de points de rencontre à Paris.'
    : 'Privacy policy for Le Middle — how we protect your data on our meeting point finder in Paris.';

  const url = `${SITE_URL}/${locale}/legal/privacy`;

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
        fr: `${SITE_URL}/fr/legal/privacy`,
        en: `${SITE_URL}/en/legal/privacy`,
      },
    },
  };
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
