"use client";

import { FaGithub } from "react-icons/fa";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { CommandMenu } from "@/components/command-menu";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();
  return (
    <header className="dark:shadow-primary-foreground sticky top-0 z-50 w-full border-b shadow-md backdrop-blur-sm dark:backdrop-blur-xs">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <MobileNav className="mr-3 md:hidden" />

          <nav className="flex items-center text-sm">
            <Link
              href="/"
              className="group focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mr-3 flex items-center gap-2 rounded-md transition-all outline-none focus-visible:ring-[3px]"
            >
              <Image
                src="/logo-dark.svg"
                alt="Atlas UI Logo"
                width={32}
                height={32}
                className="rounded-md invert transition-opacity duration-500 ease-in-out group-hover:opacity-0 dark:invert-0"
              />

              <Image
                src="/logo-dark-gradient.svg"
                alt="Atlas UI Logo"
                width={32}
                height={32}
                className="absolute rounded-md opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              />

              <h1 className="hidden text-2xl font-bold md:block">Atlas UI</h1>
            </Link>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/docs">Docs</Link>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="hidden md:inline-flex"
            >
              <Link href="/docs/components">Components</Link>
            </Button>
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
                      <FaGithub className="size-4" />
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
