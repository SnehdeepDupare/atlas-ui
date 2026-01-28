"use client";

import Link from "next/link";

import { ArrowRightIcon } from "lucide-react";
import { motion } from "motion/react";

import { OpenSourceSkeleton } from "@/components/sections/skeletons/open-source-skeleton";
import { PlugAndPlaySkeleton } from "@/components/sections/skeletons/plug-and-play-skeleton";
import { RunsOnAnyStackSkeleton } from "@/components/sections/skeletons/runs-on-any-stack-skeleton";
import { siteConfig } from "@/config/site";

interface CardProps {
  title: string;
  description: string;
  href?: string;
  hrefText?: string;
  skeleton: React.ReactNode;
}

export const FeaturesSection = () => {
  const features = [
    {
      title: "Plug and Play Setup",
      description:
        "Copy the code into your project or add it via the CLI. Everything works out of the box.",
      skeleton: <PlugAndPlaySkeleton />,
      href: "/docs/installation",
      hrefText: "Get Started",
    },
    {
      title: "Runs on Any Stack",
      description:
        "Use components as React elements or drop them directly into plain HTML. Same quality, full flexibility.",
      skeleton: <RunsOnAnyStackSkeleton />,
      href: "/docs/installation",
      hrefText: "Learn More",
    },
    {
      title: "Open Source by design",
      description:
        "MIT licensed with zero vendor lock-in. Use it freely, fork it, or contribute back to the ecosystem.",
      skeleton: <OpenSourceSkeleton />,
      href: siteConfig.links.github,
      hrefText: "View on GitHub",
    },
  ];

  return (
    <section className="mx-auto flex min-h-svh w-full max-w-7xl flex-col items-center justify-center px-6 py-10 lg:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        viewport={{ once: true }}
        className="text-4xl font-bold"
      >
        Why Atlas UI?
      </motion.h2>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {features.map((feature, i) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.1 }}
            viewport={{ once: true }}
            key={i}
          >
            <Card
              title={feature.title}
              description={feature.description}
              href={feature.href}
              hrefText={feature.hrefText}
              skeleton={feature.skeleton}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Card = ({ title, description, href, hrefText, skeleton }: CardProps) => {
  return (
    <div className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-xs ring-1 ring-neutral-950/5 transition-all ring-inset hover:shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:ring-neutral-50/10">
      <div className="relative z-10 flex flex-col p-6">
        <h3 className="mb-2 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          {title}
        </h3>

        <p className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
          {description}
        </p>

        {href && (
          <div className="mt-4 flex">
            <Link
              href={href}
              className="inline-flex items-center gap-1 text-sm font-medium text-neutral-900 transition-colors hover:text-blue-600 dark:text-neutral-200 dark:hover:text-blue-400"
            >
              {hrefText}
              <ArrowRightIcon className="size-3 transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </Link>
          </div>
        )}
      </div>

      <div className="relative mt-auto h-64 w-full overflow-hidden">
        {skeleton}
      </div>
    </div>
  );
};
