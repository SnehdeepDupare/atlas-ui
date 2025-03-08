"use client";

import Link from "next/link";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { HiBars2 } from "react-icons/hi2";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CommandMenu } from "./command-menu";
import { DocsNav } from "./docs-nav";
import { docsConfig } from "@/config/docs";

export const Header = () => {
  const { setTheme, theme } = useTheme();

  const changeTheme = () => {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };
  return (
    <header className="sticky top-0 z-50 w-full border-b  backdrop-blur dark:backdrop-blur-sm   shadow-md dark:shadow-primary-foreground">
      <div className="container-wrapper">
        <div className="container flex h-14 items-center">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <HiBars2 className="h-[1.2rem] w-[1.2rem]" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>
                    <Link href="/">
                      <h3 className="font-semibold text-2xl mb-4 text-left">
                        AtlasUI.
                      </h3>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <DocsNav config={docsConfig} />
              </SheetContent>
            </Sheet>
          </div>

          <Link href="/">
            <h3 className="font-semibold text-2xl">AtlasUI.</h3>
          </Link>

          <div className="flex flex-1 items-center justify-between gap-2 md:justify-end">
            <div className="w-full flex-1 md:w-auto md:flex-none">
              <CommandMenu />
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 px-0">
                {/* change link later */}
                <Link href="/" target="_blank" rel="noreferrer">
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
