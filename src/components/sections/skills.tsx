// skills.tsx
// 기술 스택(Skills) 섹션. 프론트엔드/도구 그룹을 카드로 나누고 배지로 항목을 표시한다.

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { SKILL_GROUPS } from "@/lib/data";

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="bg-muted/40"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading id="skills-title">기술 스택</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2">
            {SKILL_GROUPS.map((group) => (
              <Card key={group.title}>
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {group.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <li key={item}>
                        <Badge
                          variant="secondary"
                          className={cn(
                            "h-auto rounded-full px-3 py-1 text-sm",
                            // 프론트엔드 그룹은 브랜드(인디고) 톤으로 강조한다.
                            group.accent && "bg-primary/10 text-primary",
                          )}
                        >
                          {item}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
