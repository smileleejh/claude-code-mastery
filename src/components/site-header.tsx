"use client";

// site-header.tsx
// 고정 헤더: 네비게이션 + 스크롤스파이(현재 섹션 강조) + 모바일 메뉴 + 테마 토글.
// (기존 scroll.js의 initScrollSpy, main.js의 initMobileMenu 로직을 이전)

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { NAV_ITEMS, SITE } from "@/lib/data";

export function SiteHeader() {
  const [activeId, setActiveId] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  // 스크롤스파이: 뷰포트 중앙 좁은 띠에 걸친 섹션을 현재 섹션으로 판단한다.
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main section[id]"),
    );
    if (sections.length === 0 || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"
        aria-label="주요 메뉴"
      >
        <a href="#home" className="text-lg font-bold text-foreground">
          {SITE.name}
          <span className="text-primary">.dev</span>
        </a>

        {/* 데스크톱 메뉴 */}
        <ul className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "text-sm transition-colors hover:text-primary",
                    isActive && "font-semibold text-primary",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* 모바일 햄버거 버튼 */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="메뉴 열기"
            aria-controls="mobile-menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </nav>

      {/* 모바일 메뉴 (기본 숨김, DOM에는 유지) */}
      <div
        id="mobile-menu"
        className={cn(
          "border-t border-border bg-background px-4 py-3 md:hidden",
          !menuOpen && "hidden",
        )}
      >
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                className="block rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
