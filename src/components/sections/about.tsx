// about.tsx
// 소개(About) 섹션.

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { ABOUT_TEXT } from "@/lib/data";

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6"
    >
      <Reveal>
        <SectionHeading id="about-title">소개</SectionHeading>
        <p className="mx-auto max-w-3xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg">
          {ABOUT_TEXT}
        </p>
      </Reveal>
    </section>
  );
}
