"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRightIcon, RotateCcwIcon } from "lucide-react";

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
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <div className="grid w-full grid-cols-3 grid-rows-5 gap-4">
        <ComponentWrapper className="group col-span-2 flex items-center justify-center overflow-hidden rounded-xl border p-2">
          <MorphNavbarDemo />

          <ItemFooter
            title="Morph Navbar"
            href="/docs/components/morph-navbar"
          />
        </ComponentWrapper>

        <ComponentWrapper className="group col-start-3 flex items-center justify-center overflow-hidden rounded-xl border p-2">
          <LokiTextEffectDemo />

          <ItemFooter
            title="Loki Text Effect"
            href="/docs/components/loki-text-effect"
          />
        </ComponentWrapper>

        <ComponentWrapper className="relative row-span-2 row-start-2 flex h-128 items-center justify-center overflow-hidden rounded-xl border p-2">
          <NotchNavDemo />

          <ItemFooter
            title="Notch Nav"
            href="/docs/components/notch-nav"
            className="group"
          />
        </ComponentWrapper>

        <ComponentWrapper className="group col-span-2 row-span-3 row-start-2 items-center justify-center overflow-hidden rounded-xl border p-2">
          <ProjectGalleryDemo />

          <ItemFooter
            title="Project Gallery"
            href="/docs/components/project-gallery"
            className="h-20"
          />
        </ComponentWrapper>

        <ComponentWrapper className="group row-start-4 flex items-center justify-center overflow-hidden rounded-xl border p-2">
          <HackerTextDemo />

          <ItemFooter title="Hacker Text" href="/docs/components/hacker-text" />
        </ComponentWrapper>

        <ComponentWrapper className="group col-span-2 row-start-5 flex items-center justify-center overflow-hidden rounded-xl border p-2">
          <div className="absolute top-2 right-2">
            <RestartButton onRestart={() => setKey((prev) => prev + 1)} />
          </div>
          <BoxRevealDemo key={key} />

          <ItemFooter title="Box Reveal" href="/docs/components/box-reveal" />
        </ComponentWrapper>

        <ComponentWrapper className="group row-start-5 flex items-center justify-center overflow-hidden rounded-xl border p-2">
          <ShinyButtonDemo />

          <ItemFooter
            title="Shiny Button"
            href="/docs/components/shiny-button"
          />
        </ComponentWrapper>
      </div>
    </section>
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
