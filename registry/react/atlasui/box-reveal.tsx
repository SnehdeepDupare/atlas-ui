"use client";

import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "motion/react";
import { useRef, useEffect } from "react";

interface BoxRevealProps {
  children: React.ReactNode;
  side?: "left" | "right";
  width?: "fit-content" | "full";
  color?: string;
  className?: string;
}

export const BoxReveal = ({
  children,
  side = "left",
  width = "fit-content",
  color = "#FACC15",
  className,
}: BoxRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const contentAnimation = useAnimation();
  const overlayAnimation = useAnimation();

  useEffect(() => {
    if (isInView) {
      contentAnimation.start("visible");
      overlayAnimation.start("visible");
    }
  }, [isInView, contentAnimation, overlayAnimation]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        width === "full" ? "w-full" : "w-fit",
        className,
      )}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={contentAnimation}
        transition={{ duration: 0.5, delay: 0.35 }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>

      <motion.div
        variants={{
          hidden: side === "right" ? { right: 0 } : { left: 0 },
          visible: side === "right" ? { right: "100%" } : { left: "100%" },
        }}
        initial="hidden"
        animate={overlayAnimation}
        transition={{ duration: 0.5, ease: "easeIn" }}
        viewport={{ once: true }}
        className="pointer-events-none absolute inset-0 top-1 bottom-1 z-20"
        style={{
          background: color,
        }}
      />
    </div>
  );
};
