# Baro Battery — Claude Code 가이드

이 프로젝트는 **Next.js (Vinext) + Cloudflare Workers + Supabase** 기반의 출장 배터리 교체 웹 서비스입니다.

---

## 🛠️ 개발 및 빌드 명령어

- 개발 서버 실행: `npm run dev`
- 프로덕션 클린 빌드: `rm -rf dist && npm run build`
- 린트 및 포맷팅: `npm run lint` / `npm run format`

---

## 🚀 배포 자동화 스킬 (Skills)

사용자가 아래 문구로 요청할 때 지정된 스킬 파일의 워크플로우를 그대로 따릅니다:

### 1. `클라우드플레어 수파베이스 배포자동화 실행해줘` 또는 `$auto_publish_cl_su`
- **스킬 파일**: [`skills/auto_publish_cl_su/SKILL.md`](file:///Users/sgk/dev/battery/skills/auto_publish_cl_su/SKILL.md)
- **수행 내용**:
  1. `.gitignore` 보안 격리 점검
  2. Supabase CLI(`npx supabase projects list`)로 계정 감지 및 무료 플랜용 기존 프로젝트(`suriwiki` 등) 선택/재사용 또는 새 프로젝트 생성
  3. `wrangler secret put`으로 Supabase API Key를 Cloudflare Workers에 자동 주입
  4. 커스텀 도메인 질문 및 Cloudflare DNS/SSL 자동 프로비저닝 (`custom_domain: true`)
  5. `npm run build` 및 `npx wrangler deploy`
  6. 실시간 DNS/SSL 전수 검증
  7. GitHub 원격 저장소(`gh repo create` 및 `git push origin main`) 동기화

### 2. `클라우드플레어 배포자동화 실행 시겨줘` 또는 `$auto-publish-c`
- **스킬 파일**: [`skills/auto-publish-c/SKILL.md`](file:///Users/sgk/dev/battery/skills/auto-publish-c/SKILL.md)
- **수행 내용**: Cloudflare Workers 빌드/배포 + 커스텀 도메인 DNS/SSL 자동화 + GitHub CLI 연동

---

## 🔒 보안 규칙
- `.env*`, `.dev.vars*` 파일 및 API 키는 절대 Git 커밋에 포함하지 않습니다.
