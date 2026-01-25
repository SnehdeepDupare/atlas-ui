import { animate as motionAnimate } from "motion";

const modal = document.getElementById("modal");
const modalImages = document.getElementById("modal-images");
const cursor = document.getElementById("cursor");
const cursorLabel = document.getElementById("cursor-label");

const galleryItems = document.querySelectorAll(".gallery-item");

let activeIndex = 0;
let isModalVisible = false;

// Track mouse position
let mouseX = 0;
let mouseY = 0;

// Animation settings for smooth following
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

function isMobile() {
  return window.innerWidth <= 768;
}

// Animation loop for smooth following
function updatePositions() {
  if (isModalVisible) {
    // Calculate centered positions
    const modalWidth = modal.offsetWidth;
    const modalHeight = modal.offsetHeight;
    const cursorWidth = cursor.offsetWidth;
    const cursorHeight = cursor.offsetHeight;

    // Center the elements on the mouse cursor
    const modalLeft = mouseX - modalWidth / 2;
    const modalTop = mouseY - modalHeight / 2;
    const cursorLeft = mouseX - cursorWidth / 2;
    const cursorTop = mouseY - cursorHeight / 2;

    // Animate modal with built-in animate function
    modal.animate(
      [
        { left: modal.offsetLeft + "px", top: modal.offsetTop + "px" },
        { left: modalLeft + "px", top: modalTop + "px" },
      ],
      modalAnimationOptions
    );

    // Update the actual position after animation
    modal.style.left = modalLeft + "px";
    modal.style.top = modalTop + "px";

    // Animate cursor with built-in animate function
    cursor.animate(
      [
        { left: cursor.offsetLeft + "px", top: cursor.offsetTop + "px" },
        { left: cursorLeft + "px", top: cursorTop + "px" },
      ],
      cursorAnimationOptions
    );

    // Update the actual position after animation
    cursor.style.left = cursorLeft + "px";
    cursor.style.top = cursorTop + "px";

    // Animate cursor label with built-in animate function
    cursorLabel.animate(
      [
        {
          left: cursorLabel.offsetLeft + "px",
          top: cursorLabel.offsetTop + "px",
        },
        { left: cursorLeft + "px", top: cursorTop + "px" },
      ],
      cursorAnimationOptions
    );

    // Update the actual position after animation
    cursorLabel.style.left = cursorLeft + "px";
    cursorLabel.style.top = cursorTop + "px";
  }

  // Continue animation loop
  requestAnimationFrame(updatePositions);
}

function handleMouseMove(e) {
  const { clientX, clientY } = e;

  // Update mouse position
  mouseX = clientX;
  mouseY = clientY;
}

function showModal(index) {
  if (isMobile()) return;

  // Validate index
  if (index < 0 || index >= galleryItems.length) {
    console.error(`Invalid project index: ${index}`);
    return;
  }

  activeIndex = index;
  modalImages.style.top = `-${index * 100}%`;
  isModalVisible = true;

  // Animate modal and cursors to open using Motion
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

  // Animate modal and cursors to close using Motion
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

// Add event listeners to gallery items
galleryItems.forEach((item) => {
  const index = parseInt(item.getAttribute("data-index"), 10);

  // Validate that the index is a number
  if (isNaN(index)) {
    console.error("Invalid data-index attribute:", item);
    return;
  }

  item.addEventListener("mouseenter", (e) => {
    // Prevent default link behavior on hover
    e.preventDefault();
    showModal(index);
  });

  item.addEventListener("mouseleave", hideModal);
});

// Add mousemove event listener to track mouse position
window.addEventListener("mousemove", handleMouseMove);

// Start the animation loop
updatePositions();
