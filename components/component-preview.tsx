/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ComponentWrapper from "@/components/component-wrapper";

import { Index } from "@/registry/__index__";
import { OpenInV0Button } from "@/components/open-in-v0-button";
import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export function ComponentPreview({ name, children }: ComponentPreviewProps) {
  const [key, setKey] = React.useState(0);
  const Code = (
    React.Children.toArray(children) as React.ReactElement<any>[]
  )[0];

  const Preview = React.useMemo(() => {
    const Component = Index[name]?.component;
    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
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
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="relative rounded-md">
          <ComponentWrapper>
            <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
              <OpenInV0Button
                url={`https://atlasui.vercel.app/r/${name}.json`}
              />

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
              className="min-h-80 flex items-center justify-center flex-wrap gap-y-3 w-full mx-auto lg:px-10 pb-7"
            >
              <React.Suspense
                fallback={
                  <div className="flex w-full items-center justify-center text-sm text-muted-foreground">
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
          className="border border-input rounded-xl relative overflow-hidden"
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
