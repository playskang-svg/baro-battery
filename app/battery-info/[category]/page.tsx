import { notFound } from 'next/navigation';
import {
  BottomCTA,
  Crumb,
  GuideCard,
  PageIntro,
} from '@/components/site/shared';
import { PostCategoryNav } from '@/components/site/post-category-nav';
import {
  guideMatchesPostCategory,
  guides,
  postCategories,
  type PostCategorySlug,
} from '@/lib/content';
import { pageMeta } from '@/lib/metadata';

export function generateStaticParams() {
  return postCategories.map(({ slug }) => ({ category: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const current = postCategories.find((item) => item.slug === category);
  if (!current) return {};
  return pageMeta(
    `${current.name} 포스팅`,
    current.description,
    `/battery-info/${current.slug}`,
  );
}

export default async function PostCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const current = postCategories.find((item) => item.slug === category);
  if (!current) notFound();

  const posts = guides.filter(
    (guide) =>
      guide.status === 'published' &&
      guideMatchesPostCategory(guide, current.slug),
  );

  return (
    <main id="main">
      <div className="wrap">
        <Crumb
          items={[
            { label: '배터리/차량 정보', href: '/battery-info' },
            { label: current.name },
          ]}
        />
        <PageIntro
          eyebrow="POST CATEGORY"
          title={current.name}
          description={current.description}
        />
        <PostCategoryNav active={current.slug as PostCategorySlug} />
        <section className="post-list-section" aria-live="polite">
          <div className="post-list-heading">
            <h2>{current.name} 포스팅</h2>
            <span>{posts.length}편</span>
          </div>
          {posts.length ? (
            <div className="guide-grid two">
              {posts.map((guide, index) => (
                <GuideCard
                  key={guide.slug}
                  guide={guide}
                  featured={index === 0}
                />
              ))}
            </div>
          ) : (
            <div className="post-empty-state">
              <h2>새 포스팅을 준비하고 있습니다.</h2>
              <p>발행되는 글은 이 카테고리에 바로 모아드립니다.</p>
            </div>
          )}
        </section>
      </div>
      <BottomCTA />
    </main>
  );
}
