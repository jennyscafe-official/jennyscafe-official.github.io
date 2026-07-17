"use strict";

const header = document.getElementById("siteHeader");
const menuButton = document.getElementById("menuButton");
const globalNav = document.getElementById("globalNav");
const navigationLinks = globalNav.querySelectorAll("a");

function setMenuState(isOpen) {
  menuButton.classList.toggle("is-active", isOpen);
  globalNav.classList.toggle("is-open", isOpen);
  document.body.classList.toggle("menu-open", isOpen);

  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute(
    "aria-label",
    isOpen ? "メニューを閉じる" : "メニューを開く"
  );

  globalNav.setAttribute("aria-hidden", String(!isOpen));
}

menuButton.addEventListener("click", () => {
  const isOpen = !globalNav.classList.contains("is-open");
  setMenuState(isOpen);
});

navigationLinks.forEach((link) => {
  link.addEventListener("click", () => {
    setMenuState(false);
  });
});

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("is-scrolled", window.scrollY > 30);
  },
  { passive: true }
);

const revealElements = document.querySelectorAll("[data-reveal]");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -40px"
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});