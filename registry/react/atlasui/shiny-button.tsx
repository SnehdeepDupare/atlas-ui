"use client";

import { ButtonHTMLAttributes } from "react";

import { MotionProps, motion } from "motion/react";

import { cn } from "@/lib/utils";

type MergedProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof MotionProps
> &
  MotionProps;

interface ShinyButtonProps extends MergedProps {
  children: React.ReactNode;
  className?: string;
}

export const ShinyButton = ({
  children,
  className,
  ...props
}: ShinyButtonProps) => {
  return (
    <motion.button
      className={cn("radial-gradient relative rounded-md px-6 py-2", className)}
      initial={{ "--x": "100%", scale: 1 }}
      animate={{ "--x": "-100%" }}
      whileTap={{ scale: 0.97 }}
      transition={{
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
          type: "spring",
          stiffness: 10,
          damping: 5,
          mass: 0.1,
        },
      }}
      {...props}
    >
      <span className="linear-mask relative block h-full w-full font-light tracking-wide text-neutral-100">
        {children}
      </span>
      <span className="linear-overlay absolute inset-0 block rounded-md p-px" />
    </motion.button>
  );
};
