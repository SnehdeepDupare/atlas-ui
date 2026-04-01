import * as THREE from "three";

const slides = [
  {
    name: "Orion",
    img: "https://images.unsplash.com/photo-1773311583232-0a5765cf08ac?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Aries",
    img: "https://images.unsplash.com/photo-1773530615360-eb180ed88622?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Taurus",
    img: "https://images.unsplash.com/photo-1773011389556-2bf0474cefd9?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Gemini",
    img: "https://images.unsplash.com/photo-1771030668418-390b3edf33e4?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Cancer",
    img: "https://images.unsplash.com/photo-1772289935218-78954128824a?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Leo",
    img: "https://images.unsplash.com/photo-1770988966858-da0a4bde2f0b?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Virgo",
    img: "https://images.unsplash.com/photo-1771308457683-eef03842c1ed?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Libra",
    img: "https://images.unsplash.com/photo-1770341989953-f3efb336f7eb?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Scorpio",
    img: "https://images.unsplash.com/photo-1595660981167-fe72e31f6a40?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Sagittarius",
    img: "https://images.unsplash.com/photo-1709570597799-7d94d430a2bc?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const config = {
  orientation: "horizontal",
  minHeight: 1,
  maxHeight: 1.5,
  aspectRatio: 1.5,
  gap: 0.05,
  smoothing: 0.05,
  distortionStrength: 2.5,
  distortionSmoothing: 0.1,
  momentumFriction: 0.95,
  momentumThreshold: 0.001,
  wheelSpeed: 0.01,
  wheelMax: 150,
  dragSpeed: 0.01,
  dragMomentum: 0.01,
  touchSpeed: 0.01,
  touchMomentum: 0.1,
};

const sliderSection = document.querySelector("section.slider");

const canvas = document.createElement("canvas");
sliderSection?.appendChild(canvas);

const titleElement = document.querySelector("p#slide-title");
const counterElement = document.querySelector("p#slide-count");

const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  preserveDrawingBuffer: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x141414);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.z = 5;

const wrap = (value, range) => ((value % range) + range) % range;

const zeroPad = (n) => String(n).padStart(2, "0");

const totalSlides = slides.length;

if (!["vertical", "horizontal"].includes(config.orientation)) {
  console.error(
    `Invalid orientation "${config.orientation}". Accepts only: vertical | horizontal. Defaulting to "vertical".`
  );
  config.orientation = "vertical";
}

const isHorizontal = config.orientation === "horizontal";
const directionSign = 1;

const slideHeights = Array.from(
  { length: totalSlides },
  () => config.minHeight + Math.random() * (config.maxHeight - config.minHeight)
);

const slideSizes = isHorizontal
  ? slideHeights.map((h) => h * config.aspectRatio)
  : slideHeights;

const slideOffsets = [];
let stackPosition = 0;

for (let i = 0; i < totalSlides; i++) {
  if (i === 0) {
    slideOffsets.push(0);
    stackPosition = slideSizes[0] / 2;
  } else {
    stackPosition += config.gap + slideSizes[i] / 2;
    slideOffsets.push(stackPosition);
    stackPosition += slideSizes[i] / 2;
  }
}

const loopLength = stackPosition + config.gap + slideSizes[0] / 2;
const halfLoop = loopLength / 2;

const meshes = [];
const textureLoader = new THREE.TextureLoader();

for (let i = 0; i < totalSlides; i++) {
  const height = slideHeights[i];
  const width = height * config.aspectRatio;

  const geometry = new THREE.PlaneGeometry(width, height, 32, 16);
  const material = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0x999999,
  });
  const mesh = new THREE.Mesh(geometry, material);

  mesh.userData = {
    originalVertices: [...geometry.attributes.position.array],
    offset: slideOffsets[i],
    name: slides[i].name,
    index: i,
  };

  textureLoader.load(slides[i].img, (texture) => {
    texture.colorSpace = THREE.SRGBColorSpace;
    material.map = texture;
    material.color.set(0xffffff);
    material.needsUpdate = true;

    const imageAspect = texture.image.width / texture.image.height;
    const planeAspect = width / height;
    const ratio = imageAspect / planeAspect;

    if (ratio > 1) {
      mesh.scale.y = 1 / ratio;
    } else {
      mesh.scale.x = ratio;
    }
  });

  scene.add(mesh);
  meshes.push(mesh);
}

function applyDistortion(mesh, positionOnAxis, strength) {
  const positions = mesh.geometry.attributes.position;
  const original = mesh.userData.originalVertices;
  const falloffRadius = isHorizontal ? 3.5 : 2;

  for (let i = 0; i < positions.count; i++) {
    const x = original[i * 3];
    const y = original[i * 3 + 1];

    const distance = isHorizontal
      ? Math.sqrt((positionOnAxis + x) ** 2 + y * y)
      : Math.sqrt(x * x + (positionOnAxis + y) ** 2);

    const falloff = Math.max(0, 1 - distance / falloffRadius);

    const bend = Math.pow(Math.sin((falloff * Math.PI) / 2), 1.5);
    positions.setZ(i, bend * strength);
  }

  positions.needsUpdate = true;
  mesh.geometry.computeVertexNormals();
}

let scrollPosition = 0;
let scrollTarget = 0;
let scrollMomentum = 0;
let isScrolling = false;
let lastFrameTime = 0;

let distortionAmount = 0;
let distortionTarget = 0;
let velocityPeak = 0;
let scrollDirection = 0;
let directionTarget = 0;
const velocityHistory = [0, 0, 0, 0, 0];

let isDragging = false;
let dragStart = 0;
let dragDelta = 0;
let touchStart = 0;
let touchLast = 0;

let activeSlideIndex = -1;

const addDistortionBurst = (amount) => {
  distortionTarget = Math.min(1, distortionTarget + amount);
};

window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();

    const rawDelta = isHorizontal ? e.deltaX || e.deltaY : e.deltaY;
    const clampedDelta =
      Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), config.wheelMax);

    addDistortionBurst(Math.abs(clampedDelta) * 0.001);
    scrollTarget += clampedDelta * config.wheelSpeed * directionSign;
    isScrolling = true;

    clearTimeout(window._scrollTimeout);
    window._scrollTimeout = setTimeout(() => (isScrolling = false), 150);
  },
  { passive: false }
);

window.addEventListener(
  "touchstart",
  (e) => {
    const pos = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
    touchStart = touchLast = pos;
    isScrolling = true;
    scrollMomentum = 0;
  },
  { passive: false }
);

window.addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();

    const current = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
    const delta = current - touchLast;
    touchLast = current;

    addDistortionBurst(Math.abs(delta) * 0.02);
    scrollTarget -= delta * config.touchSpeed * directionSign;
    isScrolling = true;
  },
  { passive: false }
);

window.addEventListener("touchend", () => {
  const swipeVelocity = (touchLast - touchStart) * 0.005;

  if (Math.abs(swipeVelocity) > 0.5) {
    scrollMomentum = -swipeVelocity * config.touchMomentum * directionSign;
    addDistortionBurst(Math.abs(swipeVelocity) * 0.45);
    isScrolling = true;
    setTimeout(() => (isScrolling = false), 800);
  }
});

canvas.style.cursor = "grab";

window.addEventListener("mousedown", (e) => {
  isDragging = true;
  dragStart = isHorizontal ? e.clientX : e.clientY;
  dragDelta = 0;
  scrollMomentum = 0;
  canvas.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const current = isHorizontal ? e.clientX : e.clientY;
  const delta = current - dragStart;
  dragStart = current;
  dragDelta = delta;

  addDistortionBurst(Math.abs(delta) * 0.02);
  scrollTarget -= delta * config.dragSpeed * directionSign;
  isScrolling = true;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;

  isDragging = false;
  canvas.style.cursor = "grab";

  if (Math.abs(dragDelta) > 2) {
    scrollMomentum = -dragDelta * config.dragMomentum * directionSign;
    addDistortionBurst(Math.abs(dragDelta) * 0.005);
    isScrolling = true;
    setTimeout(() => (isScrolling = false), 800);
  }
});

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate(time) {
  requestAnimationFrame(animate);

  const deltaTime = lastFrameTime ? (time - lastFrameTime) / 1000 : 0.016;
  lastFrameTime = time;

  const previousScroll = scrollPosition;

  if (isScrolling) {
    scrollTarget += scrollMomentum;
    scrollMomentum *= config.momentumFriction;

    if (Math.abs(scrollMomentum) < config.momentumThreshold) {
      scrollMomentum = 0;
    }
  }

  scrollPosition += (scrollTarget - scrollPosition) * config.smoothing;

  const frameDelta = scrollPosition - previousScroll;

  if (Math.abs(frameDelta) > 0.00001) {
    directionTarget = frameDelta > 0 ? 1 : -1;
  }
  scrollDirection += (directionTarget - scrollDirection) * 0.08;

  const velocity = Math.abs(frameDelta) / deltaTime;

  velocityHistory.push(velocity);
  velocityHistory.shift();

  const averageVelocity =
    velocityHistory.reduce((a, b) => a + b) / velocityHistory.length;

  if (averageVelocity > velocityPeak) {
    velocityPeak = averageVelocity;
  }

  const isDecelerating =
    averageVelocity / (velocityPeak + 0.001) < 0.7 && velocityPeak > 0.5;

  if (velocity > 0.05) {
    distortionTarget = Math.max(
      distortionTarget,
      Math.min(1, velocityPeak * 0.1)
    );
  }

  if (isDecelerating || averageVelocity < 0.2) {
    distortionTarget *= isDecelerating ? 0.95 : 0.855;
  }

  distortionAmount +=
    (distortionTarget - distortionAmount) * config.distortionSmoothing;

  const signedDistortion = distortionAmount * scrollDirection;

  let closestDistance = Infinity;
  let closestIndex = 0;

  meshes.forEach((mesh) => {
    const { offset } = mesh.userData;

    let pos = -(offset - wrap(scrollPosition, loopLength));
    pos = wrap(pos + halfLoop, loopLength) - halfLoop;
    if (isHorizontal) pos = -pos;

    if (isHorizontal) {
      mesh.position.x = pos;
      mesh.position.y = 0;
    } else {
      mesh.position.y = pos;
      mesh.position.x = 0;
    }

    if (Math.abs(pos) < closestDistance) {
      closestDistance = Math.abs(pos);
      closestIndex = mesh.userData.index;
    }

    if (Math.abs(pos) < halfLoop + config.maxHeight) {
      applyDistortion(mesh, pos, config.distortionStrength * signedDistortion);
    }
  });

  if (closestIndex !== activeSlideIndex) {
    activeSlideIndex = closestIndex;
    titleElement.textContent = slides[activeSlideIndex].name;
    counterElement.textContent = `${zeroPad(activeSlideIndex + 1)}/${zeroPad(totalSlides)}`;
  }

  renderer.render(scene, camera);
}

animate();
