"use client";

import { motion } from "motion/react";
import { GitBranchIcon, GitPullRequestIcon, TagIcon } from "lucide-react";

const pathMain = "M 80 100 L 800 100";
const pathFeature =
  "M 80 100 C 120 100 120 40 160 40 L 520 40 C 560 40 560 100 600 100";
const pathFork = "M 140 100 C 180 100 180 160 220 160 L 800 160";

export const OpenSourceSkeleton = () => {
  return (
    <div className="relative h-full w-full overflow-hidden mask-y-from-85% mask-x-from-90%">
      <div
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: "radial-gradient(#a1a1aa 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* SVG Graph */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 200"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Tracks */}
        <g
          className="stroke-neutral-300 dark:stroke-neutral-800"
          strokeWidth="2"
          strokeDasharray="10 10"
        >
          <path d={pathMain} />
          <path d={pathFeature} />
          <path d={pathFork} />
        </g>

        {/* Moving Particles */}
        <Particle
          path={pathMain}
          color="bg-indigo-500"
          delay={0}
          duration={5}
        />
        <Particle
          path={pathFeature}
          color="bg-purple-500"
          delay={2}
          duration={6}
        />
        <Particle
          path={pathFork}
          color="bg-teal-500"
          delay={3.5}
          duration={7}
        />
      </svg>

      <div className="pointer-events-none relative z-10 h-full w-full font-mono text-xs select-none">
        <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full border border-purple-200 bg-purple-50 px-2 py-1 text-purple-700 dark:border-purple-900/50 dark:bg-purple-900/20 dark:text-purple-300">
          <GitPullRequestIcon className="size-3" />
          <span>feat/new-components</span>
        </div>

        <motion.div
          initial={{ opacity: 0.5, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          className="absolute top-[15px] left-[200px] flex items-center gap-2 rounded border border-neutral-200 bg-white p-1.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="size-2 rounded-full bg-purple-500" />
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            2f8a9d • add buttons
          </span>
        </motion.div>

        <div className="absolute top-[90px] left-2 flex items-center gap-1 text-neutral-400 dark:text-neutral-500">
          <GitBranchIcon className="size-3" />
          <span>main</span>
        </div>

        <div className="absolute top-[90px] right-4 flex items-center gap-1 rounded border border-neutral-200 bg-white px-2 py-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
          <TagIcon className="size-3 text-indigo-500" />
          <span className="font-sans font-medium text-neutral-700 dark:text-neutral-300">
            v2.0.0
          </span>
        </div>

        <div className="absolute bottom-[30px] left-10 flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-2 py-1 text-teal-700 dark:border-teal-900/50 dark:bg-teal-900/20 dark:text-teal-300">
          <GitBranchIcon className="size-3" />
          <span>community-fork</span>
        </div>

        <motion.div
          initial={{ opacity: 0.5, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
          className="absolute bottom-[35px] left-[200px] flex items-center gap-2 rounded border border-neutral-200 bg-white p-1.5 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
        >
          <div className="size-2 rounded-full bg-teal-500" />
          <span className="text-[10px] text-neutral-500 dark:text-neutral-400">
            9c4e1b • fix typo
          </span>
        </motion.div>
      </div>
    </div>
  );
};

const Particle = ({
  path,
  color,
  delay,
  duration,
}: {
  path: string;
  color: string;
  delay: number;
  duration: number;
}) => {
  return (
    <foreignObject width="800" height="200">
      <motion.div
        className={`relative z-20 size-4 rounded-full border-2 border-white dark:border-neutral-950 ${color} shadow-sm`}
        style={{ offsetPath: `path('${path}')` }}
        initial={{ offsetDistance: "0%", scale: 0.6, opacity: 0 }}
        animate={{
          offsetDistance: "100%",
          scale: [0.6, 1, 1, 0.6],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      />
    </foreignObject>
  );
};
