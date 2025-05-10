"use client";

import { motion } from "motion/react";
import { Video } from "./video";

export const VideoShowcase = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      scale: 0,
      filter: "blur(8px)",
    },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.4,
        ease: "easeIn",
      },
    },
  };

  return (
    <>
      <section className="relative hidden md:flex w-full max-w-screen-2xl mx-auto min-h-[800px] items-center justify-center mt-10 px-4 sm:px-6 lg:px-8">
        {/* Top Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0, x: 200, y: 150 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -25, x: 0, y: 0 }}
          whileHover={{ scale: 1.05, rotate: -20 }}
          whileTap={{ scale: 0.95, rotate: -25 }}
          transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute top-4 sm:top-10 left-4 sm:left-[8%] z-10 w-[40vw] sm:w-[20rem] rounded-xl overflow-hidden border-2 border-neutral-800"
        >
          <Video
            href="/docs/components/parallax-sections"
            src="/assets/videos/parallax-section-demo.mp4"
          />
        </motion.div>

        {/* Top Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0, x: -200, y: 150 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 15, x: 0, y: 0 }}
          transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
          whileHover={{ scale: 1.05, rotate: 10 }}
          whileTap={{ scale: 0.95, rotate: 15 }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute top-6 sm:top-12 right-4 sm:right-[15%] z-10 w-[40vw] sm:w-[200px] rounded-xl border-2 border-neutral-800 overflow-hidden"
        >
          <Video
            href="/docs/components/hacker-text"
            src="/assets/videos/hacker-text-demo.mp4"
          />
        </motion.div>

        {/* Project Gallery Video - Center */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 5 }}
          whileHover={{ scale: 1.04, rotate: 3 }}
          whileTap={{ scale: 0.97, rotate: 5 }}
          transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          className="absolute z-20 w-full max-w-lg sm:max-w-xl md:max-w-3xl h-[60vw] sm:h-[30rem] top-28"
        >
          <div className="border-2 border-neutral-800 rounded-xl overflow-hidden h-full w-full">
            <Video
              src="/assets/videos/project-gallery-demo.mp4"
              href="/docs/components/project-gallery"
              className="w-full h-full rounded-lg object-cover"
              height="100%"
            />
          </div>
        </motion.div>

        {/* Bottom Left */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0, x: 200, y: -150 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -12, x: 0, y: 0 }}
          transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
          whileHover={{ scale: 1.05, rotate: -8 }}
          whileTap={{ scale: 0.95, rotate: -12 }}
          viewport={{ once: true }}
          className="absolute bottom-20 left-4 sm:left-[10%] z-10 w-[40vw] sm:w-[20rem]"
        >
          <div className="rounded-xl border-2 border-neutral-800 overflow-hidden">
            <Video
              href="/docs/components/blend-mouse-trailer"
              src="/assets/videos/blend-mouse-trailer-demo.mp4"
            />
          </div>
        </motion.div>

        {/* Bottom Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 0, x: -200, y: -150 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -12, x: 0, y: 0 }}
          whileHover={{ scale: 1.05, rotate: -8 }}
          whileTap={{ scale: 0.95, rotate: -12 }}
          transition={{ duration: 0.75, ease: [0, 0.55, 0.45, 1] }}
          viewport={{ once: true }}
          className="absolute bottom-24 right-4 sm:right-[10%] z-10 w-[45vw] sm:w-[250px]"
        >
          <div className="rounded-xl border-2 border-neutral-800 overflow-hidden">
            <Video
              href="/docs/components/dot-and-circle-mouse-trailer"
              src="/assets/videos/dot-and-circle-mouse-trailer-demo.mp4"
            />
          </div>
        </motion.div>
      </section>

      {/* For Mobile Devices */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ amount: 0.2 }}
        className="mt-10 px-4 sm:px-6 lg:px-8 grid grid-cols-1 gap-4 md:hidden"
      >
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border-2 border-neutral-800 overflow-hidden"
          >
            <Video
              href="/docs/components/parallax-sections"
              src="/assets/videos/parallax-section-demo.mp4"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border-2 border-neutral-800 overflow-hidden"
          >
            <Video
              href="/docs/components/hacker-text"
              src="/assets/videos/hacker-text-demo.mp4"
            />
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          whileTap={{ scale: 0.95 }}
          className="border-2 border-neutral-800 rounded-xl overflow-hidden h-full w-full"
        >
          <Video
            src="/assets/videos/project-gallery-demo.mp4"
            href="/docs/components/project-gallery"
            className="w-full h-full object-cover rounded-[4px]"
            height="100%"
          />
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <motion.div
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border-2 border-neutral-800 overflow-hidden"
          >
            <Video
              href="/docs/components/blend-mouse-trailer"
              src="/assets/videos/blend-mouse-trailer-demo.mp4"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl border-2 border-neutral-800 overflow-hidden"
          >
            <Video
              href="/docs/components/dot-and-circle-mouse-trailer"
              src="/assets/videos/dot-and-circle-mouse-trailer-demo.mp4"
            />
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};
