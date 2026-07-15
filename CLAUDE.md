# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙

- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어
- **커밋 메시지**: 한국어
- **문서화**: 한국어
- **변수명 / 함수명**: 영어 (코드 표준 준수)

세부 코드 스타일은 [`.claude/rules/code-style.md`](./.claude/rules/code-style.md), Git 규칙은 [`.claude/rules/git-rules.md`](./.claude/rules/git-rules.md)를 따르세요(들여쓰기 2칸, camelCase, 상수 SNAKE_CASE, 컴포넌트 PascalCase, 한글 주석 / 한글 커밋, `feature/…` 브랜치, **커밋 전 반드시 린트 실행**).

## 프로젝트 개요

**Next.js 16(App Router) 기반의 반응형 개발자 웹이력서(단일 페이지)** 입니다. React 19 · TypeScript · Tailwind CSS v4 · shadcn/ui(Base UI) 위에서 다크모드, 스크롤 등장 애니메이션, 반응형 레이아웃, 접근성/SEO를 지원하며 **Vercel 배포**를 목표로 합니다.

- **기술 스택**: Next.js 16.2 · React 19.2 · TypeScript · Tailwind v4(`@tailwindcss/postcss`) · shadcn/ui(base-nova, Base UI) · next-themes · Server Actions · next/font(Inter + Noto Sans KR).
- **`legacy/`** 디렉토리에는 이전 **정적 HTML/CSS/JS 버전**이 보존되어 있습니다. [`ROADMAP.md`](./ROADMAP.md)는 그 정적 버전의 로드맵이며 현재 Next.js 구조와는 무관합니다.

## 빌드 / 개발 명령

```bash
npm install          # 의존성 설치 (최초 1회)
npm run dev          # 개발 서버 (Turbopack) → http://localhost:3000
npm run build        # 프로덕션 빌드 (Turbopack, 타입체크 포함)
npm run start        # 빌드 결과 프로덕션 실행
npm run lint         # ESLint (커밋 전 필수)

npx shadcn@latest add <component>   # shadcn UI 컴포넌트 추가
```

- **테스트 프레임워크는 없습니다.** 검증은 `npm run build` + `npm run lint` 통과 확인 → 개발 서버에서 반응형/다크모드/애니메이션 수동 QA → Lighthouse로 수행합니다.
- npm 11의 `allow-scripts` 경고(`sharp`, `unrs-resolver`)는 현재 기능에 영향이 없어 무시해도 됩니다(래스터 이미지 최적화가 필요해지면 승인).

## 아키텍처 및 구조

App Router + `src/` 디렉토리 구조이며 import 별칭은 `@/*` → `./src/*` 입니다. 섹션은 기본 **서버 컴포넌트(RSC)** 로 두고, 상호작용이 필요한 것만 `"use client"`로 분리합니다.

- **`src/app/layout.tsx`** — 루트 레이아웃. `next/font`(Inter + Noto Sans KR) 변수 주입, **Metadata API**(title·description·OpenGraph, `metadataBase`), `ThemeProvider`(next-themes), `Toaster`(sonner). `<html>`에 `suppressHydrationWarning`(테마 클래스 주입 대응).
- **`src/app/page.tsx`** — 단일 페이지. 본문 바로가기 링크 → `SiteHeader` → `main`(Hero→About→Skills→Experience→Projects→Education→Contact) → 푸터 → `BackToTop` 조립.
- **`src/app/globals.css`** — Tailwind v4(`@import "tailwindcss"`), shadcn 테마 토큰(oklch, **`--primary`는 인디고**), `@custom-variant dark`. 하단에 `[data-reveal]` 등장 애니메이션 · `scroll-margin-top` · `prefers-reduced-motion` 규칙(구 `custom.css`에서 이전).
- **`src/app/actions.ts`** — Contact 폼 **Server Action**(`"use server"`). 서버 측 유효성 검사 후 상태 반환(실제 발송 연동 지점은 주석 표시).
- **`src/app/icon.svg`** — 이니셜 기반 SVG 파비콘(App Router가 자동 링크).
- **`src/components/sections/*`** — 섹션별 서버 컴포넌트(hero·about·skills·experience·projects·education·contact).
- **`src/components/ui/*`** — shadcn 컴포넌트(Base UI 기반). `components.json`으로 관리(style `base-nova`, baseColor `neutral`, icon `lucide`).
- **`src/components/*`**(클라이언트) — `theme-provider`·`theme-toggle`·`reveal`·`site-header`(스크롤스파이+모바일 메뉴)·`back-to-top`·`contact-form`, 그리고 공용 `section-heading`.
- **`src/lib/data.ts`** — **모든 이력서 콘텐츠를 타입 지정 데이터로 단일화**. `src/lib/utils.ts` — shadcn `cn()`.

### 핵심 규약

- **콘텐츠는 `src/lib/data.ts`만 수정**합니다(이름·경력·프로젝트·연락처·`SITE.url` 등은 모두 예시값). 이전의 "`index.html`만 수정" 규약을 계승합니다.
- **RSC 우선**: 상호작용(테마 토글·스크롤스파이·Reveal·폼 등)이 필요한 컴포넌트에만 `"use client"`를 붙입니다.
- **다크모드**: next-themes(`attribute="class"`) + Tailwind v4 `@custom-variant dark`. 새 다크 스타일은 `dark:` 변형으로 추가하며, FOUC 방지는 next-themes가 담당합니다(수동 스크립트 불필요).
- **등장 애니메이션**: 새 요소는 `<Reveal>`로 감싸면 `globals.css`가 자동 처리합니다. 스크롤 이벤트 폴링 금지 — `IntersectionObserver`를 사용하세요.
- **색상은 시맨틱 토큰으로**: `bg-primary`·`text-primary`·`text-muted-foreground`·`border-border` 등 CSS 변수 토큰을 사용하고 `indigo-600` 같은 하드코딩은 지양합니다(브랜드 색은 `globals.css`의 `--primary`).
- **UI 컴포넌트**: 신규는 `npx shadcn@latest add`로 추가합니다. Button/Badge는 **Base UI 기반**이라 링크 스타일이 필요하면 `buttonVariants({ … })`를 `<a>`에 적용하세요(`asChild` 대신).
- **접근성/SEO**: 시맨틱 태그, `aria-*`, 키보드 포커스, `sr-only` 바로가기, Metadata API/Open Graph를 유지하세요.
- **Contact 폼**: `actions.ts`(Server Action) + `useActionState` + sonner 토스트. JS 비활성 시에도 폼 제출이 동작합니다.

### 배포

Vercel Git 연동으로 배포합니다. 배포 후 `src/lib/data.ts`의 `SITE.url`을 실제 도메인으로 교체해야 OpenGraph 절대 URL이 올바르게 생성됩니다.
