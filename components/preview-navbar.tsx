"use client";

import Link from "next/link";
import { notFound, usePathname } from "next/navigation";

import { ArrowLeftIcon, Code2Icon } from "lucide-react";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Index } from "@/registry/__index__";
import { html as htmlRegistry } from "@/registry/registry-html";
import { htmlExamples as htmlExamplesRegistry } from "@/registry/registry-html-examples";

export const PreviewNavbar = () => {
  const pathname = usePathname();

  const componentName = pathname.split("/")[2];

  const isHtml =
    componentName.endsWith("-html") ||
    componentName.endsWith("-html-example") ||
    componentName.endsWith("-html-demo");

  const component = isHtml
    ? [...htmlRegistry, ...htmlExamplesRegistry].find(
        (component) => component.name === componentName
      )
    : Index[componentName];

  if (!component) {
    return notFound();
  }

  const base = isHtml ? "html" : "react";
  const componentUrl = component.registryDependencies[0]
    .replace("https://atlasui.dev/r/", "")
    .replace("-html", "")
    .replace(".json", "");

  return (
    <div className="fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 items-center justify-between gap-2 rounded-full border border-neutral-200/50 bg-white/90 p-1 shadow-lg backdrop-blur-sm dark:border-neutral-700/50 dark:bg-neutral-900/90">
      <Button asChild variant="ghost" className="rounded-full" size="lg">
        <Link href="/docs/components" className="flex items-center">
          <ArrowLeftIcon className="size-4" />
          <span className="hidden sm:inline">Components</span>
        </Link>
      </Button>

      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 h-6!"
      />

      <div className="flex items-center gap-2 px-2 sm:px-3">
        <span className="max-w-[120px] truncate text-sm font-medium sm:max-w-[200px]">
          {componentName}
        </span>
      </div>

      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 h-6!"
      />

      <ModeToggle className="rounded-full" />

      <Separator
        orientation="vertical"
        className="bg-muted-foreground/30 h-6!"
      />

      <Button asChild variant="ghost" className="rounded-full" size="lg">
        <Link
          href={`/docs/components/${base}/${componentUrl}`}
          className="flex items-center"
        >
          <Code2Icon className="size-4" />
          <span className="hidden sm:inline">Code</span>
        </Link>
      </Button>
    </div>
  );
};
