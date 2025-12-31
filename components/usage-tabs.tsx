"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export const UsageTabs = ({ children }: React.ComponentProps<typeof Tabs>) => {
  const [config, setConfig] = useConfig();

  const usageType = React.useMemo(() => {
    return config.usageType || "React/Next";
  }, [config]);

  return (
    <Tabs
      value={usageType}
      onValueChange={(value) =>
        setConfig({
          ...config,
          usageType: value as "React/Next" | "JavaScript",
        })
      }
      className="relative mt-6 w-full"
    >
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="React/Next"
          className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
        >
          React/Next
        </TabsTrigger>
        <TabsTrigger
          value="JavaScript"
          className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none data-[state=active]:bg-transparent"
        >
          JavaScript
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
