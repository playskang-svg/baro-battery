// Operational values belong here. Empty channels stay in an honest preparation state.
export const siteConfig={name:'바로배터리',headline:'출장 배터리 교체',origin:'https://battery.suriwiki.com',phone:'',kakaoUrl:'',isPreview:false};
export function contactHref(channel='inquiry',vehicle='',region=''){if(channel==='phone'&&siteConfig.phone)return `tel:${siteConfig.phone}`;if(channel==='kakao'&&siteConfig.kakaoUrl)return siteConfig.kakaoUrl;const q=new URLSearchParams({channel});if(vehicle)q.set('vehicle',vehicle);if(region)q.set('region',region);return `/contact?${q}`;}

// SMS opens a composer only; photos must be attached in the device messaging app.
export function smsHref(body:string,userAgent='') { if(!siteConfig.phone)return ''; const separator=/iPhone|iPad|iPod/i.test(userAgent)?'&':'?'; return `sms:${siteConfig.phone}${separator}body=${encodeURIComponent(body)}`; }
