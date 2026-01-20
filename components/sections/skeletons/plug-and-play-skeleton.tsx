"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn, firaCode } from "@/lib/utils";

export const PlugAndPlaySkeleton = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const commandList = [
    {
      text: "Project detected · atlas-ui",
      type: "info",
      symbol: "~",
    },
    {
      text: "pnpm dlx shadcn@latest add component",
      type: "warning",
      symbol: ">",
    },
    {
      text: "Component added. Ready to use.",
      type: "success",
      symbol: "✔",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % commandList.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [commandList.length]);

  const variants = {
    info: {
      base: "bg-linear-to-b from-blue-50 to-blue-100 border-blue-200 text-blue-700 dark:from-blue-900/40 dark:to-blue-900/20 dark:border-blue-800 dark:text-blue-300",
      activeBorder: "border-blue-300 dark:border-blue-600",
      symbol: "text-blue-500 dark:text-blue-400",
    },
    warning: {
      base: "bg-linear-to-b from-amber-50 to-amber-100 border-amber-200 text-amber-700 dark:from-amber-900/40 dark:to-amber-900/20 dark:border-amber-800 dark:text-amber-300",
      activeBorder: "border-amber-300 dark:border-amber-600",
      symbol: "text-amber-500 dark:text-amber-400",
    },
    success: {
      base: "bg-linear-to-b from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700 dark:from-emerald-900/40 dark:to-emerald-900/20 dark:border-emerald-800 dark:text-emerald-300",
      activeBorder: "border-emerald-300 dark:border-emerald-600",
      symbol: "text-emerald-500 dark:text-emerald-400",
    },
  };

  return (
    <div className="flex h-full w-full items-center justify-center mask-y-from-90% mask-x-from-90% p-4">
      {commandList.map((item, index) => {
        const offset = index - activeIndex;
        const variant =
          variants[item.type as keyof typeof variants] || variants.info;

        return (
          <motion.div
            key={index}
            className={cn(
              "absolute z-10 flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.4)] dark:shadow-[0_2px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.05)]",
              variant.base,
              index === activeIndex && variant.activeBorder,
            )}
            initial={false}
            animate={{
              y: offset * 50,
              scale: offset === 0 ? 1 : 0.9,
              opacity: offset === 0 ? 1 : Math.abs(offset) === 1 ? 0.5 : 0,
              zIndex: offset === 0 ? 10 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
          >
            <span
              className={cn(
                "flex size-4 items-center justify-center text-sm font-bold",
                firaCode.className,
                variant.symbol,
              )}
            >
              {item.symbol}
            </span>

            <span
              className={`text-sm font-medium tracking-tight ${firaCode.className}`}
            >
              {item.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};
