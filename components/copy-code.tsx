"use client";

import { Check, Clipboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";

function useCopyToClipboard({ timeout = 2000 }: { timeout?: number } = {}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (value: string) => {
    if (typeof window === "undefined" || !navigator.clipboard.writeText) {
      return;
    }

    if (!value) return;

    navigator.clipboard.writeText(value).then(() => {
      setIsCopied(true);

      setTimeout(() => {
        setIsCopied(false);
      }, timeout);
    }, console.error);
  };

  return { isCopied, copyToClipboard };
}

interface CopyCodeProps {
  text: string;
  className?: string;
}

export default function CopyCode({ text, className }: CopyCodeProps) {
  const { isCopied, copyToClipboard } = useCopyToClipboard();

  if (isCopied) {
    return (
      <Button
        size="icon"
        variant="outline"
        className={cn(
          "relative z-10 h-6 w-6 bg-transparent text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
          className,
        )}
      >
        <Check />
      </Button>
    );
  }

  return (
    <Button
      size="icon"
      variant="outline"
      className={cn(
        "relative z-10 h-6 w-6 bg-transparent text-zinc-50 hover:bg-zinc-700 hover:text-zinc-50 [&_svg]:h-3 [&_svg]:w-3",
        className,
      )}
      onClick={() => copyToClipboard(text)}
    >
      <Clipboard />
    </Button>
  );
}
