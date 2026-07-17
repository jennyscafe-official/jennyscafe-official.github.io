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


// gallery

const gallerySlider = document.querySelector("[data-gallery-slider]");

if (gallerySlider) {
  const galleryTrack = gallerySlider.querySelector("[data-gallery-track]");
  const gallerySlides = gallerySlider.querySelectorAll(".gallery-slide");
  const galleryPrev = gallerySlider.querySelector("[data-gallery-prev]");
  const galleryNext = gallerySlider.querySelector("[data-gallery-next]");
  const galleryThumbs = gallerySlider.querySelectorAll("[data-gallery-thumb]");

  let currentGalleryIndex = 0;

  function updateGallery(index) {
    const slideCount = gallerySlides.length;

    currentGalleryIndex = (index + slideCount) % slideCount;

    galleryTrack.style.transform = `translateX(-${currentGalleryIndex * 100}%)`;

    gallerySlides.forEach((slide, slideIndex) => {
      slide.setAttribute(
        "aria-hidden",
        String(slideIndex !== currentGalleryIndex)
      );
    });

    galleryThumbs.forEach((thumb, thumbIndex) => {
      const isActive = thumbIndex === currentGalleryIndex;

      thumb.classList.toggle("is-active", isActive);
      thumb.setAttribute("aria-current", isActive ? "true" : "false");
    });
  }

  galleryPrev.addEventListener("click", () => {
    updateGallery(currentGalleryIndex - 1);
  });

  galleryNext.addEventListener("click", () => {
    updateGallery(currentGalleryIndex + 1);
  });

  galleryThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      const index = Number(thumb.dataset.galleryThumb);
      updateGallery(index);
    });
  });

  updateGallery(0);
}