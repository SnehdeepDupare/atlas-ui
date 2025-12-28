"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

export const BlobMouseTrailer = () => {
  const [isVisible, setIsVisible] = useState(false);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    mouse.x.set(clientX - 192);
    mouse.y.set(clientY - 192);
    setIsVisible(true);
  };

  const smoothOptions = {
    damping: 10,
    stiffness: 35,
    mass: 0.5,
  };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);
  return (
    <motion.div
      className={` ${
        isVisible ? "hidden md:block" : "hidden"
      } h-96 w-96 rounded-full bg-linear-to-r from-purple-500 to-amber-500 fixed top-0 left-0 pointer-events-none animate-rotate opacity-80 -z-10 blur-[100px]`}
      style={{
        left: smoothMouse.x,
        top: smoothMouse.y,
      }}
    />
  );
};
