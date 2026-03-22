"use client";

import { useState } from "react";

import { motion, stagger, useAnimate } from "motion/react";

import { cn } from "@/lib/utils";

interface LetterSwapProps {
  text: string;
  reverse?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center";
  className?: string;
}

export const LetterSwap = ({
  text,
  reverse = false,
  staggerDuration = 0.02,
  staggerFrom = "first",
  className,
}: LetterSwapProps) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const hoverStart = () => {
    if (isHovered) return;
    setIsHovered(true);

    animate(
      ".letter-primary",
      { y: reverse ? "100%" : "-100%" },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      }
    );

    animate(
      ".letter-secondary",
      { top: "0%" },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      }
    );
  };

  const hoverEnd = () => {
    if (!isHovered) return;
    setIsHovered(false);

    animate(
      ".letter-primary",
      { y: 0 },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      }
    );

    animate(
      ".letter-secondary",
      { top: reverse ? "-100%" : "100%" },
      {
        delay: stagger(staggerDuration, {
          from: staggerFrom,
        }),
      }
    );
  };

  return (
    <motion.span
      ref={scope}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className
      )}
      onHoverStart={hoverStart}
      onHoverEnd={hoverEnd}
    >
      <span className="sr-only">{text}</span>

      {text.split("").map((letter, i) => {
        return (
          <span
            className="relative flex whitespace-pre"
            key={i}
            aria-hidden={true}
          >
            <motion.span className="letter-primary relative" style={{ top: 0 }}>
              {letter}
            </motion.span>

            <motion.span
              className="letter-secondary absolute"
              style={{ top: reverse ? "-100%" : "100%" }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};
