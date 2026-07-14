/* scroll.js
 * 스크롤 관련 인터랙션을 담당한다.
 *  - 섹션 페이드인 등장 (IntersectionObserver 사용, 스크롤 이벤트 폴링 금지)
 *  - 현재 섹션에 해당하는 네비게이션 링크 강조 (스크롤스파이)
 *  - '맨 위로' 버튼 표시 및 동작
 */
(function () {
  "use strict";

  // 뷰포트에 들어오는 요소에 is-visible 클래스를 부여해 등장 애니메이션을 실행한다.
  function initRevealOnScroll() {
    const targets = document.querySelectorAll("[data-reveal]");
    if (targets.length === 0) return;

    // IntersectionObserver 미지원 환경에서는 즉시 모두 표시한다.
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // 한 번 등장한 요소는 관찰을 중단한다.
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
  }

  // 화면 중앙 부근에 보이는 섹션의 네비 링크를 활성 상태로 표시한다.
  function initScrollSpy() {
    const sections = document.querySelectorAll("main section[id]");
    const navLinks = document.querySelectorAll("[data-nav-link]");
    if (sections.length === 0 || navLinks.length === 0) return;

    const activeClasses = ["text-indigo-600", "dark:text-indigo-400", "font-semibold"];

    function setActive(id) {
      navLinks.forEach((link) => {
        const isActive = link.getAttribute("href") === "#" + id;
        activeClasses.forEach((cls) => link.classList.toggle(cls, isActive));
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // 뷰포트 중앙 좁은 띠에 걸친 섹션을 현재 섹션으로 판단한다.
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
  }

  // Hero 섹션을 벗어나면 '맨 위로' 버튼을 노출한다.
  function initBackToTop() {
    const btn = document.querySelector("[data-back-to-top]");
    if (!btn) return;

    const heroSection = document.querySelector("#home") || document.body;

    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const hidden = entry.isIntersecting; // Hero가 보이면 숨김
            btn.classList.toggle("opacity-0", hidden);
            btn.classList.toggle("pointer-events-none", hidden);
          });
        },
        { threshold: 0 }
      );
      observer.observe(heroSection);
    }

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function init() {
    initRevealOnScroll();
    initScrollSpy();
    initBackToTop();
  }

  window.Resume = window.Resume || {};
  window.Resume.scroll = { init };
})();
