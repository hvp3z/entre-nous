import { MetadataRoute } from 'next';
import { locales } from '@/i18n/request';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://le-middle.fr';

// Static pages with their SEO configuration
const staticPages: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
}[] = [
  // Homepage
  { path: '', priority: 1.0, changeFrequency: 'weekly' },
  // Theme pages
  { path: '/bars', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/restaurants', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/cafes', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/kids', priority: 0.8, changeFrequency: 'weekly' },
  // Legal pages
  { path: '/legal', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/legal/terms', priority: 0.3, changeFrequency: 'monthly' },
  { path: '/legal/privacy', priority: 0.3, changeFrequency: 'monthly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${SITE_URL}/${l}${page.path}`])
          ),
        },
      });
    }
  }

  return entries;
}
