import { docsConfig } from "@/config/docs";
import { getAllDocsLinks } from "@/lib/utils";

import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://atlasui.dev";

  const routes = getAllDocsLinks(docsConfig).filter((route) => {
    if (route.endsWith(".txt")) return false;
    return true;
  });

  return routes.map((route) => {
    let priority = 0.7;

    if (route === "/") priority = 1;
    else if (route === "/docs") priority = 0.9;
    else if (route.startsWith("/docs/components")) priority = 0.8;

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      priority,
    };
  });
}
