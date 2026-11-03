import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site/shared';
import { siteConfig } from '@/lib/site-config';
import Script from 'next/script';
import { CtaTracker } from '@/components/site/cta';
import { MotionRoot } from '@/components/site/home';
import './fonts.css';
import './globals.css';
import './theme.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.origin),
  title: {
    default: '출장 배터리 교체 | 차종·지역 맞춤 안내 — 배터리콜',
    template: '%s | 배터리콜',
  },
  description: '출장 배터리 교체, 내 차가 있는 곳에서 시작하세요. 차종별·지역별 교체 정보, 배터리 가이드, 비용 안내와 간편 상담 준비.',
  alternates: { canonical: '/' },
  robots: { index: !siteConfig.isPreview, follow: !siteConfig.isPreview },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    siteName: '배터리콜',
    title: '출장 배터리 교체 | 배터리콜',
    description: '멈춘 일상에, 다시 시동을. 차종과 지역으로 찾는 배터리 출장교체.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
          <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
          <symbol id="i-check" viewBox="0 0 24 24"><path d="m5 12.5 4.2 4.2L19 7" /></symbol>
          <symbol id="i-plus" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></symbol>
          <symbol id="i-device" viewBox="0 0 24 24"><rect x="2.5" y="4.5" width="13" height="9.5" rx="1.5" /><path d="M5.5 18h7" /><rect x="17" y="8" width="4.5" height="11" rx="1.2" /></symbol>
          <symbol id="i-server" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="7" rx="1.6" /><rect x="4" y="13" width="16" height="7" rx="1.6" /><path d="M8 7.5h.01M8 16.5h.01" /></symbol>
          <symbol id="i-lock" viewBox="0 0 24 24"><rect x="5" y="10.5" width="14" height="10" rx="2" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2" /></symbol>
          <symbol id="i-search" viewBox="0 0 24 24"><circle cx="11" cy="11" r="6.5" /><path d="m20 20-4.2-4.2" /></symbol>
          <symbol id="i-share" viewBox="0 0 24 24"><circle cx="17.5" cy="5.5" r="2.5" /><circle cx="6.5" cy="12" r="2.5" /><circle cx="17.5" cy="18.5" r="2.5" /><path d="m8.7 10.8 6.6-4M8.7 13.2l6.6 4" /></symbol>
          <symbol id="i-inbox" viewBox="0 0 24 24"><path d="M4 13.5 6.5 5h11l2.5 8.5V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z" /><path d="M4 13.5h4.5L10 16h4l1.5-2.5H20" /></symbol>
          <symbol id="i-edit" viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></symbol>
          <symbol id="i-globe" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.5 3.4 5.3 3.4 8.5s-1.1 6-3.4 8.5c-2.3-2.5-3.4-5.3-3.4-8.5s1.1-6 3.4-8.5z" /></symbol>
          <symbol id="i-mail" viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2" /><path d="m4.5 7.5 7.5 5.5 7.5-5.5" /></symbol>
          <symbol id="i-clock" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></symbol>
          <symbol id="i-won" viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5" /><path d="m7.5 8.5 2 7 2.5-6 2.5 6 2-7M6.5 11.5h11" /></symbol>
          <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 8.5h16M4 15.5h16" /></symbol>
          <symbol id="i-close" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" /></symbol>
          <symbol id="i-pause" viewBox="0 0 24 24"><path d="M9 6v12M15 6v12" /></symbol>
          <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" /></symbol>
          <symbol id="i-bolt" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /></symbol>
          <symbol id="i-phone" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></symbol>
        </svg>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-CH3SKP6WPH" strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">{"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-CH3SKP6WPH');gtag('config','G-P73SDFB1F3');"}</Script>
        <Header />
        {children}
        <Footer />
        <CtaTracker />
        <MotionRoot />
      </body>
    </html>
  );
}
