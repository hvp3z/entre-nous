import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/JsonLd';
import { buildBreadcrumbJsonLd } from '@/components/seo/jsonLdBuilders';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://le-middle.fr';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;
  const isFr = locale === 'fr';

  const title = isFr
    ? 'Cafés - Le Middle | Trouvez le café parfait à mi-chemin'
    : 'Cafés - Le Middle | Find the perfect café halfway';

  const description = isFr
    ? 'Trouvez le café équidistant idéal entre amis à Paris. Coffee shops, salons de thé, terrasses — tous accessibles en métro.'
    : 'Find the perfect equidistant café between friends in Paris. Coffee shops, tea rooms, terraces — all accessible by metro.';

  const keywords = isFr
    ? ['cafés Paris', 'café équidistant', 'point de rencontre café', 'coffee shops Paris', 'salons de thé', 'terrasses', 'café petite couronne', 'Paris', 'petite couronne', 'équidistant', 'transport en commun', 'métro']
    : ['cafés Paris', 'equidistant café', 'meeting point café', 'coffee shops Paris', 'tea rooms', 'terraces', 'café inner suburbs', 'Paris', 'petite couronne', 'equidistant', 'public transit', 'metro'];

  const url = `${SITE_URL}/${locale}/cafes`;

  return {
    title,
    description,
    keywords,
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
        fr: `${SITE_URL}/fr/cafes`,
        en: `${SITE_URL}/en/cafes`,
      },
    },
  };
}

export default function CafesLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  const isFr = locale === 'fr';

  const breadcrumbData = buildBreadcrumbJsonLd(SITE_URL, locale, [
    { name: isFr ? 'Accueil' : 'Home', path: '' },
    { name: 'Cafés', path: '/cafes' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbData} />
      {children}
    </>
  );
}
