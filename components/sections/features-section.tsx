"use client";

import { ArrowRightIcon, Clipboard, Code2 } from "lucide-react";
import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import Link from "next/link";
import { MouseEvent } from "react";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { PlugAndPlaySkeleton } from "@/components/sections/skeletons/plug-and-play-skeleton";
import { RunsOnAnyStackSkeleton } from "@/components/sections/skeletons/runs-on-any-stack-skeleton";
import { OpenSourceSkeleton } from "@/components/sections/skeletons/open-source-skeletion";

interface CardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  href?: string;
  skeleton: React.ReactNode;
}

export const FeaturesSection = () => {
  const features = [
    {
      title: "Plug and Play Setup",
      description:
        "Copy the code into your project or add it via the CLI. Everything works out of the box.",
      icon: Clipboard,
      skeleton: <PlugAndPlaySkeleton />,
    },
    {
      title: "Runs on Any Stack",
      description:
        "Use components as React elements or drop them directly into plain HTML. Same quality, full flexibility.",
      icon: Code2,
      skeleton: <RunsOnAnyStackSkeleton />,
    },
    {
      title: "Open Source by design",
      description:
        "MIT licensed with zero vendor lock-in. Use it freely, fork it, or contribute back to the ecosystem.",
      icon: Icons.githubLine,
      href: siteConfig.links.github,
      skeleton: <OpenSourceSkeleton />,
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
              skeleton={feature.skeleton}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Card = ({
  title,
  description,
  icon: Icon,
  href,
  skeleton,
}: CardProps) => {
  return (
    <div className="flex flex-col rounded-xl border bg-neutral-50 p-6 shadow dark:bg-neutral-950">
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>

      <div className="h-64">{skeleton}</div>

      {/* {href && (
        <Link
          href={href}
          className="flex items-center gap-1 hover:underline hover:underline-offset-2"
        >
          <p className="text-sm font-medium">Learn More</p>
          <ArrowRightIcon className="size-4" />
        </Link>
      )} */}
    </div>
  );
};
