import { animate, scroll, transform } from "motion";

const revealText = document.getElementById("reveal-text");

const words = revealText.innerText.split(" ");
revealText.innerHTML = words
  .map(
    (word) => `
    <span class="word">
      ${word
        .split("")
        .map(
          (char) => `
          <span class="character-container">
            <span class="char-shadow">${char}</span>
            <span class="char">${char}</span>
          </span>
        `
        )
        .join("")}
    </span>
  `
  )
  .join(" ");

const characters = document.querySelectorAll(".char");

characters.forEach((char) => {
  char.style.opacity = 0;
});

scroll(
  (progress) => {
    characters.forEach((char, i) => {
      const start = i / characters.length;
      const end = (start + i) / characters.length;

      const opacity = transform(progress, [start, end], [0, 1]);

      char.style.opacity = opacity;
    });
  },
  {
    target: revealText,
    offset: ["start 0.8", "start 0.3"],
  }
);
