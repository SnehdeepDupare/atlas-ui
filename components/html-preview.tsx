"use client";

import * as React from "react";

import Link from "next/link";

import { FullscreenIcon, RotateCcwIcon } from "lucide-react";

import ComponentWrapper from "@/components/component-wrapper";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { firaCode } from "@/lib/utils";

interface HtmlPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export function HtmlPreview({ name, children }: HtmlPreviewProps) {
  const [key, setKey] = React.useState(0);
  const iframeSrc = `/api/html-preview/${name}`;

  const codeBlocks = React.Children.toArray(
    children
  ) as React.ReactElement<any>[];

  // Helper to find a code block by its data-file-label
  const getCodeBlock = (label: string) => {
    return codeBlocks.find((child) => {
      return child?.props?.children?.props?.["__file_label__"] === label;
    });
  };

  const htmlBlock = getCodeBlock("index.html");
  const cssBlock = getCodeBlock("style.css");
  const jsBlock = getCodeBlock("script.js");

  return (
    <div className="relative my-4 flex flex-col space-y-2">
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <TabsList className="mb-2 w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>

          <TabsIndicator className="h-0.5 translate-y-0 rounded-none shadow-none" />
        </TabsList>
        <TabsContent value="preview" className="relative rounded-md">
          <ComponentWrapper className="overflow-hidden">
            <div className="absolute top-2 right-2 z-10 flex items-center gap-1">
              <Button asChild variant="ghost" size="icon" className="size-8">
                <Link href={`/preview/${name}`} target="_blank">
                  <FullscreenIcon
                    aria-label="fullscreen-btn"
                    className="size-4"
                  />
                </Link>
              </Button>

              <Button
                onClick={() => setKey((prev) => prev + 1)}
                variant="ghost"
                size="icon"
                className="size-8"
              >
                <RotateCcwIcon aria-label="restart-btn" className="size-4" />
              </Button>
            </div>
            <iframe
              key={key}
              src={iframeSrc}
              title={`${name} preview`}
              className="mx-auto flex min-h-100 w-full flex-wrap items-center justify-center gap-y-3"
              sandbox="allow-scripts allow-same-origin"
            />
          </ComponentWrapper>
        </TabsContent>
        <TabsContent value="code" className="relative">
          <Tabs
            defaultValue="index.html"
            className="relative w-full gap-0 overflow-hidden rounded-xl bg-zinc-900 dark:ring-1 dark:ring-white/10"
          >
            <TabsList className="flex w-full items-center justify-start gap-3 rounded-none border-b border-zinc-700 bg-zinc-800 px-3 py-1 dark:border-zinc-800 dark:bg-transparent">
              {htmlBlock && (
                <TabsTrigger
                  value="index.html"
                  className={`rounded-md p-0 px-1 text-zinc-400 ${firaCode.className}`}
                >
                  index.html
                </TabsTrigger>
              )}
              {cssBlock && (
                <TabsTrigger
                  value="style.css"
                  className={`rounded-md p-0 px-1 text-zinc-400 ${firaCode.className}`}
                >
                  style.css
                </TabsTrigger>
              )}
              {jsBlock && (
                <TabsTrigger
                  value="script.js"
                  className={`rounded-md p-0 px-1 text-zinc-400 ${firaCode.className}`}
                >
                  script.js
                </TabsTrigger>
              )}
              <TabsIndicator className="z-10 h-0.5 translate-y-0 rounded-none shadow-none" />
            </TabsList>

            {htmlBlock && (
              <TabsContent value="index.html">
                <div className="w-full rounded-md dark:bg-white/2.5 [&_pre]:my-0 [&_pre]:max-h-100 [&_pre]:rounded-none [&_pre]:border-0">
                  {htmlBlock}
                </div>
              </TabsContent>
            )}
            {cssBlock && (
              <TabsContent value="style.css">
                <div className="w-full rounded-md dark:bg-white/2.5 [&_pre]:my-0 [&_pre]:max-h-100 [&_pre]:rounded-none [&_pre]:border-0">
                  {cssBlock}
                </div>
              </TabsContent>
            )}
            {jsBlock && (
              <TabsContent value="script.js">
                <div className="w-full rounded-md dark:bg-white/2.5 [&_pre]:my-0 [&_pre]:max-h-100 [&_pre]:rounded-none [&_pre]:border-0">
                  {jsBlock}
                </div>
              </TabsContent>
            )}
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  );
}
