import Link from '@/components/site/site-link';
import { ArrowUpRight } from 'lucide-react';
import { FaqCards } from './home';
import { categories, serviceSteps, operatingRegionLine, isHoldRegion, type Guide } from '@/lib/content';
import { contactHref, siteConfig, phoneHref, smsLinkHref } from '@/lib/site-config';
import { HideOnHold } from './cta';

export function Header() {
  const tel = phoneHref();
  return (
    <>
      <Link className="skip-link" href="#main">
        본문으로 바로가기
      </Link>
      <header className="nav" id="nav">
        <div className="wrap nav-in">
          <Link className="brand" href="/" aria-label="배터리콜 홈">
            <span className="brand-mark" aria-hidden="true">
              <svg className="ic" viewBox="0 0 24 24">
                <use href="#i-bolt" />
              </svg>
            </span>
            <span>배터리콜</span>
            <span className="brand-sub">{operatingRegionLine} 출장</span>
          </Link>
          <nav className="nav-links" id="nav-links" aria-label="주 메뉴">
            {categories.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}>
                {c.name}
              </Link>
            ))}
            <Link href="/#form-card" data-goto-form="true">
              문의하기
            </Link>
          </nav>
          <div className="nav-actions">
            <HideOnHold>
              {tel ? (
                <a className="nav-cta" href={tel} data-track="header" data-channel="phone">
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-phone" />
                  </svg>
                  <span>전화 상담</span>
                </a>
              ) : (
                <Link className="nav-cta" href="/#form-card" data-goto-form="true">
                  문의하기
                </Link>
              )}
            </HideOnHold>
            <button
              className="nav-menu"
              id="nav-menu"
              type="button"
              aria-expanded="false"
              aria-controls="nav-links"
              aria-label="메뉴 열기"
            >
              <svg className="ic i-menu" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#i-menu" />
              </svg>
              <svg className="ic i-close" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#i-close" />
              </svg>
            </button>
          </div>
        </div>
        <div className="nav-prog" id="nav-prog" aria-hidden="true" />
      </header>
    </>
  );
}

export function Footer() {
  const tel = phoneHref();
  return (
    <>
      <footer className="foot">
        <div className="wrap">
          <div className="foot-top">
            <Link className="brand" href="/">
              <span className="brand-mark" aria-hidden="true">
                <svg className="ic" viewBox="0 0 24 24">
                  <use href="#i-bolt" />
                </svg>
              </span>
              <span>배터리콜</span>
              <span className="brand-sub">{siteConfig.headline}</span>
            </Link>
            <nav aria-label="바닥 메뉴">
              {categories.map((c) => (
                <Link key={c.slug} href={`/${c.slug}`}>
                  {c.name}
                </Link>
              ))}
              <Link href="/reviews">교체 후기</Link>
              <Link href="/#form-card" data-goto-form="true">
                문의 내용 작성
              </Link>
              <Link href="/privacy">개인정보 안내</Link>
            </nav>
          </div>
          <div className="foot-bottom">
            <p>
              <b>상호</b> 컨시어지블루 (배터리콜) · <b>대표전화</b>{' '}
              <a href={`tel:${siteConfig.officePhone}`} data-track="footer" data-channel="phone">
                {siteConfig.officePhone}
              </a>{' '}
              · <b>이메일</b> <a href="mailto:qoorocket@gmail.com">qoorocket@gmail.com</a>
            </p>
            <p>
              <b>운영시간</b> 24시간 상담·접수 운영 · <b>서비스 지역</b> {operatingRegionLine}
            </p>
            <p>© 2026 컨시어지블루 (배터리콜). All rights reserved.</p>
          </div>
        </div>
      </footer>
      <HideOnHold>
        <section className="mbar" id="mbar" aria-label="빠른 상담 연결">
          <p>
            <b>출장 배터리 교체 · 24시간 접수</b>
            <span>{operatingRegionLine} · 차종·연식만 알려 주세요</span>
          </p>
          <div className="mbar-actions">
            {tel ? (
              <a className="btn btn-primary" href={tel} data-track="dock" data-channel="phone">
                전화
              </a>
            ) : null}
            <Link
              className="btn btn-out"
              href="/#form-card"
              data-goto-form="true"
              data-track="dock"
              data-channel="sms"
            >
              문자
            </Link>
          </div>
        </section>
      </HideOnHold>
      <a className="totop" id="totop" href="#main" aria-label="맨 위로 이동">
        <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
          <use href="#i-arrow" />
        </svg>
      </a>
    </>
  );
}

export function CallBand({
  position = 'bottom_cta',
  vehicle = '',
  region = '',
}: {
  position?: string;
  vehicle?: string;
  region?: string;
}) {
  const hold = isHoldRegion(region);
  const tel = phoneHref();
  const sms = smsLinkHref();
  const toForm = hold || !tel;
  const href = toForm ? contactHref('inquiry', vehicle, region) : tel;
  return (
    <div className="call-wrap">
      {toForm ? (
        <Link className="call-band" href={href}>
          <p className="call-note">
            차종과 연식을 적으면 보낼 문자가 완성됩니다. 작업자가 출장 전에 확인합니다.
          </p>
          <p className="call-word">문의하기</p>
        </Link>
      ) : (
        <a className="call-band" href={href} data-track={position} data-channel="phone">
          <p className="call-note">
            24시간 접수. 차종과 연식을 말씀해 주시면 제품과 총비용, 방문 일정을 안내합니다.
            {sms ? ' 문자도 같은 번호로 보내 주세요.' : ''}
          </p>
          <p className="call-word">전화하기</p>
        </a>
      )}
    </div>
  );
}

export function BottomCTA({
  vehicle = '',
  region = '',
  position = '',
}: {
  vehicle?: string;
  region?: string;
  position?: string;
}) {
  const track =
    position || (region ? `region_${region}` : vehicle ? 'vehicle_detail' : 'bottom_cta');
  return <CallBand position={track} vehicle={vehicle} region={region} />;
}

export function SectionHeading({
  title,
  description,
  href,
  linkText,
}: {
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {href ? (
        <Link className="text-link" href={href}>
          {linkText || '전체 보기'}
          <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export function Crumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumb" aria-label="현재 위치">
      <Link href="/">홈</Link>
      {items.map((x, i) => (
        <span key={i}>
          <span aria-hidden="true">/</span>
          {x.href ? (
            <Link href={x.href}>{x.label}</Link>
          ) : (
            <span aria-current="page">{x.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}

export function PageIntro({ title, description }: { title: string; description: string }) {
  return (
    <div className="page-intro" data-reveal>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export function GuideCard({ guide, featured = false }: { guide: Guide; featured?: boolean }) {
  return (
    <Link className={`guide-card ${featured ? 'featured' : ''}`} href={`/guides/${guide.slug}`}>
      <h3>{guide.title}</h3>
      <p>{guide.excerpt}</p>
      <span className="guide-more">
        <span>
          {guide.category === 'blog' ? '글 읽기' : '가이드 읽기'} · {guide.tag}
        </span>
        <ArrowUpRight size={17} aria-hidden="true" />
      </span>
    </Link>
  );
}

export function Steps() {
  return (
    <ol className="steps" data-reveal>
      {serviceSteps.map((s) => (
        <li key={s.title}>
          <span className="bullet" aria-hidden="true" />
          <h3>{s.title}</h3>
          <p>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

export function Trust() {
  return (
    <div className="trust-grid" data-reveal>
      {[
        { title: '차량 확인은 작업자가', text: '보내주신 차종·연식·사진으로 먼저 확인해요.' },
        { title: '총비용을 미리', text: '제품과 출장·장착을 포함한 비용을 안내해요.' },
        { title: '교체 후 확인까지', text: '작업 후 시동 상태와 교체 내역을 확인해요.' },
      ].map(({ title, text }) => (
        <div className="trust-item" key={title}>
          <span className="bullet" aria-hidden="true" />
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ReviewSection() {
  return (
    <section className="section wrap" id="reviews">
      <SectionHeading
        title="교체 경험이, 다음 선택의 기준이 되도록."
        description="후기 영역 미리보기입니다. 아래 내용은 실제 고객 후기가 아닌 구성 예시입니다."
        href="/reviews"
        linkText="후기 영역 보기"
      />
      <div className="review-grid">
        {[
          {
            car: '그랜저 · 지하주차장',
            title: '약속한 위치에서 시작하는 교체',
            text: '방문 시간과 주차장 진입 조건, 현장 안내 경험을 담을 후기 영역입니다.',
          },
          {
            car: '쏘렌토 · 교체 비용',
            title: '설명받은 내용과 실제 작업',
            text: '제품과 총비용 안내가 실제 작업과 일치했는지 담을 후기 영역입니다.',
          },
        ].map(({ car, title, text }) => (
          <article className="review-card" key={car}>
            <h3>{title}</h3>
            <p>{text}</p>
            <div>
              <span className="bullet" aria-hidden="true" />
              <span>{car}</span>
            </div>
            <span className="sample-label">후기 예시</span>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FAQSection() {
  return (
    <section className="section wrap">
      <FaqCards title="궁금한 점, 먼저 확인하세요" />
    </section>
  );
}

export function SitePhoto(_props: { name?: string; caption?: string }) {
  return null;
}
