"use client";

import { motion } from "motion/react";
import { Video } from "./video";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

export const VideoShowcase = () => {
  const isMobile = useIsMobile();

  return (
    <motion.section
      initial={
        isMobile
          ? {
              opacity: 0,
              filter: "blur(8px)",
            }
          : {}
      }
      whileInView={
        isMobile
          ? {
              opacity: 1,
              filter: "blur(0px)",
            }
          : {}
      }
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative mx-auto mt-10 w-full max-w-(--breakpoint-2xl) px-4 sm:px-6 lg:px-8",
        isMobile
          ? "grid grid-cols-2 gap-4"
          : "flex min-h-200 items-center justify-center",
      )}
    >
      {/* Top Left */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: 0,
          x: isMobile ? 0 : 200,
          y: isMobile ? 0 : 150,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          rotate: isMobile ? 0 : -25,
          x: 0,
          y: 0,
        }}
        whileHover={!isMobile ? { scale: 1.05, rotate: -20 } : {}}
        whileTap={{ scale: 0.95, rotate: isMobile ? 0 : -25 }}
        transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className={cn(
          "overflow-hidden rounded-xl border-2 border-neutral-800",
          isMobile
            ? ""
            : "absolute top-4 left-4 z-10 w-[40vw] sm:top-10 sm:left-[8%] sm:w-[20rem]",
        )}
      >
        <Video
          href="/docs/components/parallax-sections"
          src="/assets/videos/parallax-section-demo.mp4"
          className={isMobile ? "h-full w-full object-cover" : undefined}
        />
      </motion.div>

      {/* Top Right */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: 0,
          x: isMobile ? 0 : -200,
          y: isMobile ? 0 : 150,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          rotate: isMobile ? 0 : 15,
          x: 0,
          y: 0,
        }}
        whileHover={!isMobile ? { scale: 1.05, rotate: 10 } : {}}
        whileTap={{ scale: 0.95, rotate: isMobile ? 0 : 15 }}
        transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className={cn(
          "overflow-hidden rounded-xl border-2 border-neutral-800",
          isMobile
            ? ""
            : "absolute top-6 right-4 z-10 w-[40vw] sm:top-12 sm:right-[15%] sm:w-[200px]",
        )}
      >
        <Video
          href="/docs/components/hacker-text"
          src="/assets/videos/hacker-text-demo.mp4"
          className={isMobile ? "h-full w-full object-cover" : undefined}
        />
      </motion.div>

      {/* Center */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{
          opacity: 1,
          scale: 1,
          rotate: isMobile ? 0 : 5,
        }}
        whileHover={!isMobile ? { scale: 1.05, rotate: 2.5 } : {}}
        whileTap={{ scale: 0.95, rotate: isMobile ? 0 : 5 }}
        transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className={cn(
          "z-20 overflow-hidden rounded-xl border-2 border-neutral-800",
          isMobile
            ? "col-span-2"
            : "absolute top-28 h-[60vh] w-full max-w-lg sm:h-120 sm:max-w-xl md:max-w-3xl",
        )}
      >
        <Video
          href="/docs/components/project-gallery"
          src="/assets/videos/project-gallery-demo.mp4"
          className="h-full w-full rounded-lg object-cover"
          height="100%"
        />
      </motion.div>

      {/* Bottom Left */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: 0,
          x: isMobile ? 0 : 200,
          y: isMobile ? 0 : -150,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          rotate: isMobile ? 0 : -12,
          x: 0,
          y: 0,
        }}
        whileHover={!isMobile ? { scale: 1.05, rotate: -8 } : {}}
        whileTap={{ scale: 0.95, rotate: isMobile ? 0 : -12 }}
        transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className={cn(
          "overflow-hidden rounded-xl border-2 border-neutral-800",
          isMobile
            ? ""
            : "absolute bottom-20 left-4 z-10 w-[40vw] sm:left-[10%] sm:w-[20rem]",
        )}
      >
        <Video
          href="/docs/components/blend-mouse-trailer"
          src="/assets/videos/blend-mouse-trailer-demo.mp4"
          className={isMobile ? "h-full w-full object-cover" : undefined}
        />
      </motion.div>

      {/* Bottom Right */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.8,
          rotate: 0,
          x: isMobile ? 0 : -200,
          y: isMobile ? 0 : -150,
        }}
        whileInView={{
          opacity: 1,
          scale: 1,
          rotate: isMobile ? 0 : -12,
          x: 0,
          y: 0,
        }}
        whileHover={!isMobile ? { scale: 1.05, rotate: -8 } : {}}
        whileTap={{ scale: 0.95, rotate: isMobile ? 0 : -12 }}
        transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        className={cn(
          "overflow-hidden rounded-xl border-2 border-neutral-800",
          isMobile
            ? ""
            : "absolute right-4 bottom-24 z-10 w-[45vw] sm:right-[10%] sm:w-[250px]",
        )}
      >
        <Video
          href="/docs/components/dot-and-circle-mouse-trailer"
          src="/assets/videos/dot-and-circle-mouse-trailer-demo.mp4"
          className={isMobile ? "h-full w-full object-cover" : undefined}
        />
      </motion.div>
    </motion.section>
  );
};
