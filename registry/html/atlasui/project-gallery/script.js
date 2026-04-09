import { animate as motionAnimate } from "motion";

const gallery = document.getElementById("project-gallery");
const galleryItems = gallery.querySelectorAll(".gallery-item");

function createInteractiveElements() {
  // Create Modal
  const section = document.createElement("section");
  section.id = "interactive-modal";
  section.className = "interactive-modal";

  const modal = document.createElement("div");
  modal.className = "modal";
  modal.id = "modal";

  const modalImages = document.createElement("div");
  modalImages.className = "modal-images";
  modalImages.id = "modal-images";

  galleryItems.forEach((item) => {
    const container = item.querySelector(".project-image-container");
    const img = container.querySelector("img");

    const modalImageDiv = document.createElement("div");
    modalImageDiv.className = "modal-image";
    modalImageDiv.style.backgroundColor = container.style.backgroundColor || "";

    const modalImg = document.createElement("img");
    modalImg.src = img.src;
    modalImg.alt = img.alt;

    modalImageDiv.appendChild(modalImg);
    modalImages.appendChild(modalImageDiv);
  });

  modal.appendChild(modalImages);
  section.appendChild(modal);

  // Create Cursor
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.id = "cursor";

  const cursorLabel = document.createElement("div");
  cursorLabel.className = "cursor-label";
  cursorLabel.id = "cursor-label";
  cursorLabel.textContent = "View";

  section.appendChild(cursor);
  section.appendChild(cursorLabel);

  // Insert after the gallery section
  gallery.after(section);

  return { modal, modalImages, cursor, cursorLabel };
}

const { modal, modalImages, cursor, cursorLabel } = createInteractiveElements();

// State
let activeIndex = 0;
let isModalVisible = false;
let mouseX = 0;
let mouseY = 0;

// Animation options
const modalAnimationOptions = {
  duration: 300,
  easing: "ease-out",
  fill: "forwards",
};

const cursorAnimationOptions = {
  duration: 150,
  easing: "ease-out",
  fill: "forwards",
};

// Helpers
function isMobile() {
  return window.innerWidth <= 768;
}

// Animation loop for smooth following
function updatePositions() {
  if (isModalVisible) {
    const modalWidth = modal.offsetWidth;
    const modalHeight = modal.offsetHeight;
    const cursorWidth = cursor.offsetWidth;
    const cursorHeight = cursor.offsetHeight;

    const modalLeft = mouseX - modalWidth / 2;
    const modalTop = mouseY - modalHeight / 2;
    const cursorLeft = mouseX - cursorWidth / 2;
    const cursorTop = mouseY - cursorHeight / 2;

    modal.animate(
      [
        { left: modal.offsetLeft + "px", top: modal.offsetTop + "px" },
        { left: modalLeft + "px", top: modalTop + "px" },
      ],
      modalAnimationOptions,
    );

    modal.style.left = modalLeft + "px";
    modal.style.top = modalTop + "px";

    cursor.animate(
      [
        { left: cursor.offsetLeft + "px", top: cursor.offsetTop + "px" },
        { left: cursorLeft + "px", top: cursorTop + "px" },
      ],
      cursorAnimationOptions,
    );

    cursor.style.left = cursorLeft + "px";
    cursor.style.top = cursorTop + "px";

    cursorLabel.animate(
      [
        {
          left: cursorLabel.offsetLeft + "px",
          top: cursorLabel.offsetTop + "px",
        },
        { left: cursorLeft + "px", top: cursorTop + "px" },
      ],
      cursorAnimationOptions,
    );

    cursorLabel.style.left = cursorLeft + "px";
    cursorLabel.style.top = cursorTop + "px";
  }

  requestAnimationFrame(updatePositions);
}

// Mouse tracking
function handleMouseMove(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

// Modal show / hide
function showModal(index) {
  if (isMobile()) return;

  if (index < 0 || index >= galleryItems.length) {
    console.error(`Invalid project index: ${index}`);
    return;
  }

  activeIndex = index;
  modalImages.style.top = `-${index * 100}%`;
  isModalVisible = true;

  motionAnimate(modal, {
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  });

  motionAnimate(cursor, {
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  });

  motionAnimate(cursorLabel, {
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.76, 0, 0.24, 1],
    },
  });
}

function hideModal() {
  if (isMobile()) return;

  isModalVisible = false;

  motionAnimate(modal, {
    scale: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0, 0.67, 0],
    },
  });

  motionAnimate(cursor, {
    scale: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0, 0.67, 0],
    },
  });

  motionAnimate(cursorLabel, {
    scale: 0,
    transition: {
      duration: 0.4,
      ease: [0.32, 0, 0.67, 0],
    },
  });
}

// Event listeners
galleryItems.forEach((item, index) => {
  item.addEventListener("mouseenter", (e) => {
    e.preventDefault();
    showModal(index);
  });

  item.addEventListener("mouseleave", hideModal);
});

window.addEventListener("mousemove", handleMouseMove);

// Start the animation loop
updatePositions();
