function initYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
}

/* Generic .reveal -> .visible on scroll, same pattern as robust-code.com's
   main.js: a plain CSS-driven fade/rise for ordinary content, independent
   of the GSAP-driven specialized modules (intro, nav, cards, gallery,
   footer) which handle their own entrances. */
function initReveal() {
  const nodes = document.querySelectorAll(".reveal");
  if (!nodes.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  nodes.forEach((node) => observer.observe(node));
}

document.addEventListener("DOMContentLoaded", () => {
  initYear();
  initReveal();
});
