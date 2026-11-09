import Link from '@/components/site/site-link';
import { notFound } from 'next/navigation';
import { regions, guides, vehicles, getRegionKeywordData, operatingRegionLine, operatingRegions } from '@/lib/content';
import { regionFieldPhotos, regionHubSlugs } from '@/lib/field-photos';
import { FieldPhotos } from '@/components/site/field-photos';
import { CtaPair } from '@/components/site/cta';
import { Crumb, PageIntro, BottomCTA, GuideCard, Steps } from '@/components/site/shared';
import { MapPin, Clock, ShieldAlert, HelpCircle, CheckCircle2 } from 'lucide-react';
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

  if (!r.hold) {
    return pageMeta(
      `${r.name} 출장 배터리 교체 | 현장 방문 교체 안내`,
      `${r.name} 지역 자동차 배터리 출장 교체. 주차 환경과 차종을 확인하고 현장에서 교체하는 과정을 안내합니다.`,
      `/regions/${slug}`,
    );
  }

  const area = typeof q.area === 'string' && r.areas.includes(q.area) ? q.area : '';
  const title = area
    ? `${area} 출장 배터리 교체 안내 | 수도권 파트너 준비 중`
    : `${r.name} 출장 배터리 교체 | 파트너 준비 중`;
  const desc = area
    ? `${area} 출장 배터리 교체는 현재 파트너 준비 중입니다. 운영 지역은 ${operatingRegionLine}입니다.`
    : `${r.name} 지역은 파트너 준비 중입니다. 현재 운영 지역은 ${operatingRegionLine}입니다.`;

  // ?area= 변형은 각 시도 기본 페이지로 canonical 통합 (URL은 200 유지)
  return pageMeta(title, desc, `/regions/${slug}`);
}

export default async function Page({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const r = regions.find((x) => x.slug === slug);
  if (!r) notFound();

  if (!r.hold) return <OperatingRegion r={r} />;

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
            
            <h2>{keyData.headline}</h2>
            <p className="text-muted leading-relaxed">
              현재 운영 지역은 {operatingRegionLine}입니다. 수도권은 파트너 준비 중입니다.
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
              <ul className="space-y-1.5 text-sm text-ink">
                {keyData.environmentCheck.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 지역 FAQ */}
            <div className="region-faq-section mt-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-green-700" />
                {keyData.areaName} 자주 묻는 질문
              </h3>
              <div className="space-y-4">
                {keyData.faqs.map((faq, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl">
                    <strong className="block text-sm text-ink mb-1.5">Q. {faq.q}</strong>
                    <p className="text-sm text-ink leading-relaxed m-0">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="region-pseo-sidebar">
            <div className="region-cta-card">
              <h3>
                현재 운영 지역은<br />
                {operatingRegionLine}입니다.
              </h3>
              <p>수도권은 파트너 준비 중입니다. 운영 지역 안내를 확인해 주세요.</p>
              <Link
                className="btn lime full text-center flex items-center justify-center gap-2 font-bold"
                href="/regions/daegu"
              >
                <MapPin size={18} />
                대구권 보기
              </Link>
            </div>

            <div className="region-keywords p-4 rounded-2xl text-sm text-sub leading-relaxed">
              <strong className="block text-ink mb-1">관련 검색 키워드</strong>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {keyData.keywords.map((kw) => (
                  <span key={kw} className="px-2 py-1 bg-white rounded text-ink text-sm">
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

    </main>
  );
}

function OperatingRegion({ r }: { r: (typeof regions)[number] }) {
  const p = r.profile!;
  const others = operatingRegions.filter((x) => x.slug !== r.slug);
  const hubs = (regionHubSlugs[r.slug] ?? []).flatMap((slug) => vehicles.filter((v) => v.slug === slug));
  return (
    <main id="main">
      <div className="wrap">
        <Crumb items={[{ label: '지역별', href: '/regions' }, { label: r.name }]} />
        <PageIntro title={`${r.name} 출장 배터리 교체`} description={p.summary} />

        <section className="region-pseo" aria-label={`${r.name} 안내`} data-reveal>
          <div className="region-pseo-main">
            
            <h2>{r.name} 주요 생활권</h2>
            <ul className="space-y-1.5 text-sm text-ink mt-2">
              {p.living.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <MapPin size={14} className="text-green-700 shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="region-feature-grid mt-4">
              <div className="region-feature-box">
                <div className="flex items-center gap-2 mb-1 text-ink">
                  <ShieldAlert size={16} className="text-green-700" />
                  <strong>주차 환경 특성</strong>
                </div>
                <p>{p.parking}</p>
              </div>
              <div className="region-feature-box">
                <div className="flex items-center gap-2 mb-1 text-ink">
                  <Clock size={16} className="text-green-700" />
                  <strong>출장 동선</strong>
                </div>
                <p>{p.route}</p>
              </div>
            </div>

            <div className="environment-checklist mt-4">
              <h4 className="font-bold text-sm text-ink mb-2">출장 전 {r.name} 현장 체크포인트</h4>
              <ul className="space-y-1.5 text-sm text-ink">
                {p.checks.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 size={14} className="text-green-700 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <FieldPhotos photos={regionFieldPhotos[r.slug] ?? []} />

            <div className="region-faq-section mt-8">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <HelpCircle size={18} className="text-green-700" />
                {r.name} 자주 묻는 질문
              </h3>
              <div className="space-y-4">
                {p.faqs.map((faq) => (
                  <div key={faq.q} className="p-4 bg-white rounded-xl">
                    <strong className="block text-sm text-ink mb-1.5">Q. {faq.q}</strong>
                    <p className="text-sm text-ink leading-relaxed m-0">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="region-pseo-sidebar">
            <div className="region-cta-card">
              
              <h3>
                {r.name}에서<br />
                시동이 안 걸리시나요?
              </h3>
              <p>차량 위치와 주차 환경을 알려주시면 방문 가능 여부를 안내합니다.</p>
              <CtaPair position={`region_${r.slug}`} />
              <Link
                className="btn lime full text-center flex items-center justify-center gap-2 font-bold mt-2"
                href={`/contact?region=${r.slug}`}
              >
                문의 내용 작성하기
              </Link>
            </div>
            <div className="region-keywords p-4 rounded-2xl text-sm text-sub leading-relaxed">
              <strong className="block text-ink mb-1">다른 운영 지역</strong>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {others.map((o) => (
                  <Link key={o.slug} href={`/regions/${o.slug}`} className="px-2 py-1 bg-white rounded text-ink text-sm">
                    {o.name}
                  </Link>
                ))}
              </div>
            </div>
            {hubs.length ? (
              <div className="region-keywords p-4 rounded-2xl text-sm text-sub leading-relaxed">
                <strong className="block text-ink mb-1">차종별 배터리 안내</strong>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {hubs.map((v) => (
                    <Link key={v.slug} href={`/vehicles/${v.slug}`} className="px-2 py-1 bg-white rounded text-ink text-sm">
                      {v.name} 배터리 규격 보기
                    </Link>
                  ))}
                  <Link href="/battery-spec" className="px-2 py-1 bg-white rounded text-ink text-sm">
                    전체 차종 규격 조견표
                  </Link>
                </div>
              </div>
            ) : null}
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

      <BottomCTA region={r.slug} position={`region_${r.slug}`} />
    </main>
  );
}
