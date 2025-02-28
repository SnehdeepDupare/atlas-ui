import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">
      <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight ">
          Ready-to-Use Animated Components for Modern Interfaces
        </h1>
        <p className="text-muted-foreground max-w-xl mx-auto mt-5">
          An open-source library of prebuilt components, crafted with TypeScript
          and Tailwind CSS. Powered by motion for React and Next.js, with
          seamless options for Vanilla JS and CSS. Built to save time, inspire
          creativity, and elevate your UI.
        </p>
        <Link href="/docs">
          <Button size="lg" className="mt-10">
            Explore Components
          </Button>
        </Link>
      </section>
    </div>
  );
}
