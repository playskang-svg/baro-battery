// 홈 카드용 실사 사진(public/media/vehicles)이 있는 차종. 나머지는 차종 허브 이미지(public/images/vehicles)를 쓴다.
const HOME_CAR_PHOTOS = new Set(['avante', 'bmw-5', 'g80', 'grandeur', 'k5', 'sorento', 'sportage']);

export const vehiclePhoto = (slug: string) =>
  HOME_CAR_PHOTOS.has(slug) ? `/media/vehicles/${slug}.webp` : `/images/vehicles/${slug}.webp`;
