"use client";

// back-to-top.tsx
// Hero 섹션을 벗어나면 나타나는 '맨 위로' 버튼. IntersectionObserver로 Hero 노출
// 여부를 감지한다. (기존 scroll.js의 initBackToTop 로직을 이전)

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("home");
    if (!hero || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Hero가 보이면 숨기고, 벗어나면 노출한다.
          setVisible(!entry.isIntersecting);
        });
      },
      { threshold: 0 },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <Button
      type="button"
      size="icon"
      aria-label="맨 위로 이동"
      onClick={scrollToTop}
      className={cn(
        "fixed right-6 bottom-6 z-40 size-11 rounded-full shadow-lg transition-opacity duration-300",
        visible ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <ArrowUp className="size-5" />
    </Button>
  );
}
