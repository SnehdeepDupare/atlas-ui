"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ScrollBasedWordRevealProps {
  text: string;
}

export const ScrollBasedWordReveal = ({ text }: ScrollBasedWordRevealProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="h-[50vh]" />
      <p
        ref={container}
        className="text-5xl font-bold max-w-5xl flex items-center justify-center flex-wrap"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (start + i) / words.length;

          const opacity = useTransform(scrollYProgress, [start, end], [0, 1]);

          return (
            <span key={i} className="mr-2 mt-1 relative">
              <span className="absolute opacity-10">{word}</span>
              <motion.span style={{ opacity }}>{word}</motion.span>
            </span>
          );
        })}
      </p>
      <div className="h-[50vh]" />
    </div>
  );
};
