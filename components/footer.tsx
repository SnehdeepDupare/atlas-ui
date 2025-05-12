import Link from "next/link";

import { siteConfig } from "@/config/site";

export const Footer = () => {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container-wrapper">
        <div className="container py-4">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Developed by{" "}
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer noopenner"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Snehdeep Dupare
            </Link>
            . Source code available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="font-medium underline underline-offset-4 hover:text-primary"
            >
              Github
            </Link>
            .
          </div>
        </div>
      </div>
    </footer>
  );
};
