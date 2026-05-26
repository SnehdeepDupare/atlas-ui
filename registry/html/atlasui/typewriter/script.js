import { animate } from "motion";

const CONFIG = {
  letterDelay: 0.025,
  boxFadeDuration: 0.125,
  textFadeOutDuration: 0.25,
  delayBetween: 5500,
};

const textArray = [
  "Building pixels with purpose",
  "Shipping faster than deadlines",
  "Deploy now, panic later!",
  "Debugging at 2AM professionally",
  "Fueled by coffee and code",
];

const typewriterEl = document.querySelector(".typewriter");

let currentIndex = 0;

function renderText(text) {
  typewriterEl.innerHTML = "";

  const wrapper = document.createElement("span");

  text.split("").forEach((char, index) => {
    const charContainer = document.createElement("span");
    charContainer.style.position = "relative";

    // Character span
    const charSpan = document.createElement("span");
    charSpan.textContent = char === " " ? "\u00A0" : char;
    charSpan.style.opacity = "0";

    // box overlay
    const boxSpan = document.createElement("span");
    boxSpan.classList.add("box-span");

    charContainer.appendChild(charSpan);
    charContainer.appendChild(boxSpan);
    wrapper.appendChild(charContainer);

    // animate character
    animate(
      charSpan,
      { opacity: 1 },
      { duration: 0, delay: index * CONFIG.letterDelay },
    );

    // animate box
    animate(
      boxSpan,
      { opacity: [0, 1, 0] },
      {
        delay: index * CONFIG.letterDelay,
        times: [0, 0.1, 1],
        duration: CONFIG.boxFadeDuration,
        ease: "ease-in-out",
      },
    );
  });

  typewriterEl.appendChild(wrapper);
}

async function transitionText() {
  const currentWrapper = typewriterEl.querySelector("span");

  // Fade out existing text
  if (currentWrapper) {
    await animate(
      currentWrapper,
      { opacity: 0 },
      {
        duration: CONFIG.textFadeOutDuration,
        ease: "ease-in-out",
      },
    ).finished;
  }

  currentIndex = (currentIndex + 1) % textArray.length;

  renderText(textArray[currentIndex]);
}

renderText(textArray[0]);
setInterval(transitionText, CONFIG.delayBetween);
