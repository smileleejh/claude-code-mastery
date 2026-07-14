# 개발자 웹이력서

HTML · CSS · JavaScript · TailwindCSS로 만든 **반응형 개발자 웹이력서(단일 페이지 정적 사이트)** 입니다.

## ✨ 주요 기능

- 📱 **반응형 디자인** — 모바일 · 태블릿 · 데스크톱 대응
- 🌗 **다크모드** — 토글 버튼 + `localStorage`로 선택 유지
- 🎞️ **스크롤 애니메이션** — 섹션 페이드인 등장, 스무스 스크롤
- 🧭 **스크롤스파이** — 현재 섹션 네비게이션 강조
- ♿ **접근성 & SEO** — 시맨틱 태그, 키보드 내비게이션, Open Graph 메타

## 🛠️ 기술 스택

| 구분 | 기술 |
|------|------|
| 마크업 | HTML5 |
| 스타일 | TailwindCSS (Play CDN), CSS3 |
| 인터랙션 | Vanilla JavaScript (ES6+) |

> Tailwind는 **Play CDN** 방식으로 불러오므로 별도의 빌드 도구나 `npm install`이 필요 없습니다.

## 🚀 실행 방법

인터넷 연결 상태에서 아래 중 한 가지 방법으로 실행합니다. (CDN·웹폰트 로드에 인터넷이 필요합니다.)

```bash
# 방법 1) 파일 직접 열기
#   index.html 을 브라우저로 열면 바로 동작합니다.

# 방법 2) 로컬 서버 (권장)
npx serve
#   또는 VS Code "Live Server" 확장 사용
```

> 브라우저 콘솔에 표시되는 "cdn.tailwindcss.com should not be used in production" 경고는 CDN 방식에서 정상입니다.

## 📁 프로젝트 구조

```
.
├── index.html            # 메인 페이지 (모든 섹션 + Tailwind CDN + 인라인 설정)
├── src/
│   ├── css/custom.css     # 애니메이션 등 커스텀 스타일
│   └── js/
│       ├── theme.js       # 다크모드 토글 + localStorage
│       ├── scroll.js      # 등장 애니메이션 · 스크롤스파이 · 맨 위로 버튼
│       └── main.js        # 진입점 (모듈 초기화 · 모바일 메뉴)
├── assets/icons/favicon.svg
├── ROADMAP.md            # 개발 로드맵 및 진행 현황
└── CLAUDE.md             # Claude Code 가이드
```

## ✏️ 콘텐츠 교체 방법

현재 이력서 내용(이름 · 경력 · 프로젝트 · 연락처)은 **예시값**입니다. 실제 정보로 바꾸려면 `index.html`에서 다음을 수정하세요.

- **이름 / 소개**: `<title>`, `Hero` 섹션, 네비게이션 로고, 푸터
- **기술 스택**: `Skills` 섹션의 뱃지 목록
- **경력 / 학력**: `Experience`, `Education` 섹션
- **프로젝트**: `Projects` 섹션 카드 및 링크(`href`)
- **연락처**: `Contact` 섹션의 이메일(`mailto:`), GitHub · LinkedIn URL
- **메타 정보**: `<head>`의 `description` · Open Graph 태그

## 🌐 배포 (GitHub Pages)

정적 사이트이므로 GitHub Pages로 간단히 배포할 수 있습니다.

1. GitHub에 저장소를 만들고 푸시합니다.
   ```bash
   git remote add origin https://github.com/<사용자명>/<저장소명>.git
   git push -u origin main
   ```
2. GitHub 저장소 **Settings → Pages** 이동
3. **Source**를 `main` 브랜치 / `/ (root)`로 설정 후 저장
4. 잠시 후 `https://<사용자명>.github.io/<저장소명>/` 에서 확인

## 📄 라이선스

개인 이력서 템플릿으로 자유롭게 사용하세요.
