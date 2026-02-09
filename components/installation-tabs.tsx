"use client";

import * as React from "react";

import {
  Tabs,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";

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
        <TabsTrigger value="cli">CLI</TabsTrigger>
        <TabsTrigger value="manual">Manual</TabsTrigger>

        <TabsIndicator className="h-0.5 translate-y-0 rounded-none shadow-none" />
      </TabsList>
      {children}
    </Tabs>
  );
};
