import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface ComponentSourceProps {
  children?: React.ReactNode;
  className?: string;
}

export function ComponentSource({ children, className }: ComponentSourceProps) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="relative">
      <Collapsible open={isOpened} onOpenChange={setIsOpened}>
        <div
          className={cn(
            "relative overflow-hidden rounded-[9px] [&_pre]:my-0",
            className
          )}
        >
          <CollapsibleContent
            forceMount
            className={cn("overflow-hidden", !isOpened && "max-h-64")}
          >
            <div
              className={cn(
                !isOpened ? "[&_pre]:overflow-hidden" : "[&_pre]:overflow-auto"
              )}
            >
              {children}
            </div>
          </CollapsibleContent>
          <div
            className={cn(
              "absolute flex items-end justify-center rounded-[9px] bg-linear-to-b from-transparent from-50% to-zinc-50 p-2 dark:to-zinc-950/90",
              isOpened ? "inset-x-1 bottom-6 h-12" : "inset-0"
            )}
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="h-8 text-xs">
                {isOpened ? "Collapse" : "View Code"}
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
      </Collapsible>
    </div>
  );
}
