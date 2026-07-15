"use client";

// theme-toggle.tsx
// 다크모드 토글 버튼. 아이콘 표시는 <html>의 'dark' 클래스에 따라 CSS(dark:)로 처리해
// FOUC/깜빡임 없이 올바른 아이콘을 보여준다. 클릭 시 next-themes로 테마를 전환한다.

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      aria-label="다크모드 전환"
      onClick={toggleTheme}
    >
      {/* 다크모드일 때: 해(밝게 전환) 아이콘 */}
      <Sun className="hidden size-4 dark:block" />
      {/* 라이트모드일 때: 달(어둡게 전환) 아이콘 */}
      <Moon className="size-4 dark:hidden" />
    </Button>
  );
}
