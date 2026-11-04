// Operational values belong here. Empty channels stay in an honest preparation state.
export const siteConfig = {
  name: '배터리콜',
  headline: '출장 배터리 교체',
  origin: 'https://batterycall.kr',
  // 전화·문자 CTA 번호: 대구권 파트너 번호. 파트너 교체 시 이 값만 변경
  phone: '010-8844-4505',
  // 푸터 대표전화. CTA 번호와 분리
  officePhone: '010-4684-8838',
  kakaoUrl: '',
  isPreview: false,
};
export function contactHref(channel='inquiry',vehicle='',region=''){if(channel==='phone'&&siteConfig.phone)return `tel:${siteConfig.phone}`;if(channel==='kakao'&&siteConfig.kakaoUrl)return siteConfig.kakaoUrl;const q=new URLSearchParams();if(vehicle)q.set('vehicle',vehicle);if(region)q.set('region',region);const qs=q.toString();return qs?`/?${qs}#form-card`:'/#form-card';}

// SMS opens a composer only; photos must be attached in the device messaging app.
export function smsHref(body:string,userAgent='') { if(!siteConfig.phone)return ''; const separator=/iPhone|iPad|iPod/i.test(userAgent)?'&':'?'; return `sms:${siteConfig.phone}${separator}body=${encodeURIComponent(body)}`; }

export function phoneHref() { return siteConfig.phone ? `tel:${siteConfig.phone}` : ''; }
export function smsLinkHref() { return siteConfig.phone ? `sms:${siteConfig.phone}` : ''; }
