import Link from '@/components/site/site-link';
import Image from 'next/image';
import { ArrowUpRight, MessageCircle, ClipboardList } from 'lucide-react';
import { MobileMenu } from './interactive';
import { FaqCards, HideOnHome } from './home';
import { categories, serviceSteps, operatingRegionLine, isHoldRegion, type Guide } from '@/lib/content';
import { contactHref, siteConfig } from '@/lib/site-config';
import { DockContacts, HideOnHold } from './cta';

export function Header() {
  return (
    <>
      <Link className="skip-link" href="#main">
        본문으로 바로가기
      </Link>
      <div className="topbar">
        <header className="header">
          <Link className="brand" href="/" aria-label="배터리콜 홈">
            <span className="bullet" aria-hidden="true" />
            <span>배터리콜</span>
          </Link>
          <nav aria-label="주 메뉴">
            {categories.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`}>
                {c.name}
              </Link>
            ))}
          </nav>
          <HideOnHold>
            <Link className="btn lime header-cta" href="/contact">
              문의하기
            </Link>
          </HideOnHold>
          <MobileMenu />
        </header>
      </div>
    </>
  );
}

// 페이지의 끝: 이름을 블록으로 세운다 (글자마다 제 색 사각형에서 파낸 모양).
export function Footer() {
  return (
    <>
      <footer className="foot">
        <div className="wrap">
          <div className="foot-mark" role="img" aria-label="배터리콜">
            {['배', '터', '리', '콜'].map((ch) => (
              <span className="foot-block" key={ch}>
                {ch}
              </span>
            ))}
          </div>
          <div className="foot-grid">
            <nav className="foot-links" aria-label="바닥 메뉴">
              <div>
                {categories.slice(0, 2).map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`}>{c.name}</Link>
                ))}
              </div>
              <div>
                {categories.slice(2, 4).map((c) => (
                  <Link key={c.slug} href={`/${c.slug}`}>{c.name}</Link>
                ))}
              </div>
              <div>
                <Link href="/blog">블로그</Link>
                <Link href="/reviews">교체 후기</Link>
              </div>
              <div>
                <Link href="/contact">문의 내용 작성</Link>
                <Link href="/privacy">개인정보 안내</Link>
              </div>
            </nav>
            <div className="foot-contact">
              <p>
                <span>대표 전화 </span>
                <a href={`tel:${siteConfig.officePhone}`} data-track="footer" data-channel="phone">{siteConfig.officePhone}</a>
              </p>
              <p>
                <span>이메일 </span>
                <a href="mailto:qoorocket@gmail.com">qoorocket@gmail.com</a>
              </p>
              <p>24시간 상담·접수 운영</p>
              <p>서비스 지역 {operatingRegionLine}</p>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 컨시어지블루 (배터리콜). All rights reserved.</span>
            <Link className="btn lime" href="/contact">문의 내용 작성하기</Link>
          </div>
        </div>
      </footer>
      <HideOnHome>
      <HideOnHold>
        <div className="contact-dock" aria-label="빠른 문의">
          <div className="dock-label">
            <span className="bullet" aria-hidden="true" />
            <span>
              출장 배터리 교체<small>차종·연식만 알려 주세요</small>
            </span>
          </div>
          <DockContacts />
          {siteConfig.kakaoUrl ? (
            <Link href={contactHref('kakao')}>
              <MessageCircle size={18} />
              <span>카카오 상담</span>
            </Link>
          ) : null}
          <Link className="dock-primary" href="/contact">
            <ClipboardList size={18} aria-hidden="true" />
            <span>문의 작성</span>
          </Link>
        </div>
      </HideOnHold>
      </HideOnHome>
    </>
  );
}

// 호출 띠: 띠 전체가 하나의 링크, 한 단어가 버튼.
export function CallBand({ position = 'bottom_cta', vehicle = '', region = '' }: { position?: string; vehicle?: string; region?: string }) {
  const hold = isHoldRegion(region);
  const tel = phoneHref();
  const sms = smsLinkHref();
  const toForm = hold || !tel;
  const href = toForm ? contactHref('inquiry', vehicle, region) : tel;
  return (
    <div className="call-wrap">
      {toForm ? (
        <Link className="call-band" href={href}>
          <p className="call-note">차종과 연식을 적으면 보낼 문자가 완성됩니다. 작업자가 출장 전에 확인합니다.</p>
          <svg className="call-arrow" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 36 36 12M16 12h20v20" />
          </svg>
          <p className="call-word">문의하기</p>
        </Link>
      ) : (
        <a className="call-band" href={href} data-track={position} data-channel="phone">
          <p className="call-note">24시간 접수. 차종과 연식을 말씀해 주시면 제품과 총비용, 방문 일정을 안내합니다.{sms ? ' 문자도 같은 번호로 보내 주세요.' : ''}</p>
          <svg className="call-arrow" viewBox="0 0 48 48" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 36 36 12M16 12h20v20" />
          </svg>
          <p className="call-word">전화하기</p>
        </a>
      )}
    </div>
  );
}
export function BottomCTA({ vehicle = '', region = '', position = '' }: { vehicle?: string; region?: string; position?: string }) {
  const track = position || (region ? `region_${region}` : vehicle ? 'vehicle_detail' : 'bottom_cta');
  return <CallBand position={track} vehicle={vehicle} region={region} />;
}
export function SectionHeading({ title, description, href, linkText }: { title: string; description?: string; href?: string; linkText?: string }) {
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
          {x.href ? <Link href={x.href}>{x.label}</Link> : <span aria-current="page">{x.label}</span>}
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
      <SectionHeading title="교체 경험이, 다음 선택의 기준이 되도록." description="후기 영역 미리보기입니다. 아래 내용은 실제 고객 후기가 아닌 구성 예시입니다." href="/reviews" linkText="후기 영역 보기" />
      <div className="review-grid">
        {[
          { car: '그랜저 · 지하주차장', title: '약속한 위치에서 시작하는 교체', text: '방문 시간과 주차장 진입 조건, 현장 안내 경험을 담을 후기 영역입니다.' },
          { car: '쏘렌토 · 교체 비용', title: '설명받은 내용과 실제 작업', text: '제품과 총비용 안내가 실제 작업과 일치했는지 담을 후기 영역입니다.' },
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

// 서브페이지용 현장 사진 한 장: 배터리 블록 액자, 셔터로 열림. 연출 사진은 캡션에 밝힌다.
const PHOTOS = {
  tech: { src: '/media/tech.webp', alt: '새 배터리를 들고 작업 차량 옆에 선 기사', caption: '차가 선 자리로 기사가 갑니다. (연출 사진)' },
  terminal: { src: '/media/terminal.webp', alt: '새 배터리의 단자를 조이는 장갑 낀 손', caption: '규격에 맞는 새 배터리를 달고 단자를 조입니다. (연출 사진)' },
  caller: { src: '/media/caller.webp', alt: '지하주차장에서 차 옆에 서서 문자를 보내는 운전자', caption: '차종과 연식만 문자로 보내면 됩니다. (연출 사진)' },
  warning: { src: '/media/warning.webp', alt: '계기판에 켜진 붉은 배터리 경고등', caption: '경고등이 켜졌다면 사진을 함께 보내 주세요. (연출 사진)' },
};
export function SitePhoto({ name, caption }: { name: keyof typeof PHOTOS; caption?: string }) {
  const p = PHOTOS[name];
  return (
    <figure className="cell photo page-figure">
      <div className="page-figure-frame shutter">
        <Image src={p.src} alt={p.alt} width={2000} height={1500} unoptimized loading="lazy" />
      </div>
      <figcaption>▲ {caption || p.caption}</figcaption>
    </figure>
  );
}
