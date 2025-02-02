import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Fira_Code } from "next/font/google";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const firaCode = Fira_Code({ subsets: ["latin"] });
