/* theme.js
 * 다크모드 테마를 관리한다. 사용자의 선택을 localStorage에 저장/복원하며,
 * Tailwind의 darkMode: 'class' 전략에 맞춰 <html>에 'dark' 클래스를 토글한다.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "theme";
  const root = document.documentElement;

  // 저장된 테마가 있으면 사용하고, 없으면 시스템 설정을 따른다.
  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  // 테마를 문서에 적용하고 토글 버튼 아이콘을 갱신한다.
  function applyTheme(theme) {
    root.classList.toggle("dark", theme === "dark");
    updateToggleIcon(theme);
  }

  // 해/달 아이콘의 표시 여부를 전환한다.
  function updateToggleIcon(theme) {
    const sun = document.querySelector("[data-theme-icon='sun']");
    const moon = document.querySelector("[data-theme-icon='moon']");
    if (!sun || !moon) return;
    const isDark = theme === "dark";
    // 다크모드에서는 '해'(밝게 전환), 라이트모드에서는 '달'(어둡게 전환) 아이콘을 보여준다.
    sun.classList.toggle("hidden", !isDark);
    moon.classList.toggle("hidden", isDark);
  }

  // 현재 테마를 반대로 전환하고 저장한다.
  function toggleTheme() {
    const next = root.classList.contains("dark") ? "light" : "dark";
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  function init() {
    // FOUC 방지 인라인 스크립트가 이미 'dark' 클래스를 적용했을 수 있으므로 아이콘까지 동기화한다.
    applyTheme(getPreferredTheme());

    const toggleBtn = document.querySelector("[data-theme-toggle]");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme);
    }
  }

  window.Resume = window.Resume || {};
  window.Resume.theme = { init };
})();
