import { animate, stagger } from "motion";

document.querySelectorAll(".letter-swap").forEach((element) => {
  const text = element.getAttribute("data-text");
  const reverse = element.hasAttribute("data-reverse");
  const staggerDuration = element.getAttribute("data-stagger-duration") || 0.02;

  const validStaggerFrom = ["first", "last", "center"];
  const rawStaggerFrom = element.getAttribute("data-stagger-from");
  if (rawStaggerFrom && !validStaggerFrom.includes(rawStaggerFrom)) {
    console.error(
      `Invalid data-stagger-from value: "${rawStaggerFrom}". Expected one of: ${validStaggerFrom.join(", ")}. Falling back to "first".`,
    );
  }
  const staggerFrom = validStaggerFrom.includes(rawStaggerFrom)
    ? rawStaggerFrom
    : "first";

  element.innerHTML = "";

  const letters = [];

  text.split("").forEach((char) => {
    const wrapper = document.createElement("span");
    wrapper.className = "letter-wrapper";

    const primary = document.createElement("span");
    primary.className = "letter-primary";
    primary.textContent = char;

    const secondary = document.createElement("span");
    secondary.className = "letter-secondary";
    secondary.textContent = char;
    secondary.style.top = reverse ? "-100%" : "100%";

    wrapper.appendChild(primary);
    wrapper.appendChild(secondary);
    element.appendChild(wrapper);

    letters.push({ primary, secondary });
  });

  let isHovered = false;

  const primaryEls = letters.map((l) => l.primary);
  const secondaryEls = letters.map((l) => l.secondary);

  const hoverStart = () => {
    if (isHovered) return;
    isHovered = true;

    animate(
      primaryEls,
      { y: reverse ? "100%" : "-100%" },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      },
    );

    animate(
      secondaryEls,
      { top: "0%" },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      },
    );
  };

  const hoverEnd = () => {
    if (!isHovered) return;
    isHovered = false;

    animate(
      primaryEls,
      { y: 0 },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      },
    );

    animate(
      secondaryEls,
      { top: reverse ? "-100%" : "100%" },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      },
    );
  };

  element.addEventListener("mouseenter", hoverStart);
  element.addEventListener("mouseleave", hoverEnd);
});
