import fs from "node:fs";
import path from "node:path";

import { allDocs } from "@/.contentlayer/generated";
import { getRegistryItem } from "@/lib/registry";
import { html as htmlRegistry } from "@/registry/registry-html";
import { htmlExamples as htmlExamplesRegistry } from "@/registry/registry-html-examples";

const HTML_FILE_CONFIGS: Record<string, { filename: string; lang: string }> = {
  html: { filename: "index.html", lang: "html" },
  css: { filename: "style.css", lang: "css" },
  js: { filename: "script.js", lang: "javascript" },
};

/**
 * Resolve the directory on disk for an HTML registry entry.
 */
function getHtmlComponentDir(name: string): string | null {
  const entry = [...htmlRegistry, ...htmlExamplesRegistry].find(
    (item) => item.name === name
  );

  if (entry?.files?.[0]?.path) {
    const firstFilePath = entry.files[0].path as string;
    return path.join(process.cwd(), "registry", path.dirname(firstFilePath));
  }

  return null;
}

/**
 * Read a specific file (index.html / style.css / script.js) from an HTML
 * component directory. Returns `null` when the file doesn't exist.
 */
function readHtmlFile(
  componentDir: string,
  fileType: string
): { content: string; lang: string } | null {
  const config = HTML_FILE_CONFIGS[fileType];
  if (!config) return null;

  const filePath = path.join(componentDir, config.filename);
  if (!fs.existsSync(filePath)) return null;

  return { content: fs.readFileSync(filePath, "utf-8"), lang: config.lang };
}

const getComponentList = async () => {
  const components = allDocs.filter((doc) =>
    doc.slugAsParams?.startsWith("components/")
  );

  if (components.length === 0) {
    return;
  }

  return components
    .map(
      (component) =>
        `- [${component.title}](https://atlasui.dev${component.slug})`
    )
    .join("\n");
};

export const processMdxContent = async (content: string) => {
  // Replace <ComponentsList /> with a markdown list of components.
  const componentsListRegex = /<ComponentsList\s*\/>/g;
  const componentListReplacement = await getComponentList();
  content = content.replace(
    componentsListRegex,
    componentListReplacement || ""
  );

  // ── HtmlPreview ──────────────────────────────────────────────────────
  // Replace <HtmlPreview name="..." /> with index.html, style.css, and
  // script.js code blocks.
  const htmlPreviewRegex = /<HtmlPreview[\s\S]*?name="([^"]+)"[\s\S]*?\/>/g;

  const htmlPreviewMatches = [...content.matchAll(htmlPreviewRegex)];

  for (const [fullMatch, name] of htmlPreviewMatches) {
    const componentDir = getHtmlComponentDir(name);
    if (!componentDir) continue;

    const blocks: string[] = [];

    for (const fileType of ["html", "css", "js"] as const) {
      const file = readHtmlFile(componentDir, fileType);
      if (file) {
        blocks.push(`\`\`\`${file.lang}\n${file.content}\n\`\`\``);
      }
    }

    if (blocks.length > 0) {
      content = content.replace(fullMatch, blocks.join("\n\n"));
    }
  }

  // ── ComponentSource / ComponentPreview (with optional file attr) ─────
  const componentRegex =
    /<(ComponentSource|ComponentPreview)[\s\S]*?name="([^"]+)"[\s\S]*?\/>/g;

  const matches = [...content.matchAll(componentRegex)];

  for (const [fullMatch, type, name] of matches) {
    // Check for file="html|css|js" attribute (used for HTML components)
    const fileAttrMatch = fullMatch.match(/file="([^"]+)"/);

    if (fileAttrMatch) {
      // HTML component file – read from HTML registry
      const fileType = fileAttrMatch[1];
      const componentDir = getHtmlComponentDir(name);
      if (!componentDir) continue;

      const file = readHtmlFile(componentDir, fileType);
      if (!file) continue;

      const replacement = `\`\`\`${file.lang}\n${file.content}\n\`\`\``;
      content = content.replace(fullMatch, replacement);
      continue;
    }

    // React component – use the existing registry lookup
    const component = await getRegistryItem(name);

    if (!component?.files?.[0]?.content) {
      continue;
    }

    const sourceCode = component.files[0].content;

    if (type === "ComponentSource" || type === "ComponentPreview") {
      const replacement = `\`\`\`tsx\n${sourceCode}\n\`\`\``;
      content = content.replace(fullMatch, replacement);
      content = content.replaceAll("@/registry/react/atlasui", "@/components");
    }
  }

  return content;
};
