"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { motion } from "motion/react";

import { type DocsConfig } from "@/config/docs";
import { cn, getCurrentBase, updateComponentPathname } from "@/lib/utils";
import { SidebarNavItem } from "@/types/nav";

export function DocsNav({ config }: { config: DocsConfig }) {
  const pathname = usePathname();
  const currentBase = getCurrentBase(pathname);
  const items = config.sidebarNav;

  return items.length ? (
    <div className="flex flex-col gap-6">
      {items.map((item, index) => (
        <div key={index} className="flex flex-col gap-1">
          <h4 className="rounded-md px-2 py-1 text-sm font-semibold">
            {item.title}{" "}
            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </h4>
          {item?.items?.length && (
            <DocsNavItems
              items={item.items}
              pathname={pathname}
              currentBase={currentBase}
            />
          )}
        </div>
      ))}
    </div>
  ) : null;
}

function DocsNavItems({
  items,
  pathname,
  currentBase,
}: {
  items: SidebarNavItem[];
  pathname: string | null;
  currentBase: string;
}) {
  return items?.length ? (
    <div className="grid grid-flow-row auto-rows-max gap-0.5 text-sm">
      {items.map((item, index) => {
        const href = item.href
          ? updateComponentPathname(currentBase, item.href)
          : null;
        const isActive = pathname === href;
        return item.href && !item.disabled ? (
          <Link
            key={index}
            href={href!}
            className={cn(
              "group text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:border-ring focus-visible:ring-ring/50 relative flex h-8 w-full items-center rounded-r-lg px-2 font-normal underline-offset-2 outline-none hover:rounded-lg focus-visible:rounded-lg focus-visible:ring-[3px]",
              item.disabled && "cursor-not-allowed opacity-60",
              isActive && "text-accent-foreground font-medium"
            )}
            target={item.external ? "_blank" : ""}
            rel={item.external ? "noreferrer" : ""}
          >
            {isActive && (
              <motion.span
                layoutId="sidebar-active"
                className="bg-accent absolute inset-0 rounded-r-lg border-l-2 border-emerald-500"
                transition={{
                  duration: 0.2,
                  ease: "linear",
                }}
              />
            )}

            <span className="z-10">{item.title}</span>

            {item.label && (
              <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none text-[#000000] no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </Link>
        ) : (
          <span
            key={index}
            className={cn(
              "text-muted-foreground flex w-full cursor-not-allowed items-center rounded-md p-2 hover:underline",
              item.disabled && "cursor-not-allowed opacity-60"
            )}
          >
            {item.title}
            {item.label && (
              <span className="bg-muted text-muted-foreground ml-2 rounded-md px-1.5 py-0.5 text-xs leading-none no-underline group-hover:no-underline">
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </div>
  ) : null;
}
