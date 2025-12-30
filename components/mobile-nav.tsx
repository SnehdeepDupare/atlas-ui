"use client";

import Image from "next/image";
import Link, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { HiBars2 } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { docsConfig } from "@/config/docs";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-3 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <HiBars2 className="h-[1.2rem] w-[1.2rem]" />

          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="space-y-0">
        <Link
          href="/"
          onClick={() => {
            setIsOpen(false);
          }}
          className="flex items-center h-16 border-b gap-2"
        >
          <Image
            src="/logo-dark.svg"
            alt="Atlas UI Logo"
            width={32}
            height={32}
            className="rounded-md"
          />
          <h1 className="font-bold text-2xl">Atlas UI</h1>
        </Link>
        <ScrollArea className="h-[calc(100svh-4rem)] scroll py-4 ">
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
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
    <SheetClose asChild>
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
    </SheetClose>
  );
}
