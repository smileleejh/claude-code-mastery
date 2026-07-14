# 개발자 웹이력서 개발 로드맵

## 프로젝트 개요

HTML, CSS, JavaScript, TailwindCSS를 활용하여 반응형 개발자 웹이력서(포트폴리오)를 제작합니다. 정적 사이트로 구성하며, GitHub Pages 등으로 손쉽게 배포할 수 있는 구조를 목표로 합니다.

### 기술 스택

| 구분 | 기술 |
|------|------|
| 마크업 | HTML5 |
| 스타일 | CSS3, TailwindCSS |
| 인터랙션 | Vanilla JavaScript (ES6+) |
| 배포 | GitHub Pages (예정) |

### 핵심 목표

- 한 페이지(Single Page) 스크롤형 이력서
- 모바일 / 태블릿 / 데스크톱 반응형 대응
- 다크 모드 지원
- 부드러운 스크롤 및 등장 애니메이션
- 접근성(a11y) 및 SEO 기본 준수

---

## 폴더 구조 (목표)

```
claude-code-mastery/
├── index.html              # 메인 이력서 페이지
├── src/
│   ├── css/
│   │   └── custom.css      # 커스텀 스타일 (CDN 방식 채택 → input/output.css 미사용)
│   └── js/
│       ├── main.js         # 진입점
│       ├── theme.js        # 다크모드 토글
│       └── scroll.js       # 스크롤 애니메이션 / 네비게이션
├── assets/
│   ├── images/             # 프로필 사진, 프로젝트 썸네일
│   └── icons/              # 아이콘, 파비콘
├── tailwind.config.js      # Tailwind 설정
├── package.json            # 빌드 스크립트 및 의존성
└── README.md
```

---

## 개발 단계

### 1단계: 프로젝트 초기 설정
> **적용 방식 변경**: Tailwind Play CDN을 채택하여 npm / 빌드 파이프라인 없이 진행합니다.
- [x] Git 저장소 초기화
- [x] ~~`package.json` 생성 및 TailwindCSS 설치~~ → CDN `<script>`로 대체
- [x] ~~`tailwind.config.js` 설정~~ → `index.html` 인라인 `tailwind.config`로 대체 (darkMode: 'class', 폰트)
- [x] ~~`input.css` 작성~~ → CDN이 유틸리티 제공, 커스텀은 `src/css/custom.css`
- [x] ~~빌드 스크립트 구성~~ → 빌드 단계 없음 (파일 열기 / `npx serve`)
- [x] 기본 `index.html` 뼈대 및 메타 태그 작성

### 2단계: 레이아웃 및 공통 컴포넌트
- [x] 상단 고정 네비게이션 바 (섹션 앵커 링크)
- [x] 반응형 그리드 시스템 설계
- [x] 다크모드 토글 버튼 UI
- [x] 푸터 (연락처 / 저작권)
- [x] 공통 색상 팔레트 및 타이포그래피 정의

### 3단계: 이력서 콘텐츠 섹션 구현
- [x] **Hero** — 이름, 직함, 한 줄 소개, 프로필 이미지(이니셜 SVG 아바타)
- [x] **About** — 자기소개 및 핵심 역량 요약
- [x] **Skills** — 기술 스택 목록 (뱃지)
- [x] **Experience** — 경력 사항 (타임라인 형태)
- [x] **Projects** — 대표 프로젝트 카드 (제목, 설명, 링크)
- [x] **Education** — 학력 및 자격증
- [x] **Contact** — 이메일, GitHub, LinkedIn 등 링크

### 4단계: 인터랙션 및 애니메이션
- [x] 스무스 스크롤 네비게이션
- [x] 스크롤 시 섹션 페이드인 등장 효과 (Intersection Observer)
- [x] 현재 섹션 네비게이션 하이라이트
- [x] 다크모드 상태 `localStorage` 저장
- [x] 맨 위로 이동 버튼

### 5단계: 마무리 및 최적화
- [ ] 반응형 QA (모바일 / 태블릿 / 데스크톱) — 브라우저에서 확인 필요
- [ ] 크로스 브라우저 테스트 — 확인 필요
- [x] 접근성 점검 (시맨틱 태그, `alt`, 키보드 내비게이션) — 구현 반영
- [x] SEO 메타 태그 및 Open Graph 설정
- [ ] Lighthouse 성능 점검 및 이미지 최적화 — 확인 필요
- [x] `README.md` 작성

### 6단계: 배포
- [ ] ~~TailwindCSS 프로덕션 빌드~~ — CDN 방식에서는 선택 (추후 CLI 빌드 전환 시)
- [ ] GitHub Pages 배포 — 사용자 GitHub 저장소 필요 (`README.md` 안내 참조)
- [ ] 커스텀 도메인 연결 (선택)

---

## 이력서 콘텐츠 (예시 초안)

> 아래는 일반적인 예시 내용입니다. 실제 정보로 교체하세요.

- **이름**: 홍길동
- **직함**: 프론트엔드 개발자
- **소개**: 사용자 경험을 중시하는 웹 개발자입니다.
- **기술**: HTML, CSS, JavaScript, TailwindCSS, React, Git
- **경력**: OO회사 프론트엔드 개발 (2023 ~ 현재)
- **프로젝트**: 반응형 웹이력서, 쇼핑몰 클론 등
- **학력**: OO대학교 컴퓨터공학과 졸업
- **연락처**: example@email.com / github.com/username

---

## 향후 확장 아이디어 (선택)

- 다국어(i18n) 지원 (한국어 / 영어 전환)
- PDF 이력서 다운로드 기능
- 방문자 통계 / 조회수
- 블로그 또는 기술 아티클 섹션 연동
- 프로젝트 상세 모달 뷰
```
