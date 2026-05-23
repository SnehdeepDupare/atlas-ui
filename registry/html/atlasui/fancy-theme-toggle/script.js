import { createIcons, Sparkle, Cloud } from "lucide";
import { animate } from "motion";

const themeToggle = document.getElementById("theme-toggle");
const thumb = document.createElement("div");
thumb.id = "thumb";
themeToggle.appendChild(thumb);

const savedTheme = localStorage.getItem("theme");
let currentTheme;

if (savedTheme) {
  currentTheme = savedTheme;
} else {
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  currentTheme = systemDark ? "dark" : "light";
}

document.documentElement.setAttribute("data-theme", currentTheme);
themeToggle.setAttribute("data-theme", currentTheme);

const stars = document.createElement("div");
stars.id = "stars";
themeToggle.appendChild(stars);

for (let i = 0; i < 7; i++) {
  const star = document.createElement("i");
  star.dataset.lucide = "sparkle";
  star.classList.add("star");
  stars.appendChild(star);
}

const clouds = document.createElement("div");
clouds.id = "clouds";
themeToggle.appendChild(clouds);

for (let i = 0; i < 6; i++) {
  const cloud = document.createElement("i");
  cloud.dataset.lucide = "cloud";
  cloud.classList.add("cloud");
  clouds.appendChild(cloud);
}

createIcons({
  icons: {
    Sparkle,
    Cloud,
  },
});

const DURATION = 0.2;
const EASE = "easeOut";

const SPRING = {
  type: "spring",
  stiffness: 420,
  damping: 32,
  mass: 0.6,
};

function getTravelDistance() {
  const toggleStyles = getComputedStyle(themeToggle);
  const paddingLeft = parseFloat(toggleStyles.paddingLeft);
  const paddingRight = parseFloat(toggleStyles.paddingRight);
  const innerWidth = themeToggle.clientWidth - paddingLeft - paddingRight;
  return innerWidth - thumb.offsetWidth;
}

const initialTravel = getTravelDistance();
stars.style.transform = "translateY(-100%)";
clouds.style.transform = "translateY(100%)";

if (currentTheme === "dark") {
  thumb.style.transform = `translateX(${initialTravel}px)`;
  animate(stars, { y: ["-100%", 0] }, { duration: DURATION, ease: EASE });
} else {
  thumb.style.transform = "translateX(0px)";
  animate(clouds, { y: ["100%", 0] }, { duration: DURATION, ease: EASE });
}

themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const next = current === "light" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", next);
  themeToggle.setAttribute("data-theme", next);
  localStorage.setItem("theme", next);

  const thumbTravel = getTravelDistance();

  if (next === "dark") {
    animate(thumb, { x: [0, thumbTravel] }, SPRING);
    animate(clouds, { y: [0, "100%"] }, { duration: DURATION, ease: EASE });
    animate(stars, { y: ["-100%", 0] }, { duration: DURATION, ease: EASE });
  } else {
    animate(thumb, { x: [thumbTravel, 0] }, SPRING);
    animate(stars, { y: [0, "-100%"] }, { duration: DURATION, ease: EASE });
    animate(clouds, { y: ["100%", 0] }, { duration: DURATION, ease: EASE });
  }
});
