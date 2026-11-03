'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle } from 'lucide-react';
import { isHoldRegion } from '@/lib/content';
import { regionContact } from '@/lib/region-registry';

// 현재 경로가 /regions/{slug}이면 그 지역의 slug (그 외 null)
export function useRegionSlug() {
  const pathname = usePathname() || '';
  const m = pathname.match(/^\/regions\/([^/]+)/);
  return m ? decodeURIComponent(m[1]) : null;
}

// 전화·문자 버튼을 같은 크기로 나란히 (전화가 앞). 번호는 지역 레지스트리(없으면 site-config 공통 번호).
// GA4 위치 꼬리표(data-track)에는 지역 페이지일 때 지역 slug가 붙는다.
export function CtaPair({ position, className = '' }: { position: string; className?: string }) {
  const slug = useRegionSlug();
  const c = regionContact(slug ?? undefined);
  if (!c.tel) return null;
  const track = slug && !position.endsWith(`_${slug}`) ? `${position}_${slug}` : position;
  return (
    <div className={`cta-pair ${className}`.trim()}>
      <a href={c.tel} data-track={track} data-channel="phone">
        <Phone size={18} aria-hidden="true" />
        <span>전화 상담</span>
      </a>
      <a href={c.smsHref} data-track={track} data-channel="sms">
        <MessageCircle size={18} aria-hidden="true" />
        <span>문자 상담</span>
      </a>
    </div>
  );
}

// 하단 독의 전화·문자 버튼 (독 레이아웃상 두 링크가 독의 직접 자식이어야 함)
export function DockContacts() {
  const slug = useRegionSlug();
  const c = regionContact(slug ?? undefined);
  if (!c.tel) return null;
  const track = slug ? `dock_${slug}` : 'dock';
  return (
    <>
      <a href={c.tel} data-track={track} data-channel="phone">
        <Phone size={18} />
        <span>전화 상담</span>
      </a>
      <a href={c.smsHref} data-track={track} data-channel="sms">
        <MessageCircle size={18} />
        <span>문자 상담</span>
      </a>
    </>
  );
}

// 수도권 보류 지역 페이지(/regions/{seoul|gyeonggi|incheon})에서는 전화·문자 CTA를 숨긴다.
export function HideOnHold({ children }: { children: ReactNode }) {
  const pathname = usePathname() || '';
  const m = pathname.match(/^\/regions\/([^/]+)/);
  if (m && isHoldRegion(decodeURIComponent(m[1]))) return null;
  return <>{children}</>;
}

// data-track 버튼 클릭을 GA4 phone_click / sms_click 이벤트로 전송 (cta_position = data-track 값)
export function CtaTracker() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.('[data-track]');
      if (!el) return;
      const channel = el.getAttribute('data-channel');
      if (channel !== 'phone' && channel !== 'sms') return;
      const gtag = (window as unknown as { gtag?: (...a: unknown[]) => void }).gtag;
      gtag?.('event', `${channel}_click`, {
        cta_position: el.getAttribute('data-track'),
        page_path: window.location.pathname,
      });
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}
