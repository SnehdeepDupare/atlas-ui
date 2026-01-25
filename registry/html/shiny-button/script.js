import { animate, spring } from "motion";

const btn = document.querySelector(".shiny-button");

animate(
  btn,
  { "--x": ["100%", "-100%"] },
  {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1,
    duration: 2,
  },
  {
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
  }
);

btn.addEventListener("mousedown", () => {
  animate(btn, {
    scale: 0.95,
  });
});

btn.addEventListener("mouseup", () => {
  animate(btn, {
    scale: 1,
  });
});
