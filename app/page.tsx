import Image from 'next/image';
import Link from '@/components/site/site-link';
import { ContactForm } from '@/components/site/interactive';
import { CallBand } from '@/components/site/shared';
import { FaqCards, HomeExplorer, SymptomCalc } from '@/components/site/home';
import {
  faqs,
  operatingRegionLine,
  operatingRegions,
  serviceSteps,
  vehicles,
} from '@/lib/content';
import { phoneHref, siteConfig } from '@/lib/site-config';
import { pageMeta } from '@/lib/metadata';
import './home.css';

export const metadata = pageMeta(
  `배터리콜 · ${operatingRegionLine} 출장 배터리 교체`,
  `${operatingRegionLine} 자동차 출장 배터리 교체. 차종·연식과 증상을 문자로 보내면 작업자가 확인 후 제품·총비용·방문 일정을 안내합니다.`,
  '/',
);

const proofTiles = [
  {
    big: '출장 전 차량 확인',
    small: '보내 주신 차종과 연식으로 규격을 1:1 사전 점검합니다.',
    icon: '#i-search',
  },
  {
    big: '총비용 사전 안내',
    small: '제품·출장·장착을 모두 포함한 최종 금액을 사전에 안내합니다.',
    icon: '#i-won',
  },
  {
    big: '1:1 정품 신품 배터리',
    small: '최근 생산된 최상급 정품 배터리만 안전하게 장착합니다.',
    icon: '#i-bolt',
  },
  {
    big: '교체 후 시동·전압 점검',
    small: '장착 직후 시동 모터 및 발전기 충전 전압을 정밀 계측합니다.',
    icon: '#i-check',
  },
  {
    big: '24시간 접수',
    small: '상담과 접수는 24시간, 예약된 일정에 맞춰 현장으로 출동합니다.',
    icon: '#i-clock',
  },
  {
    big: operatingRegionLine,
    small: '대구·구미·칠곡·경산 전 지역 출장. 수도권은 파트너 준비 중입니다.',
    icon: '#i-globe',
  },
];

const chaptersData = [
  {
    no: '01',
    name: '국산 세단 점검',
    tag: '세단 · ISG 유무 확인',
    title: '현대 그랜저 · 아반떼 · 기아 K5',
    text: '연식과 엔진 사양, 오토스톱(ISG) 탑재 여부에 따라 일반 규격과 AGM 배터리가 나뉩니다. 차종과 연식을 알려 주시면 장착 규격을 먼저 확인합니다.',
    items: [
      { label: '현대 그랜저', href: '/vehicles/grandeur' },
      { label: '현대 아반떼', href: '/vehicles/avante' },
      { label: '기아 K5', href: '/vehicles/k5' },
    ],
    ctaHref: '/vehicles',
    ctaLabel: '세단 차종별 안내 보기',
    img: '/media/vehicles/grandeur.webp',
    mirrorImg: '/media/vehicles/k5.webp',
  },
  {
    no: '02',
    name: '국산 SUV 점검',
    tag: 'SUV · 디젤·가솔린·하이브리드',
    title: '기아 쏘렌토 · 스포티지',
    text: '가솔린·디젤·하이브리드 구분과 블랙박스 상시 전원 사용 환경을 함께 고려해 적합한 용량과 배터리 타입을 안내합니다.',
    items: [
      { label: '기아 쏘렌토', href: '/vehicles/sorento' },
      { label: '기아 스포티지', href: '/vehicles/sportage' },
    ],
    ctaHref: '/vehicles/sorento',
    ctaLabel: 'SUV 배터리 가이드 보기',
    img: '/media/vehicles/sorento.webp',
    mirrorImg: '/media/vehicles/sportage.webp',
  },
  {
    no: '03',
    name: '제네시스 · 수입차',
    tag: '프리미엄 · 장착 위치·규격 확인',
    title: '제네시스 G80 · BMW 5시리즈',
    text: '트렁크 매립형 배터리 장착 위치와 차대 정보, AGM 배터리 종류를 출장 전에 먼저 확인하고 현장에서 안전하게 교체합니다.',
    items: [
      { label: '제네시스 G80', href: '/vehicles/g80' },
      { label: 'BMW 5시리즈', href: '/vehicles/bmw-5' },
      { label: '목록에 없는 차종', href: '/#form-card' },
    ],
    ctaHref: '/vehicles/bmw-5',
    ctaLabel: '제네시스·수입차 안내 보기',
    img: '/media/vehicles/g80.webp',
    mirrorImg: '/media/vehicles/bmw-5.webp',
  },
  {
    no: '04',
    name: `${operatingRegionLine} 현장 출장`,
    tag: '운영 권역 · 24시간 접수',
    title: `${operatingRegionLine} 전 지역 방문`,
    text: '아파트 지하주차장, 주택가, 야외 주차장 등 차가 서 있는 위치를 알려 주시면 진입 조건과 방문 일정을 확인해 출동합니다.',
    items: operatingRegions.map((r) => ({ label: `${r.name} 운영 중`, href: `/regions/${r.slug}` })),
    ctaHref: '/regions',
    ctaLabel: '지역별 출장 안내 보기',
    img: '/media/tech.webp',
    mirrorImg: '/media/terminal.webp',
  },
];

export default function Home() {
  const tel = phoneHref();
  const regionPhotos = [
    '/media/tech.webp',
    '/media/terminal.webp',
    '/media/caller.webp',
    '/media/warning.webp',
  ];

  const marqueeItems = [
    ...vehicles.map((v) => ({
      tag: v.brand,
      title: `${v.brand} ${v.name}`,
      sub: v.note,
      href: `/vehicles/${v.slug}`,
      img: `/media/vehicles/${v.slug}.webp`,
    })),
    ...operatingRegions.map((r, i) => ({
      tag: '운영 중',
      title: `${r.name} 출장 배터리`,
      sub: r.note,
      href: `/regions/${r.slug}`,
      img: regionPhotos[i % regionPhotos.length],
    })),
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AutomotiveBusiness',
        '@id': `${siteConfig.origin}/#business`,
        name: siteConfig.name,
        url: siteConfig.origin,
        telephone: siteConfig.phone || siteConfig.officePhone,
        description: `${operatingRegionLine} 출장 배터리 교체. 차종·연식과 증상을 확인해 제품·총비용·방문 일정을 안내합니다.`,
        areaServed: operatingRegions.map((r) => r.name),
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteConfig.origin}/#faq`,
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a,
          },
        })),
      },
    ],
  };

  return (
    <main id="main" className="home-main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ---------- 히어로 ---------- */}
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div
          className="hero-media"
          aria-hidden="true"
          dangerouslySetInnerHTML={{
            __html: `<img src="/media/hero-poster.webp" alt="" width="1280" height="720" fetchpriority="high" decoding="async" /><video class="hero-video" autoplay muted loop playsinline preload="metadata" poster="/media/hero-poster.webp"><source src="/media/hero.mp4" type="video/mp4" /></video>`,
          }}
        />
        <div className="hero-scrim" aria-hidden="true" />
        <div className="hero-mid" aria-hidden="true" />

        <div className="hero-float" id="hero-float" aria-hidden="true">
          <div className="hb-scene">
            <div className="hb-cert-ribbon">
              <span className="hb-dot" />
              <span>정품 · 정가 인증업체</span>
            </div>

            <div className="hb-battery">
              <div className="hb-top">
                <div className="hb-term hb-term-neg">
                  <span>−</span>
                </div>
                <div className="hb-handle" />
                <div className="hb-term hb-term-pos">
                  <span>+</span>
                  <i className="hb-spark" />
                </div>
              </div>

              <div className="hb-body">
                <div className="hb-head">
                  <span className="hb-brand">BATTERYCALL · 12V AGM</span>
                  <span className="hb-seal">신품 규격 인증</span>
                </div>

                <div className="hb-meter">
                  <div className="hb-volt">
                    <strong>12.8V</strong>
                    <small>FULL CHARGE · 신품 정상 전압</small>
                  </div>
                  <div className="hb-bars">
                    <i />
                    <i />
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="hb-specs">
                  <div className="hb-spec-box">
                    <span>정품 인증</span>
                    <b>100% 최신 생산 신품</b>
                  </div>
                  <div className="hb-spec-box">
                    <span>정가 안내</span>
                    <b>출장·장착비 포함 정가</b>
                  </div>
                </div>
              </div>
            </div>

            <div className="fo hb-badge hb-badge-1">
              <svg className="ic" viewBox="0 0 24 24">
                <use href="#i-check" />
              </svg>
              <div>
                <b>100% 정품 신품 인증</b>
                <span>차종별 1:1 규격 사전 확인</span>
              </div>
            </div>

            <div className="fo hb-badge hb-badge-2">
              <svg className="ic" viewBox="0 0 24 24">
                <use href="#i-won" />
              </svg>
              <div>
                <b>사전 확정 정가 인증업체</b>
                <span>출동 전 총비용 투명 안내</span>
              </div>
            </div>

            <div className="fo fo-chip">
              <svg className="ic" viewBox="0 0 24 24">
                <use href="#i-bolt" />
              </svg>
              <span>{operatingRegionLine} 출장 · 시동·전압 점검</span>
            </div>
          </div>
        </div>

        <div className="wrap hero-in">
          <div className="hero-copy">
            <p className="hero-kicker" style={{ '--i': 0 } as React.CSSProperties}>
              <span className="ln" />
              <span>{operatingRegionLine} 출장 · 24시간 접수</span>
            </p>
            <h1 id="hero-title" style={{ '--i': 1 } as React.CSSProperties}>
              출장 배터리 교체,
              <br />
              <em>차가 선 자리로.</em>
            </h1>
            <p className="hero-sub" style={{ '--i': 2 } as React.CSSProperties}>
              시동이 안 걸리는 그 자리로 기사가 찾아가 새 배터리로 바꿔 드립니다. 차종과 연식만 알려
              주세요.
            </p>

            <div
              className="hero-regions"
              style={{ '--i': 2 } as React.CSSProperties}
              aria-label="운영 지역 바로가기"
            >
              {operatingRegions.map((r) => (
                <Link key={r.slug} className="hero-region-pill" href={`/regions/${r.slug}`}>
                  {r.name} <span>〉</span>
                </Link>
              ))}
            </div>

            <div className="hero-cta" style={{ '--i': 3 } as React.CSSProperties}>
              <a
                className="btn btn-primary btn-glow"
                href="#form-card"
                data-goto-form="true"
                data-track="hero"
                data-channel="sms"
              >
                <span>간편문자보내기</span>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#i-arrow" />
                </svg>
              </a>
              {tel ? (
                <a
                  className="btn btn-glass"
                  href={tel}
                  data-track="hero"
                  data-channel="phone"
                >
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-phone" />
                  </svg>
                  <span>전화 상담</span>
                </a>
              ) : null}
            </div>
          </div>

          <ul className="stats" style={{ '--i': 4 } as React.CSSProperties} aria-label="핵심 기준">
            <li>
              <b>
                <span data-count="24">24</span>시간
              </b>
              <span>상시 상담·접수 운영</span>
            </li>
            <li>
              <b>
                <span data-count={operatingRegions.length}>{operatingRegions.length}</span>개 권역
              </b>
              <span>{operatingRegionLine} 출장</span>
            </li>
            <li>
              <b>
                <span data-count={vehicles.length}>{vehicles.length}</span>종+ 전차종
              </b>
              <span>국산·수입·AGM 규격 확인</span>
            </li>
            <li>
              <b>
                <span data-count="3">3</span>단계 진행
              </b>
              <span>문자 접수부터 전압 점검까지</span>
            </li>
          </ul>
        </div>
      </section>

      {/* ---------- 무한 슬라이드 마키 ---------- */}
      <div className="marquee" aria-label="차종 및 운영 지역 미리보기">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((m, idx) => (
            <Link
              key={`${m.href}-${idx}`}
              className="mq"
              href={m.href}
              tabIndex={idx >= marqueeItems.length ? -1 : undefined}
              aria-hidden={idx >= marqueeItems.length ? 'true' : undefined}
            >
              <div className="mq-bar">
                <i />
                <i />
                <i />
                <span>batterycall.kr</span>
              </div>
              <div className="mq-card">
                <Image src={m.img} alt="" width={600} height={380} unoptimized />
                <div className="mq-card-in">
                  <span className="mq-tag">{m.tag}</span>
                  <div>
                    <strong>{m.title}</strong>
                    <small>{m.sub}</small>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <button
          className="motion-btn"
          id="motion-btn"
          type="button"
          aria-pressed="false"
          aria-label="움직이는 화면 멈추기"
        >
          <svg className="ic i-pause" viewBox="0 0 24 24" aria-hidden="true">
            <use href="#i-pause" />
          </svg>
          <svg className="ic i-play" viewBox="0 0 24 24" aria-hidden="true">
            <use href="#i-play" />
          </svg>
        </button>
      </div>

      {/* ---------- 01 스티키 쇼케이스 ---------- */}
      <section className="sec showcase" id="showcase" aria-labelledby="showcase-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">
                <b>01</b>
                <span className="ln" />
                <span>차종별 · 지역별 맞춤 확인</span>
              </p>
              <h2 id="showcase-title">
                차종과 주차 위치에 맞춰
                <br />
                출장 전에 먼저 확인합니다.
              </h2>
            </div>
            <p className="lead">
              국산 세단·SUV부터 제네시스·수입차까지 차종별 배터리 확인 포인트와 {operatingRegionLine}{' '}
              출장 조건을 한눈에 살펴보세요.
            </p>
          </div>

          <div className="show-grid">
            <div className="stage" id="stage" aria-hidden="true">
              <div className="stage-top">
                <p className="stage-label">
                  <b id="stage-num">01</b>
                  <span>/ 04</span>
                  <em id="stage-name">{chaptersData[0].name}</em>
                </p>
                <div className="stage-bar">
                  <span id="stage-prog" />
                </div>
              </div>
              <div className="devices">
                <div className="laptop">
                  <div className="laptop-lid">
                    <div className="laptop-glass">
                      {chaptersData.map((ch, idx) => (
                        <div key={ch.no} className={`scr scr-ui ${idx === 0 ? 'is-on' : ''}`}>
                          {idx === 0 ? (
                            <video
                              src="/media/diag.mp4"
                              poster={ch.img}
                              autoPlay
                              muted
                              loop
                              playsInline
                            />
                          ) : (
                            <Image src={ch.img} alt="" width={800} height={500} unoptimized />
                          )}
                          <span className="scr-ui-badge">{ch.tag}</span>
                          <strong>{ch.title}</strong>
                          <span>{ch.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="laptop-base" />
                </div>
                <div className="wing-mirror">
                  <div className="wing-mirror-arm" aria-hidden="true" />
                  <div className="wing-mirror-housing">
                    <span className="wing-mirror-signal" aria-hidden="true" />
                    <div className="wing-mirror-glass">
                      {chaptersData.map((ch, idx) => (
                        <div key={ch.no} className={`scr scr-ui ${idx === 0 ? 'is-on' : ''}`}>
                          <Image src={ch.mirrorImg} alt="" width={640} height={420} unoptimized />
                          <span className="wing-mirror-line" aria-hidden="true" />
                          <span className="scr-ui-badge">{ch.no}</span>
                          <strong>{ch.name}</strong>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="chapters">
              {chaptersData.map((ch, idx) => (
                <article
                  key={ch.no}
                  className={`chapter ${idx === 0 ? 'is-on' : ''}`}
                  data-name={ch.name}
                >
                  <span className="ch-big" aria-hidden="true">
                    {ch.no}
                  </span>
                  <p className="ch-no">
                    <span className="n">{ch.no}</span>
                    <span>{ch.tag}</span>
                  </p>
                  <h3>{ch.title}</h3>
                  <p className="ch-text">{ch.text}</p>
                  <ul className="ch-names">
                    {ch.items.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href}>{item.label}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link className="ch-go" href={ch.ctaHref}>
                    <span>{ch.ctaLabel}</span>
                    <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                      <use href="#i-arrow" />
                    </svg>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 02 차종·지역 인터랙티브 탐색기 ---------- */}
      <HomeExplorer />

      {/* ---------- 03 다크 곡선 밴드: 문자에서 시동까지 ---------- */}
      <section className="sec dark pricing" id="flow" aria-labelledby="flow-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">
                <b>03</b>
                <span className="ln" />
                <span>진행 순서 · 3 STEPS</span>
              </p>
              <h2 id="flow-title">문자에서 시동까지</h2>
            </div>
            <p className="lead">
              흩어진 걱정이 문자 한 줄로 모이고, 정돈된 교체로 끝납니다. 세 단계면 됩니다.
            </p>
          </div>

          <div className="plans">
            {serviceSteps.map((s, idx) => {
              const details = [
                ['차종과 연식 필수 입력', '방전·시동 불량 등 증상 체크', '배터리·경고등 사진은 문자 앱에서 첨부'],
                ['보내 주신 차량 정보와 사진 사전 확인', '적합한 배터리 제품과 규격 안내', '출장·장착을 포함한 총비용과 방문 일정 안내'],
                ['약속한 현장으로 방문해 신품 교체', '시동 상태 및 발전기 충전 전압 점검', '교체 내역 안내 및 기존 폐배터리 회수'],
              ][idx] || [];
              return (
                <article
                  key={s.title}
                  className={`plan ${idx === 1 ? 'is-pick' : ''}`}
                >
                  {idx === 1 ? <span className="plan-badge">사전 확정 안내</span> : null}
                  <span className="plan-step-no">STEP 0{idx + 1}</span>
                  <h3>{s.title}</h3>
                  <p className="plan-for">{s.text}</p>
                  <ul className="plan-list">
                    {details.map((d) => (
                      <li key={d}>
                        <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                          <use href="#i-check" />
                        </svg>
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="plan-act">
                    <a
                      className={`btn ${idx === 1 ? 'btn-primary' : 'btn-out'}`}
                      href="#form-card"
                      data-goto-form="true"
                    >
                      <span>{idx === 0 ? '지금 바로 문자 보내기' : idx === 1 ? '사전 확인 요청하기' : '출장 접수 바로가기'}</span>
                      <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                        <use href="#i-arrow" />
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          <SymptomCalc />
        </div>
      </section>

      {/* ---------- 04 벤토 그리드: 믿고 맡기는 기준 ---------- */}
      <section className="sec incl" id="proof" aria-labelledby="proof-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">
                <b>04</b>
                <span className="ln" />
                <span>6가지 서비스 원칙</span>
              </p>
              <h2 id="proof-title">믿고 맡기는 기준</h2>
            </div>
            <p className="lead">배터리콜이 모든 출장에서 지키는 여섯 가지 원칙입니다.</p>
          </div>

          <div className="bento">
            <div className="bt bt-hero">
              <Image src="/media/terminal.webp" alt="" width={900} height={600} unoptimized />
              <video
                className="bt-video"
                src="/media/diag.mp4"
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
              />
              <div className="bt-hero-in">
                <p className="bt-k">
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <span>BATTERYCALL STANDARD</span>
                </p>
                <p className="bt-big">
                  사전 확인부터
                  <br />
                  <b>전압 점검까지</b>
                </p>
                <p className="bt-txt">
                  출장 전 차종·연식 확인과 총비용 안내, 장착 후 시동·발전기 전압 계측까지 모든 과정을
                  원칙대로 진행합니다.
                </p>
              </div>
            </div>

            {proofTiles.map((t, idx) => (
              <div
                key={t.big}
                className={`bt ${idx >= 4 ? 'bt-wide' : ''}`}
              >
                <div className="bt-top">
                  <span className="bt-ic" aria-hidden="true">
                    <svg className="ic" viewBox="0 0 24 24">
                      <use href={t.icon} />
                    </svg>
                  </span>
                  <h3>{t.big}</h3>
                </div>
                <p>{t.small}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- 05 포토 블렌드 카드: 현장 진행 과정 ---------- */}
      <section className="sec steps-sec" id="steps-detail" aria-label="진행 단계 안내">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">
                <b>05</b>
                <span className="ln" />
                <span>한눈에 보는 진행 과정</span>
              </p>
              <h2>복잡한 절차 없이 세 단계로 끝납니다</h2>
            </div>
            <p className="lead">
              차종·연식 확인부터 방문 교체와 시동 상태 점검까지 명확하게 안내합니다.
            </p>
          </div>

          <ol className="step-list">
            {serviceSteps.map((s, idx) => {
              const stepImgs = ['/media/caller.webp', '/media/tech.webp', '/media/terminal.webp'];
              const stepTags = ['문자 접수', '사전 확인 · 안내', '현장 교체 · 점검'];
              return (
                <li key={s.title} className="step">
                  <div className="step-pic" aria-hidden="true">
                    <Image src={stepImgs[idx % stepImgs.length]} alt="" width={600} height={420} unoptimized />
                  </div>
                  <div className="step-body">
                    <span className="step-no">0{idx + 1}</span>
                    <span className="step-tag">{stepTags[idx]}</span>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ---------- 패럴랙스 밴드 ---------- */}
      <section className="band" id="band" aria-label="배터리콜 현장 약속">
        <div className="band-media" aria-hidden="true">
          <Image id="band-img" src="/media/warning.webp" alt="" width={1400} height={800} unoptimized />
        </div>
        <div className="wrap band-in">
          <p className="band-k">
            <span className="ln" />
            <span>{operatingRegionLine} 출장 배터리 교체</span>
          </p>
          <h2 className="band-t">
            갑작스러운 방전과 경고등,
            <br />
            계신 자리에서 바로 해결해 드립니다.
          </h2>
          <p className="band-s">
            차종과 연식만 알려 주시면 작업자가 출장 전에 규격과 총비용, 방문 가능 시간을 먼저
            안내합니다.
          </p>
        </div>
      </section>

      {/* ---------- 06 자주 묻는 질문 (2단 아코디언) ---------- */}
      <section className="sec faq" id="faq" aria-label="자주 묻는 질문">
        <div className="wrap">
          <FaqCards title="자주 묻는 질문" />
          <div className="faq-more-links">
            <Link className="text-link" href="/service">
              교체 과정과 비용 항목 보기 <span aria-hidden="true">↗</span>
            </Link>
            <Link className="text-link" href="/battery-info">
              배터리 정보 더 읽기 <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- 07 다크 곡선 상담 섹션: 문자 한 통이면 됩니다 ---------- */}
      <section className="sec dark contact" id="sms" aria-labelledby="sms-title">
        <div className="wrap">
          <div className="sec-head">
            <div>
              <p className="eyebrow">
                <b>07</b>
                <span className="ln" />
                <span>24시간 문자 · 전화 접수</span>
              </p>
              <h2 id="sms-title">문자 한 통이면 됩니다</h2>
            </div>
            <p className="lead">
              차종과 연식을 고르고 증상을 체크하면 보낼 문자가 완성됩니다. 사진은 문자 앱에서 붙이면
              됩니다.
            </p>
          </div>

          <div className="contact-grid">
            <div className="ct-side">
              <div className="ct-media" aria-hidden="true">
                <Image src="/media/tech.webp" alt="" width={900} height={600} unoptimized />
                <ol className="stepper">
                  <li className="is-on">
                    <span className="st-n">1</span>
                    <b>차종·연식 체크</b>
                    <span>필수 두 가지만 선택</span>
                  </li>
                  <li>
                    <span className="st-n">2</span>
                    <b>작업자 사전 확인</b>
                    <span>제품·총비용·일정 안내</span>
                  </li>
                  <li>
                    <span className="st-n">3</span>
                    <b>현장 교체·점검</b>
                    <span>시동·충전전압 확인</span>
                  </li>
                </ol>
              </div>

              <ul className="trust">
                <li>
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-check" />
                  </svg>
                  <div>
                    <b>필수는 차종과 연식, 두 가지뿐입니다.</b>
                    <span>복잡한 입력 없이 선택만으로 문자 초안이 완성됩니다.</span>
                  </div>
                </li>
                <li>
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-device" />
                  </svg>
                  <div>
                    <b>작업자가 출장 전에 차량 정보와 사진을 확인합니다.</b>
                    <span>배터리·경고등 사진은 문자 앱에서 편하게 첨부하세요.</span>
                  </div>
                </li>
                <li>
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-won" />
                  </svg>
                  <div>
                    <b>제품·총비용·방문 일정은 확인 뒤 안내합니다.</b>
                    <span>출동 전에 모든 조건을 먼저 투명하게 확인하실 수 있습니다.</span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="form-card" id="form-card">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <CallBand position="home_band" />
    </main>
  );
}
