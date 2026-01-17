"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export const DotAndCircleMouseTrailer = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Cursor Dot
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - 4);
    mouse.y.set(clientY - 4);
    setIsVisible(true);
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

  //   Cursor Outline
  const mouseOutline = {
    _x: useMotionValue(0),
    _y: useMotionValue(0),
  };

  const outlineMouse = (e: any) => {
    const { clientX, clientY } = e;
    mouseOutline._x.set(clientX - 40);
    mouseOutline._y.set(clientY - 40);
  };

  const outlineOptions = {
    damping: 10,
    stiffness: 50,
    mass: 0.5,
  };
  const smoothOutline = {
    _x: useSpring(mouseOutline._x, outlineOptions),
    _y: useSpring(mouseOutline._y, outlineOptions),
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousemove", outlineMouse);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousemove", outlineMouse);
    };
  }, []);

  return (
    <motion.div
      className={`${
        isVisible ? "hidden md:block" : "hidden"
      } pointer-events-none fixed top-0 left-0 z-50 h-20 w-20 rounded-full border border-black dark:border-white`}
      style={{
        left: smoothOutline._x,
        top: smoothOutline._y,
      }}
    >
      <motion.div
        className="pointer-events-none fixed top-0 left-0 hidden h-2 w-2 rounded-full bg-black md:block dark:bg-white"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
        }}
      />
    </motion.div>
  );
};
