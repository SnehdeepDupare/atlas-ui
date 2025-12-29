"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState, useMemo } from "react";

export const BlendMouseTrailer = ({ isHovered }: { isHovered: boolean }) => {
  const [isVisible, setIsVisible] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const smoothOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const size = useMemo(() => (isHovered ? 300 : 30), [isHovered]);

  const mouseMove = (e: MouseEvent) => {
    const { clientX, clientY } = e;

    mouse.x.set(clientX - size / 2);
    mouse.y.set(clientY - size / 2);
    setIsVisible(true);
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, [size]);

  return (
    <motion.div
      className={`${
        isVisible ? "hidden md:block" : "hidden"
      } rounded-full bg-sky-300 fixed top-0 left-0 pointer-events-none mix-blend-difference`}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
        height: size,
        width: size,
        filter: `blur(${isHovered ? 30 : 0}px)`,
        transition:
          "height 0.3s ease-out, width 0.3s ease-out, filter 0.3s ease-out",
      }}
    />
  );
};
