"use client";

import Link from "next/link";

import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const NewUpdateCallout = () => {
  return (
    <div className="relative mb-4 inline-block overflow-hidden rounded-full">
      <Link
        href="/docs/changelog"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
          }),
          "relative rounded-full text-xs"
        )}
      >
        🎉 Introducing Morph Navbar & Notch Nav
        <ChevronRight className="text-muted-foreground ml-1 size-3" />
      </Link>

      <motion.div
        className="pointer-events-none absolute inset-0"
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
        <div className="h-full w-10 skew-x-[-20deg] bg-emerald-500/20" />
      </motion.div>
    </div>
  );
};
