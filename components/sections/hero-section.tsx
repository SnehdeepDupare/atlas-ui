import Link from "next/link";

import { NewUpdateCallout } from "@/components/new-update-callout";
import { Button } from "@/components/ui/button";
import { RevealEffect } from "@/registry/react/atlasui/reveal-effect";

export const HeroSection = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:px-8">
      <RevealEffect translateY={10}>
        <NewUpdateCallout />
      </RevealEffect>

      <RevealEffect delay={0.1} translateY={10}>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Motion Powered{" "}
          <span className="animate-bg-pan bg-linear-to-r from-[#36B49F] via-[#DBFF75] to-[#36B49F] bg-size-[200%] bg-clip-text text-transparent">
            Animated Components
          </span>{" "}
          for React & Vanilla JS
        </h1>
      </RevealEffect>

      <RevealEffect delay={0.3} translateY={10}>
        <p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-sm md:text-base">
          Seamless animation meets effortless integration. Discover beautifully
          crafted components that accelerate development, inspire creativity,
          and bring interfaces to life.
        </p>
      </RevealEffect>

      <RevealEffect delay={0.5} translateY={10}>
        <div className="mt-10 mb-4 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <Button
            asChild
            size="lg"
            className="inline-flex justify-center gap-0.5 overflow-hidden rounded-full bg-emerald-100 text-sm font-medium text-emerald-700 ring-1 ring-emerald-600/20 transition ring-inset hover:bg-emerald-200/80 hover:text-emerald-800 hover:ring-emerald-600/30 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-emerald-400/20 dark:ring-inset dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
          >
            <Link href="/docs/components">Browse Components</Link>
          </Button>

          <Button
            asChild
            size="lg"
            className="inline-flex justify-center gap-0.5 overflow-hidden rounded-full bg-transparent px-4 text-sm font-medium text-zinc-900 ring-1 ring-zinc-900/10 transition ring-inset hover:bg-zinc-900/5 hover:text-zinc-900 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <Link href="/docs">View Docs</Link>
          </Button>
        </div>
      </RevealEffect>
    </section>
  );
};
