import { Fira_Code } from "next/font/google";

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { DocsConfig, NavItemWithChildren } from "@/types/nav";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const firaCode = Fira_Code({ subsets: ["latin"] });

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function getAllDocsLinks(docsConfig: DocsConfig): string[] {
  const links = new Set<string>();

  const collect = (items: NavItemWithChildren[]) => {
    for (const item of items) {
      if (item.href) {
        links.add(item.href);
      }
      if (item.items && item.items.length > 0) {
        collect(item.items);
      }
    }
  };

  collect(docsConfig.mainNav as NavItemWithChildren[]);

  for (const section of docsConfig.sidebarNav) {
    collect(section.items as NavItemWithChildren[]);
  }

  return Array.from(links);
}

export const getCurrentBase = (pathname: string) => {
  const baseMatch = pathname.match(/\/docs\/components\/(react|html)\//);
  return baseMatch ? baseMatch[1] : "react"; // Default to react.
};

export const updateComponentPathname = (base: string, pathname: string) => {
  if (!pathname) return pathname;

  if (pathname === "/docs/components") return pathname;

  if (pathname.includes("/docs/components")) {
    const segments = pathname.split("/");
    const component = segments[segments.length - 1];
    return `/docs/components/${base}/${component}`;
  }

  return pathname;
};
