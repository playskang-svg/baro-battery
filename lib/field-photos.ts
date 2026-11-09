// 실제 현장 사진 배치 데이터. 캡션·alt에는 사진에서 눈으로 확인되는 사실만 쓴다(날짜·지역·고객·장착 위치 단정 금지).
export type FieldPhoto = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

const bannerCaption = '"밧데리 할인 센터" 현수막이 걸린 모습입니다.';
const bannerAlt = '"밧데리 할인 센터" 문구와 전화번호 010-8844-4505가 적힌 현수막';

const banner = (n: string, width: number, height: number): FieldPhoto => ({
  src: `/images/field/field-banner-${n}.webp`,
  alt: bannerAlt,
  caption: bannerCaption,
  width,
  height,
});

const work = (n: string, alt: string, caption: string): FieldPhoto => ({
  src: `/images/field/field-work-${n}.webp`,
  alt,
  caption,
  width: 1200,
  height: 900,
});

// 지역 페이지의 사진은 현장 출동 분위기를 보여 줄 뿐, 해당 지역에서 찍었다는 뜻이 아니다.
export const regionFieldPhotos: Record<string, FieldPhoto[]> = {
  daegu: [
    work('01', '장갑을 낀 손으로 배터리 단자 쪽을 작업하는 모습', '배터리 단자 쪽을 작업하는 모습입니다.'),
    banner('01', 1200, 399),
  ],
  gumi: [
    work('02', '배터리 위쪽으로 공구를 잡고 작업을 준비하는 손', '공구를 챙겨 배터리 작업을 하는 모습입니다.'),
    banner('02', 1200, 823),
  ],
  chilgok: [
    work('03', '자리에 놓인 배터리 옆에서 장갑 낀 손으로 작업하는 모습', '배터리를 자리에 놓고 작업하는 모습입니다.'),
    banner('03', 1200, 583),
  ],
  gyeongsan: [
    work('04', '장갑 낀 손으로 배터리를 들어 옮기는 모습', '배터리를 들어 옮기는 작업 모습입니다.'),
    banner('04', 1200, 326),
  ],
};

export const specFieldPhoto: FieldPhoto = {
  src: '/images/field/field-label-01.webp',
  alt: '배터리 윗면 라벨에 규격 표기가 보이는 사진',
  caption: '배터리 라벨에는 이런 식으로 규격이 표시되어 있습니다.',
  width: 1200,
  height: 800,
};

// 지역 페이지에서 연결할 차종 허브. 렌더링 때 공개 차종만 남긴다.
export const regionHubSlugs: Record<string, string[]> = {
  daegu: ['grandeur', 'sonata', 'avante', 'santafe', 'k5'],
  gumi: ['porter', 'bongo', 'sportage', 'sorento', 'k7'],
  chilgok: ['carnival', 'tucson', 'starex', 'k3', 'grandeur'],
  gyeongsan: ['k5', 'santafe', 'avante', 'sportage', 'porter'],
};
