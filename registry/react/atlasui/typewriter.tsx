"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";

interface TypewriterProps {
  /**
   * Array of strings to display
   */
  text: string[];
  /**
   * Delay between each letter (in seconds)
   * @default 0.025
   */
  letterDelay?: number;
  /**
   * Duration of the box fade (in seconds)
   * @default 0.125
   */
  boxFadeDuration?: number;
  /**
   * Duration of the text fade out (in seconds)
   * @default 0.25
   */
  textFadeOutDuration?: number;
  /**
   * Delay between each text fade out (in ms)
   * @default 5500
   */
  delayBetween?: number;
  /**
   * Additional classNames
   */
  className?: string;
}

export const Typewriter = ({
  text,
  letterDelay = 0.025,
  boxFadeDuration = 0.125,
  textFadeOutDuration = 0.25,
  delayBetween = 5500,
  className,
}: TypewriterProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
    }, delayBetween);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className={cn("text-sm font-light uppercase", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: textFadeOutDuration,
            ease: "easeInOut",
          }}
        >
          {text[currentIndex].split("").map((char, index) => (
            <span key={index} className="relative">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * letterDelay, duration: 0 }}
              >
                {char}
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{
                  delay: index * letterDelay,
                  times: [0, 0.1, 1],
                  duration: boxFadeDuration,
                  ease: "easeInOut",
                }}
                className="bg-foreground absolute inset-x-0.25 inset-y-0"
              />
            </span>
          ))}
        </motion.span>
      </AnimatePresence>
    </p>
  );
};
