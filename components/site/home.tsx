'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from '@/components/site/site-link';
import { faqs, operatingRegions, holdRegions, vehicles } from '@/lib/content';

export function MotionRoot() {
  const pathname = usePathname() || '/';

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const wide = window.matchMedia('(min-width: 960px)');
    const px = (n: number) => `${Math.round(n * 10) / 10}px`;
    const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));

    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('nav-menu');
    const navLinks = document.getElementById('nav-links');
    const prog = document.getElementById('nav-prog');
    const mbar = document.getElementById('mbar');
    const totop = document.getElementById('totop');
    const hero = document.querySelector<HTMLElement>('.hero');
    const video = document.querySelector<HTMLVideoElement>('.hero-video');
    const heroFloat = document.getElementById('hero-float');
    const light = document.querySelector<HTMLVideoElement>('.bt-video');
    const motionBtn = document.getElementById('motion-btn');
    const chapters = [...document.querySelectorAll<HTMLElement>('.chapter')];
    const chaptersEl = document.querySelector<HTMLElement>('.chapters');
    const stage = document.getElementById('stage');
    const laptopScrs = [...document.querySelectorAll<HTMLElement>('.laptop .scr')];
    const phoneScrs = [
      ...document.querySelectorAll<HTMLElement>('.wing-mirror .scr, .phone .scr'),
    ];
    const statsEl = document.querySelector<HTMLElement>('.stats');
    const laptop = document.querySelector<HTMLElement>('.laptop');
    const phoneEl = document.querySelector<HTMLElement>('.wing-mirror, .phone');
    const band = document.getElementById('band');
    const bandImg = document.getElementById('band-img');
    const ctImg = document.querySelector<HTMLElement>('.ct-media img');
    const contactSec =
      document.getElementById('sms') || document.querySelector<HTMLElement>('.inquiry-form');

    const isHome = pathname === '/' && Boolean(hero);
    if (nav) {
      nav.classList.toggle('is-home-top', isHome);
      if (!isHome) nav.classList.add('is-solid');
    }

    // 모바일 메뉴 토글 및 폼 스크롤 이동
    const setMenu = (on: boolean) => {
      if (!nav || !menuBtn) return;
      nav.classList.toggle('is-open', on);
      menuBtn.setAttribute('aria-expanded', String(on));
    };
    const onMenuClick = () => {
      if (!nav) return;
      setMenu(!nav.classList.contains('is-open'));
    };
    const onLinksClick = (e: Event) => {
      if ((e.target as HTMLElement | null)?.closest('a')) setMenu(false);
    };
    const onDocKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && nav?.classList.contains('is-open')) {
        setMenu(false);
        menuBtn?.focus();
      }
    };
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (nav && target && !nav.contains(target)) setMenu(false);
      const gotoLink = target?.closest<HTMLAnchorElement>(
        'a[data-goto-form], a[href="#form-card"], a[href="/#form-card"], a[href="#sms"]',
      );
      if (gotoLink) {
        const formCard =
          document.getElementById('form-card') || document.getElementById('sms-inquiry');
        if (formCard) {
          e.preventDefault();
          const vehicle = gotoLink.dataset.vehicle;
          const region = gotoLink.dataset.region;
          if (vehicle || region) {
            window.dispatchEvent(
              new CustomEvent('batterycall:prefill', { detail: { vehicle, region } }),
            );
          }
          formCard.scrollIntoView({
            behavior: reduce ? 'auto' : 'smooth',
            block: 'start',
          });
          formCard.classList.add('is-targeted');
          window.setTimeout(() => formCard.classList.remove('is-targeted'), 1600);
          window.setTimeout(() => {
            const focusId =
              vehicle === 'other'
                ? 'inquiry-other-vehicle'
                : vehicle
                  ? 'inquiry-year'
                  : 'inquiry-vehicle';
            const input = document.getElementById(focusId) as HTMLElement | null;
            input?.focus({ preventScroll: true });
          }, 420);
        }
      }
    };
    menuBtn?.addEventListener('click', onMenuClick);
    navLinks?.addEventListener('click', onLinksClick);
    document.addEventListener('keydown', onDocKey);
    document.addEventListener('click', onDocClick);

    // 히어로 영상 재생
    const tryPlay = () => {
      if (!video) return;
      const p = video.play();
      if (p && p.catch) p.catch(() => {});
    };
    if (video && hero) {
      if (reduce) {
        video.removeAttribute('autoplay');
        video.pause();
      } else {
        video.addEventListener('playing', () => hero.classList.add('is-playing'), { once: true });
        tryPlay();
      }
    }

    // 벤토 영상 재생
    let lightIn = false;
    let lightIo: IntersectionObserver | null = null;
    const lightRun = () => {
      if (!light) return;
      if (lightIn && !root.classList.contains('is-still') && !reduce) {
        light.play().catch(() => {});
      } else {
        light.pause();
      }
    };
    if (light && !reduce && 'IntersectionObserver' in window) {
      light.addEventListener('playing', () => light.classList.add('is-on'), { once: true });
      lightIo = new IntersectionObserver(
        ([en]) => {
          lightIn = en.isIntersecting;
          lightRun();
        },
        { rootMargin: '150px 0px' },
      );
      lightIo.observe(light);
    }

    // 모션 일시정지 버튼
    const onMotionClick = () => {
      if (!motionBtn) return;
      const still = root.classList.toggle('is-still');
      motionBtn.setAttribute('aria-pressed', String(still));
      motionBtn.setAttribute(
        'aria-label',
        still ? '움직이는 화면 다시 재생' : '움직이는 화면 멈추기',
      );
      if (video && hero?.classList.contains('is-playing')) {
        if (still) video.pause();
        else video.play().catch(() => {});
      }
      if (light) lightRun();
    };
    motionBtn?.addEventListener('click', onMotionClick);

    // 히어로 3D 마우스 틸트
    const onHeroMove = (e: PointerEvent) => {
      if (!heroFloat) return;
      heroFloat.style.setProperty('--rx', `${((0.5 - e.clientY / innerHeight) * 6).toFixed(2)}deg`);
      heroFloat.style.setProperty('--ry', `${((e.clientX / innerWidth - 0.5) * 8).toFixed(2)}deg`);
    };
    const onHeroLeave = () => {
      if (!heroFloat) return;
      heroFloat.style.setProperty('--rx', '0deg');
      heroFloat.style.setProperty('--ry', '0deg');
    };
    if (hero && heroFloat && fine.matches && !reduce) {
      hero.addEventListener('pointermove', onHeroMove);
      hero.addEventListener('pointerleave', onHeroLeave);
    }

    // 히어로 숫자 카운트업
    if (!reduce) {
      document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count);
        if (!Number.isFinite(end)) return;
        const t0 = performance.now() + 400;
        const tick = (t: number) => {
          const p = Math.max(0, Math.min(1, (t - t0) / 1100));
          el.textContent = String(Math.round(end * (1 - (1 - p) ** 3)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }

    // 카드 3D 포인터 틸트
    const cleanTilts: (() => void)[] = [];
    if (!reduce && fine.matches) {
      const bindTilt = (hover: HTMLElement, target: HTMLElement, max = 6) => {
        const move = (e: PointerEvent) => {
          const r = hover.getBoundingClientRect();
          const rx = ((0.5 - (e.clientY - r.top) / r.height) * max).toFixed(2);
          const ry = (((e.clientX - r.left) / r.width - 0.5) * max).toFixed(2);
          target.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(calc(var(--lift, 0px) - 6px))`;
        };
        const leave = () => {
          target.style.transform = '';
        };
        hover.addEventListener('pointermove', move);
        hover.addEventListener('pointerleave', leave);
        cleanTilts.push(() => {
          hover.removeEventListener('pointermove', move);
          hover.removeEventListener('pointerleave', leave);
        });
      };
      document.querySelectorAll<HTMLElement>('.plan').forEach((p) => bindTilt(p, p));
      document.querySelectorAll<HTMLElement>('.card').forEach((c) => {
        const dev = c.querySelector<HTMLElement>('.card-dev');
        const bw = c.querySelector<HTMLElement>('.bw');
        if (dev && bw) bindTilt(dev, bw);
      });
    }

    // 스티키 쇼케이스 챕터 전환
    let curChapter = 0;
    const setShow = (i: number) => {
      if (i === curChapter || !chapters.length) return;
      curChapter = i;
      chapters.forEach((c, k) => c.classList.toggle('is-on', k === i));
      laptopScrs.forEach((s, k) => s.classList.toggle('is-on', k === i));
      phoneScrs.forEach((s, k) => s.classList.toggle('is-on', k === i));
      const numEl = document.getElementById('stage-num');
      const nameEl = document.getElementById('stage-name');
      const progEl = document.getElementById('stage-prog');
      if (numEl) numEl.textContent = String(i + 1).padStart(2, '0');
      if (nameEl && chapters[i]?.dataset.name) nameEl.textContent = chapters[i].dataset.name || '';
      if (progEl) progEl.style.transform = `scaleX(${(i + 1) / chapters.length})`;
    };

    // 상담 영역 가시성 관찰
    let contactIn = false;
    let contactIo: IntersectionObserver | null = null;
    if (contactSec && 'IntersectionObserver' in window) {
      contactIo = new IntersectionObserver(([en]) => {
        contactIn = en.isIntersecting;
        onScroll();
      });
      contactIo.observe(contactSec);
    }

    // 통합 스크롤 핸들러
    let ticking = false;
    function onScroll() {
      ticking = false;
      const vh = innerHeight;
      const y = scrollY;
      if (nav) {
        if (isHome && hero) {
          nav.classList.toggle('is-solid', y > hero.offsetHeight - 72);
        } else {
          nav.classList.add('is-solid');
        }
      }
      if (prog) {
        prog.style.setProperty('--p', clamp(y / Math.max(1, root.scrollHeight - vh), 0, 1).toFixed(4));
      }
      if (totop) {
        totop.classList.toggle('is-on', y > vh * 1.2);
      }
      const past = isHome && hero ? y > hero.offsetHeight * 0.65 : y > 260;
      const barOn = past && !contactIn;
      if (mbar) mbar.classList.toggle('is-on', barOn);
      if (nav) nav.classList.toggle('has-bar', barOn);
      root.classList.toggle('has-bar', barOn);

      if (stage && chapters.length) {
        const sb = stage.getBoundingClientRect().bottom;
        const line = wide.matches ? vh * 0.5 : sb + (vh - sb) * 0.4;
        let idx = 0;
        chapters.forEach((c, k) => {
          if (c.getBoundingClientRect().top < line) idx = k;
        });
        setShow(idx);
      }

      if (reduce) return;

      if (hero && y < hero.offsetHeight) {
        hero.style.setProperty('--py', px(y * 0.32));
        hero.style.setProperty('--my', px(y * 0.16));
        hero.style.setProperty('--fy', px(-y * 0.11));
        if (statsEl) statsEl.style.setProperty('--sy', px(-y * 0.05));
      }
      if (chaptersEl && laptop && phoneEl) {
        const cr = chaptersEl.getBoundingClientRect();
        const cp = clamp((vh - cr.top) / (vh + cr.height), 0, 1) - 0.5;
        laptop.style.setProperty('--ly', px(cp * -18));
        phoneEl.style.setProperty('--phy', px(cp * -56));
      }
      if (band && bandImg) {
        const br = band.getBoundingClientRect();
        if (br.bottom > 0 && br.top < vh) {
          bandImg.style.setProperty(
            '--by',
            px(((br.top + br.height / 2 - vh / 2) / (vh + br.height)) * -90),
          );
        }
      }
      if (ctImg) {
        const tr = ctImg.getBoundingClientRect();
        if (tr.bottom > 0 && tr.top < vh) {
          ctImg.style.setProperty(
            '--cy',
            px(clamp((tr.top + tr.height / 2 - vh / 2) / vh, -0.5, 0.5) * -22),
          );
        }
      }
    }
    const kick = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };
    addEventListener('scroll', kick, { passive: true });
    addEventListener('resize', onScroll);
    onScroll();

    return () => {
      menuBtn?.removeEventListener('click', onMenuClick);
      navLinks?.removeEventListener('click', onLinksClick);
      document.removeEventListener('keydown', onDocKey);
      document.removeEventListener('click', onDocClick);
      motionBtn?.removeEventListener('click', onMotionClick);
      if (hero && heroFloat) {
        hero.removeEventListener('pointermove', onHeroMove);
        hero.removeEventListener('pointerleave', onHeroLeave);
      }
      cleanTilts.forEach((fn) => fn());
      lightIo?.disconnect();
      contactIo?.disconnect();
      removeEventListener('scroll', kick);
      removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  return null;
}

export function HideOnHome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '/';
  if (pathname === '/') return null;
  return <>{children}</>;
}

type ExplorerItem = {
  id: string;
  cat: 'vehicle' | 'region';
  catLabel: string;
  badge: string;
  title: string;
  desc: string;
  href: string;
  urlText: string;
  ctaLabel: string;
  vehicleSlug?: string;
  regionSlug?: string;
  img: string;
};

export function HomeExplorer() {
  const [cat, setCat] = useState<'all' | 'vehicle' | 'region'>('all');
  const [query, setQuery] = useState('');

  const regionImgs = [
    '/media/tech.webp',
    '/media/terminal.webp',
    '/media/caller.webp',
    '/media/warning.webp',
  ];

  const items: ExplorerItem[] = [
    ...vehicles.map((v) => ({
      id: `v-${v.slug}`,
      cat: 'vehicle' as const,
      catLabel: `차종별 안내 · ${v.vehicleClass}`,
      badge: v.brand,
      title: `${v.brand} ${v.name}`,
      desc: v.note,
      href: `/vehicles/${v.slug}`,
      urlText: `batterycall.kr/vehicles/${v.slug}`,
      ctaLabel: '이 차종 문의',
      vehicleSlug: v.slug,
      img: `/media/vehicles/${v.slug}.webp`,
    })),
    ...operatingRegions.map((r, i) => ({
      id: `r-${r.slug}`,
      cat: 'region' as const,
      catLabel: '지역별 안내 · 운영 중',
      badge: `${r.name} 출장`,
      title: `${r.name} 출장 배터리 교체`,
      desc: r.note,
      href: `/regions/${r.slug}`,
      urlText: `batterycall.kr/regions/${r.slug}`,
      ctaLabel: '이 지역 문의',
      regionSlug: r.slug,
      img: regionImgs[i % regionImgs.length],
    })),
  ];

  const qNorm = query.trim().toLowerCase();
  const filtered = items.filter((item) => {
    const matchCat = cat === 'all' || item.cat === cat;
    if (!matchCat) return false;
    if (!qNorm) return true;
    const hay = `${item.title} ${item.desc} ${item.catLabel} ${item.badge}`.toLowerCase();
    return qNorm.split(/\s+/).every((t) => hay.includes(t));
  });

  const counts = {
    all: items.length,
    vehicle: vehicles.length,
    region: operatingRegions.length,
  };

  return (
    <section className="sec gallery" id="explore" aria-labelledby="explore-title">
      <div className="wrap">
        <div className="sec-head">
          <div>
            <p className="eyebrow">
              <b>02</b>
              <span className="ln" />
              <span>차종 · 지역 빠른 선택</span>
            </p>
            <h2 id="explore-title">
              내 차종과 현재 위치를 고르면
              <br />
              바로 문자로 접수됩니다.
            </h2>
          </div>
          <p className="lead">
            주요 차종별 배터리 확인 항목({vehicles.length}종)과 운영 지역({operatingRegions.length}개 지역 운영)을
            골라 아래 체크 영역으로 바로 이동해 간편하게 문자를 보내세요.
          </p>
        </div>

        <div className="filters">
          <div className="search">
            <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
              <use href="#i-search" />
            </svg>
            <input
              id="tpl-q"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="차종·지역으로 찾기 (예: 그랜저, 아반떼, 쏘렌토, 대구, 구미)"
              aria-label="차종·지역 검색"
            />
            {query ? (
              <button
                className="search-x"
                id="tpl-qx"
                type="button"
                onClick={() => setQuery('')}
                aria-label="검색어 지우기"
              >
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#i-close" />
                </svg>
              </button>
            ) : null}
          </div>

          <p className="filter-count" id="tpl-count" aria-live="polite">
            {!qNorm
              ? `${filtered.length}개 항목을 보고 있어요`
              : filtered.length
                ? `'${query}' 검색 결과 ${filtered.length}건`
                : `'${query}'에 맞는 항목이 없어요`}
          </p>

          <div className="chips" role="toolbar" aria-label="분류 필터">
            {[
              { key: 'all' as const, label: '전체', count: counts.all },
              { key: 'vehicle' as const, label: '차종별 안내', count: counts.vehicle },
              { key: 'region' as const, label: '지역별 안내', count: counts.region },
            ].map((c) => (
              <button
                key={c.key}
                type="button"
                className={`chip ${cat === c.key ? 'is-on' : ''}`}
                aria-pressed={cat === c.key}
                onClick={() => setCat(c.key)}
              >
                {c.label} <span>{c.count}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="cards" id="tpl-grid">
          {filtered.map((item, idx) => (
            <article
              key={item.id}
              className="card pop"
              style={{ '--d': idx % 6 } as React.CSSProperties}
            >
              <Link className="card-dev" href={item.href} aria-label={`${item.title} 상세 보기`}>
                <span className="bw">
                  <span className="bw-bar" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span className="bw-url">{item.urlText}</span>
                  </span>
                  <span className="bw-img">
                    <Image src={item.img} alt="" width={720} height={450} unoptimized />
                    <span className="bw-img-top">
                      <span className="bw-badge">{item.badge}</span>
                    </span>
                    <span className="bw-img-bot">
                      <strong>{item.title}</strong>
                      <small>{item.desc}</small>
                    </span>
                  </span>
                </span>
              </Link>
              <div className="card-body">
                <span className="card-name">{item.catLabel}</span>
                <h3>
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p className="card-desc">{item.desc}</p>
                <div className="card-act">
                  <Link className="lk" href={item.href}>
                    상세 안내 <span aria-hidden="true">↗</span>
                  </Link>
                  <a
                    className="pill"
                    href="#form-card"
                    data-goto-form="true"
                    data-vehicle={item.vehicleSlug}
                    data-region={item.regionSlug}
                  >
                    {item.ctaLabel}
                  </a>
                </div>
              </div>
            </article>
          ))}

          {filtered.length === 0 ? (
            <div className="card-empty">
              <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                <use href="#i-search" />
              </svg>
              <h3>찾으시는 차종이나 지역이 검색되지 않았어요</h3>
              <p>차종명을 직접 적어 보내 주시면 작업자가 규격과 출장 일정을 확인해 드립니다.</p>
              <a
                className="btn btn-primary"
                href="#form-card"
                data-goto-form="true"
                data-vehicle="other"
              >
                목록에 없는 차종·지역 직접 입력
              </a>
            </div>
          ) : (
            <aside className="card-cta is-wide" id="tpl-cta" style={{ gridColumn: 'span 2' }}>
              <div className="cc-in">
                <span className="cc-k">DIRECT INPUT · 직접 입력</span>
                <h3>목록에 없는 차종이거나 다른 지역인가요?</h3>
                <p className="cc-txt">
                  차종명을 적어 보내 주시면 작업자가 규격을 확인합니다.{' '}
                  {holdRegions.map((r) => r.name).join('·')}은 파트너 준비 중입니다.
                </p>
                <a
                  className="btn btn-primary"
                  href="#form-card"
                  data-goto-form="true"
                  data-vehicle="other"
                >
                  <span>차종·지역 직접 입력하기</span>
                  <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                    <use href="#i-arrow" />
                  </svg>
                </a>
              </div>
            </aside>
          )}
        </div>

        <p className="fine">
          {holdRegions.map((r) => r.name).join('·')}은 파트너 준비 중입니다. 목록에 없는 지역은{' '}
          <a href="#form-card" data-goto-form="true" data-vehicle="other">
            지역을 직접 입력
          </a>
          해 주세요.
        </p>
      </div>
    </section>
  );
}

const SYMPTOM_CASES = [
  {
    id: 'sym-1',
    tab: '시동 전혀 안 걸림',
    step1: '차종·연식 + 시동 불가 체크',
    step2: '배터리 규격·총비용 사전 확정',
    step3: '현장 방문 교체 · 시동 확인',
    result: '즉시 출동 · 정품 교체 완료',
  },
  {
    id: 'sym-2',
    tab: '반복 방전 · 블랙박스',
    step1: '차종·연식 + 방전 빈도 전달',
    step2: '암전류·기존 배터리 상태 확인',
    step3: 'AGM/고용량 교체 · 충전전압 점검',
    result: '재방전 예방 · 전압 정상 확인',
  },
  {
    id: 'sym-3',
    tab: '계기판 경고등 점등',
    step1: '경고등 체크 + 문자 사진 첨부',
    step2: '배터리 vs 발전기 계통 구분',
    step3: '신품 장착 · 알터네이터 전압 측정',
    result: '정확한 원인 진단 후 조치',
  },
  {
    id: 'sym-4',
    tab: '수입차 · ISG 오토스톱',
    step1: '차종·연식 + ISG 유무 전달',
    step2: '전용 AGM 규격 · 총비용 안내',
    step3: 'ECU 메모리 백업 · 장착 후 점검',
    result: '데이터 보존 · 안정적 교체',
  },
];

export function SymptomCalc() {
  const [active, setActive] = useState(0);
  const cur = SYMPTOM_CASES[active];

  return (
    <div className="calc" aria-label="증상별 진행 흐름 미리보기">
      <div>
        <p className="calc-t">지금 어떤 증상인가요? 상황별 3단계 흐름 보기</p>
        <div className="seg" role="tablist" aria-label="현재 차량 증상 선택">
          {SYMPTOM_CASES.map((item, idx) => (
            <button
              key={item.id}
              id={item.id}
              type="button"
              role="tab"
              aria-selected={idx === active}
              tabIndex={idx === active ? 0 : -1}
              onClick={() => setActive(idx)}
            >
              {item.tab}
            </button>
          ))}
        </div>
      </div>

      <div className="eqs" id="calc-out" role="tabpanel" aria-labelledby={cur.id}>
        <div className="eq">
          <small>STEP 01 · 문자 접수</small>
          <b key={`s1-${active}`} className="tick">
            {cur.step1}
          </b>
        </div>
        <span className="op" aria-hidden="true">
          →
        </span>
        <div className="eq">
          <small>STEP 02 · 작업자 확인</small>
          <b key={`s2-${active}`} className="tick">
            {cur.step2}
          </b>
        </div>
        <span className="op" aria-hidden="true">
          →
        </span>
        <div className="eq">
          <small>STEP 03 · 방문 교체</small>
          <b key={`s3-${active}`} className="tick">
            {cur.step3}
          </b>
        </div>
        <span className="op" aria-hidden="true">
          =
        </span>
        <div className="eq eq-total">
          <small>최종 결과</small>
          <b key={`res-${active}`} className="tick">
            {cur.result}
          </b>
        </div>
      </div>
    </div>
  );
}

export function FaqCards({
  items = faqs,
  title = '자주 묻는 질문',
}: {
  items?: typeof faqs;
  title?: string;
}) {
  const mid = Math.ceil(items.length / 2);
  const col1 = items.slice(0, mid);
  const col2 = items.slice(mid);

  return (
    <div>
      <div className="sec-head">
        <div>
          <p className="eyebrow">
            <b>FAQ</b>
            <span className="ln" />
            <span>궁금한 점 안내</span>
          </p>
          <h2>{title}</h2>
        </div>
        <p className="lead">
          문자 문의 방법부터 비용 산정 기준, 지하주차장 방문 조건까지 자주 묻는 질문을 정리했습니다.
        </p>
      </div>
      <div className="qa">
        <div className="qa-col">
          {col1.map((item, idx) => (
            <details key={item.q} open={idx === 0}>
              <summary>
                <span>{item.q}</span>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#i-plus" />
                </svg>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
        <div className="qa-col">
          {col2.map((item) => (
            <details key={item.q}>
              <summary>
                <span>{item.q}</span>
                <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
                  <use href="#i-plus" />
                </svg>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
