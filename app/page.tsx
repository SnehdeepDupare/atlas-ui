import { CtaSection } from "@/components/sections/cta-section";
import { FeaturesSection } from "@/components/sections/features-section";
import { ComponentShowcase } from "@/components/sections/component-showcase";
import { HeroSection } from "@/components/sections/hero-section";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";

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
    <div className="relative mb-6 flex h-full w-full flex-col">
      <div className="from-background via-background to-background fixed inset-0 -z-10 bg-linear-to-br">
        <div className="fixed inset-0 hidden bg-linear-to-br from-black via-zinc-900/90 to-black dark:block">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-emerald-900/20 via-emerald-950/5 to-transparent opacity-25"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDIiLz48L3N2Zz4=')]"></div>
        </div>
        <div className="fixed inset-0 bg-linear-to-br from-white via-zinc-50/5 to-white dark:hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,var(--tw-gradient-stops))] from-blue-50/30 via-amber-50/20 to-transparent opacity-70"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDIiLz48L3N2Zz4=')]"></div>
        </div>
      </div>

      <HeroSection />

      <ComponentShowcase />

      <FeaturesSection />

      <CtaSection />
    </div>
  );
}
