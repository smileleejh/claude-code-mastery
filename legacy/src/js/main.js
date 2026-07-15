/* main.js
 * 진입점. DOM이 준비되면 각 모듈을 초기화하고 공통 UI 동작(모바일 메뉴, 푸터 연도)을 연결한다.
 * (theme.js, scroll.js가 먼저 로드되어 window.Resume 네임스페이스를 채운다.)
 */
(function () {
  "use strict";

  // 모바일 햄버거 메뉴를 열고 닫는다.
  function initMobileMenu() {
    const toggle = document.querySelector("[data-menu-toggle]");
    const menu = document.querySelector("[data-mobile-menu]");
    if (!toggle || !menu) return;

    function closeMenu() {
      menu.classList.add("hidden");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", () => {
      const isHidden = menu.classList.toggle("hidden");
      toggle.setAttribute("aria-expanded", String(!isHidden));
    });

    // 메뉴 내 링크를 누르면 메뉴를 자동으로 닫는다.
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });
  }

  // 푸터의 저작권 연도를 현재 연도로 채운다.
  function initFooterYear() {
    const el = document.querySelector("[data-current-year]");
    if (el) {
      el.textContent = new Date().getFullYear();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (window.Resume && window.Resume.theme) window.Resume.theme.init();
    if (window.Resume && window.Resume.scroll) window.Resume.scroll.init();
    initMobileMenu();
    initFooterYear();
  });
})();
