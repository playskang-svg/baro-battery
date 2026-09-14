import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import {
  categories,
  vehicles,
  regions,
  guides,
  postCategories,
} from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.isPreview) return [];
  const areaPaths = regions.flatMap((r) =>
    r.areas.map(
      (area) => `/regions/${r.slug}?area=${encodeURIComponent(area)}`,
    ),
  );
  const postCategoryPaths = postCategories.map(
    (c) => `/battery-info/${c.slug}`,
  );
  const paths = [
    '/',
    ...categories.map((c) => `/${c.slug}`),
    ...postCategoryPaths,
    ...vehicles.map((v) => `/vehicles/${v.slug}`),
    ...regions.map((r) => `/regions/${r.slug}`),
    ...areaPaths,
    ...guides
      .filter((g) => g.status === 'published')
      .map((g) => `/guides/${g.slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, siteConfig.origin).href }));
}
