import { animate, stagger } from "motion";

let open = false;
const DEFAULT_OFFSET_Y = 20;

const trigger = document.getElementById("notch-nav-trigger");
const content = document.getElementById("notch-nav-content");
const items = document.querySelectorAll("#notch-nav-item");

const getOffsetY = () => {
  const attr = content.getAttribute("data-offset-y");

  if (attr === null || attr === "") {
    return DEFAULT_OFFSET_Y;
  }

  const value = Number(attr);
  return Number.isFinite(value) ? value : DEFAULT_OFFSET_Y;
};

const offsetY = getOffsetY();

if (!trigger.dataset.enhanced) {
  trigger.innerHTML = `
    <svg
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
    >
      <path class="line top" />
      <path class="line middle" />
      <path class="line bottom" />
    </svg>
  `;
  trigger.dataset.enhanced = "true";
}

const paths = {
  top: trigger.querySelector(".top"),
  middle: trigger.querySelector(".middle"),
  bottom: trigger.querySelector(".bottom"),
};

const CLOSED = {
  top: "M 2 2.5 L 20 2.5",
  middle: "M 2 9.423 L 20 9.423",
  bottom: "M 2 16.346 L 20 16.346",
};

const OPEN = {
  top: "M 3 16.5 L 17 2.5",
  middle: "",
  bottom: "M 3 2.5 L 17 16.346",
};

paths.top.setAttribute("d", CLOSED.top);
paths.middle.setAttribute("d", CLOSED.middle);
paths.bottom.setAttribute("d", CLOSED.bottom);

const animateTriggerOpen = () => {
  animate(
    paths.top,
    { d: OPEN.top },
    { duration: 0.25, easing: "ease-in-out" },
  );
  animate(
    paths.bottom,
    { d: OPEN.bottom },
    { duration: 0.25, easing: "ease-in-out" },
  );
  animate(paths.middle, { opacity: 0 }, { duration: 0.1 });
};

const animateTriggerClose = () => {
  animate(
    paths.top,
    { d: CLOSED.top },
    { duration: 0.25, easing: "ease-in-out" },
  );
  animate(
    paths.bottom,
    { d: CLOSED.bottom },
    { duration: 0.25, easing: "ease-in-out" },
  );
  animate(paths.middle, { opacity: 1 }, { duration: 0.1, delay: 0.15 });
};

const getContentHeight = () => content.getBoundingClientRect().height;

const openNav = () => {
  open = true;

  const height = getContentHeight();

  // Move trigger
  animate(
    trigger,
    { y: height + offsetY },
    {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.9,
      delay: 0.2,
    },
  );

  // Content slide in
  animate(
    content,
    { y: offsetY },
    {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.9,
      delay: 0.2,
    },
  );

  // Stagger items in
  animate(
    items,
    { opacity: [0, 1], y: [20, 0] },
    {
      delay: stagger(0.1, { startDelay: 0.3 }),
      duration: 0.3,
      easing: "ease-out",
    },
  );
};

const closeNav = () => {
  open = false;

  // Move trigger back
  animate(
    trigger,
    { y: 0 },
    {
      type: "spring",
      stiffness: 300,
      damping: 20,
      mass: 0.9,
      delay: 0.2,
    },
  );

  // Stagger items out (reverse)
  animate(
    items,
    { opacity: [1, 0], y: [0, 20] },
    {
      delay: stagger(0.05, { from: "last" }),
      duration: 0.2,
      easing: "ease-in",
    },
  );

  // Content slide out
  animate(
    content,
    { y: "-100%" },
    {
      duration: 0.25,
      easing: "ease-in",
      delay: 0.2,
    },
  );
};

trigger.addEventListener("click", () => {
  if (open) {
    closeNav();
    animateTriggerClose();
  } else {
    openNav();
    animateTriggerOpen();
  }
});

items.forEach((item) => {
  // Prevent double-init
  if (item.dataset.enhanced) return;

  const text = item.textContent.trim();
  item.textContent = "";

  const primary = document.createElement("span");
  primary.className = "item-label primary";
  primary.textContent = text;

  const secondary = document.createElement("span");
  secondary.className = "item-label secondary";
  secondary.textContent = text;

  item.append(primary, secondary);
  item.dataset.enhanced = "true";
});
