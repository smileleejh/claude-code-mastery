// projects.tsx
// 프로젝트(Projects) 섹션. 카드 그리드로 표시한다.

import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PROJECTS } from "@/lib/data";

export function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="bg-muted/40"
    >
      <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading id="projects-title">프로젝트</SectionHeading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <Card
                key={project.title}
                className="h-full transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="h-auto rounded px-2 py-0.5 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={project.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    자세히 보기
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
