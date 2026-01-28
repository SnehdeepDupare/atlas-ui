"use client";

import { useEffect, useState } from "react";

import { motion } from "motion/react";

import {
  fontFive,
  fontFour,
  fontOne,
  fontSeven,
  fontSix,
  fontThree,
  fontTwo,
} from "@/fonts/font";
import { cn } from "@/lib/utils";

const fonts = [
  fontOne.className,
  fontTwo.className,
  fontThree.className,
  fontFour.className,
  fontFive.className,
  fontSix.className,
  fontSeven.className,
];

interface LokiEffectProps {
  text: string;
  velocityFont?: number; // In ms
  velocityMove?: number; // In ms
  className?: string;
}

const getRandomFont = (current: string) => {
  let next = current;
  while (next === current) {
    next = fonts[Math.floor(Math.random() * fonts.length)];
  }
  return next;
};

const getRandomOffset = () => ({
  x: (Math.random() - 0.5) * 2,
  y: (Math.random() - 0.5) * 2,
});

const AnimatedLetter = ({
  char,
  baseFont,
  velocityFont,
  velocityMove,
}: {
  char: string;
  baseFont: string;
  velocityFont: number;
  velocityMove: number;
}) => {
  const [fontClass, setFontClass] = useState(baseFont);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fontTimer = setInterval(
      () => {
        setFontClass((prev) => getRandomFont(prev));
      },
      Math.max(100, velocityFont)
    );

    const moveTimer = setInterval(
      () => {
        setPos(getRandomOffset());
      },
      Math.max(100, velocityMove)
    );

    return () => {
      clearInterval(fontTimer);
      clearInterval(moveTimer);
    };
  }, [velocityFont, velocityMove]);

  return (
    <motion.span
      className={`${fontClass} inline-block drop-shadow-[0_0_8px_black] dark:drop-shadow-[0_0_8px_white]`}
      style={{
        fontWeight: 700,
        letterSpacing: "0.15em",
        textShadow: "0 0 2px #ffffff66, 0 0 5px #ffffff66",
      }}
      animate={{ x: pos.x, y: pos.y }}
      transition={{
        x: { duration: 0.5, ease: "easeInOut" },
        y: { duration: 0.5, ease: "easeInOut" },
      }}
    >
      {char}
    </motion.span>
  );
};

export const LokiTextEffect = ({
  text,
  velocityFont = 800,
  velocityMove = 1800,
  className = "",
}: LokiEffectProps) => {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-center gap-px text-6xl md:text-9xl",
        className
      )}
    >
      {text.split("").map((char, i) => (
        <AnimatedLetter
          key={i}
          char={char}
          baseFont={fonts[i % fonts.length]}
          velocityFont={velocityFont}
          velocityMove={velocityMove}
        />
      ))}
    </div>
  );
};
