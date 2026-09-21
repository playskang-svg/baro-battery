import type { Metadata } from 'next';
import { Header, Footer } from '@/components/site/shared';
import { FooterContact } from '@/components/site/footer-contact';
import { siteConfig } from '@/lib/site-config';
import './globals.css';
import './visual-refresh.css';
import './footer-contact.css';

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
    <html lang="ko">
      <body>
        <Header />
        {children}
        <Footer />
        <FooterContact />
      </body>
    </html>
  );
}
