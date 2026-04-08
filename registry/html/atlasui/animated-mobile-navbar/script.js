import { animate, stagger } from "motion";

document.addEventListener("DOMContentLoaded", () => {
  const menuTrigger = document.getElementById("menu-trigger");
  const menuClose = document.getElementById("menu-close");
  const mobileMenu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const openMenu = () => {
    mobileMenu.classList.add("active");

    animate(
      mobileMenu,
      { transform: "translateY(0%)", opacity: 1 },
      { duration: 0.5, easing: [0.12, 0, 0.39, 0] }
    );

    animate(
      navLinks,
      { opacity: 1, transform: "translateY(0px)" },
      {
        delay: stagger(0.09, { start: 0.3 }),
        duration: 0.7,
        easing: [0, 0.55, 0.45, 1],
      }
    );
  };

  const closeMenu = () => {
    animate(
      navLinks,
      { opacity: 0, transform: "translateY(30px)" },
      {
        delay: stagger(0.09, { start: 0, from: "last" }),
        duration: 0.5,
        easing: [0.37, 0, 0.36, 1],
      }
    ).finished.then(() => {
      animate(
        mobileMenu,
        { transform: "translateY(-100%)", opacity: 0 },
        {
          duration: 0.5,
          easing: [0.22, 1, 0.36, 1],
        }
      ).finished.then(() => {
        mobileMenu.classList.remove("active");
      });
    });
  };

  menuTrigger.addEventListener("click", openMenu);
  menuClose.addEventListener("click", closeMenu);
});
