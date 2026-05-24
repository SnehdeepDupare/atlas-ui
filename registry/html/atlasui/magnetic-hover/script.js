import { animate } from "motion";

const magneticHoverContainers = document.querySelectorAll(".magnetic-hover");

magneticHoverContainers.forEach((element) => {
  const strength = element.getAttribute("data-strength") || 1;
  element.addEventListener("mousemove", (e) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    const x = (e.clientX - (left + width / 2)) * strength;
    const y = (e.clientY - (top + height / 2)) * strength;

    animate(
      element,
      { x, y },
      { type: "spring", stiffness: 150, damping: 15, mass: 0.2 },
    );
  });

  element.addEventListener("mouseleave", () => {
    animate(
      element,
      { x: 0, y: 0 },
      { type: "spring", stiffness: 150, damping: 15, mass: 0.2 },
    );
  });
});
