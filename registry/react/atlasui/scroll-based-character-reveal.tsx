"use client";

import { useRef } from "react";

import { MotionValue, motion, useScroll, useTransform } from "motion/react";

interface ScrollBasedCharacterRevealProps {
  text: string;
}

interface WordProps {
  children: string;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}

interface CharacterProps {
  children: string;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}

export const ScrollBasedCharacterReveal = ({
  text,
}: ScrollBasedCharacterRevealProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-[50vh]" />
      <p
        ref={container}
        className="flex max-w-5xl flex-wrap text-center text-5xl font-bold"
      >
        {words.map((word, i) => {
          const start = i / words.length;
          const end = (start + i) / words.length;

          return (
            <Word
              key={i}
              range={[start, end]}
              scrollYProgress={scrollYProgress}
            >
              {word}
            </Word>
          );
        })}
      </p>
      <div className="h-[50vh]" />
    </div>
  );
};

const Word = ({ children, scrollYProgress, range }: WordProps) => {
  const characters = children.split("");
  const amount = range[1] - range[0];
  const step = amount / children.length;

  return (
    <span className="relative mt-1 mr-2">
      {characters.map((character, i) => {
        const start = range[0] + step * i;
        const end = range[0] + step * (i + 1);
        return (
          <Character
            key={i}
            range={[start, end]}
            scrollYProgress={scrollYProgress}
          >
            {character}
          </Character>
        );
      })}
    </span>
  );
};

const Character = ({ children, scrollYProgress, range }: CharacterProps) => {
  const opacity = useTransform(scrollYProgress, range, [0, 1]);
  return (
    <span className="relative">
      <span className="absolute opacity-10">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
};
