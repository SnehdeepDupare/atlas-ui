"use client";

import { type DialogProps } from "@radix-ui/react-dialog";
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CornerDownLeftIcon,
  LaptopIcon,
  MoonIcon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { docsConfig } from "@/config/docs";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Kbd } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || e.key === "/") {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => unknown) => {
    setOpen(false);
    command();
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "relative h-8 w-full justify-start rounded-[0.5rem] border-none bg-white text-sm font-normal text-zinc-500 shadow-none ring-1 ring-zinc-900/10 transition hover:ring-zinc-900/20 sm:pr-12 md:w-40 lg:flex lg:w-56 xl:w-64 dark:bg-white/5 dark:text-zinc-400 dark:ring-white/10 dark:ring-inset dark:hover:ring-white/20",
          )}
          onClick={() => setOpen(true)}
          {...props}
        >
          <span className="hidden lg:inline-flex">Search documentation...</span>
          <span className="inline-flex lg:hidden">Search...</span>
          <div className="absolute top-1.5 right-1.5 hidden gap-1 group-has-data-[slot=designer]/body:hidden sm:flex">
            <Kbd>⌘K</Kbd>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>

        <Command className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:h-9! **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:h-9! **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border">
          <div className="relative">
            <CommandInput placeholder="Type a command or search..." />
          </div>
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty>No results found.</CommandEmpty>
            {docsConfig.sidebarNav.map((group) => (
              <CommandGroup
                key={group.title}
                heading={group.title}
                className="p-0! [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:p-3! [&_[cmdk-group-heading]]:pb-1!"
              >
                {group.items.map((navItem) => {
                  const isComponent = navItem.href?.includes("/components/");
                  return (
                    <CommandItem
                      key={navItem.href}
                      value={navItem.title}
                      className="data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-neutral-300 dark:data-[selected=true]:border-neutral-700"
                      onSelect={() => {
                        runCommand(() => router.push(navItem.href as string));
                      }}
                    >
                      <div className="mr-2 flex size-4 items-center justify-center">
                        {isComponent ? (
                          <div className="border-muted-foreground aspect-square size-4 rounded-full border border-dashed" />
                        ) : (
                          <ArrowRightIcon className="size-4" />
                        )}
                      </div>
                      {navItem.title}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ))}

            <CommandGroup
              heading="Theme"
              className="p-0! [&_[cmdk-group-heading]]:scroll-mt-16 [&_[cmdk-group-heading]]:p-3! [&_[cmdk-group-heading]]:pb-1!"
            >
              <CommandItem
                onSelect={() => runCommand(() => setTheme("light"))}
                className="data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-neutral-300 dark:data-[selected=true]:border-neutral-700"
                value="Light Theme"
              >
                <div className="mr-2 flex size-4 items-center justify-center">
                  <SunIcon />
                </div>
                Light
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-neutral-300 dark:data-[selected=true]:border-neutral-700"
                value="Dark Theme"
              >
                <div className="mr-2 flex size-4 items-center justify-center">
                  <MoonIcon />
                </div>
                Dark
              </CommandItem>
              <CommandItem
                onSelect={() => runCommand(() => setTheme("system"))}
                className="data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent px-3! font-medium data-[selected=true]:border-neutral-300 dark:data-[selected=true]:border-neutral-700"
                value="System Theme"
              >
                <div className="mr-2 flex size-4 items-center justify-center">
                  <LaptopIcon />
                </div>
                System
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>

        <div className="text-muted-foreground absolute inset-x-0 bottom-0 z-20 flex h-10 items-center gap-2 rounded-b-xl border-t border-t-neutral-100 bg-neutral-50 px-4 text-xs font-medium dark:border-t-neutral-700 dark:bg-neutral-800">
          <div className="flex items-center gap-2">
            <CommandMenuKbd>
              <CornerDownLeftIcon />
            </CommandMenuKbd>
            Go to Page
          </div>

          <Separator
            orientation="vertical"
            className="bg-muted-foreground/10 h-4!"
          />
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <CommandMenuKbd>
                <ArrowUpIcon />
              </CommandMenuKbd>
              <CommandMenuKbd>
                <ArrowDownIcon />
              </CommandMenuKbd>
            </div>
            Navigate
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<"kbd">) {
  return (
    <kbd
      className={cn(
        "bg-background text-muted-foreground pointer-events-none flex h-5 items-center justify-center gap-1 rounded border px-1 font-sans text-[0.7rem] font-medium select-none [&_svg:not([class*='size-'])]:size-3",
        className,
      )}
      {...props}
    />
  );
}
