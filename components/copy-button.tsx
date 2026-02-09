"use client";

import * as React from "react";

import { CheckIcon, CopyIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Event, trackEvent } from "@/lib/events";
import { cn } from "@/lib/utils";

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
  value: string;
  src?: string;
  event?: Event["name"];
}

export async function copyToClipboardWithMeta(value: string, event?: Event) {
  navigator.clipboard.writeText(value);
  if (event) {
    trackEvent(event);
  }
}

const motionIconVariants = {
  initial: { opacity: 0, scale: 0.8, filter: "blur(2px)" },
  animate: { opacity: 1, scale: 1, filter: "blur(0px)" },
  exit: { opacity: 0, scale: 0.8 },
};

const motionIconProps = {
  variants: motionIconVariants,
  initial: "initial",
  animate: "animate",
  exit: "exit",
};

export function CopyButton({
  value,
  className,
  src,
  variant = "ghost",
  event,
  ...props
}: CopyButtonProps) {
  const [hasCopied, setHasCopied] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          data-slot="copy-button"
          size="icon"
          variant={variant}
          className={cn(
            "relative z-10 size-6 text-zinc-50 opacity-70 hover:bg-zinc-700 hover:text-zinc-50 hover:opacity-100",
            className
          )}
          onClick={() => {
            copyToClipboardWithMeta(
              value,
              event
                ? {
                    name: event,
                    properties: {
                      code: value,
                    },
                  }
                : undefined
            );
            setHasCopied(true);
          }}
          {...props}
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {hasCopied ? (
              <motion.span key="copied" {...motionIconProps}>
                <CheckIcon className="size-4" strokeWidth={3} />
              </motion.span>
            ) : (
              <motion.span key="idle" {...motionIconProps}>
                <CopyIcon className="size-4" />
              </motion.span>
            )}
          </AnimatePresence>
          <span className="sr-only">Copy</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        {hasCopied ? "Copied" : "Copy to Clipboard"}
      </TooltipContent>
    </Tooltip>
  );
}
