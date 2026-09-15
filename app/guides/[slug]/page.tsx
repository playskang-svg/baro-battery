import Link from '@/components/site/site-link';
import { notFound } from 'next/navigation';
import { guides, categories } from '@/lib/content';
import { Crumb, BottomCTA, GuideCard } from '@/components/site/shared';
import { ArrowUpRight, Check, BookOpen } from 'lucide-react';
import { contactHref } from '@/lib/site-config';
import { pageMeta } from '@/lib/metadata';
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) return {};
  const m = pageMeta(g.title, g.excerpt, `/guides/${slug}`, g.image);
  return { ...m, openGraph: { ...m.openGraph, type: 'article' } };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = guides.find((g) => g.slug === slug);
  if (!g) notFound();
  const c = categories.find((c) => c.slug === g.category) || {
    name: '배터리/차량 정보',
    slug: 'battery-info',
  };
  const published = g.status === 'published';
  return (
    <main id="main">
      <div className="wrap">
        <Crumb
          items={[
            { label: c.name, href: `/${c.slug}` },
            { label: g.category === 'blog' ? '블로그' : '교체 가이드' },
          ]}
        />
        <div className="article-layout">
          <article className="article">
            <span className="tag">
              {g.tag}
              <span>{published ? '발행 콘텐츠' : '콘텐츠 예시'}</span>
            </span>
            <h1>{g.title}</h1>
            <p className="article-lead">{g.excerpt}</p>
            <div className="article-byline">
              <BookOpen size={17} /> {g.author || '배터리콜 가이드'}{' '}
              <span>
                {published && g.publishedAt
                  ? `${g.publishedAt} 발행${g.reviewedBy ? ` · ${g.reviewedBy}` : ''}`
                  : '상세 포스팅 템플릿'}
              </span>
            </div>
            <div className="key-takeaway">
              <span>먼저 알아두세요</span>
              <p>{g.sections[0].body}</p>
            </div>
            <div className="article-mobile-toc">
              <h2>이 글의 순서</h2>
              {g.sections.map((s, i) => (
                <Link key={s.title} href={`#part-${i}`}>
                  {i + 1}. {s.title}
                </Link>
              ))}
            </div>
            {g.sections.map((s, i) => (
              <section
                id={`part-${i}`}
                className="article-section"
                key={s.title}
              >
                <span className="article-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2>{s.title}</h2>
                <p>{s.body}</p>
              </section>
            ))}
            {g.sources?.length ? (
              <section
                className="article-section"
                aria-labelledby="sources-title"
              >
                <h2 id="sources-title">확인한 공식 자료</h2>
                {g.sources.map((source) => (
                  <p key={source.url}>
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {source.title} <ArrowUpRight size={15} />
                    </a>
                  </p>
                ))}
              </section>
            ) : null}
            {g.relatedLinks?.length ? (
              <section className="article-checklist">
                <h2>함께 확인할 배터리 가이드</h2>
                {g.relatedLinks.map((item) => (
                  <p key={item.url}>
                    <Check size={18} />
                    <Link href={item.url}>{item.title}</Link>
                  </p>
                ))}
              </section>
            ) : null}
            <div className="article-checklist">
              <h2>문의 전 준비할 정보</h2>
              {[
                '차종 · 연식 (필수)',
                '해당하는 증상 체크',
                '배터리 · 경고등 사진 (선택)',
              ].map((x) => (
                <p key={x}>
                  <Check size={18} />
                  {x}
                </p>
              ))}
              <Link
                className="btn dark"
                href={contactHref('inquiry', g.vehicle, g.region)}
              >
                체크하고 문자 보내기 <ArrowUpRight size={17} />
              </Link>
            </div>
            <p className="article-disclosure">
              {published
                ? '차량별 구조와 보험 서비스 조건은 다를 수 있습니다. 실제 조치는 차량 사용설명서와 가입한 보험사의 최신 안내를 우선해 주세요.'
                : '이 글은 레이아웃과 콘텐츠 확장 구조를 확인하기 위한 예시입니다. 실제 발행 전 차종별 제조사 자료와 운영 정책에 따른 검수가 필요합니다.'}
            </p>
          </article>
          <aside className="article-sidebar">
            <div className="toc">
              <span className="eyebrow">IN THIS GUIDE</span>
              <h2>이 글의 순서</h2>
              {g.sections.map((s, i) => (
                <Link key={s.title} href={`#part-${i}`}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </Link>
              ))}
            </div>
            <div className="sidebar-cta">
              <h3>내 차는 어떨까요?</h3>
              <p>
                차종과 연식을 입력하고
                <br />
                상담을 준비하세요.
              </p>
              <Link
                className="btn dark"
                href={contactHref('inquiry', g.vehicle, g.region)}
              >
                체크하고 문자 보내기 <ArrowUpRight size={17} />
              </Link>
            </div>
          </aside>
        </div>
        <section className="section">
          <h2 className="subsection-title">함께 읽으면 좋은 가이드.</h2>
          <div className="guide-grid two">
            {guides
              .filter(
                (x) =>
                  x.slug !== g.slug &&
                  (x.category === g.category || x.category === 'service'),
              )
              .slice(0, 2)
              .map((x) => (
                <GuideCard guide={x} key={x.slug} />
              ))}
          </div>
        </section>
      </div>
      <BottomCTA vehicle={g.vehicle} region={g.region} />
    </main>
  );
}
