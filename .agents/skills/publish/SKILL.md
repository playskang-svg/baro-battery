---
name: publish
description: Complete build, verification, custom domain setup, secret provisioning, and deployment workflow for Next.js / Vinext sites on Cloudflare Workers and D1. Use in any project deploying to Cloudflare Workers with custom domains, affiliate APIs, and automated verification.
---

# publish — Cloudflare Worker + D1 웹사이트 배포 가이드

스킬 이름: `publish` · 호출: `$publish` 또는 `publish 실행해줘`

이 스킬은 **Vinext / Next.js + Cloudflare Workers / D1** 스택 기반의 웹사이트를 다른 프로젝트나 새 도메인에서도 안전하고 일관되게 배포할 수 있도록 정리한 표준 워크플로우입니다.

---

## 1. 사전 준비 & 보안 원칙

### A. 비밀값 및 환경변수 격리
1. **절대 규칙**: API 키(쿠팡 파트너스 키, Cloudflare 토큰 등)는 코드베이스, Git 커밋, 공개 로그에 절대 하드코딩하지 않습니다.
2. **Git 무시 파일 확인**:
   ```bash
   # .gitignore에 아래 항목들이 포함되어 있는지 점검
   .env*
   .dev.vars*
   dist/
   .wrangler/
   ```
3. **현재 상태 확인**:
   ```bash
   git status -s
   ```

---

## 2. API 키 & Secret 연동 (A-factory 등 중앙 제휴 저장소 연계)

중앙 제휴 링크 관리소(`~/dev/A-factory/affiliate-links.json` 등)에서 키를 안전하게 주입합니다.

1. **로컬 개발 환경 (`.env` / `.dev.vars`) 반영**:
   - `affiliate-links.json`의 `coupang` 블록(`access_key`, `secret_key`)을 읽어 로컬 환경변수에 기록합니다.
2. **Cloudflare Worker Secret 등록**:
   - Cloudflare Workers는 빌드 타임의 `.env`를 자동으로 읽지 않으므로 `wrangler secret put` 명령어로 런타임 암호화 저장을 수행합니다:
   ```bash
   echo "<ACCESS_KEY>" | npx wrangler secret put COUPANG_ACCESS_KEY
   echo "<SECRET_KEY>" | npx wrangler secret put COUPANG_SECRET_KEY
   ```

---

## 3. 커스텀 도메인 설정 (새 도메인 연결 시 필수 주의사항)

### ⚠️ 핵심: Cloudflare DNS 수동 CNAME 충돌 방지 (에러 100117)
- **발생 원인**: Cloudflare 대시보드 DNS Records에서 수동으로 `CNAME` 레코드를 먼저 등록해 두면, Workers Custom Domain 시스템과 충돌하여 아래 오류가 발생하고 SSL 발급이 중단됩니다.
  ```text
  Hostname 'xxx' already has externally managed DNS records (A, CNAME, etc). 
  Delete them first or try a different hostname. [code: 100117]
  ```
- **해결 절차**:
  1. Cloudflare DNS 화면에서 해당 도메인/서브도메인의 **수동 CNAME 레코드가 있다면 삭제**합니다.
  2. `wrangler.json`에 `routes` 설정을 추가합니다:
     ```json
     "routes": [
       { "pattern": "your-domain.com", "custom_domain": true }
     ],
     "workers_dev": true
     ```
  3. 트리거를 배포하여 Cloudflare가 DNS와 전용 SSL 인증서를 자동 발급하도록 합니다:
     ```bash
     npx wrangler triggers deploy
     ```

### B. 코드베이스 내 도메인 일괄 치환
새 도메인으로 이전할 경우 아래 파일들의 도메인 주소를 일괄 교체합니다:
- `app/layout.tsx` (기본 URL 및 OpenGraph)
- `public/robots.txt` (Sitemap URL)
- `public/sitemap.xml` (모든 `<loc>` 주소)
- `.env.example`, `README.md`

---

## 4. 빌드 & 배포 3단계

### 1단계: 프로덕션 클린 빌드
```bash
rm -rf dist && npm run build
```
- RSC, SSR, Client 번들 컴파일 및 정적 에셋 생성 확인
- 에러 0건 확인 후 다음 단계로 진행

### 2단계: Cloudflare Worker 배포
```bash
npx wrangler deploy
```
- Worker 번들 업로드 및 정적 에셋 CDN 배포
- D1 Database 바인딩(`env.DB`) 상태 점검

### 3단계: 커스텀 도메인 트리거 동기화
```bash
npx wrangler triggers deploy
```
- 커스텀 도메인이 Worker에 바인딩되었는지 확인

---

## 5. 배포 후 자동 검증 체크리스트 (반드시 실행)

배포 직후 curl 명령어로 사이트 상태를 전수 검사합니다:

```bash
# 1. 메인 도메인 및 HTTPS/SSL 응답 확인 (HTTP/2 200 OK)
curl -sIL https://<your-domain>

# 2. 검색 로봇 및 사이트맵 확인
curl -sI https://<your-domain>/robots.txt
curl -sI https://<your-domain>/sitemap.xml

# 3. 주요 서브페이지 정상 응답 확인
curl -sIL https://<your-domain>/guides

# 4. 동적 API 및 D1 캐시 동작 확인
curl -s "https://<your-domain>/api/coupang/search?category=adapter" | head -c 200
```

---

## 6. Git 커밋 & 원격 저장소 푸시

검증이 완료되면 민감 파일이 제외되었는지 확인 후 커밋합니다:

```bash
# 변경 목록 확인 (.env, .dev.vars 등이 절대 없어야 함)
git status -s

# 커밋 및 푸시
git add -A
git commit -m "Deploy: <배포 내용 요약>"
git push origin main
```

---

## 7. 실전 문제 해결 (Troubleshooting)

| 오류 / 현상 | 원인 | 해결 방법 |
|---|---|---|
| `code: 100117` | DNS에 수동 CNAME 레코드가 등록되어 있음 | Cloudflare 대시보드 DNS에서 CNAME 삭제 후 `npx wrangler triggers deploy` 재실행 |
| `SSL handshake failure` (curl exit 35) | 도메인 전용 SSL 인증서 미발급 상태 | 수동 CNAME 삭제 후 Worker Custom Domain 트리거를 배포하면 Cloudflare가 자동 발급 (보통 1~2분 소요) |
| 쿠팡 API `503` 에러 | Worker Secret에 키가 등록되지 않음 | `npx wrangler secret put COUPANG_ACCESS_KEY` 등록 |
| 카드 클릭 시 반응 없음 | 카드 외곽이 `article` 태그로만 되어 있음 | 카드에 `.card-overlay-link` (`position: absolute; inset: 0;`) 및 `cursor: pointer` 적용 |
