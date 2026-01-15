"use client";

import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

export function MobileNav({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "extend-touch-target h-8 touch-manipulation items-center justify-start gap-2.5 p-0! hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 active:bg-transparent dark:hover:bg-transparent",
            className,
          )}
        >
          <div className="relative flex h-8 w-4 items-center justify-center">
            <div className="relative size-4">
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-px w-4 transition-all duration-100",
                  isOpen ? "top-[0.4rem] -rotate-45" : "top-1",
                )}
              />
              <span
                className={cn(
                  "bg-foreground absolute left-0 block h-px w-4 transition-all duration-100",
                  isOpen ? "top-[0.4rem] rotate-45" : "top-2.5",
                )}
              />
            </div>
            <span className="sr-only">Toggle Menu</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="bg-background/90 no-scrollbar h-(--radix-popper-available-height) w-(--radix-popper-available-width) min-[416px]:max-w-sm overflow-y-auto rounded-none border-y-0 border-r backdrop-blur shadow-none duration-300 ease-in-out overscroll-none data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={14}
      >
        <div className="flex flex-col gap-6">
          {docsConfig.sidebarNav.map((item, index) => (
            <div key={index} className="flex flex-col gap-y-1.5">
              <h4 className="rounded-md px-2 py-1 text-sm font-semibold">
                {item.title}
              </h4>
              {item.items?.map((item) =>
                !item.disabled && item.href ? (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setIsOpen}
                    className={cn(
                      "flex justify-between text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-60",
                    )}
                  >
                    {item.title}
                    <div>
                      {item.label && (
                        <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                          {item.label}
                        </span>
                      )}
                    </div>
                  </MobileLink>
                ) : (
                  <span
                    key={index}
                    className={cn(
                      "text-muted-foreground",
                      item.disabled && "cursor-not-allowed opacity-60",
                    )}
                  >
                    {item.title}
                    {item.label && (
                      <span className="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs leading-none text-muted-foreground no-underline group-hover:no-underline">
                        {item.label}
                      </span>
                    )}
                  </span>
                ),
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(
        className,
        "group flex h-8 w-full items-center rounded-r-lg px-2 font-normal text-foreground",
        isActive
          ? "bg-accent font-medium text-accent-foreground border-l-2 hover:rounded-l-none border-emerald-500"
          : "",
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
