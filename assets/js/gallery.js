/* Tattoo gallery: filter chips (same instant show/hide pattern as
   robust-code.com's portfolio.js) + a ScrollTrigger.batch cascade reveal
   (same engine as liquid-glass-cards.js) + a lightbox on click.
   PLACEHOLDER CONTENT: every tile is a CSS placeholder, not a real photo
   — see BUILD-NOTES.md. Swap each .gallery-placeholder's parent for a
   real <img data-full="..."> once photos are supplied; the filter/reveal/
   lightbox logic needs no changes. */
(function () {
  function initFilters() {
    var chips = document.querySelectorAll(".filter-chip");
    var tiles = document.querySelectorAll("[data-filter-card]");
    if (!chips.length || !tiles.length) return;

    function applyFilter(value) {
      tiles.forEach(function (tile) {
        var category = tile.getAttribute("data-category");
        tile.hidden = value !== "all" && category !== value;
      });
      chips.forEach(function (chip) {
        chip.classList.toggle("is-active", chip.getAttribute("data-filter-chip") === value);
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        applyFilter(chip.getAttribute("data-filter-chip") || "all");
      });
    });
  }

  function initReveal() {
    if (typeof window.gsap === "undefined") return;
    var gsap = window.gsap;
    var tiles = Array.prototype.slice.call(document.querySelectorAll(".gallery-tile"));
    if (!tiles.length) return;

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || typeof window.ScrollTrigger === "undefined") {
      gsap.set(tiles, { clearProps: "all" });
      return;
    }
    gsap.registerPlugin(window.ScrollTrigger);

    gsap.set(tiles, { opacity: 0, y: 40 });
    window.ScrollTrigger.batch(tiles, {
      start: "top 90%",
      once: true,
      onEnter: function (batch) {
        gsap.to(batch, { opacity: 1, y: 0, duration: 0.7, ease: "power4.out", stagger: 0.08 });
      },
    });
  }

  function initLightbox() {
    var lightbox = document.getElementById("lightbox");
    var closeBtn = document.getElementById("lightbox-close");
    var content = document.getElementById("lightbox-content");
    if (!lightbox || !content) return;

    var tiles = document.querySelectorAll(".gallery-tile");

    function open(tile) {
      content.innerHTML = tile.querySelector(".gallery-inner").innerHTML;
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    tiles.forEach(function (tile) {
      tile.addEventListener("click", function () {
        open(tile);
      });
    });
    if (closeBtn) closeBtn.addEventListener("click", close);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) close();
    });
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });
  }

  function init() {
    initFilters();
    initReveal();
    initLightbox();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
