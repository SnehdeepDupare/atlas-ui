/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ComponentWrapper from "@/components/component-wrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import * as React from "react";

import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Button } from "@/components/ui/button";
import { Index } from "@/registry/__index__";
import { RotateCcwIcon } from "lucide-react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  overflow?: "hidden" | "auto" | "visible";
}

export function ComponentPreview({
  name,
  children,
  overflow = "hidden",
}: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const Code = (
    React.Children.toArray(children) as React.ReactElement<any>[]
  )[0];

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;
    if (!Component) {
      return (
        <p className="text-muted-foreground text-sm">
          Component{" "}
          <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found in registry.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  return (
    <div className="relative my-4 flex flex-col space-y-2">
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="text-muted-foreground relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="text-muted-foreground relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="relative rounded-md">
          <ComponentWrapper overflow={overflow}>
            <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
              <OpenInV0Button url={`https://atlasui.dev/r/${name}.json`} />

              <Button
                onClick={() => setKey((prev) => prev + 1)}
                variant="ghost"
                size="icon"
                className="size-8"
              >
                <RotateCcwIcon aria-label="restart-btn" className="size-4" />
              </Button>
            </div>
            <div
              key={key}
              className="mx-auto flex min-h-80 w-full flex-wrap items-center justify-center gap-y-3 pb-7 lg:px-10"
            >
              <React.Suspense
                fallback={
                  <div className="text-muted-foreground flex w-full items-center justify-center text-sm">
                    Loading...
                  </div>
                }
              >
                {Preview}
              </React.Suspense>
            </div>
          </ComponentWrapper>
        </TabsContent>
        <TabsContent
          value="code"
          className="border-input relative overflow-hidden rounded-xl border"
        >
          <div className="flex flex-col space-y-4">
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-100">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
