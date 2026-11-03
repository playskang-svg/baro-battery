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
