import { animate, cubicBezier, inView, stagger } from "motion";

const REVEAL_EASE = cubicBezier(0.165, 0.84, 0.44, 1);
const SCROLL_MARGIN = "0px 0px -25% 0px";
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const splitIntoLines = (element, reduceMotion) => {
  const text = (element.textContent ?? "").trim();

  if (!text) {
    element.textContent = "";
    return [];
  }

  const words = text.split(/\s+/).filter(Boolean);
  const fragment = document.createDocumentFragment();
  const wordSpans = [];

  for (let index = 0; index < words.length; index += 1) {
    const wordSpan = document.createElement("span");
    wordSpan.textContent = words[index];
    wordSpan.style.display = "inline-block";

    wordSpans.push(wordSpan);
    fragment.appendChild(wordSpan);

    if (index < words.length - 1) {
      fragment.appendChild(document.createTextNode(" "));
    }
  }

  element.textContent = "";
  element.appendChild(fragment);

  const linesText = [];
  let currentTop = null;
  let currentWords = [];

  wordSpans.forEach((span) => {
    const top = span.offsetTop;
    const value = span.textContent ?? "";

    if (currentTop === null) {
      currentTop = top;
      currentWords.push(value);
      return;
    }

    if (top !== currentTop) {
      linesText.push(currentWords.join(" "));
      currentWords = [value];
      currentTop = top;
      return;
    }

    currentWords.push(value);
  });

  if (currentWords.length > 0) {
    linesText.push(currentWords.join(" "));
  }

  element.textContent = "";

  const lines = [];

  linesText.forEach((lineText) => {
    const mask = document.createElement("span");
    mask.setAttribute("data-mask", "");

    const line = document.createElement("span");
    line.setAttribute("data-line", "");
    line.textContent = lineText;

    if (reduceMotion) {
      line.style.opacity = "0";
      line.style.willChange = "opacity";
    } else {
      line.style.transform = "translateY(100%)";
    }

    mask.appendChild(line);
    element.appendChild(mask);
    lines.push(line);
  });

  return lines;
};

const prepareElement = (element, reduceMotion) => {
  const lines = splitIntoLines(element, reduceMotion);
  const textIndent = window.getComputedStyle(element).textIndent;

  if (textIndent !== "0px" && lines.length > 0) {
    lines[0].style.paddingLeft = textIndent;
    element.style.textIndent = "0";
  }

  return lines;
};

const animateLines = (lines, startDelay, reduceMotion) => {
  if (lines.length === 0) {
    return;
  }

  return reduceMotion
    ? animate(
        lines,
        { opacity: [0, 1] },
        {
          duration: 0.28,
          delay: stagger(0.06, { startDelay }),
          ease: "easeOut",
        },
      )
    : animate(
        lines,
        { y: ["100%", "0%"] },
        {
          duration: 1,
          delay: stagger(0.1, { startDelay }),
          ease: REVEAL_EASE,
        },
      );
};

document.querySelectorAll("[data-cascade-text]").forEach((element) => {
  const delay = Number.parseFloat(element.dataset.delay ?? "0") || 0;
  const animateOnScroll = element.dataset.animateOnScroll !== "false";
  const reduceMotion = reduceMotionQuery.matches;
  const lines = prepareElement(element, reduceMotion);

  const run = () => animateLines(lines, delay, reduceMotion);

  if (!animateOnScroll) {
    run();
    return;
  }

  let stopInView;
  stopInView = inView(
    element,
    () => {
      run();
      stopInView?.();
    },
    { margin: SCROLL_MARGIN },
  );
});
