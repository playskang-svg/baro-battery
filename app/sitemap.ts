import type { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/site-config';
import {
  categories,
  vehicles,
  operatingRegions,
  guides,
  postCategories,
} from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  if (siteConfig.isPreview) return [];
  const postCategoryPaths = postCategories.map(
    (c) => `/battery-info/${c.slug}`,
  );
  const paths = [
    '/',
    ...categories.map((c) => `/${c.slug}`),
    ...postCategoryPaths,
    ...vehicles.map((v) => `/vehicles/${v.slug}`),
    // 수도권 보류 권역(hold)은 페이지는 200으로 유지하되 사이트맵에서 제외
    ...operatingRegions.map((r) => `/regions/${r.slug}`),
    ...guides
      .filter((g) => g.status === 'published')
      .map((g) => `/guides/${g.slug}`),
  ];
  return paths.map((path) => ({ url: new URL(path, siteConfig.origin).href }));
}
