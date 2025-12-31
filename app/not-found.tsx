"use client";

import { motion } from "motion/react";
import { Oswald } from "next/font/google";
import Link from "next/link";

const oswald = Oswald({
  subsets: ["latin"],
  weight: "700",
});

const digitVariants = {
  hidden: { y: -300, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 15,
      delay: i * 0.2,
    },
  }),
};

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center flex-1 flex-col font-bold uppercase">
      <div className="flex">
        {[4, 0, 4].map((digit, index) => (
          <motion.span
            key={index}
            custom={index}
            initial="hidden"
            animate="visible"
            variants={digitVariants}
            className={`${oswald.className} text-[22vw] md:text-[20vw]`}
          >
            {digit}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
        className="flex flex-col items-center justify-center text-center"
      >
        <h2 className="mb-1">It seems that you&apos;re lost</h2>
        <h2 className="mb-1">Let&apos;s get you back to the Good Stuff</h2>
        <div className="flex gap-4">
          <Link href="/" className="underline underline-offset-2">
            Home
          </Link>
          <Link
            href="/docs/components/animated-mobile-navbar"
            className="underline underline-offset-2"
          >
            Docs
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFoundPage;
