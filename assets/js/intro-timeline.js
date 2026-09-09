/* Cinematic opening intro, same architecture as robust-code.com's
   intro-timeline.js: black overlay -> eyebrow flash -> per-word mask
   reveal of the title -> hero content crystallizes from blur/scale as the
   overlay fades. Bails out silently (page stays normal/scrollable) if
   GSAP or required elements are missing, and skips entirely under
   prefers-reduced-motion instead of shortening it. */
(function () {
  if (typeof gsap === "undefined") return;

  const overlay = document.getElementById("intro-overlay");
  const eyebrow = document.getElementById("intro-eyebrow");
  const title = document.getElementById("intro-title");
  const heroContent = document.querySelector(".hero-content");
  const heroEyebrow = heroContent ? heroContent.querySelector(".eyebrow") : null;
  const heroTitle = heroContent ? heroContent.querySelector("h1") : null;
  const heroCta = document.querySelector(".hero-cta");

  if (!overlay || !eyebrow || !title || !heroEyebrow || !heroTitle || !heroCta) {
    window.dispatchEvent(new Event("ide:intro-complete"));
    return;
  }

  const heroRevealItems = [heroEyebrow, heroTitle, heroCta];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion) {
    gsap.set(overlay, { autoAlpha: 0, pointerEvents: "none", display: "none" });
    gsap.set(heroRevealItems, { clearProps: "all" });
    window.dispatchEvent(new Event("ide:intro-complete"));
    return;
  }

  const words = title.textContent.trim().split(/\s+/);
  title.innerHTML = words
    .map((word) => '<span class="word-mask"><span class="word">' + word + "</span></span>")
    .join(" ");
  const wordEls = title.querySelectorAll(".word");

  gsap.set(eyebrow, { autoAlpha: 0, letterSpacing: "0.2em" });
  gsap.set(wordEls, { yPercent: 100, autoAlpha: 0 });
  gsap.set(heroRevealItems, { opacity: 0, scale: 1.06, y: 15, filter: "blur(16px)" });

  const tl = gsap.timeline({
    defaults: { ease: "power4.out" },
    onComplete: () => window.dispatchEvent(new Event("ide:intro-complete")),
  });

  tl.to(eyebrow, { autoAlpha: 1, letterSpacing: "0.4em", duration: 0.7, ease: "power2.out" }, 0.3)
    .to(eyebrow, { autoAlpha: 0, duration: 0.35, ease: "power2.in" }, 1.2)
    .to(wordEls, { yPercent: 0, autoAlpha: 1, duration: 0.9, stagger: 0.08, ease: "expo.out" }, 1.2)
    .to(overlay, { autoAlpha: 0, pointerEvents: "none", duration: 0.5, ease: "power2.out" }, 2.0)
    .set(overlay, { display: "none" })
    .to(
      heroRevealItems,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        clearProps: "opacity,transform,filter",
      },
      2.3
    );
})();
