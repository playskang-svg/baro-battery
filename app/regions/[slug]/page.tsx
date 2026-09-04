import Link from '@/components/site/site-link';
import { notFound } from 'next/navigation';
import { regions, guides, getRegionKeywordData } from '@/lib/content';
import { Crumb, PageIntro, BottomCTA, GuideCard, Steps } from '@/components/site/shared';
import { MapPin, ArrowUpRight, Clock, ShieldAlert, HelpCircle, CheckCircle2, MessageSquare } from 'lucide-react';
import { pageMeta } from '@/lib/metadata';

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ area?: string }>;
}

export async function generateMetadata({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const q = await searchParams;
  const r = regions.find((x) => x.slug === slug);
  if (!r) return {};

  const area = typeof q.area === 'string' && r.areas.includes(q.area) ? q.area : '';
  const title = area
    ? `${area} 출장 배터리 교체 — 당일 긴급 방문 & 지하주차장 안내`
    : `${r.name} 출장 배터리 교체 | 지역별 신속 방문`;
  const desc = area
    ? `${area} 전 지역 자동차 배터리 출장교체. 아파트 지하주차장·노상 주차 당일 방문, 최신 정품 배터리 교체 및 시동 점검.`
    : `${r.name} 지역 배터리 출장교체 문의 전 위치와 주차 환경 확인 안내.`;

  const canonical = area ? `/regions/${slug}?area=${encodeURIComponent(area)}` : `/regions/${slug}`;
  return pageMeta(title, desc, canonical);
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const r = regions.find((x) => x.slug === slug);
  if (!r) notFound();

  const q = await searchParams;
  const area = typeof q.area === 'string' && r.areas.includes(q.area) ? q.area : r.areas[0];
  const keyData = getRegionKeywordData(r.slug, area);

  return (
    <main id="main">
      <div className="wrap">
        <Crumb
          items={[
            { label: '지역별', href: '/regions' },
            { label: r.name, href: `/regions/${r.slug}` },
            { label: keyData.areaName },
          ]}
        />

        <PageIntro
          eyebrow="AREA KEYWORD GUIDE"
          title={`${keyData.areaName} 출장 배터리 교체`}
          description={keyData.subheadline}
        />

        {/* 세부 지역(동네) 선택 탭 */}
        <div className="region-selector-box">
          <div className="region-selector-header">
            <MapPin size={18} className="text-lime-700" />
            <h3>{r.name} 세부 지역 선택</h3>
          </div>
          <div className="region-links">
            {r.areas.map((a) => (
              <Link
                key={a}
                className={keyData.areaName === a ? 'active font-bold' : ''}
                href={`/regions/${slug}?area=${encodeURIComponent(a)}`}
              >
                {a}
              </Link>
            ))}
          </div>
        </div>

        {/* pSEO 지역 키워드 전용 상세 섹션 */}
        <section className="region-pseo" aria-label={`${keyData.areaName} 키워드 특화 안내`}>
          <div className="region-pseo-main">
            <span className="lead-tag">당일 긴급 방문 권역</span>
            <h2>{keyData.headline}</h2>
            <p className="text-muted leading-relaxed">
              {keyData.areaName} 지역은 도심형 아파트 및 오피스텔 지하주차장 출장이 많은 지역입니다.
              기동성이 뛰어난 서비스 차량으로 신속하게 방문하여 현장에서 최신 배터리 상태 진단부터 완벽한 교체 및 전압 확인까지 한 번에 완료합니다.
            </p>

            <div className="region-feature-grid">
              <div className="region-feature-box">
                <div className="flex items-center gap-2 mb-1 text-ink">
                  <Clock size={16} className="text-green-700" />
                  <strong>예상 출장 시간</strong>
                </div>
                <p>{keyData.eta}</p>
              </div>

              <div className="region-feature-box">
                <div className="flex items-center gap-2 mb-1 text-ink">
                  <ShieldAlert size={16} className="text-green-700" />
                  <strong>주차 및 진입 환경</strong>
                </div>
                <p>{keyData.parkingTips}</p>
              </div>
            </div>

            <div className="environment-checklist mt-4">
              <h4 className="font-bold text-sm text-ink mb-2">출장 전 {keyData.areaName} 현장 체크포인트</h4>
              <ul className="space-y-1.5 text-xs text-sub">
                {keyData.environmentCheck.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 지역 FAQ */}
            <div className="region-faq-section mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-green-700" />
                {keyData.areaName} 자주 묻는 질문
              </h3>
              <div className="space-y-4">
                {keyData.faqs.map((faq, i) => (
                  <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-200/80">
                    <strong className="block text-sm text-ink mb-1.5">Q. {faq.q}</strong>
                    <p className="text-xs text-sub leading-relaxed m-0">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="region-pseo-sidebar">
            <div className="region-cta-card">
              <span className="eyebrow text-lime-300">QUICK DISPATCH</span>
              <h3>
                {keyData.areaName}에서<br />
                지금 시동이 안 걸리시나요?
              </h3>
              <p>
                {keyData.areaName} 출장비와 공임이 모두 포함된 정찰가로 바로 안내받으세요.
              </p>
              <Link
                className="btn lime full text-center flex items-center justify-center gap-2 font-bold"
                href={`/contact?region=${r.slug}&area=${encodeURIComponent(keyData.areaName)}`}
              >
                <MessageSquare size={18} />
                {keyData.areaName} 문의 작성하기
              </Link>
            </div>

            <div className="p-4 bg-white border border-gray-200 rounded-2xl text-xs text-sub leading-relaxed">
              <strong className="block text-ink mb-1">관련 검색 키워드</strong>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {keyData.keywords.map((kw) => (
                  <span key={kw} className="px-2 py-1 bg-gray-100 rounded text-gray-700 text-[11px]">
                    {kw}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </section>

        <section className="section mt-12">
          <h2 className="subsection-title">교체 과정은 간단하게, 작업은 정확하게</h2>
          <Steps />
        </section>

        <div className="guide-grid two mt-8">
          {guides
            .filter((g) => g.category === 'regions' || g.slug === 'replacement-cost')
            .map((g) => (
              <GuideCard key={g.slug} guide={g} />
            ))}
        </div>
      </div>

      <BottomCTA region={r.slug} />
    </main>
  );
}
