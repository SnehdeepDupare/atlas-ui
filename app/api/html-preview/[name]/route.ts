import { type NextRequest, NextResponse } from "next/server";

import fs from "node:fs";
import path from "node:path";

import { html as htmlRegistry } from "@/registry/registry-html";
import { htmlExamples as htmlExamplesRegistry } from "@/registry/registry-html-examples";

const CDN_BASE = "https://esm.sh";

/**
 * Build an importmap JSON string so bare-specifier imports like
 *   import { animate } from "motion"
 * resolve to a CDN URL inside the iframe.
 */
function buildImportMap(deps: string[]): string {
  if (deps.length === 0) return "";

  const imports: Record<string, string> = {};
  for (const dep of deps) {
    imports[dep] = `${CDN_BASE}/${dep}`;
  }

  return `<script type="importmap">${JSON.stringify({ imports })}</script>`;
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ name: string }> }
) {
  const { name } = await params;
  const entry = [...htmlRegistry, ...htmlExamplesRegistry].find(
    (item) => item.name === name
  );
  if (!entry || !entry.files) {
    return NextResponse.json(
      { error: `HTML component "${name}" not found in registry` },
      { status: 404 }
    );
  }

  const firstFilePath = entry.files[0].path as string;
  const componentDir = path.join(
    process.cwd(),
    "registry",
    path.dirname(firstFilePath)
  );

  let htmlContent = "";
  let cssContent = "";
  let jsContent = "";

  try {
    const htmlPath = path.join(componentDir, "index.html");
    if (fs.existsSync(htmlPath)) {
      htmlContent = fs.readFileSync(htmlPath, "utf-8");
    }

    const cssPath = path.join(componentDir, "style.css");
    if (fs.existsSync(cssPath)) {
      cssContent = fs.readFileSync(cssPath, "utf-8");
    }

    const jsPath = path.join(componentDir, "script.js");
    if (fs.existsSync(jsPath)) {
      jsContent = fs.readFileSync(jsPath, "utf-8");
    }
  } catch {
    return NextResponse.json(
      { error: `Failed to read files for "${name}"` },
      { status: 500 }
    );
  }

  // Get dependencies for import map
  const deps = (entry.dependencies as string[]) ?? [];
  const importMap = buildImportMap(deps);

  // Handle assets (fonts, images, etc.) by converting them to Data URLs
  const MIME_TYPES: Record<string, string> = {
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
    ".otf": "font/otf",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".svg": "image/svg+xml",
    ".gif": "image/gif",
    ".webp": "image/webp",
  };

  const assetFiles = entry.files.filter((file) => {
    const ext = path.extname(file.path as string).toLowerCase();
    return MIME_TYPES[ext];
  });

  for (const asset of assetFiles) {
    const assetPath = path.join(
      process.cwd(),
      "registry",
      asset.path as string
    );
    if (fs.existsSync(assetPath)) {
      const ext = path.extname(asset.path as string).toLowerCase();
      const mimeType = MIME_TYPES[ext];
      const assetBuffer = fs.readFileSync(assetPath);
      const base64 = assetBuffer.toString("base64");
      const dataUrl = `data:${mimeType};base64,${base64}`;

      // Get the file name
      const fileName = path.basename(asset.path as string);

      // Escape for regex
      const escapedFileName = fileName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

      // Replace in CSS: match url(...) and check if it contains the filename
      cssContent = cssContent.replace(
        /url\(\s*['"]?([^'"]+)['"]?\s*\)/g,
        (match, url) => {
          if (url.includes(fileName)) {
            return `url('${dataUrl}')`;
          }
          return match;
        }
      );

      // Replace in HTML: match src/href attributes and check if they contain the filename
      htmlContent = htmlContent.replace(
        /(src|href)\s*=\s*['"]([^'"]+)['"]/g,
        (match, attr, url) => {
          if (url.includes(fileName)) {
            return `${attr}="${dataUrl}"`;
          }
          return match;
        }
      );

      // Generic replacement for any quoted strings or paths ending with the filename
      const genericRegex = new RegExp(`(['"])[^'"]*${escapedFileName}\\1`, "g");
      cssContent = cssContent.replace(genericRegex, `$1${dataUrl}$1`);
      htmlContent = htmlContent.replace(genericRegex, `$1${dataUrl}$1`);
    }
  }

  // Extract <body> content from the HTML file (everything between <body> and </body>)
  const bodyMatch = htmlContent.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  const bodyContent = bodyMatch ? bodyMatch[1] : htmlContent;

  // Build the full HTML document
  const fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
  <style>${cssContent}</style>
  ${importMap}
</head>
<body>
  ${bodyContent}
  <script type="module">${jsContent}</script>
</body>
</html>`;

  return new NextResponse(fullHtml, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
