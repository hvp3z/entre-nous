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
    ? 'Famille & Enfants - Le Middle | Trouvez le lieu familial parfait à mi-chemin'
    : 'Family & Kids - Le Middle | Find the perfect family spot halfway';

  const description = isFr
    ? 'Trouvez le lieu familial équidistant parfait entre amis à Paris. Parcs, aires de jeux, activités enfants — tous accessibles en transport en commun.'
    : 'Find the perfect equidistant family-friendly spot between friends in Paris. Parks, playgrounds, kids activities — all accessible by public transit.';

  const keywords = isFr
    ? ['sorties famille Paris', 'lieu enfants équidistant', 'point de rencontre famille', 'parcs Paris', 'aires de jeux', 'activités enfants', 'famille petite couronne', 'Paris', 'petite couronne', 'équidistant', 'transport en commun', 'métro']
    : ['family outings Paris', 'equidistant kids spot', 'family meeting point', 'parks Paris', 'playgrounds', 'kids activities', 'family inner suburbs', 'Paris', 'petite couronne', 'equidistant', 'public transit', 'metro'];

  const url = `${SITE_URL}/${locale}/kids`;

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
        fr: `${SITE_URL}/fr/kids`,
        en: `${SITE_URL}/en/kids`,
      },
    },
  };
}

export default function KidsLayout({
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
    { name: isFr ? 'Sorties en famille' : 'Family outings', path: '/kids' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbData} />
      {children}
    </>
  );
}
