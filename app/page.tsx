import Link from "next/link";

import { Metadata } from "next";
import { RevealEffect } from "@/components/atlas_ui/(react)/reveal-effect";
import { Button } from "@/components/ui/button";
import { VideoShowcase } from "@/components/video-showcase";
import { FeaturesSection } from "@/components/features-section";
import { CtaSection } from "@/components/cta-section";
import { NewUpdateCallout } from "@/components/new-update-callout";
import { siteConfig } from "@/config/site";

const title = "Atlas UI";
const description =
  "Beautiful, Open Source, Motion powered components for React, Next.js, and Vanilla JS. Accelerate development, inspire creativity, and bring interfaces to life with seamless animations.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    url: siteConfig.url,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Snehdeep__",
  },
};

export default function Home() {
  return (
    <div className="relative flex flex-col h-full w-full mb-6">
      <div className="from-background via-background to-background fixed inset-0 -z-10 bg-gradient-to-br">
        <div className="fixed inset-0 hidden bg-gradient-to-br from-black via-zinc-900/90 to-black dark:block">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/20 via-emerald-950/5 to-transparent opacity-25"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDIiLz48L3N2Zz4=')]"></div>
        </div>
        <div className="fixed inset-0 bg-gradient-to-br from-white via-zinc-50/5 to-white dark:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50/30 via-amber-50/20 to-transparent opacity-70"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDIiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
        <RevealEffect translateY={10}>
          <NewUpdateCallout />
        </RevealEffect>

        <RevealEffect delay={0.1} translateY={10}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Motion Powered{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#36B49F] via-[#DBFF75] to-[#36B49F] bg-[length:200%] animate-bg-pan">
              Animated Components
            </span>{" "}
            for React, Next.js & Vanilla JS
          </h1>
        </RevealEffect>

        <RevealEffect delay={0.3} translateY={10}>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-5">
            Seamless animation meets effortless integration. Discover
            beautifully crafted components that accelerate development, inspire
            creativity, and bring interfaces to life.
          </p>
        </RevealEffect>

        <RevealEffect delay={0.5} translateY={10}>
          <div className="mb-4 flex w-full flex-col justify-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 mt-10">
            <Button
              asChild
              size="lg"
              className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-600/20 hover:bg-emerald-200/80 hover:text-emerald-800 hover:ring-emerald-600/30 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-1 dark:ring-inset dark:ring-emerald-400/20 dark:hover:bg-emerald-400/10 dark:hover:text-emerald-300 dark:hover:ring-emerald-300"
            >
              <Link href="/docs/components/animated-mobile-navbar">
                Explore Components
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              className="inline-flex gap-0.5 justify-center overflow-hidden text-sm font-medium transition px-4 ring-1 ring-inset bg-transparent text-zinc-900 ring-zinc-900/10 hover:bg-zinc-900/5 dark:bg-white/5 hover:text-zinc-900 dark:text-white dark:ring-white/10 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Link href="/docs">View Docs</Link>
            </Button>
          </div>
        </RevealEffect>
      </section>

      <VideoShowcase />

      <FeaturesSection />

      <CtaSection />
    </div>
  );
}
