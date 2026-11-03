'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { phoneHref, smsLinkHref } from '@/lib/site-config';
import { faqs } from '@/lib/content';

// 한 번만 드러나는 입장 동작, 셔터로 열리는 사진, 화면에 보일 때만 도는 영상. 스크립트가 없으면 전부 그대로 보인다.
export function MotionRoot() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('js');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pending = new Set<HTMLElement>(document.querySelectorAll<HTMLElement>('[data-reveal], .shutter'));
    const show = (el: HTMLElement) => {
      el.classList.add('is-in');
      pending.delete(el);
    };
    if (calm.matches) {
      pending.forEach(show);
      return;
    }
    // 보이는 순간 한 번만 드러낸다. clip-path로 가린 요소는 관찰자가 놓칠 수 있어 위치 검사로 받친다.
    const check = () => {
      const limit = innerHeight * 0.92;
      pending.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < limit && r.bottom > 0) show(el);
      });
    };
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) if (e.isIntersecting) show(e.target as HTMLElement);
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
      );
      pending.forEach((el) => io!.observe(el));
    }
    let raf = 0;
    const onScroll = () => {
      if (raf || !pending.size) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        check();
      });
    };
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll, { passive: true });
    const first = window.setTimeout(check, 300);
    const net = window.setTimeout(check, 2500);
    return () => {
      io?.disconnect();
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      window.clearTimeout(first);
      window.clearTimeout(net);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
  useEffect(() => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    const clips = [...document.querySelectorAll<HTMLVideoElement>('video[data-loop]')];
    if (!clips.length) return;
    const inView = new Set<HTMLVideoElement>();
    const sync = (v: HTMLVideoElement) => {
      if (calm.matches) {
        v.pause();
        v.classList.remove('is-playing');
        return;
      }
      if (inView.has(v)) {
        v.muted = true;
        v.play().then(() => v.classList.add('is-playing')).catch(() => {});
      } else v.pause();
    };
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const v = e.target as HTMLVideoElement;
          if (e.isIntersecting) inView.add(v);
          else inView.delete(v);
          sync(v);
        }
      },
      { threshold: 0.2 },
    );
    clips.forEach((v) => io.observe(v));
    const onCalm = () => clips.forEach(sync);
    calm.addEventListener('change', onCalm);
    return () => {
      io.disconnect();
      calm.removeEventListener('change', onCalm);
    };
  }, []);
  return null;
}

// 홈에는 전화·문자·띠 버튼이 이미 있으므로 하단 고정 바를 숨긴다.
export function HideOnHome({ children }: { children: ReactNode }) {
  const pathname = usePathname() || "/";
  if (pathname === "/") return null;
  return <>{children}</>;
}

// muted 속성은 React가 서버 HTML에 쓰지 않으므로 태그를 직접 써서 자동 재생이 막히지 않게 한다.
export function HeroClip({ src, poster }: { src: string; poster: string }) {
  return (
    <div
      className="h-cell-media"
      dangerouslySetInnerHTML={{
        __html: `<img src="${poster}" alt="" width="1280" height="720" fetchpriority="high" decoding="async"><video data-loop muted loop playsinline preload="metadata" poster="${poster}" width="1280" height="720" aria-hidden="true"><source src="${src}" type="video/mp4"></video>`,
      }}
    />
  );
}

export type Scene = { key: string; label: string; src: string; alt: string; caption: string };

export function Showcase({ scenes, title, text }: { scenes: Scene[]; title: string; text: string }) {
  const [active, setActive] = useState(0);
  const scene = scenes[active];
  const tel = phoneHref();
  const sms = smsLinkHref();
  return (
    <section className="h-show" aria-labelledby="show-title">
      <div className="h-show-pic">
        <figure className="cell">
          <div className="h-show-frame shutter">
            {scenes.map((s, i) => (
              <Image key={s.key} src={s.src} alt={s.alt} width={1600} height={1600} unoptimized loading={i === 0 ? 'eager' : 'lazy'} style={{ opacity: i === active ? 1 : 0, transition: 'opacity 500ms cubic-bezier(.22,1,.36,1)' }} />
            ))}
          </div>
          
        </figure>
      </div>
      <div className="h-show-text" data-reveal>
        <div className="h-show-tabs" role="tablist" aria-label="현장 장면">
          {scenes.map((s, i) => (
            <button key={s.key} type="button" role="tab" aria-selected={i === active} aria-controls="show-title" onClick={() => setActive(i)}>
              {s.label}
            </button>
          ))}
        </div>
        <div className="h-show-title">
          <h2 id="show-title">{title}</h2>
          <p>{text}</p>
        </div>
        <div className="h-show-actions">
          {tel ? (
            <a className="ink" href={tel} data-track="showcase" data-channel="phone">
              전화 상담
            </a>
          ) : null}
          {sms ? (
            <a href={sms} data-track="showcase" data-channel="sms">
              문자 상담
            </a>
          ) : (
            <a href="#sms">문자 문구 만들기</a>
          )}
        </div>
      </div>
    </section>
  );
}

// 질문은 서랍 속 색인 카드처럼 겹쳐 쌓이고, 하나만 열린다.
export function FaqCards({ items = faqs, title = '자주 묻는 질문' }: { items?: typeof faqs; title?: string }) {
  const [open, setOpen] = useState(0);
  const topics = ['문자 문의', '비용', '지하주차장', '방전', '예약'];
  return (
    <div className="h-faq-inner">
      <h2>{title}</h2>
      <div className="h-faq-stack">
        {items.map((item, i) => {
          const expanded = open === i;
          return (
            <article key={item.q} className={`h-faq-card c${i % 3}`} style={{ '--n': i } as React.CSSProperties}>
              <button type="button" className="h-faq-q" aria-expanded={expanded} aria-controls={`faq-a-${i}`} onClick={() => setOpen(expanded ? -1 : i)}>
                <span>{item.q}</span>
                <span className="h-faq-plus" aria-hidden="true" />
              </button>
              <span className="h-faq-tab" aria-hidden="true">{topics[i] ?? '안내'}</span>
              <div id={`faq-a-${i}`} className="h-faq-a" hidden={!expanded}>
                <p>{item.a}</p>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
