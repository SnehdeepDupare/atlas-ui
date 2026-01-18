import { animate } from "motion";

const navbar = document.getElementById("morph-navbar-container");
const items = Array.from(document.querySelectorAll(".morph-navbar-item"));

const activePill = document.createElement("span");
activePill.className = "active-pill";

const hoverPill = document.createElement("span");
hoverPill.className = "hover-pill";

navbar.appendChild(activePill);
navbar.appendChild(hoverPill);

const PADDING_OFFSET = 4;

function getRelativeRect(el) {
  const elRect = el.getBoundingClientRect();
  const containerRect = navbar.getBoundingClientRect();

  return {
    left: elRect.left - containerRect.left,
    width: elRect.width,
  };
}

function normalizeHref(href) {
  try {
    const url = new URL(href, window.location.origin);
    return url.pathname + url.hash;
  } catch {
    return href;
  }
}

function getActiveItemFromURL() {
  const current = window.location.pathname + window.location.hash;

  return items.find((item) => {
    const itemHref = normalizeHref(item.getAttribute("href"));
    return current === itemHref || window.location.hash === itemHref;
  });
}

function moveActivePill(el, immediate = false) {
  if (!el) return;

  const { left, width } = getRelativeRect(el);

  el.classList.add("is-active");
  items.forEach((i) => i !== el && i.classList.remove("is-active"));

  animate(
    activePill,
    { left: `${left}px`, width: `${width}px` },
    immediate
      ? { duration: 0 }
      : { type: "spring", stiffness: 400, damping: 33 },
  );
}

function moveHoverPill(el) {
  const { left, width } = getRelativeRect(el);

  animate(
    hoverPill,
    { left: `${left}px`, width: `${width}px` },
    { type: "spring", stiffness: 400, damping: 33 },
  );
}

function resetHoverPill() {
  animate(
    hoverPill,
    {
      left: `${PADDING_OFFSET}px`,
      width: `calc(100% - ${PADDING_OFFSET * 2}px)`,
    },
    { type: "spring", stiffness: 400, damping: 33 },
  );
}

items.forEach((item) => {
  item.addEventListener("mouseenter", () => moveHoverPill(item));

  item.addEventListener("mouseleave", resetHoverPill);

  item.addEventListener("click", () => {
    moveActivePill(item);
  });
});

window.addEventListener("load", () => {
  const activeItem = getActiveItemFromURL();

  if (activeItem) {
    moveActivePill(activeItem, true);
  } else if (items[0]) {
    moveActivePill(items[0], true);
  }

  resetHoverPill();
});
