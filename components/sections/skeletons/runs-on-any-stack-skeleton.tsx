import { motion } from "motion/react";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";

const rows = [
  [null, "next", "react", null],
  [null, "tailwind", "motion", "css", null],
  [null, "html", "js", null],
];

const ICON_MAP = {
  react: Icons.react,
  next: Icons.next,
  tailwind: Icons.tailwind,
  html: Icons.html,
  css: Icons.css,
  js: Icons.js,
  motion: Icons.motion,
} as const;

const Cell = ({
  icon: Icon,
  index,
}: {
  icon?: React.ElementType;
  index: number;
}) => (
  <motion.div
    className={cn(
      "relative flex size-18 items-center justify-center rounded-xl border border-neutral-200 bg-linear-to-b from-white to-neutral-100 shadow-[0_2px_4px_rgba(0,0,0,0.02),inset_0_1px_0_rgba(255,255,255,1)] dark:border-neutral-700/50 dark:from-neutral-800 dark:to-neutral-900 dark:shadow-[0_2px_4px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.3)]",
      !Icon && "opacity-40",
    )}
    animate={{
      y: Icon ? [0, 3, 0] : [0, 0, 0],
    }}
    transition={{
      duration: 2 + (index % 3),
      ease: "easeInOut",
      repeat: Infinity,
      delay: index * 0.2,
    }}
  >
    {Icon && (
      <div className="relative flex h-full w-full items-center justify-center">
        <Icon className="z-10 size-9 drop-shadow-sm dark:text-neutral-300" />

        <div className="pointer-events-none absolute top-1/2 left-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-200/50 blur-lg dark:bg-neutral-500/20" />
      </div>
    )}
  </motion.div>
);

export const RunsOnAnyStackSkeleton = () => {
  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden mask-y-from-90% mask-y-to-95% mask-x-from-90% mask-x-to-95%">
      <div className="flex flex-col gap-4">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={cn("flex gap-4", rowIndex !== 1 && "translate-x-15")}
          >
            {row.map((key, colIndex) => (
              <Cell
                key={colIndex}
                icon={key ? ICON_MAP[key as keyof typeof ICON_MAP] : undefined}
                index={rowIndex * 10 + colIndex}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
