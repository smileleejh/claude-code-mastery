// experience.tsx
// 경력(Experience) 섹션. 세로 타임라인 형태로 표시한다.

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";
import { EXPERIENCES } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6"
    >
      <Reveal>
        <SectionHeading id="experience-title">경력</SectionHeading>
        <ol className="relative mx-auto max-w-2xl border-l border-border">
          {EXPERIENCES.map((exp, index) => (
            <li
              key={exp.title}
              className={cn("ml-6", index < EXPERIENCES.length - 1 && "mb-10")}
            >
              {/* 타임라인 점 */}
              <span className="absolute -left-1.5 mt-1.5 size-3 rounded-full bg-primary ring-4 ring-background" />
              <p className="text-sm text-muted-foreground">{exp.period}</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">
                {exp.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {exp.description}
              </p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
