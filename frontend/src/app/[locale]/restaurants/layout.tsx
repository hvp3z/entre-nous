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
    ? 'Restaurants - Le Middle | Trouvez le restaurant parfait à mi-chemin'
    : 'Restaurants - Le Middle | Find the perfect restaurant halfway';

  const description = isFr
    ? 'Trouvez le restaurant équidistant parfait entre amis à Paris. Bistrots, cuisine du monde, gastronomie — tous accessibles en transport en commun.'
    : 'Find the perfect equidistant restaurant between friends in Paris. Bistros, world cuisine, fine dining — all accessible by public transit.';

  const keywords = isFr
    ? ['restaurants Paris', 'restaurant équidistant', 'point de rencontre restaurant', 'bistrots Paris', 'cuisine du monde', 'gastronomie', 'restaurant petite couronne', 'Paris', 'petite couronne', 'équidistant', 'transport en commun', 'métro']
    : ['restaurants Paris', 'equidistant restaurant', 'meeting point restaurant', 'bistros Paris', 'world cuisine', 'fine dining', 'restaurant inner suburbs', 'Paris', 'petite couronne', 'equidistant', 'public transit', 'metro'];

  const url = `${SITE_URL}/${locale}/restaurants`;

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
        fr: `${SITE_URL}/fr/restaurants`,
        en: `${SITE_URL}/en/restaurants`,
      },
    },
  };
}

export default function RestaurantsLayout({
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
    { name: 'Restaurants', path: '/restaurants' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbData} />
      {children}
    </>
  );
}
