import { SiteHeader } from "@/components/site-header";
import { BackToTop } from "@/components/back-to-top";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";
import { SITE } from "@/lib/data";

export default function Home() {
  // 정적 페이지이므로 저작권 연도는 빌드 시점 기준으로 렌더된다(재배포 시 갱신).
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* 키보드 사용자를 위한 본문 바로가기 */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        본문으로 건너뛰기
      </a>

      <SiteHeader />

      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <footer className="border-t border-border py-8 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} {SITE.name}. All rights reserved.
        </p>
      </footer>

      <BackToTop />
    </>
  );
}
