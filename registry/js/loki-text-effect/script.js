import { animate } from "motion";

const fonts = [
  "FontOne",
  "FontTwo",
  "FontThree",
  "FontFour",
  "FontFive",
  "FontSix",
  "FontSeven",
];

const getRandomFont = (current) => {
  let next = current;
  while (next === current) {
    next = fonts[Math.floor(Math.random() * fonts.length)];
  }
  return next;
};

const getRandomOffset = () => ({
  x: (Math.random() - 0.5) * 2,
  y: (Math.random() - 0.5) * 2,
});

const applyLokiEffect = (element) => {
  const text = element.dataset.value || element.textContent.trim();
  const velocityFont = Math.max(
    100,
    Number(element.dataset.velocityFont || 800)
  );
  const velocityMove = Math.max(
    100,
    Number(element.dataset.velocityMove || 1800)
  );

  element.innerHTML = "";

  text.split("").forEach((char, i) => {
    const span = document.createElement("span");
    span.className = "loki-letter";
    span.textContent = char;

    let baseFont = fonts[i % fonts.length];
    span.style.fontFamily = baseFont;
    element.appendChild(span);

    // Font swap
    setInterval(() => {
      baseFont = getRandomFont(baseFont);
      span.style.fontFamily = baseFont;
    }, velocityFont);

    // Position animate
    setInterval(() => {
      const { x, y } = getRandomOffset();
      animate(span, { x, y }, { duration: 0.5, easing: "ease-in-out" });
    }, velocityMove);
  });
};

window.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#loki-effect-text").forEach(applyLokiEffect);
});
