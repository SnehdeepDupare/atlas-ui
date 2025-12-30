import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { useState } from "react";
import { Button } from "./ui/button";

interface ComponentSourceProps {
  children?: React.ReactNode;
  className?: string;
  filePath?: string;
}

export function ComponentSource({
  children,
  className,
  filePath,
}: ComponentSourceProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="relative">
      {filePath && (
        <span className="rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {filePath}
        </span>
      )}
      <Collapsible open={isOpened} onOpenChange={setIsOpened}>
        <div className={cn("relative overflow-hidden rounded-xl", className)}>
          <CollapsibleContent
            forceMount
            className={cn("overflow-hidden", !isOpened && "max-h-64")}
          >
            <div
              className={cn(
                !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto",
              )}
            >
              {children}
            </div>
          </CollapsibleContent>
          <div
            className={cn(
              "absolute flex items-end justify-center rounded-xl bg-linear-to-b from-transparent to-zinc-950/90 p-2",
              isOpened ? "inset-x-0 bottom-4 h-12" : "inset-0",
            )}
          >
            <CollapsibleTrigger asChild>
              <Button variant="secondary" className="h-8 text-xs">
                {isOpened ? "Collapse" : "View Code"}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
