"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";

interface ScrollBasedTextRevealProps {
  text: string;
}

export const ScrollBasedTextReveal = ({ text }: ScrollBasedTextRevealProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.3"],
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[50vh]" />
      <motion.p
        style={{ opacity: scrollYProgress }}
        ref={container}
        className="max-w-5xl text-center text-5xl font-bold"
      >
        {text}
      </motion.p>
      <div className="h-[50vh]" />
    </div>
  );
};
