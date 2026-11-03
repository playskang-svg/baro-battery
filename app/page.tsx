import Link from '@/components/site/site-link';
import { ContactForm } from '@/components/site/interactive';
import { CallBand } from '@/components/site/shared';
import { FaqCards } from '@/components/site/home';
import { Battery3D } from '@/components/site/battery-3d';
import { guides, operatingRegionLine, operatingRegions, holdRegions, serviceSteps, vehicles } from '@/lib/content';
import { phoneHref, smsLinkHref } from '@/lib/site-config';
import './home.css';

const proofTiles = [
  { big: '출장 전 차량 확인', small: '보내 주신 차종과 연식으로 규격을 1:1 사전 점검합니다.' },
  { big: '총비용 사전 안내', small: '제품·출장·장착을 모두 포함한 최종 금액을 사전에 안내합니다.' },
  { big: '1:1 정품 신품 배터리', small: '최근 생산된 최상급 정품 배터리만 안전하게 장착합니다.' },
  { big: '교체 후 시동·전압 점검', small: '장착 직후 시동 모터 및 발전기 충전 전압을 정밀 계측합니다.' },
  { big: '24시간 접수', small: '상담과 접수는 24시간, 예약된 일정에 맞춰 현장으로 출동합니다.' },
  { big: operatingRegionLine, small: '대구·구미·칠곡·경산 전 지역 출장. 수도권은 파트너 준비 중입니다.' },
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
          <div className="h-sms-copy">
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
          <div className="h-menu-cat">
            <h2>차종별 안내</h2>
            <span>{vehicles.length}종</span>
          </div>
          <ul className="h-menu-items">
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

          <div className="h-menu-cat">
            <h2>지역별 안내</h2>
            <span>{operatingRegions.length}개 지역 운영</span>
          </div>
          <ul className="h-menu-items">
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

          <div className="h-menu-cat">
            <h2>읽을거리</h2>
            <span>{readList.length}편</span>
          </div>
          <ul className="h-menu-items">
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
          <div className="h-flow-head">
            <h2 id="flow-title">문자에서 시동까지</h2>
            <p>흩어진 걱정이 문자 한 줄로 모이고, 정돈된 교체로 끝납니다. 세 단계면 됩니다.</p>
          </div>
          <ol className="h-flow-steps">
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

      <section className="h-proof" aria-labelledby="proof-title">
        <div className="wrap">
          <ul className="h-proof-board">
            <li className="h-proof-tile lead">
              <h2 id="proof-title">믿고 맡기는 기준</h2>
              <p>배터리콜이 모든 출장에서 지키는 여섯 가지 원칙입니다.</p>
            </li>
            {proofTiles.map((t) => (
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
