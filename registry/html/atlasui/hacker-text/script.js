document.addEventListener("DOMContentLoaded", () => {
  const textElements = document.querySelectorAll(".hacker-text");
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let interval = null;
  let timeout = null;

  const scrambleText = (target) => {
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      if (!target.dataset.value) return;

      target.innerText = target.innerText
        .split("")
        .map((letter, index) => {
          if (index < iteration) {
            return target.dataset.value[index];
          }
          return letters[Math.floor(Math.random() * 26)];
        })
        .join("");

      if (iteration >= target.dataset.value.length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, 30);
  };

  const applyEffect = () => {
    if (window.matchMedia("(min-width: 768px)").matches) {
      textElements.forEach((textElement) => {
        textElement.addEventListener("mouseover", (event) => {
          const target = event.target;
          scrambleText(target);
        });
      });
    }
    // Run effect on page load after 600ms for all devices
    timeout = setTimeout(() => {
      textElements.forEach((textElement) => {
        scrambleText(textElement);
      });
    }, 600);
  };

  applyEffect();

  window.addEventListener("beforeunload", () => {
    if (interval) clearInterval(interval);
    if (timeout) clearTimeout(timeout);
  });
});
