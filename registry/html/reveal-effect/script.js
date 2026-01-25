import { animate, inView } from "motion";

const speedDurations = {
  slow: 1.6,
  medium: 1,
  fast: 0.5,
};

document.querySelectorAll("#reveal-effect").forEach((el) => {
  const delay = parseFloat(el.dataset.delay) || 0;
  const speed = el.dataset.speed || "medium";
  const translateY = parseFloat(el.dataset.translatey) || 0;

  el.style.opacity = "0";
  el.style.filter = "blur(12px)";
  el.style.clipPath = "inset(-5% 100% -5% 0)";
  el.style.transform = `translateY(${translateY}px)`;

  inView(el, () => {
    animate(
      el,
      {
        opacity: 1,
        filter: "blur(0px)",
        clipPath: "inset(-5% 0% -5% 0)",
        transform: "translateY(0)",
      },
      {
        duration: speedDurations[speed],
        easing: "ease-in-out",
        delay,
      }
    );
  });
});
