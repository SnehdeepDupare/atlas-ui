"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export const UsageTabs = ({ children }: React.ComponentProps<typeof Tabs>) => {
  const [config, setConfig] = useConfig();

  const usageType = React.useMemo(() => {
    return config.usageType || "React";
  }, [config]);

  return (
    <Tabs
      value={usageType}
      onValueChange={(value) =>
        setConfig({
          ...config,
          usageType: value as "React" | "HTML",
        })
      }
      className="relative mt-6 w-full"
    >
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="React"
          className="text-muted-foreground relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
        >
          React
        </TabsTrigger>
        <TabsTrigger
          value="HTML"
          className="text-muted-foreground relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pt-2 pb-3 font-semibold shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
        >
          HTML
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
