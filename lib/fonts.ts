import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontHeading = FontSans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
});

export const fontVariables = cn(
  fontSans.variable,
  fontHeading.variable,
  fontMono.variable
);
