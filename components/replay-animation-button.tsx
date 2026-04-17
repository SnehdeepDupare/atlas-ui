"use client";

import { RotateCcwIcon } from "lucide-react";
import { motion } from "motion/react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface ReplayAnimationButtonProps {
  onClick: () => void;
  className?: string;
}

export const ReplayAnimationButton = ({
  onClick,
  className,
}: ReplayAnimationButtonProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={onClick}
          variant="ghost"
          size="icon"
          className={cn("size-8", className)}
          aria-label="replay-animation-btn"
        >
          <motion.span
            tabIndex={-1}
            className="flex h-full w-full items-center justify-center"
            animate={{ rotate: 0 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            whileTap={{ rotate: -90 }}
          >
            <RotateCcwIcon className="size-4" />
          </motion.span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Replay Animation</p>
      </TooltipContent>
    </Tooltip>
  );
};
