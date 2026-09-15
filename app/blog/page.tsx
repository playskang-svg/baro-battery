import {
  BottomCTA,
  Crumb,
  GuideCard,
  PageIntro,
} from '@/components/site/shared';
import { PostCategoryNav } from '@/components/site/post-category-nav';
import { guides, guideMatchesPostCategory } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';

export const metadata = pageMeta(
  '블로그 · 배터리콜',
  '배터리 관리 팁부터 현장 이야기까지, 배터리콜이 전하는 유용한 블로그 포스팅.',
  '/blog',
);

export default function BlogPage() {
  const posts = guides.filter(
    (guide) =>
      guide.status === 'published' && guideMatchesPostCategory(guide, 'blog'),
  );

  return (
    <main id="main">
      <div className="wrap">
        <Crumb items={[{ label: '블로그' }]} />
        <PageIntro
          eyebrow="BLOG"
          title="배터리콜 블로그"
          description="배터리 관리 팁부터 현장 이야기까지, 쉽고 유용한 정보를 전해드립니다."
        />
        <PostCategoryNav active="blog" />
        <section className="post-list-section" aria-live="polite">
          <div className="post-list-heading">
            <h2>블로그 포스팅</h2>
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
              <h2>새 블로그 글을 준비하고 있습니다.</h2>
              <p>발행되는 글은 이 카테고리에 바로 모아드립니다.</p>
            </div>
          )}
        </section>
      </div>
      <BottomCTA />
    </main>
  );
}

