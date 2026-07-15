# 계획: 정적 이력서 → 최신 Next.js 16 재구축

## Context (배경)

현재 저장소는 **순수 정적 HTML/CSS/JS 개발자 웹이력서**입니다. Tailwind Play CDN + 바닐라 JS(IIFE, `window.Resume`)로 구현되어 있고 `package.json`·빌드 도구·React·Next.js는 전혀 없습니다.

사용자는 이를 **최신 Next.js 기술 스택으로 재구축**하려 합니다. 확정된 요구사항:
- **목표**: 기존 이력서(Hero → About → Skills → Experience → Projects → Education → Contact)를 Next.js로 재구축
- **배포**: Vercel (서버 기능 전면 사용 가능)
- **추가 스택**: shadcn/ui + Tailwind v4

의도한 결과: 기존 기능(반응형 · 다크모드 · 등장 애니메이션 · 접근성/SEO)을 유지하면서, App Router · RSC · Server Actions 등 최신 기능 위에서 유지보수가 쉬운 구조로 재구성.

---

## 추천 기술 스택 (Context7 최신 문서 기준)

| 영역 | 추천 | 근거 (Next.js 16.2.x 문서) |
|---|---|---|
| 프레임워크 | **Next.js 16.2.x + App Router** | `create-next-app` 기본값이 App Router. RSC 지원 |
| React | **React 19.2** | Next.js 16이 React 19.2 채택 (View Transitions, `useEffectEvent`, Activity) |
| 번들러 | **Turbopack** (기본) | 16부터 `next dev`/`next build` 기본 번들러 |
| 언어 | **TypeScript** | `create-next-app` 기본 포함·자동 설정 |
| 스타일 | **Tailwind CSS v4** (`@tailwindcss/postcss`, `@import "tailwindcss"`) | shadcn `next-app` 템플릿이 Tailwind v4 사용 |
| UI 컴포넌트 | **shadcn/ui** (CLI 4.11.0, `--template next`) | Radix 기반 접근성 컴포넌트를 코드로 소유 |
| 다크모드 | **next-themes** (`attribute="class"`) | 기존 수동 theme.js + FOUC 스크립트를 대체(FOUC 방지 내장) |
| SEO | **Metadata API** (`export const metadata`) | `next/head` 대체, Open Graph 내장 |
| 폼 | **Server Actions** (Contact 폼) | Vercel 배포이므로 서버 기능 활용, 점진적 향상 |
| 폰트 | **next/font** | 셀프 호스팅·레이아웃 시프트 방지 |
| 배포 | **Vercel** (Git 연동 자동 배포) | — |

> 선택적: `next.config.ts`의 `cacheComponents: true`(Cache Components) — 대부분 정적인 이력서에는 필수는 아니므로 기본은 미적용, 동적 데이터 도입 시 검토.

---

## 목표 디렉토리 구조 (App Router + `src/`)

```
src/
├── app/
│   ├── layout.tsx          # 루트 레이아웃: metadata(SEO/OG), ThemeProvider, next/font, 헤더/푸터
│   ├── page.tsx            # 단일 페이지: 섹션 컴포넌트 조립 (기본 서버 컴포넌트)
│   ├── globals.css         # @import "tailwindcss" + reveal 애니메이션 + prefers-reduced-motion
│   └── actions.ts          # 'use server' Contact 폼 Server Action
├── components/
│   ├── sections/           # Hero, About, Skills, Experience, Projects, Education, Contact
│   ├── ui/                 # shadcn 컴포넌트 (button, card, badge, input, ...)
│   ├── theme-provider.tsx  # next-themes 래퍼 (client)
│   ├── theme-toggle.tsx    # 해/달 토글 (client)
│   ├── reveal.tsx          # IntersectionObserver 등장 애니메이션 래퍼 (client)
│   ├── site-header.tsx     # 네비 + 스크롤스파이 + 모바일 메뉴 (client)
│   └── back-to-top.tsx     # 맨 위로 버튼 (client)
├── lib/
│   ├── data.ts             # 이력서 콘텐츠를 타입 지정 데이터로 단일화(예시값)
│   └── utils.ts            # shadcn cn() 헬퍼
components.json             # shadcn 설정 (aliases: @/components, @/lib/utils, ...)
next.config.ts             # Next.js 설정
```

- **RSC 우선**: 섹션은 기본 서버 컴포넌트로 두고, 상호작용이 필요한 것(테마 토글, 스크롤스파이 헤더, reveal, back-to-top)만 `"use client"`로 분리.
- **콘텐츠 단일화**: 기존 "예시값은 index.html만 수정" 규약을 `src/lib/data.ts` 하나로 이전 → 실제 정보 교체 시 이 파일만 수정.

---

## 구현 단계

1. **브랜치 생성**: `feature/nextjs-migration` (git-rules 규약).

2. **스캐폴딩**: 임시 디렉토리에 `npx create-next-app@latest` 실행 — TypeScript · Tailwind · ESLint · App Router · `src/` · import alias `@/*` 선택. 생성 결과를 저장소 루트로 이동. `.gitignore`·`README.md`는 기존 파일과 **병합**.

3. **기존 정적 자산 보존**: 현재 `index.html` · `src/css` · `src/js`를 `legacy/`로 이동(참조용, git 이력에도 남음). `assets/icons/favicon.svg`는 `public/`으로 이전.

4. **shadcn 초기화**: `npx shadcn@latest init --template next` → `components.json` 생성. 필요한 컴포넌트만 추가: `npx shadcn@latest add button card badge separator input textarea`.

5. **다크모드 이전**: `next-themes` 설치 → `ThemeProvider`(client) 작성, `layout.tsx`의 `<html>`에 `suppressHydrationWarning`, `theme-toggle.tsx`로 해/달 아이콘 토글. 기존 `theme.js` + FOUC 인라인 스크립트 로직을 대체.

6. **스타일 이전**: `src/css/custom.css`의 `[data-reveal]` 등장 애니메이션 · `scroll-margin-top` · `prefers-reduced-motion` 규칙을 `globals.css`(Tailwind v4)로 이전.

7. **콘텐츠/섹션 이전**: `index.html` 각 섹션 → `src/lib/data.ts`(타입 지정 데이터) + `components/sections/*` JSX로 포팅. 기존 `data-reveal` 규약은 `<Reveal>` 래퍼로 대체. 프로젝트 이미지는 `next/image`.

8. **상호작용 이전**:
   - `reveal.tsx`: 기존 `scroll.js`의 `IntersectionObserver` + `prefers-reduced-motion` 로직 포팅(스크롤 폴링 금지 규약 유지).
   - `site-header.tsx`: 스크롤스파이(현재 섹션 강조) + 모바일 메뉴 토글.
   - `back-to-top.tsx`: 맨 위로 버튼.

9. **SEO/메타데이터**: `layout.tsx`에 `metadata`(title, description, `openGraph`, `icons`) + `metadataBase` 설정 → 기존 Open Graph 메타 대체.

10. **Contact 폼(선택적 최신 기능)**: `app/actions.ts`의 Server Action으로 폼 처리(점진적 향상). 단순 유지 원하면 `mailto`로 대체 가능.

11. **린트/검증 후 커밋**: `npm run lint` 통과 확인(git-rules: 커밋 전 반드시 린트) 후 한글 커밋.

12. **배포**: Vercel Git 연동으로 프리뷰/프로덕션 배포. `metadataBase`용 사이트 URL 환경변수 설정.

**코드 스타일**(project rules): 스페이스 2칸, camelCase, 상수 SNAKE_CASE, 컴포넌트 PascalCase, 한글 주석.

---

## 재사용 / 기존 자산 매핑

| 기존 자산 | 이전 위치 | 방식 |
|---|---|---|
| `index.html` 섹션 마크업 | `components/sections/*` + `lib/data.ts` | JSX + 타입 데이터로 포팅 |
| `src/js/theme.js` | `theme-provider.tsx` + `theme-toggle.tsx` | next-themes로 대체 |
| `src/js/scroll.js` (IO 애니메이션·스크롤스파이·top 버튼) | `reveal.tsx`·`site-header.tsx`·`back-to-top.tsx` | IntersectionObserver 로직 재사용 |
| `src/js/main.js` (모바일 메뉴·연도) | `site-header.tsx` · `layout.tsx` 푸터 | React 상태/`Date`로 대체 |
| `src/css/custom.css` | `globals.css` | reveal·reduced-motion 규칙 이전 |
| `assets/icons/favicon.svg` | `public/` + `metadata.icons` | 그대로 이전 |
| 인라인 `tailwind.config`(다크모드 class, 폰트) | `globals.css` + `next/font` | Tailwind v4 방식으로 이전 |

---

## 검증 방법 (end-to-end)

1. **로컬 개발 서버**: `npm run dev`(Turbopack) → `http://localhost:3000` 에서 전 섹션 렌더 확인.
2. **기능 QA**:
   - 다크모드 토글 + 새로고침 시 테마 유지(localStorage) + FOUC 없음.
   - 스크롤 시 각 섹션 `Reveal` 등장, 스크롤스파이 네비 강조, 맨 위로 버튼.
   - 반응형(모바일 메뉴 토글) · 키보드 포커스 · `aria-*` 유지.
   - `prefers-reduced-motion` 시 애니메이션 비활성.
3. **빌드 검증**: `npm run build` 성공(Turbopack) + `npm run lint` 무경고.
4. **SEO 확인**: 페이지 소스에서 `<title>`·`meta description`·Open Graph 태그 출력 확인.
5. **접근성/성능**: 브라우저 Lighthouse(접근성·SEO·성능) 점검.
6. **Contact 폼**(구현 시): Server Action 제출 → 성공/에러 상태 확인.
7. **배포 검증**: Vercel 프리뷰 URL에서 OG 태그(절대 URL)·다크모드·반응형 재확인.
