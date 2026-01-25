const trailer = document.getElementById("trailer");
const heroText = document.getElementById("heroText");

let isHovered = false;

document.addEventListener("mousemove", (e) => {
  const { clientX, clientY } = e;
  const size = isHovered ? 300 : 30;

  trailer.animate(
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 500, fill: "forwards" }
  );

  trailer.style.height = `${size}px`;
  trailer.style.width = `${size}px`;
  trailer.style.filter = `blur(${isHovered ? 30 : 0}px)`;
});

heroText.addEventListener("mouseenter", () => (isHovered = true));
heroText.addEventListener("mouseleave", () => (isHovered = false));
