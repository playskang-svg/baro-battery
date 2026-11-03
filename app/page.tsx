import Image from 'next/image';
import Link from '@/components/site/site-link';
import { ContactForm } from '@/components/site/interactive';
import { CallBand } from '@/components/site/shared';
import { FaqCards, Showcase } from '@/components/site/home';
import { Battery3D } from '@/components/site/battery-3d';
import { guides, operatingRegionLine, operatingRegions, holdRegions, serviceSteps, vehicles } from '@/lib/content';
import { phoneHref, smsLinkHref } from '@/lib/site-config';
import './home.css';

// 현장 사진 네 장: 배터리콜이 직접 찍은 작업 사진
const scenes = [
  { key: 'arrive', label: '출동', src: '/images/batterycall_1.webp', alt: '출장 교체를 위해 도착한 배터리콜 작업 차량', caption: '작업 차량이 차가 선 자리로 갑니다.' },
  { key: 'remove', label: '탈거', src: '/images/batterycall_2.webp', alt: '장갑을 낀 손으로 기존 배터리를 떼어 내는 장면', caption: '기존 배터리를 떼어 냅니다.' },
  { key: 'swap', label: '교체', src: '/images/batterycall_3.webp', alt: '떼어 낸 배터리를 바닥에 내려놓고 새 배터리를 준비하는 장면', caption: '규격에 맞는 새 배터리로 바꿉니다.' },
  { key: 'product', label: '제품', src: '/images/batterycall_4.webp', alt: '교체에 쓰는 자동차 배터리 제품의 윗면', caption: '차종 규격에 맞춘 제품을 씁니다.' },
];

const proofTiles = [
  { big: '출장 전 차량 확인', small: '보내 주신 차종·연식·사진으로 먼저 확인합니다.' },
  { big: '총비용 사전 안내', small: '제품·출장·장착을 포함한 금액을 상담에서 알려 드립니다.' },
  { big: '교체 후 시동 확인', small: '작업 뒤 시동 상태와 교체 내역을 함께 확인합니다.' },
  { big: '24시간 접수', small: '상담과 접수는 24시간, 방문 시간은 접수 뒤 안내합니다.' },
  { big: operatingRegionLine, small: '운영 지역. 수도권은 파트너 준비 중입니다.' },
];

export default function Home() {
  const tel = phoneHref();
  const sms = smsLinkHref();
  const reads = guides.filter((g) => g.status === 'published').slice(0, 3);
  const readList = reads.length >= 3 ? reads : guides.slice(0, 3);
  return (
    <main id="main">

      <section className="h-hero" aria-labelledby="hero-title">
        <div className="wrap">
          <div className="h-hero-copy">
            <h1 id="hero-title" className="lines">
              <span className="line"><span data-line style={{ '--i': 0 } as React.CSSProperties}>출장 배터리 교체,</span></span>
              <span className="line"><span data-line style={{ '--i': 1 } as React.CSSProperties}>차가 선 자리로.</span></span>
            </h1>
            <p className="h-hero-lead rise" style={{ '--i': 0 } as React.CSSProperties}>
              시동이 안 걸리는 그 자리로 기사가 찾아가 새 배터리로 바꿔 드립니다. 차종과 연식만 알려 주세요.
            </p>
            <div className="h-hero-actions rise" style={{ '--i': 1 } as React.CSSProperties}>
              {tel ? (
                <a className="cta" href={tel} data-track="hero" data-channel="phone">
                  전화 상담
                </a>
              ) : null}
              {sms ? (
                <a className="cta dark" href={sms} data-track="hero" data-channel="sms">
                  문자 상담
                </a>
              ) : (
                <a className="cta dark" href="#sms">
                  문자 문구 만들기
                </a>
              )}
            </div>
            <p className="h-hero-facts rise" style={{ '--i': 2 } as React.CSSProperties}>
              {operatingRegionLine} 출장 · 24시간 접수
            </p>
          </div>
          <div className="h-hero-3d">
            <Battery3D />
          </div>
        </div>

      </section>

      <section id="sms" className="h-sms" aria-labelledby="sms-title">
        <div className="wrap">
          <div className="h-sms-copy" data-reveal>
            <h2 id="sms-title">문자 한 통이면 됩니다</h2>
            <p>차종과 연식을 고르고 증상을 체크하면 보낼 문자가 완성됩니다. 사진은 문자 앱에서 붙이면 됩니다.</p>
            <ul className="h-sms-facts">
              <li><span className="bullet" aria-hidden="true" />필수는 차종과 연식, 두 가지뿐입니다.</li>
              <li><span className="bullet" aria-hidden="true" />작업자가 출장 전에 차량 정보와 사진을 확인합니다.</li>
              <li><span className="bullet" aria-hidden="true" />제품·총비용·방문 일정은 확인 뒤 안내합니다.</li>
            </ul>

          </div>
          <div className="h-sms-form">
            <ContactForm />
          </div>
        </div>
      </section>

      <section className="h-menu" aria-label="차종·지역·읽을거리">
        <div className="wrap">
          <div className="h-menu-cat" data-reveal>
            <h2>차종별 안내</h2>
            <span>{vehicles.length}종</span>
          </div>
          <ul className="h-menu-items" data-reveal>
            {vehicles.map((v) => (
              <li key={v.slug}>
                <Link className="h-menu-item" href={`/vehicles/${v.slug}`}>
                  <span className="bullet" aria-hidden="true" />
                  <span>
                    <h3>
                      {v.brand} {v.name}
                      <span>{v.type}</span>
                    </h3>
                    <p>{v.note}</p>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link className="h-menu-item" href="/contact?vehicle=other">
                <span className="bullet" aria-hidden="true" />
                <span>
                  <h3>
                    목록에 없는 차종<span>직접 입력</span>
                  </h3>
                  <p>차종명을 적어 보내 주시면 작업자가 규격을 확인합니다.</p>
                </span>
              </Link>
            </li>
          </ul>

          <div className="h-menu-cat" data-reveal>
            <h2>지역별 안내</h2>
            <span>{operatingRegions.length}개 지역 운영</span>
          </div>
          <ul className="h-menu-items" data-reveal>
            {operatingRegions.map((r) => (
              <li key={r.slug}>
                <Link className="h-menu-item" href={`/regions/${r.slug}`}>
                  <span className="bullet" aria-hidden="true" />
                  <span>
                    <h3>
                      {r.name}<span>운영 중</span>
                    </h3>
                    <p>{r.note}</p>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="h-menu-note">
            {holdRegions.map((r) => r.name).join('·')}은 파트너 준비 중입니다. 목록에 없는 지역은 <Link href="/contact?region=other">지역을 직접 입력</Link>해 주세요.
          </p>

          <div className="h-menu-cat" data-reveal>
            <h2>읽을거리</h2>
            <span>{readList.length}편</span>
          </div>
          <ul className="h-menu-items" data-reveal>
            {readList.map((g) => (
              <li key={g.slug}>
                <Link className="h-menu-item" href={`/guides/${g.slug}`}>
                  <span className="bullet" aria-hidden="true" />
                  <span>
                    <h3>{g.title}</h3>
                    <p>{g.excerpt}</p>
                    <em>{g.tag}</em>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="h-flow" aria-labelledby="flow-title">
        <div className="wrap">
          <div className="h-flow-head" data-reveal>
            <h2 id="flow-title">문자에서 시동까지</h2>
            <p>흩어진 걱정이 문자 한 줄로 모이고, 정돈된 교체로 끝납니다. 세 단계면 됩니다.</p>
          </div>
          <ol className="h-flow-steps" data-reveal>
            {serviceSteps.map((s, idx) => (
              <li key={s.title} className="h-flow-step-card">
                <div className="h-flow-step-badge">
                  <span>STEP 0{idx + 1}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <Showcase scenes={scenes} title="차 옆에서 바로 교체합니다" text="기사가 공구와 새 배터리를 가지고 차가 선 자리로 갑니다. 기존 배터리를 떼고, 규격에 맞는 제품을 달고, 시동과 전압을 확인합니다." />

      <section className="h-proof" aria-labelledby="proof-title">
        <div className="wrap">
          <ul className="h-proof-board" data-reveal>
            <li className="h-proof-tile lead">
              <h2 id="proof-title">믿고 맡기는 기준</h2>
              <p>배터리콜이 모든 출장에서 지키는 다섯 가지입니다.</p>
            </li>
            {proofTiles.slice(0, 2).map((t) => (
              <li key={t.big} className="h-proof-tile">
                <span>{t.big}</span>
                <small>{t.small}</small>
              </li>
            ))}
            <li className="h-proof-tile pic">
              <Image src="/images/batterycall_2.webp" alt="장갑을 낀 손으로 기존 배터리를 떼어 내는 작업 장면" width={1600} height={1200} unoptimized loading="lazy" />
            </li>
            {proofTiles.slice(2).map((t) => (
              <li key={t.big} className="h-proof-tile">
                <span>{t.big}</span>
                <small>{t.small}</small>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="h-faq" aria-label="자주 묻는 질문">
        <div className="wrap">
          <FaqCards title="자주 묻는 질문" />
          <div className="h-faq-more">
            <Link className="text-link" href="/service">교체 과정과 비용 항목 보기</Link>
            <Link className="text-link" href="/battery-info">배터리 정보 더 읽기</Link>
          </div>
        </div>
      </section>

      <CallBand position="home_band" />
    </main>
  );
}
