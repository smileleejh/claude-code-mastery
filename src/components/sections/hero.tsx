// hero.tsx
// 첫 화면(Hero) 섹션. 프로필 아바타 · 이름 · 소개 문구 · CTA 버튼.

import { Reveal } from "@/components/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HERO, SITE } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-4 pt-16 text-center sm:px-6"
    >
      <Reveal className="flex flex-col items-center">
        {/* 프로필 아바타 (이니셜) */}
        <div
          className="mb-6 flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-4xl font-bold text-white shadow-lg"
          aria-hidden="true"
        >
          {SITE.initials}
        </div>
        <p className="mb-2 text-sm font-medium tracking-widest text-primary uppercase">
          {SITE.roleEn}
        </p>
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
          {HERO.greeting}
        </h1>
        <p className="mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
          {HERO.description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#projects"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-6")}
          >
            프로젝트 보기
          </a>
          <a
            href="#contact"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 px-6",
            )}
          >
            연락하기
          </a>
        </div>
      </Reveal>
    </section>
  );
}
