"use client";

import { useCallback } from "react";

import { useTheme } from "next-themes";

import { CloudIcon, SparkleIcon } from "lucide-react";
import { motion } from "motion/react";

export const ThemeToggle = () => {
  const { setTheme, resolvedTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  return (
    <button
      onClick={toggleTheme}
      role="switch"
      className="relative flex w-20 justify-start overflow-hidden rounded-full bg-linear-to-b from-blue-500 to-blue-300 p-1.5 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3),inset_0_-2px_3px_rgba(0,0,0,0.1)] dark:justify-end dark:from-neutral-900 dark:to-neutral-800"
    >
      <Thumb />

      {resolvedTheme === "dark" ? <Stars /> : <Clouds />}
    </button>
  );
};

const Thumb = () => {
  return (
    <motion.div
      layout
      transition={{
        type: "spring",
        stiffness: 420,
        damping: 32,
        mass: 0.6,
      }}
      className="relative size-7 rounded-full bg-linear-to-br from-yellow-300 to-yellow-400 shadow-[inset_1px_1px_2px_0px_rgba(255,255,255),0px_3px_9px_4px_rgba(0,0,0,0.141)] dark:from-gray-200 dark:to-gray-300 dark:after:absolute dark:after:bottom-1.5 dark:after:left-1 dark:after:size-3 dark:after:rounded-full dark:after:bg-gray-400 dark:after:shadow-[6px_-10px_0_-3.5px_var(--color-gray-400),10px_4px_0_-3px_var(--color-gray-400)] dark:after:content-['']"
    />
  );
};

const Stars = () => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="absolute inset-0"
    >
      <SparkleIcon className="absolute top-2 left-2 size-2 fill-gray-400 stroke-0" />
      <SparkleIcon className="absolute top-4 left-5 size-2.5 fill-gray-400 stroke-0" />
      <SparkleIcon className="absolute top-2 left-10 size-1 fill-gray-400 stroke-0" />
      <SparkleIcon className="absolute top-1 left-7 size-1 fill-gray-400 stroke-0" />
      <SparkleIcon className="absolute bottom-2 left-2 size-1 fill-gray-400 stroke-0" />
      <SparkleIcon className="absolute bottom-2 left-8 size-1 fill-gray-400 stroke-0" />
      <SparkleIcon className="absolute bottom-1 left-5 size-1.5 fill-gray-400 stroke-0" />
    </motion.div>
  );
};

const Clouds = () => {
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="absolute inset-0"
    >
      <CloudIcon className="absolute top-2 right-2 size-2 fill-white stroke-0" />
      <CloudIcon className="absolute top-4 right-5 size-2.5 fill-white stroke-0" />
      <CloudIcon className="absolute top-2 left-10 size-1.5 fill-white stroke-0" />
      <CloudIcon className="absolute right-2 bottom-1 size-1.5 fill-white stroke-0" />
      <CloudIcon className="absolute bottom-1 left-8 size-1.5 fill-white stroke-0" />
      <CloudIcon className="absolute bottom-2 left-11 size-1.5 fill-white stroke-0" />
    </motion.div>
  );
};
