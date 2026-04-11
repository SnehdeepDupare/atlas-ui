import Link from "next/link";

import { FullscreenIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const FullScreenButton = ({ name }: { name: string }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="ghost"
          size="icon"
          className="size-8"
          aria-label="Open in fullscreen"
        >
          <Link href={`/preview/${name}`} target="_blank">
            <FullscreenIcon className="size-4" />
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Open in fullscreen</p>
      </TooltipContent>
    </Tooltip>
  );
};
