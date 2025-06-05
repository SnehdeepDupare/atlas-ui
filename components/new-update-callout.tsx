"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";

export const NewUpdateCallout = () => {
  const shineVariants = {
    initial: { x: "-100%" },
    animate: {
      x: "100%",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
      },
    },
  };

  return (
    <div className="relative overflow-hidden inline-block mb-4 rounded-full">
      <Link
        href="/docs/components/loki-text-effect"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "rounded-full text-xs relative"
        )}
      >
        🎉 Introducing Loki Text Effect
        <ChevronRight className="ml-1 size-3 text-muted-foreground" />
      </Link>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ x: "-100%" }}
        animate={{ x: "calc(100% + 200px)" }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          repeatDelay: 6,
        }}
      >
        <div className="h-full w-10 bg-emerald-500/20 skew-x-[-20deg]" />
      </motion.div>
    </div>
  );
};
