import {
  Crumb,
  PageIntro,
  GuideCard,
  BottomCTA,
} from '@/components/site/shared';
import { guides } from '@/lib/content';
import { pageMeta } from '@/lib/metadata';
import { PostCategoryNav } from '@/components/site/post-category-nav';
export const metadata = pageMeta(
  '배터리/차량 정보 · 방전과 교체 가이드',
  '차량별 배터리 정보와 방전·응급조치, 교체비용 포스팅을 카테고리별로 살펴보세요.',
  '/battery-info',
);
export default function Page() {
  const published = guides.filter((g) => g.status === 'published');
  return (
    <main id="main">
      <div className="wrap">
        <Crumb items={[{ label: '배터리/차량 정보' }]} />
        <PageIntro
          eyebrow="BATTERY & VEHICLE JOURNAL"
          title="배터리/차량 정보"
          description="차량별 배터리부터 방전 대처와 교체비용까지, 필요한 포스팅만 골라보세요."
        />
        <PostCategoryNav />
        <section className="post-list-section">
          <h2 className="subsection-title">최신 포스팅</h2>
          <div className="guide-grid two">
            {published.map((g, i) => (
              <GuideCard key={g.slug} guide={g} featured={i === 0} />
            ))}
          </div>
        </section>
        <section className="section">
          <h2 className="subsection-title">기초 가이드</h2>
          <div className="guide-grid two">
            {guides
              .filter(
                (g) =>
                  g.status !== 'published' &&
                  (g.category === 'battery-info' ||
                    g.slug === 'replacement-cost'),
              )
              .map((g) => (
                <GuideCard key={g.slug} guide={g} />
              ))}
          </div>
        </section>
      </div>
      <BottomCTA />
    </main>
  );
}
