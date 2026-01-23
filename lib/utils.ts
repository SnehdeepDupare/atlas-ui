import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fira_Code } from "next/font/google";

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
