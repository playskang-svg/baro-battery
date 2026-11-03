import { siteConfig } from './site-config';

/*
 * 전국 지역 레지스트리 — 페이지 공개 여부와 담당 파트너 연락처의 단일 출처.
 * 파트너 입점 = 이 파일의 항목 1줄 수정 + published: true.
 *
 * 지역 페이지 생성 규칙 (사장님 확정 2026-11-03)
 * 1. 기본 단위는 시·군 (/regions/suwon). level: 'city'
 * 2. 도 단위(level: 'sido')는 검색 타깃 금지 — 시 목록 안내판 역할만. 페이지를 만들더라도 published 금지
 * 3. 광역시·특별시·세종은 시 페이지 1개로 시작(level: 'city', metro: true).
 *    구 페이지(level: 'gu')는 승격 조건(그 구 전담 파트너 존재, 또는 사례 3건+검색량 확인) 충족 시에만
 *    /regions/daegu/suseong 형태로 생성
 * 4. 동·읍·면 페이지 금지 — 동 단위 롱테일은 사례 페이지가 담당
 * 5. 생성 공통 게이트: 실제 서비스 가능 + 사례 1~2건 + 검색량 존재. 하나라도 없으면 published: false
 * 6. 중복 지명 슬러그는 광역시 우선 (광주광역시 gwangju, 경기 광주 gwangju-gyeonggi)
 *
 * published 기본값은 항상 false. 라우트·내부링크·사이트맵은 published 항목만 만든다.
 * 연락처(phone/sms/hours)가 비어 있으면 siteConfig 공통 번호를 쓴다.
 */
export type RegionLevel = 'sido' | 'city' | 'gu';
export type RegionOperator = 'direct' | 'partner' | 'pending';

export interface RegionEntry {
  slug: string;
  name: string;
  level: RegionLevel;
  /** 광역시·특별시·세종: 시도급이지만 시 페이지 1개로 시작 */
  metro?: boolean;
  /** 소속 시도 slug (안내판 연결용). 광역시는 없음 */
  parent?: string;
  /** 공개 스위치. 기본 false */
  published: boolean;
  /** direct 직영 / partner 파트너 / pending 준비중 */
  operator: RegionOperator;
  partnerName?: string;
  phone?: string;
  sms?: string;
  hours?: string;
  /** 서울·경기·인천은 기존 보류 페이지(content.ts hold)가 별도로 유지되며 이 스위치의 대상이 아님 */
  legacyHold?: boolean;
}

const e = (
  slug: string,
  name: string,
  level: RegionLevel,
  extra: Partial<RegionEntry> = {},
): RegionEntry => ({
  slug,
  name,
  level,
  published: false,
  operator: 'pending',
  ...extra,
});
const metro = (slug: string, name: string, extra: Partial<RegionEntry> = {}) =>
  e(slug, name, 'city', { metro: true, ...extra });
const city = (slug: string, name: string, parent: string, extra: Partial<RegionEntry> = {}) =>
  e(slug, name, 'city', { parent, ...extra });

// 대구 파트너 번호 (사장님 확정 2026-11-03). 상호·이름은 화면과 데이터에 노출하지 않는다.
const DAEGU_PARTNER = { operator: 'partner', phone: '010-8844-4505', sms: '010-8844-4505' } as const;

export const regionRegistry: RegionEntry[] = [
  // 광역시·특별시·세종 (8)
  metro('seoul', '서울', { legacyHold: true }),
  metro('busan', '부산'),
  metro('daegu', '대구', { published: true, ...DAEGU_PARTNER }),
  metro('incheon', '인천', { legacyHold: true }),
  metro('gwangju', '광주'),
  metro('daejeon', '대전'),
  metro('ulsan', '울산'),
  metro('sejong', '세종'),
  // 도 (9) — 안내판 전용
  e('gyeonggi', '경기', 'sido', { legacyHold: true }),
  e('gangwon', '강원', 'sido'),
  e('chungbuk', '충북', 'sido'),
  e('chungnam', '충남', 'sido'),
  e('jeonbuk', '전북', 'sido'),
  e('jeonnam', '전남', 'sido'),
  e('gyeongbuk', '경북', 'sido'),
  e('gyeongnam', '경남', 'sido'),
  e('jeju', '제주', 'sido'),
  // 주요 시·군
  city('suwon', '수원', 'gyeonggi'),
  city('seongnam', '성남', 'gyeonggi'),
  city('yongin', '용인', 'gyeonggi'),
  city('goyang', '고양', 'gyeonggi'),
  city('hwaseong', '화성', 'gyeonggi'),
  city('bucheon', '부천', 'gyeonggi'),
  city('anyang', '안양', 'gyeonggi'),
  city('gimpo', '김포', 'gyeonggi'),
  city('gwangju-gyeonggi', '경기 광주', 'gyeonggi'),
  city('chuncheon', '춘천', 'gangwon'),
  city('wonju', '원주', 'gangwon'),
  city('cheongju', '청주', 'chungbuk'),
  city('cheonan', '천안', 'chungnam'),
  city('jeonju', '전주', 'jeonbuk'),
  city('pohang', '포항', 'gyeongbuk'),
  city('gyeongju', '경주', 'gyeongbuk'),
  city('andong', '안동', 'gyeongbuk'),
  city('gumi', '구미', 'gyeongbuk', { published: true, ...DAEGU_PARTNER }),
  city('chilgok', '칠곡', 'gyeongbuk', { published: true, ...DAEGU_PARTNER }),
  city('gyeongsan', '경산', 'gyeongbuk', { published: true, ...DAEGU_PARTNER }),
  city('changwon', '창원', 'gyeongnam'),
  city('gimhae', '김해', 'gyeongnam'),
  city('jeju-city', '제주시', 'jeju'),
];

const bySlug = new Map(regionRegistry.map((r) => [r.slug, r]));
export const getRegionEntry = (slug: string) => bySlug.get(slug);
export const isRegionPublished = (slug: string) => bySlug.get(slug)?.published === true;

/** 지역별 전화·문자 번호. 비어 있으면 사이트 공통 번호 */
export function regionContact(slug?: string) {
  const r = slug ? bySlug.get(slug) : undefined;
  const phone = r?.phone || siteConfig.phone;
  const sms = r?.sms || r?.phone || siteConfig.phone;
  return {
    phone,
    sms,
    tel: phone ? `tel:${phone}` : '',
    smsHref: sms ? `sms:${sms}` : '',
  };
}
