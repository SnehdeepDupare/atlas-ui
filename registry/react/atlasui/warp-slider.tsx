"use client";

import { useEffect, useMemo, useRef } from "react";

import * as THREE from "three";

interface WarpSliderProps {
  slides: {
    name: string;
    img: string;
  }[];
  config?: Partial<{
    orientation: "vertical" | "horizontal";
    minHeight: number;
    maxHeight: number;
    aspectRatio: number;
    gap: number;
    smoothing: number;
    distortionStrength: number;
    distortionSmoothing: number;
    momentumFriction: number;
    momentumThreshold: number;
    wheelSpeed: number;
    wheelMax: number;
    dragSpeed: number;
    dragMomentum: number;
    touchSpeed: number;
    touchMomentum: number;
  }>;
}

const labToHex = (css: string): string => {
  const values = css
    .replace(/lab|\(|\)/g, "")
    .split(/[ ,/]+/)
    .filter(Boolean);

  const [L, a, b] = values;

  const l = parseFloat(L.replace("%", "")) / 100;
  const A = parseFloat(a);
  const B = parseFloat(b);

  // LAB → XYZ
  const y = (l + 0.16) / 1.16;
  const x = A / 5 + y;
  const z = y - B / 2;

  const x3 = x ** 3;
  const y3 = y ** 3;
  const z3 = z ** 3;

  const X = 0.95047 * (x3 > 0.008856 ? x3 : (x - 16 / 116) / 7.787);
  const Y = 1.0 * (y3 > 0.008856 ? y3 : (y - 16 / 116) / 7.787);
  const Z = 1.08883 * (z3 > 0.008856 ? z3 : (z - 16 / 116) / 7.787);

  // XYZ → linear RGB
  let r = X * 3.2406 + Y * -1.5372 + Z * -0.4986;
  let g = X * -0.9689 + Y * 1.8758 + Z * 0.0415;
  let b_ = X * 0.0557 + Y * -0.204 + Z * 1.057;

  // linear → sRGB
  const toSRGB = (x: number) =>
    x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055;

  r = toSRGB(r);
  g = toSRGB(g);
  b_ = toSRGB(b_);

  // clamp
  r = Math.min(Math.max(r, 0), 1);
  g = Math.min(Math.max(g, 0), 1);
  b_ = Math.min(Math.max(b_, 0), 1);

  const toHex = (x: number) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b_)}`;
};

export const WarpSlider = ({
  slides,
  config: {
    orientation = "vertical",
    minHeight = 1,
    maxHeight = 1.5,
    aspectRatio = 1.5,
    gap = 0.05,
    smoothing = 0.05,
    distortionStrength = 2.5,
    distortionSmoothing = 0.1,
    momentumFriction = 0.95,
    momentumThreshold = 0.001,
    wheelSpeed = 0.01,
    wheelMax = 150,
    dragSpeed = 0.01,
    dragMomentum = 0.01,
    touchSpeed = 0.01,
    touchMomentum = 0.1,
  } = {},
}: WarpSliderProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const titleRef = useRef<HTMLParagraphElement | null>(null);
  const counterRef = useRef<HTMLParagraphElement | null>(null);

  const totalSlides = slides.length;

  const defaultCount = useMemo(() => {
    if (!totalSlides) {
      return "00/00";
    }
    const zeroPad = (n: number) => String(n).padStart(2, "0");
    return `${zeroPad(1)}/${zeroPad(totalSlides)}`;
  }, [totalSlides]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const titleElement = titleRef.current;
    const counterElement = counterRef.current;

    if (!canvas || !titleElement || !counterElement || slides.length === 0) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const getBackgroundColor = () => {
      const bgCssColor = getComputedStyle(document.body)
        .getPropertyValue("--color-background")
        .trim();
      return labToHex(bgCssColor);
    };

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(getBackgroundColor());

    const themeObserver = new MutationObserver(() => {
      scene.background = new THREE.Color(getBackgroundColor());
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "style", "data-theme"],
    });

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 5;

    const isHorizontal = orientation === "horizontal";

    const wrap = (value: number, range: number) =>
      ((value % range) + range) % range;
    const zeroPad = (n: number) => String(n).padStart(2, "0");

    const slideHeights = Array.from(
      { length: totalSlides },
      () => minHeight + Math.random() * (maxHeight - minHeight)
    );

    const slideSizes = isHorizontal
      ? slideHeights.map((h) => h * aspectRatio)
      : slideHeights;

    const slideOffsets: number[] = [];
    let stackPosition = 0;

    for (let i = 0; i < totalSlides; i += 1) {
      if (i === 0) {
        slideOffsets.push(0);
        stackPosition = slideSizes[0] / 2;
      } else {
        stackPosition += gap + slideSizes[i] / 2;
        slideOffsets.push(stackPosition);
        stackPosition += slideSizes[i] / 2;
      }
    }

    const loopLength = stackPosition + gap + slideSizes[0] / 2;
    const halfLoop = loopLength / 2;

    const directionSign = 1;

    type MeshWithData = THREE.Mesh<
      THREE.PlaneGeometry,
      THREE.MeshBasicMaterial
    > & {
      userData: {
        originalVertices: number[];
        offset: number;
        name: string;
        index: number;
      };
    };

    const meshes: MeshWithData[] = [];
    const textureLoader = new THREE.TextureLoader();

    for (let i = 0; i < totalSlides; i += 1) {
      const height = slideHeights[i];
      const width = height * aspectRatio;

      const geometry = new THREE.PlaneGeometry(width, height, 32, 16);
      const material = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
        color: 0x999999,
      });
      const mesh = new THREE.Mesh(geometry, material) as MeshWithData;

      mesh.userData = {
        originalVertices: Array.from(geometry.attributes.position.array),
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

    const applyDistortion = (
      mesh: MeshWithData,
      positionOnAxis: number,
      strength: number
    ) => {
      const positions = mesh.geometry.attributes.position;
      const original = mesh.userData.originalVertices;

      for (let i = 0; i < positions.count; i += 1) {
        const x = original[i * 3];
        const y = original[i * 3 + 1];

        const distance = isHorizontal
          ? Math.sqrt((positionOnAxis + x) ** 2 + y * y)
          : Math.sqrt(x * x + (positionOnAxis + y) ** 2);
        const falloffRadius = isHorizontal ? 3.5 : 2;
        const falloff = Math.max(0, 1 - distance / falloffRadius);
        const bend = Math.pow(Math.sin((falloff * Math.PI) / 2), 1.5);
        positions.setZ(i, bend * strength);
      }

      positions.needsUpdate = true;
      mesh.geometry.computeVertexNormals();
    };

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
    let animationFrame = 0;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    const addDistortionBurst = (amount: number) => {
      distortionTarget = Math.min(1, distortionTarget + amount);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rawDelta = isHorizontal
        ? e.deltaX !== 0
          ? e.deltaX
          : e.deltaY
        : e.deltaY;
      const clampedDelta =
        Math.sign(rawDelta) * Math.min(Math.abs(rawDelta), wheelMax);
      addDistortionBurst(Math.abs(clampedDelta) * 0.001);
      scrollTarget += clampedDelta * wheelSpeed * directionSign;
      isScrolling = true;

      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 150);
    };

    const handleTouchStart = (e: TouchEvent) => {
      const coord = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
      touchStart = coord;
      touchLast = coord;
      isScrolling = true;
      scrollMomentum = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();

      const coord = isHorizontal ? e.touches[0].clientX : e.touches[0].clientY;
      const delta = coord - touchLast;
      touchLast = coord;

      addDistortionBurst(Math.abs(delta) * 0.02);
      scrollTarget -= delta * touchSpeed * directionSign;
      isScrolling = true;
    };

    const handleTouchEnd = () => {
      const swipeVelocity = (touchLast - touchStart) * 0.005;

      if (Math.abs(swipeVelocity) > 0.5) {
        scrollMomentum = -swipeVelocity * touchMomentum * directionSign;
        addDistortionBurst(Math.abs(swipeVelocity) * 0.45);
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStart = isHorizontal ? e.clientX : e.clientY;
      dragDelta = 0;
      scrollMomentum = 0;
      canvas.style.cursor = "grabbing";
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) {
        return;
      }

      const coord = isHorizontal ? e.clientX : e.clientY;
      const delta = coord - dragStart;
      dragStart = coord;
      dragDelta = delta;

      addDistortionBurst(Math.abs(delta) * 0.02);
      scrollTarget -= delta * dragSpeed * directionSign;
      isScrolling = true;
    };

    const handleMouseUp = () => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      canvas.style.cursor = "grab";

      if (Math.abs(dragDelta) > 2) {
        scrollMomentum = -dragDelta * dragMomentum * directionSign;
        addDistortionBurst(Math.abs(dragDelta) * 0.005);
        isScrolling = true;
        setTimeout(() => {
          isScrolling = false;
        }, 800);
      }
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    canvas.style.cursor = "grab";

    canvas.addEventListener("wheel", handleWheel, { passive: false });
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
    canvas.addEventListener("touchend", handleTouchEnd);
    canvas.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    const animate = (time: number) => {
      animationFrame = window.requestAnimationFrame(animate);

      const deltaTime = lastFrameTime ? (time - lastFrameTime) / 1000 : 0.016;
      lastFrameTime = time;

      const previousScroll = scrollPosition;

      if (isScrolling) {
        scrollTarget += scrollMomentum;
        scrollMomentum *= momentumFriction;

        if (Math.abs(scrollMomentum) < momentumThreshold) {
          scrollMomentum = 0;
        }
      }

      scrollPosition += (scrollTarget - scrollPosition) * smoothing;

      const frameDelta = scrollPosition - previousScroll;

      if (Math.abs(frameDelta) > 0.00001) {
        directionTarget = frameDelta > 0 ? 1 : -1;
      }
      scrollDirection += (directionTarget - scrollDirection) * 0.08;

      const velocity = Math.abs(frameDelta) / deltaTime;

      velocityHistory.push(velocity);
      velocityHistory.shift();

      const averageVelocity =
        velocityHistory.reduce((acc, current) => acc + current, 0) /
        velocityHistory.length;

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
        (distortionTarget - distortionAmount) * distortionSmoothing;

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

        if (Math.abs(pos) < halfLoop + maxHeight) {
          applyDistortion(mesh, pos, distortionStrength * signedDistortion);
        }
      });

      if (closestIndex !== activeSlideIndex) {
        activeSlideIndex = closestIndex;
        titleElement.textContent = slides[activeSlideIndex].name;
        counterElement.textContent = `${zeroPad(activeSlideIndex + 1)}/${zeroPad(totalSlides)}`;
      }

      renderer.render(scene, camera);
    };

    animate(0);

    return () => {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }

      window.cancelAnimationFrame(animationFrame);
      canvas.removeEventListener("wheel", handleWheel);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
      canvas.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      meshes.forEach((mesh) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        if (mesh.material.map) {
          mesh.material.map.dispose();
        }
        mesh.material.dispose();
      });

      renderer.dispose();
      themeObserver.disconnect();
    };
  }, [
    aspectRatio,
    dragMomentum,
    dragSpeed,
    distortionSmoothing,
    distortionStrength,
    gap,
    maxHeight,
    minHeight,
    momentumFriction,
    momentumThreshold,
    orientation,
    slides,
    smoothing,
    totalSlides,
    touchMomentum,
    touchSpeed,
    wheelMax,
    wheelSpeed,
  ]);

  return (
    <section className="relative h-svh w-full overflow-hidden select-none">
      <div className="absolute top-1/2 left-0 z-2 flex w-full -translate-y-1/2 justify-between px-4">
        <p id="slide-title" ref={titleRef} className="text-xl font-medium">
          {slides[0]?.name ?? ""}
        </p>
        <p id="slide-count" ref={counterRef} className="text-xl font-medium">
          {defaultCount}
        </p>
      </div>

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-1/2 h-full w-full -translate-x-1/2 overflow-hidden"
      />
    </section>
  );
};
