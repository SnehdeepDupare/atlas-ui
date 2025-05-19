"use client";

import Image from "next/image";
import Link from "next/link";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { FaGithub } from "react-icons/fa";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "./command-menu";
import { MobileNav } from "./mobile-nav";

export const Header = () => {
  const { setTheme, theme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur dark:backdrop-blur-sm   shadow-md dark:shadow-primary-foreground">
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
                  : "text-foreground/80"
              )}
            >
              Docs
            </Link>

            <Link
              href="/docs/components/animated-mobile-navbar"
              className={cn(
                "transition-colors hover:text-foreground/80 hidden md:block",
                pathname?.startsWith("/docs/components")
                  ? "text-foreground"
                  : "text-foreground/80"
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
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
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

              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 px-0"
                onClick={changeTheme}
              >
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
