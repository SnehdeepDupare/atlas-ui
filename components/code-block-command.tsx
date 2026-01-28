"use client";

import * as React from "react";

import { TerminalIcon } from "lucide-react";

import { CopyButton } from "@/components/copy-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useConfig } from "@/hooks/use-config";
import { firaCode } from "@/lib/utils";

export function CodeBlockCommand({
  __npm__,
  __yarn__,
  __pnpm__,
  __bun__,
}: React.ComponentProps<"pre"> & {
  __npm__?: string;
  __yarn__?: string;
  __pnpm__?: string;
  __bun__?: string;
  __rawString__?: string;
}) {
  const [config, setConfig] = useConfig();
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => setHasCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const packageManager = config.packageManager || "pnpm";
  const tabs = React.useMemo(() => {
    return {
      pnpm: __pnpm__,
      npm: __npm__,
      yarn: __yarn__,
      bun: __bun__,
    };
  }, [__npm__, __pnpm__, __yarn__, __bun__]);

  const currentCommand = tabs[packageManager];

  return (
    <div className="relative mt-6 overflow-x-auto rounded-xl bg-zinc-900 dark:ring-1 dark:ring-white/10">
      <Tabs
        value={packageManager}
        className="gap-0"
        onValueChange={(value) => {
          setConfig({
            ...config,
            packageManager: value as "pnpm" | "npm" | "yarn" | "bun",
          });
        }}
      >
        <div className="flex items-center gap-3 border-b border-zinc-700 bg-zinc-800 px-3 py-1 dark:border-zinc-800 dark:bg-transparent">
          <div className="flex size-4 items-center justify-center rounded-[1px] bg-white opacity-70">
            <TerminalIcon className="size-3 text-black" />
          </div>
          <TabsList className="h-8 translate-y-1 gap-3 rounded-none bg-transparent p-0">
            {Object.entries(tabs).map(([key]) => {
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className={`${firaCode.className} rounded-none border-b border-transparent bg-transparent px-1 pt-1 pb-2 font-mono text-zinc-400 data-[state=active]:border-b-emerald-500 data-[state=active]:bg-transparent data-[state=active]:text-emerald-400 data-[state=active]:shadow-none`}
                >
                  {key}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        <div className="no-scrollbar overflow-x-auto dark:bg-white/2.5">
          {Object.entries(tabs).map(([key, value]) => {
            return (
              <TabsContent key={key} value={key} className="mt-0 px-4 py-5">
                <pre>
                  <code
                    className={`${firaCode.className} relative font-mono text-sm leading-none`}
                    data-language="bash"
                  >
                    {value}
                  </code>
                </pre>
              </TabsContent>
            );
          })}
        </div>
      </Tabs>

      {/* <Button
        data-slot="copy-button"
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 z-10 size-6 text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 focus-visible:opacity-100"
        onClick={copyCommand}
      >
        <span className="sr-only">Copy</span>
        {hasCopied ? <CheckIcon /> : <CopyIcon />}
      </Button> */}

      <CopyButton
        value={currentCommand || ""}
        event="copy_npm_command"
        className="absolute top-2 right-2"
        data-slot="copy-button"
      />
    </div>
  );
}
