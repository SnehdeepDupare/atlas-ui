import { animate, scroll, transform } from "motion";

const revealText = document.getElementById("reveal-text");

const words = revealText.innerText.split(" ");
revealText.innerHTML = words
  .map(
    (word) => `
    <span class="word-container">
      <span class="word-shadow">${word}</span>
      <span class="word">${word}</span>
    </span>
  `
  )
  .join(" ");

const wordSpans = document.querySelectorAll(".word");

wordSpans.forEach((span) => {
  span.style.opacity = 0;
});

scroll(
  (progress) => {
    wordSpans.forEach((span, i) => {
      const start = i / wordSpans.length;
      const end = (start + i) / wordSpans.length;

      const opacity = transform(progress, [start, end], [0, 1]);

      span.style.opacity = opacity;
    });
  },
  {
    target: revealText,
    offset: ["start 0.8", "start 0.3"],
  }
);
