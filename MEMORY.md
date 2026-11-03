# baro-battery (batterycall.kr) 프로젝트 메모리

## 배포 및 변경 이력

- **2026-09-21 배포 완료**:
  - **작업 내용**:
    1. 히어로 캐러셀 하단 캡션 문구(`실제 배터리 현장 장면 · 1/4`) 완전 제거
    2. 푸터 기존 가상요소/중복 구조 정리 및 신규 깔끔한 레이아웃 적용
       - 컨시어지블루 (배터리콜)
       - 대표 전화: 010-4684-8838 (tel 링크 연동)
       - 이메일: qoorocket@gmail.com (mailto 링크 연동)
       - 24시간 상담·접수 운영
       - 서비스 지역: 대구 · 구미 · 칠곡 · 영천 · 경산
       - 저작권: © 2026 컨시어지블루. All rights reserved.
  - **빌드 및 배포 결과**:
    - `oxlint`: 0 warnings, 0 errors
    - `vinext build`: 성공
    - `wrangler deploy`: 성공 (`baro-battery`, version: `341ff7b7-cb22-4c49-99b1-4880fb6a7d0a`)
    - 배포 도메인: `https://batterycall.kr`, `https://battery.suriwiki.com`, `https://baro-battery.playskang.workers.dev`
    - 실서버 curl 응답 전수 검증 완료
  - **Git 동기화**: `origin/main` 커밋 및 푸시 완료 (`dcf92e8`)

## 운영 상태

- **2026-11-03 함대 자동 발행 정지**: 사용자 지시. 파트너 `coorocket`(Write 권한)이 직접 발행하도록 길을 터 줌.
  - `.github/workflows/agents-release.yml` 예약 실행(09:35·19:35 KST) 제거, 수동 실행만 남김.
  - 중앙 `adbles-agents` `fleet/fleet.json` batterycall `pipeline.publish=false` (sync 시 되살아나지 않게).
  - agents-daily(수집·상태 갱신)·agents-linkfix(링크 점검·수정)는 계속 돎.
  - 재개: fleet.json `publish=true` → `node scripts/deploy-fleet.mjs sync --site batterycall`.
- **2026-11-03 함대 자동화 전체 정지**: 사용자 지시("제대로 안 되니 전부 꺼"). 자동발행은 최근 14일 발행 0건·산출물 없음 상태였음.
  - `agents-daily`(수집)·`agents-linkfix`(링크 점검·수정) 예약 실행도 제거. 3개 워크플로 모두 수동 실행만 남음.
  - 중앙 fleet.json batterycall `pipeline` seo·publish·linkfix 전부 false.
  - 배포(`deploy.yml`, main push 시)는 유지 — 파트너 발행 경로.

## 2026-11-03 디자인 업그레이드 (Claude, 강석기)
- 방향: 배터리 블록(몸통+단자) 모티프 하나, 검정/흰색/라임(#dafa9c) 팔레트, Pretendard Variable 동적 서브셋 self-host(`app/fonts.css`, `public/fonts/pretendard/`). 기존 `public/fonts/pretendard.woff2`는 109바이트 오류 파일이라 삭제.
- 홈 전면 교체: `app/page.tsx`, `app/home.css`, `components/site/home.tsx`(MotionRoot·HeroClip·Showcase·FaqCards·HideOnHome). 공용: `app/theme.css`(globals.css 뒤에 읽힘), `components/site/shared.tsx`(헤더·블록 푸터·CallBand·Steps·Trust·GuideCard). 삭제: visual-refresh.css, footer.css, home-experience.tsx, ui/accordion.tsx.
- 서브페이지: 구조 유지, 눈썹 라벨(PageIntro/SectionHeading `eyebrow` prop 제거)·01/02 번호·얇은 선·테두리 박스·그라데이션 제거. 전화번호·hold 지역·GA4 data-track 로직은 그대로.
- 미디어 `public/media/`: hero.mp4(Seedance 2.5, 8초 720p), hero-poster.webp, caller/terminal/warning/tech.webp(Nano Banana Pro). 원본은 `C:/Users/sgk76/ego/batterycall-media-20261103/out/`, 변환은 `node scripts/site-media.mjs <원본 폴더>`.
- 로컬 확인: `npm run build` 뒤 `npx wrangler dev --config dist/server/wrangler.json --port 8787`. dist를 지우기 전에 wrangler dev를 끈다.
