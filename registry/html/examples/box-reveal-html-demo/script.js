import { animate, inView } from "motion";

document.querySelectorAll("#box-reveal").forEach((root) => {
  const side = root.dataset.side ?? "left";
  const color = root.dataset.color ?? "#FACC15";
  const width = root.dataset.width ?? "fit-content";

  if (width === "full") {
    root.style.width = "100%";
  } else {
    root.style.width = "fit-content";
  }

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "box-reveal-content";

  while (root.firstChild) {
    contentWrapper.appendChild(root.firstChild);
  }

  root.appendChild(contentWrapper);

  // overlay
  const overlay = document.createElement("div");
  overlay.className = "box-reveal-overlay";
  overlay.style.background = color;

  root.appendChild(overlay);

  // initial
  animate(
    contentWrapper,
    { opacity: 0, y: 75 },
    { duration: 0 }
  );

  if (side === "right") {
    animate(overlay, { right: 0 }, { duration: 0 });
  } else {
    animate(overlay, { left: 0 }, { duration: 0 });
  }

  
  inView(
    root,
    () => {
      // content animation
      animate(
        contentWrapper,
        { opacity: 1, y: 0 },
        {
          duration: 0.5,
          delay: 0.35,
        }
      );

      // overlay animation
      animate(
        overlay,
        side === "right"
          ? { right: "100%" }
          : { left: "100%" },
        {
          duration: 0.5,
          ease: "easeIn",
        }
      );
    },
    { once: true }
  );
});