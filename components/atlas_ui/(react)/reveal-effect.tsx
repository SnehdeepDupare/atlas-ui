"use client";

import { motion } from "motion/react";

interface RevealEffectProps {
  children: React.ReactNode;
  translateY?: number;
  delay?: number;
  speed?: "slow" | "medium" | "fast";
}

const speedDurations = {
  slow: 1.6,
  medium: 1,
  fast: 0.5,
};

export const RevealEffect = ({
  children,
  translateY,
  delay,
  speed = "medium",
}: RevealEffectProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(12px)",
        clipPath: "inset(-5% 100% -5% 0)",
        translateY: translateY,
      }}
      whileInView={{
        opacity: 1,
        filter: "blur(0px)",
        clipPath: "inset(-5% 0% -5% 0)",
        translateY: 0,
      }}
      transition={{
        duration: speedDurations[speed],
        ease: "easeInOut",
        delay: delay,
      }}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};
