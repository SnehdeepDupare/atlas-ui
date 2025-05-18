"use client";

import { Clipboard, Code2 } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Link from "next/link";
import { MouseEvent } from "react";
import { Icons } from "./icons";
import { siteConfig } from "@/config/site";

interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href?: string;
}

export const FeaturesSection = () => {
  const features = [
    {
      title: "Copy → Paste → Done",
      description:
        "Just copy the code, paste it into your project, and you're ready to go.",
      icon: Clipboard,
    },
    {
      title: "React or Vanilla — Your Choice",
      description:
        "Use components as React elements or drop them into plain HTML.",
      icon: Code2,
    },
    {
      title: "Open Source & Free",
      description:
        "MIT licensed with zero vendor lock-in. Use, fork, or contribute — it’s yours.",
      icon: Icons.githubLine,
      href: siteConfig.links.github,
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center justify-center mt-14">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="font-bold text-4xl"
      >
        Why Atlas UI?
      </motion.h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 mt-10">
        {features.map((feature, i) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: i * 0.2 }}
            viewport={{ once: true }}
            key={i}
            className={`${i === 2 ? "sm:col-span-2 md:col-span-1" : ""}`}
          >
            <Card
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              href={feature.href}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Card = ({ title, description, icon: Icon, href }: CardProps) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const y = e.clientY - bounds.top;

    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/5 dark:hover:shadow-black/5 overflow-hidden"
    >
      <div className="pointer-events-none">
        {/* Pattern Background */}
        <div className="absolute inset-0 rounded-2xl mask-[linear-gradient(white,transparent)] transition duration-300 group-hover:opacity-50">
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/5 stroke-black/5 dark:fill-white/1 dark:stroke-white/5"
          >
            <defs>
              <pattern
                id="pattern1"
                width="72"
                height="56"
                patternUnits="userSpaceOnUse"
                x="50%"
                y="-6"
              >
                <path d="M.5 56V.5H72" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern1)" />
            <svg x="50%" y="-6" className="overflow-visible">
              <rect width="73" height="57" x="-72" y="112" />
              <rect width="73" height="57" x="72" y="168" />
            </svg>
          </svg>
        </div>

        {/* Radial Gradient Highlight */}
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#D7EDEA] to-[#F4FBDF] opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#202D2E] dark:to-[#303428]"
          style={{
            maskImage: useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white , transparent)`,
            WebkitMaskImage: useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white , transparent)`,
          }}
        />

        {/* Overlay Pattern */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
          style={{
            maskImage:
              "radial-gradient(180px at 192px 68px, white, transparent)",
          }}
        >
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/5 dark:stroke-white/10"
          >
            <defs>
              <pattern
                id="pattern2"
                width="72"
                height="56"
                patternUnits="userSpaceOnUse"
                x="50%"
                y="-6"
              >
                <path d="M.5 56V.5H72" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#pattern2)" />
            <svg x="50%" y="-6" className="overflow-visible">
              <rect width="73" height="57" x="-72" y="112" />
              <rect width="73" height="57" x="72" y="168" />
            </svg>
          </svg>
        </div>
      </div>

      {/* Border ring */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/10 group-hover:ring-zinc-900/15 dark:ring-white/10 dark:group-hover:ring-white/20" />

      {/* Card Content */}
      <div className="relative rounded-2xl px-4 pt-24 pb-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/5 ring-1 ring-zinc-900/25 backdrop-blur-[2px] transition duration-300 group-hover:bg-white/50 group-hover:ring-zinc-900/25 dark:bg-white/10 dark:ring-white/15 dark:group-hover:bg-emerald-300/10 dark:group-hover:ring-emerald-400">
          <Icon className="h-5 w-5 fill-zinc-700/10 stroke-zinc-700 transition-colors duration-300 group-hover:stroke-zinc-900 dark:fill-white/10 dark:stroke-zinc-400 dark:group-hover:fill-emerald-300/10 dark:group-hover:stroke-emerald-400" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-zinc-900 dark:text-white">
          {href ? (
            <Link href={href} target="_blank" rel="noopener noreferrer">
              <span className="absolute inset-0 rounded-2xl" />
              {title}
            </Link>
          ) : (
            <>{title}</>
          )}
        </h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      </div>
    </motion.div>
  );
};
