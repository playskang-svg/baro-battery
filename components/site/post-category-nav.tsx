import Link from '@/components/site/site-link';
import { guides, postCategories, type PostCategorySlug } from '@/lib/content';

export function PostCategoryNav({ active }: { active?: PostCategorySlug }) {
  return (
    <nav className="post-category-nav" aria-label="포스팅 카테고리">
      {postCategories.map((category) => {
        const count = guides.filter(
          (guide) =>
            guide.status === 'published' &&
            guide.postCategories?.includes(category.slug),
        ).length;
        return (
          <Link
            key={category.slug}
            href={`/battery-info/${category.slug}`}
            className={active === category.slug ? 'is-active' : undefined}
            aria-current={active === category.slug ? 'page' : undefined}
          >
            <strong>{category.name}</strong>
            <span>{category.description}</span>
            <small>{count}편</small>
          </Link>
        );
      })}
    </nav>
  );
}
