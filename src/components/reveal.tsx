"use client";

// reveal.tsx
// 스크롤 등장 애니메이션 래퍼. IntersectionObserver로 뷰포트 진입을 감지해
// is-visible 클래스를 부여한다(스크롤 이벤트 폴링 금지). 실제 애니메이션 스타일은
// globals.css의 [data-reveal] / [data-reveal].is-visible 규칙이 담당한다.
// (기존 scroll.js의 initRevealOnScroll 로직을 이전)

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
};

export function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver 미지원 환경에서는 다음 프레임에 즉시 표시한다.
    if (!("IntersectionObserver" in window)) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target); // 한 번 등장한 요소는 관찰 중단
          }
        });
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-reveal className={cn(visible && "is-visible", className)}>
      {children}
    </div>
  );
}
