'use client';

import { useEffect, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { Phone, MessageCircle } from 'lucide-react';
import { isHoldRegion } from '@/lib/content';
import { phoneHref, smsLinkHref } from '@/lib/site-config';

// 전화·문자 버튼을 같은 크기로 나란히 (전화가 앞). 번호는 site-config 단일 출처.
export function CtaPair({ position, className = '' }: { position: string; className?: string }) {
  const tel = phoneHref();
  const sms = smsLinkHref();
  if (!tel) return null;
  return (
    <div className={`cta-pair ${className}`.trim()}>
      <a href={tel} data-track={position} data-channel="phone">
        <Phone size={18} aria-hidden="true" />
        <span>전화 상담</span>
      </a>
      <a href={sms} data-track={position} data-channel="sms">
        <MessageCircle size={18} aria-hidden="true" />
        <span>문자 상담</span>
      </a>
    </div>
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
