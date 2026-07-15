// section-heading.tsx
// 각 섹션의 제목 + 브랜드 밑줄을 그리는 공용 컴포넌트.

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export function SectionHeading({ id, children, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-10", className)}>
      <h2
        id={id}
        className="mb-3 text-center text-3xl font-bold text-foreground"
      >
        {children}
      </h2>
      <div className="mx-auto h-1 w-16 rounded bg-primary" />
    </div>
  );
}
