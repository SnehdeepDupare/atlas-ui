"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { ButtonHTMLAttributes } from "react";

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
      className={cn("px-6 py-2 rounded-md relative radial-gradient", className)}
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
      <span className="text-neutral-100 tracking-wide font-light h-full w-full block relative linear-mask">
        {children}
      </span>
      <span className="block absolute inset-0 rounded-md p-px linear-overlay" />
    </motion.button>
  );
};
