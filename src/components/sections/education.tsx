// education.tsx
// 학력 & 교육(Education) 섹션.

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { EDUCATIONS } from "@/lib/data";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-title"
      className="mx-auto max-w-5xl px-4 py-20 sm:px-6"
    >
      <Reveal>
        <SectionHeading id="education-title">학력 &amp; 교육</SectionHeading>
        <div className="mx-auto max-w-2xl space-y-4">
          {EDUCATIONS.map((education) => (
            <Card key={education.title}>
              <CardContent className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-foreground">
                    {education.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {education.subtitle}
                  </p>
                </div>
                <span className="text-sm whitespace-nowrap text-muted-foreground">
                  {education.period}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
