// data.ts
// 이력서 콘텐츠를 한곳에서 관리한다. 실제 정보로 교체할 때는 이 파일만 수정하면 된다.
// (기존 정적 사이트의 "index.html만 수정" 규약을 계승)

// 네비게이션 항목 타입
export type NavItem = {
  id: string;
  label: string;
};

// 기술 스택 그룹 타입
export type SkillGroup = {
  title: string;
  // accent=true 이면 브랜드(인디고) 배지, false 이면 중립 배지로 표시한다.
  accent: boolean;
  items: string[];
};

// 경력 항목 타입
export type Experience = {
  period: string;
  title: string;
  description: string;
};

// 프로젝트 항목 타입
export type Project = {
  title: string;
  description: string;
  tags: string[];
  href: string;
};

// 학력/교육 항목 타입
export type Education = {
  title: string;
  subtitle: string;
  period: string;
};

// 연락처/소셜 링크 타입
export type SocialLink = {
  label: string;
  href: string;
  external: boolean;
};

// 사이트 기본 정보 (SEO/메타데이터에서 재사용)
export const SITE = {
  name: "홍길동",
  initials: "홍",
  role: "프론트엔드 개발자",
  roleEn: "Frontend Developer",
  title: "홍길동 | 프론트엔드 개발자 이력서",
  description:
    "사용자 경험을 중시하는 프론트엔드 개발자 홍길동의 웹 이력서입니다. 기술 스택, 경력, 프로젝트를 확인해 보세요.",
  // 배포 후 실제 도메인으로 교체한다. (OG 절대 URL 생성에 사용)
  url: "https://example.com",
} as const;

// 헤더/모바일 메뉴 네비게이션
export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "소개" },
  { id: "skills", label: "기술" },
  { id: "experience", label: "경력" },
  { id: "projects", label: "프로젝트" },
  { id: "education", label: "학력" },
  { id: "contact", label: "연락처" },
];

// Hero 섹션 문구
export const HERO = {
  greeting: "안녕하세요, 홍길동입니다",
  description:
    "사용자 경험을 중시하며, 깔끔하고 접근성 높은 웹을 만드는 프론트엔드 개발자입니다.",
} as const;

// About 섹션 본문
export const ABOUT_TEXT =
  "웹 개발에 즐거움을 느끼는 프론트엔드 개발자입니다. HTML, CSS, JavaScript를 기반으로 반응형 웹과 인터랙티브한 UI를 구현하는 것을 좋아합니다. 새로운 기술을 배우고 팀과 소통하며 더 나은 사용자 경험을 만드는 데 관심이 많습니다.";

// Skills 섹션
export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: "프론트엔드",
    accent: true,
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TailwindCSS", "React"],
  },
  {
    title: "도구 & 협업",
    accent: false,
    items: ["Git", "GitHub", "VS Code", "Figma", "Vite"],
  },
];

// Experience 섹션 (최신순)
export const EXPERIENCES: Experience[] = [
  {
    period: "2023.03 ~ 현재",
    title: "OO소프트 · 프론트엔드 개발자",
    description:
      "사내 웹 서비스의 UI 컴포넌트를 개발하고 반응형 레이아웃을 개선했습니다. 접근성 및 성능 최적화를 통해 사용자 경험을 향상시켰습니다.",
  },
  {
    period: "2022.06 ~ 2023.02",
    title: "OO스튜디오 · 웹 퍼블리셔 (인턴)",
    description:
      "디자인 시안을 HTML/CSS로 구현하고 크로스 브라우저 호환성을 확보했습니다. 간단한 JavaScript 인터랙션을 담당했습니다.",
  },
];

// Projects 섹션
export const PROJECTS: Project[] = [
  {
    title: "반응형 웹 이력서",
    description:
      "HTML, TailwindCSS, JavaScript로 만든 단일 페이지 이력서. 다크모드와 스크롤 애니메이션을 지원합니다.",
    tags: ["HTML", "Tailwind", "JS"],
    href: "#",
  },
  {
    title: "쇼핑몰 클론",
    description:
      "React로 구현한 쇼핑몰 UI. 상품 목록, 장바구니, 필터 기능을 포함합니다.",
    tags: ["React", "CSS"],
    href: "#",
  },
  {
    title: "날씨 대시보드",
    description:
      "공개 API를 활용해 지역별 날씨를 보여주는 대시보드. Vanilla JavaScript로 제작했습니다.",
    tags: ["JavaScript", "API"],
    href: "#",
  },
];

// Education 섹션
export const EDUCATIONS: Education[] = [
  {
    title: "OO대학교 컴퓨터공학과",
    subtitle: "학사 졸업",
    period: "2018 ~ 2022",
  },
  {
    title: "프론트엔드 개발 부트캠프",
    subtitle: "웹 개발 심화 과정 수료",
    period: "2022",
  },
];

// Contact 섹션
export const CONTACT = {
  intro: "새로운 기회와 협업을 환영합니다. 편하게 연락해 주세요!",
  email: "example@email.com",
  socials: [
    { label: "GitHub", href: "https://github.com/username", external: true },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/username",
      external: true,
    },
  ] satisfies SocialLink[],
} as const;
