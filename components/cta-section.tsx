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
      className="pt-12 pb-24 text-center px-6 lg:px-8"
    >
      <h2 className="text-4xl font-bold mb-4">
        Ready to Harness the Strength of Atlas?
      </h2>
      <p className="text-gray-400 max-w-xl mx-auto mb-8">
        Build beautiful UIs faster. Drop components straight into your stack.
      </p>

      <Button
        asChild
        size="lg"
        className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-200/80 hover:text-emerald-800 hover:ring-emerald-600/30 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300 hover:scale-105 group"
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
