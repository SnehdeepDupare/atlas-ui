"use client";
import * as React from "react";
import { demoComponents } from "@/config/demo-components";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CopyCode from "@/components/copy-code";
import ComponentWrapper from "./component-wrapper";

interface ComponentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

export function ComponentPreview({ name, children }: ComponentPreviewProps) {
  const Code = (React.Children.toArray(children) as React.ReactElement<any>[])[0];

  const Preview = React.useMemo(() => {
    const Component = demoComponents[name]?.component;
    if (!Component) {
      return (
        <p className="text-sm text-muted-foreground">
          Component{" "}
          <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
            {name}
          </code>{" "}
          not found.
        </p>
      );
    }

    return <Component />;
  }, [name]);

  const codeString = React.useMemo(() => {
    return Code?.props?.__rawString__ || null;
  }, [Code]);

  return (
    <div className="relative my-4 flex flex-col space-y-2">
      <Tabs defaultValue="preview" className="relative mr-auto w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="preview"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
          >
            Preview
          </TabsTrigger>
          <TabsTrigger
            value="code"
            className="relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
          >
            Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="relative rounded-md">
          <ComponentWrapper>
            <div className="min-h-80 flex items-center justify-center flex-wrap gap-y-3 w-full mx-auto lg:px-10 pb-7 mt-1.5">
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
            <div className="w-full rounded-md [&_pre]:my-0 [&_pre]:max-h-[400px] [&_pre]:whitespace-pre-wrap">
              {Code}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
