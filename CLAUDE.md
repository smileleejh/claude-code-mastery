# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어
- **커밋 메시지**: 한국어
- **문서화**: 한국어
- **변수명 / 함수명**: 영어 (코드 표준 준수)

## 프로젝트 개요

HTML, CSS, JavaScript, TailwindCSS 기반의 **반응형 개발자 웹이력서(단일 페이지 정적 사이트)** 입니다. 다크모드, 스크롤 등장 애니메이션, 반응형 레이아웃, 접근성/SEO 기본을 지원합니다.

단계별 개발 계획과 진행 체크리스트는 [`ROADMAP.md`](./ROADMAP.md)에 있습니다. **작업 진행 시 ROADMAP.md를 참조하고 완료 항목의 체크박스를 갱신하세요.**

## 빌드 / 개발 명령

**Tailwind Play CDN 방식이라 별도 빌드 단계가 없습니다.** `index.html`이 CDN 스크립트로 Tailwind를 직접 불러오므로 `npm install`이나 CSS 컴파일이 필요 없습니다.

```bash
# 방법 1) 파일 직접 열기 — index.html을 브라우저로 열면 바로 동작 (인터넷 연결 필요)
# 방법 2) 로컬 서버 (권장) — 경로/캐시 이슈 없이 확인
npx serve            # 또는 VS Code "Live Server" 확장
```

- 인터넷이 없으면 Tailwind CDN·웹폰트가 로드되지 않아 스타일이 적용되지 않습니다(의도된 트레이드오프).
- 테스트 프레임워크는 없습니다. 검증은 반응형 QA · 크로스 브라우저 · 브라우저 콘솔 확인 · Lighthouse로 수행합니다.
- 브라우저 콘솔의 "cdn.tailwindcss.com should not be used in production" 경고 1건은 CDN 방식에서 정상입니다.

## 아키텍처 및 구조

정적 단일 페이지(`index.html`)에 모든 콘텐츠 섹션을 담고, 스타일·스크립트를 관심사별로 분리합니다.

- **`index.html`** — 전체 이력서(Hero → About → Skills → Experience → Projects → Education → Contact). `<head>`에서 세 가지가 순서대로 동작합니다: ① Tailwind CDN 로드 후 인라인 `tailwind.config`(다크모드 `class` 전략, 폰트) 설정 → ② **FOUC 방지 인라인 스크립트**가 페인트 전에 `localStorage`의 테마를 읽어 `<html>`에 `dark` 클래스를 적용 → ③ `<noscript>`로 JS 비활성 시 등장 애니메이션 요소를 강제 표시.
- **`src/css/custom.css`** — Tailwind 유틸리티로 표현이 어려운 것만 담습니다: `[data-reveal]` 등장 애니메이션, `scroll-margin-top`, `prefers-reduced-motion`. (CDN 방식이라 `output.css` 빌드 산출물은 없습니다.)
- **`src/js/`** — **ES 모듈이 아닌 일반 `<script>`** 로 `theme.js` → `scroll.js` → `main.js` 순서로 로드합니다(파일을 `file://`로 열어도 동작하도록). 각 파일은 IIFE로 감싸 `window.Resume` 네임스페이스에 `init`을 노출하고, `main.js`가 `DOMContentLoaded`에서 이를 호출합니다.
  - `theme.js`: 다크모드 적용/토글 + `localStorage['theme']` 저장, 해/달 아이콘 동기화.
  - `scroll.js`: `IntersectionObserver` 기반 등장 애니메이션 · 스크롤스파이(현재 섹션 네비 강조) · 맨 위로 버튼.
  - `main.js`: 모듈 초기화 + 모바일 메뉴 토글 + 푸터 연도.
- **`assets/icons/favicon.svg`** — 이니셜 기반 SVG 파비콘.

### 핵심 규약

- **HTML ↔ JS 연결은 `data-*` 속성으로** 합니다: `data-theme-toggle`, `data-theme-icon`, `data-nav-link`, `data-reveal`, `data-menu-toggle`, `data-mobile-menu`, `data-back-to-top`, `data-current-year`. 클래스명 대신 이 속성을 셀렉터로 사용하세요.
- **다크모드**: Tailwind `class` 전략 + `localStorage`. 새 다크모드 스타일은 `dark:` 변형으로 추가.
- **등장 애니메이션**: 새 섹션에는 `data-reveal`을 붙이면 `scroll.js`가 자동으로 처리합니다(스크롤 이벤트 폴링 금지 — `IntersectionObserver` 사용).
- **접근성/SEO**: 시맨틱 태그, 이미지 대체 텍스트, `aria-*`, 키보드 포커스, Open Graph 메타를 유지하세요.
- **콘텐츠는 예시값**입니다(이름·경력·프로젝트·연락처). 실제 정보로 교체 시 `index.html`만 수정하면 됩니다.
