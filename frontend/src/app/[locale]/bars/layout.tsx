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
    ? 'Bars - Le Middle | Trouvez le bar parfait à mi-chemin'
    : 'Bars - Le Middle | Find the perfect bar halfway';

  const description = isFr
    ? 'Trouvez le bar équidistant idéal entre vos amis à Paris. Bars à cocktails, bières artisanales, vins naturels — tous accessibles en métro.'
    : 'Find the perfect equidistant bar between friends in Paris. Cocktail bars, craft beer, natural wines — all accessible by metro.';

  const keywords = isFr
    ? ['bars Paris', 'bar équidistant', 'point de rencontre bar', 'bars à cocktails Paris', 'bières artisanales', 'vins naturels', 'bar petite couronne', 'Paris', 'petite couronne', 'équidistant', 'transport en commun', 'métro']
    : ['bars Paris', 'equidistant bar', 'meeting point bar', 'cocktail bars Paris', 'craft beer', 'natural wines', 'bar inner suburbs', 'Paris', 'petite couronne', 'equidistant', 'public transit', 'metro'];

  const url = `${SITE_URL}/${locale}/bars`;

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
        fr: `${SITE_URL}/fr/bars`,
        en: `${SITE_URL}/en/bars`,
      },
    },
  };
}

export default function BarsLayout({
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
    { name: 'Bars', path: '/bars' },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbData} />
      {children}
    </>
  );
}
