import { scroll, transform } from "motion";

const container = document.getElementById("parallax-container");
const section1 = document.querySelector(".section1");
const section2 = document.querySelector(".section2");

scroll(
  (progress) => {
    const scale1 = transform(progress, [0, 1], [1, 0.8]);
    const rotate1 = transform(progress, [0, 1], [0, -5]);
    section1.style.transform = `scale(${scale1}) rotate(${rotate1}deg)`;

    const scale2 = transform(progress, [0, 1], [0.8, 1]);
    const rotate2 = transform(progress, [0, 1], [-5, 0]);
    section2.style.transform = `scale(${scale2}) rotate(${rotate2}deg)`;
  },
  {
    target: container,
    offset: ["start start", "end end"],
  }
);
