"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, RotateCcwIcon } from "lucide-react";
import { motion } from "motion/react";

import ComponentWrapper from "@/components/component-wrapper";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

import { BoxRevealDemo } from "@/registry/react/examples/box-reveal-demo";
import { HackerTextDemo } from "@/registry/react/examples/hacker-text-demo";
import { MorphNavbarDemo } from "@/registry/react/examples/morph-navbar-demo";
import { ShinyButtonDemo } from "@/registry/react/examples/shiny-button-demo";
import { LokiTextEffectDemo } from "@/components/sections/demo-components/loki-text-effect-demo";
import { NotchNavDemo } from "@/components/sections/demo-components/notch-nav-demo";
import { ProjectGalleryDemo } from "@/components/sections/demo-components/project-gallery-demo";

export const ComponentShowcase = () => {
  const [key, setKey] = useState(0);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
        delay: 1,
      }}
      className="mx-auto max-w-7xl px-6 py-10 lg:px-8"
    >
      <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-3 md:grid-rows-5">
        <ComponentWrapper className="group flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-neutral-50/30 p-2 shadow md:col-span-2 md:h-auto dark:bg-neutral-950">
          <MorphNavbarDemo />

          <ItemFooter
            title="Morph Navbar"
            href="/docs/components/morph-navbar"
          />
        </ComponentWrapper>

        <ComponentWrapper className="group flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-neutral-50/30 p-2 shadow md:col-start-3 md:h-auto dark:bg-neutral-950">
          <LokiTextEffectDemo />

          <ItemFooter
            title="Loki Text Effect"
            href="/docs/components/loki-text-effect"
          />
        </ComponentWrapper>

        <ComponentWrapper className="relative flex h-96 items-center justify-center overflow-hidden rounded-xl border bg-neutral-50/30 p-2 shadow md:row-span-2 md:row-start-2 md:h-128 dark:bg-neutral-950">
          <NotchNavDemo />

          <ItemFooter
            title="Notch Nav"
            href="/docs/components/notch-nav"
            className="group"
          />
        </ComponentWrapper>

        <ComponentWrapper className="hidden items-center justify-center overflow-hidden rounded-xl border bg-neutral-50/30 p-2 shadow md:col-span-2 md:row-span-3 md:row-start-2 md:block dark:bg-neutral-950">
          <ProjectGalleryDemo />

          <ItemFooter
            title="Project Gallery"
            href="/docs/components/project-gallery"
            className="group h-20"
          />
        </ComponentWrapper>

        <ComponentWrapper className="group flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-neutral-50/30 p-2 shadow md:row-start-4 md:h-auto dark:bg-neutral-950">
          <HackerTextDemo />

          <ItemFooter title="Hacker Text" href="/docs/components/hacker-text" />
        </ComponentWrapper>

        <ComponentWrapper className="group flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-neutral-50/30 p-2 px-4 shadow md:col-span-2 md:row-start-5 md:h-auto dark:bg-neutral-950">
          <div className="absolute top-2 right-2">
            <RestartButton onRestart={() => setKey((prev) => prev + 1)} />
          </div>
          <BoxRevealDemo key={key} />

          <ItemFooter title="Box Reveal" href="/docs/components/box-reveal" />
        </ComponentWrapper>

        <ComponentWrapper className="group flex h-48 items-center justify-center overflow-hidden rounded-xl border bg-neutral-50/30 p-2 shadow md:row-start-5 md:h-auto dark:bg-neutral-950">
          <ShinyButtonDemo />

          <ItemFooter
            title="Shiny Button"
            href="/docs/components/shiny-button"
          />
        </ComponentWrapper>
      </div>
    </motion.section>
  );
};

const ItemFooter = ({
  title,
  href,
  className,
}: {
  title: string;
  href: string;
  className?: string;
}) => {
  return (
    <div
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--dot-color) 1.5px, transparent 1.5px)",
        backgroundSize: "20px 20px",
        backgroundPosition: "0 0",
      }}
      className={cn(
        "[--dot-color:rgba(0,0,0,0.15)] dark:[--dot-color:rgba(255,255,255,0.2)]",
        "absolute inset-x-0 bottom-0 flex h-1/3 items-end mask-t-from-0 mask-t-to-95% p-4",
        className,
      )}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={href} className="flex items-center gap-1">
            <p className="text-lg font-medium">{title}</p>
            <ArrowUpRightIcon className="invisible size-4 group-hover:visible" />
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>View Component</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

const RestartButton = ({ onRestart }: { onRestart: () => void }) => {
  return (
    <Button onClick={onRestart} variant="ghost" size="icon" className="size-8">
      <RotateCcwIcon aria-label="restart-btn" className="size-4" />
    </Button>
  );
};
