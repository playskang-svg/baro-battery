import Link from '@/components/site/site-link';

export function FooterContact() {
  return (
    <section className="footer-contact-live" aria-label="컨시어지블루 연락처 및 운영 안내">
      <div className="wrap footer-contact-live-inner">
        <div>
          <strong>컨시어지블루 (배터리콜)</strong>
          <p>
            대표 전화 <Link href="tel:010-4684-8838">010-4684-8838</Link>
            <span aria-hidden="true"> | </span>
            이메일 <Link href="mailto:qoorocket@gmail.com">qoorocket@gmail.com</Link>
          </p>
        </div>
        <div>
          <p>24시간 상담·접수 운영</p>
          <p>서비스 지역: 대구 · 구미 · 칠곡 · 영천 · 경산</p>
        </div>
        <small>© 2026 컨시어지블루. All rights reserved.</small>
      </div>
    </section>
  );
}
