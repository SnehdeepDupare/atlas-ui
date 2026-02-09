"use client";

import * as React from "react";

import { useConfig } from "@/hooks/use-config";

import { Tabs, TabsIndicator, TabsList, TabsTrigger } from "./ui/tabs";

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
        <TabsTrigger value="React">React</TabsTrigger>
        <TabsTrigger value="HTML">HTML</TabsTrigger>

        <TabsIndicator className="h-0.5 translate-y-0 rounded-none shadow-none" />
      </TabsList>
      {children}
    </Tabs>
  );
};
