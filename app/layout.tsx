import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "@/styles/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PostHogProvider } from "@/components/posthog-provider";
import { siteConfig } from "@/config/site";
import { Metadata } from "next";
import { LenisProvider } from "@/components/lenis-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  keywords: ["Next.js", "React", "Tailwind CSS", "UI"],
  authors: [
    {
      name: "Snehdeep Dupare",
      url: "https://snehdeepdupare.in",
    },
  ],
  creator: "Snehdeep Dupare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@Snehdeep__",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased min-h-svh flex flex-col bg-background selection:bg-emerald-200/50 selection:text-emerald-900 dark:selection:bg-emerald-400/10 dark:selection:text-emerald-300`}
      >
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <LenisProvider>
              <Header />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
              <Analytics />
            </LenisProvider>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
