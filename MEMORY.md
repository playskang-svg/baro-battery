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
