"use client";

import Image from "next/image";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur-sm dark:backdrop-blur-xs   shadow-md dark:shadow-primary-foreground">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MobileNav />

          <nav className="flex items-center gap-4 text-sm xl:gap-6">
            <Link href="/" className="flex items-center gap-2 group mr-3">
              <Image
                src="/logo-dark.svg"
                alt="Atlas UI Logo"
                width={32}
                height={32}
                className="rounded-md group-hover:opacity-0 transition-opacity duration-500 ease-in-out invert dark:invert-0"
              />

              <Image
                src="/logo-dark-gradient.svg"
                alt="Atlas UI Logo"
                width={32}
                height={32}
                className="rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out absolute"
              />

              <h1 className="font-bold text-2xl hidden md:block">Atlas UI</h1>
            </Link>

            <Link
              href="/docs"
              className={cn(
                "transition-colors hover:text-foreground/80 hidden md:block",
                pathname === "/docs/installation"
                  ? "text-foreground"
                  : "text-foreground/80",
              )}
            >
              Docs
            </Link>

            <Link
              href="/docs/components"
              className={cn(
                "transition-colors hover:text-foreground/80 hidden md:block",
                pathname?.startsWith("/docs/components")
                  ? "text-foreground"
                  : "text-foreground/80",
              )}
            >
              Components
            </Link>
          </nav>

          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>

            <div className="flex items-center gap-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    asChild
                  >
                    <Link
                      href={siteConfig.links.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FaGithub className="h-4 w-4" />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View on GitHub</p>
                </TooltipContent>
              </Tooltip>

              <ModeToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
