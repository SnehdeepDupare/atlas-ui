"use client";

import { useEffect, useState } from "react";

import { CircleArrowUpIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const toggleVisibility = () => {
      const shouldBeVisible = window.scrollY > 300;
      setIsVisible((prev) =>
        prev !== shouldBeVisible ? shouldBeVisible : prev
      );
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <button
      className={cn(
        "text-muted-foreground hover:text-foreground inline-flex items-center text-sm transition-all duration-200 ease-out",
        isVisible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <CircleArrowUpIcon className="mr-2 size-4" />
      Scroll to top
    </button>
  );
};
