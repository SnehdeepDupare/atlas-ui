"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "./ui/button";

export const CtaSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
      className="px-6 pt-12 pb-24 text-center lg:px-8"
    >
      <h2 className="mb-4 text-4xl font-bold">
        Ready to Harness the Strength of Atlas?
      </h2>
      <p className="mx-auto mb-8 max-w-xl text-gray-400">
        Build beautiful UIs faster. Drop components straight into your stack.
      </p>

      <Button
        asChild
        size="lg"
        className="group inline-flex justify-center gap-0.5 overflow-hidden bg-emerald-100 text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20 transition ring-inset hover:scale-105 hover:bg-emerald-200/80 hover:text-emerald-800 hover:ring-emerald-600/30 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-emerald-400/20 dark:ring-inset dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
      >
        <Link href="/docs">
          Get Started{" "}
          <motion.span
            animate={{ x: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1,
              ease: "easeInOut",
            }}
            className="ml-1 inline-flex"
          >
            <MoveRight className="h-4 w-4" />
          </motion.span>
        </Link>
      </Button>
    </motion.section>
  );
};
