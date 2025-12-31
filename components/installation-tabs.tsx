"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

export const InstallationTabs = ({
  children,
}: React.ComponentProps<typeof Tabs>) => {
  const [config, setConfig] = useConfig();

  const installationType = React.useMemo(() => {
    return config.installationType || "cli";
  }, [config]);

  return (
    <Tabs
      value={installationType}
      onValueChange={(value) =>
        setConfig({
          ...config,
          installationType: value as "cli" | "manual",
        })
      }
      className="relative mt-6 w-full"
    >
      <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
        <TabsTrigger
          value="cli"
          className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
        >
          CLI
        </TabsTrigger>
        <TabsTrigger
          value="manual"
          className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-emerald-500 data-[state=active]:text-emerald-400 data-[state=active]:shadow-none"
        >
          Manual
        </TabsTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};
