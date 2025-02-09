"use client";

import { useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "motion/react";

interface SectionProps {
  scrollYProgress: MotionValue;
}
export const ParallaxSections = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={container} className="relative h-[200vh] w-full">
      {/* Change the height of the container according to number of Sections */}
      <Section1 scrollYProgress={scrollYProgress} />
      <Section2 scrollYProgress={scrollYProgress} />
    </div>
  );
};

const Section1 = ({ scrollYProgress }: SectionProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className="h-screen sticky top-0 bg-neutral-700 flex items-center justify-center"
    >
      <h1 className="font-bold text-5xl">This section is Cool.</h1>
    </motion.section>
  );
};

const Section2 = ({ scrollYProgress }: SectionProps) => {
  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-5, 0]); // You can change the rotation if you want to add more sections below to make it look more cooler ;)

  return (
    <motion.section
      style={{ scale, rotate }}
      className="h-screen bg-red-500 relative flex items-center justify-center"
    >
      <h1 className="font-bold text-5xl">This is Cooler!</h1>
    </motion.section>
  );
};
