"use client";

// theme-provider.tsx
// next-themes 를 감싸 다크모드를 관리한다. attribute="class" 전략으로 <html>에
// 'dark' 클래스를 토글하며, 페인트 전에 테마를 적용해 FOUC(깜빡임)를 방지한다.
// (기존 theme.js + 인라인 FOUC 스크립트를 대체)

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
