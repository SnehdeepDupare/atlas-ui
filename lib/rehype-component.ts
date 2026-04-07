import fs from "fs";
import path from "path";
import { u } from "unist-builder";
import { visit } from "unist-util-visit";

import { html as htmlRegistry } from "@/registry/registry-html";
import { htmlExamples as htmlExamplesRegistry } from "@/registry/registry-html-examples";
import { UnistNode, UnistTree } from "@/types/unist";

const registry = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), "registry.json"), "utf8")
);

// File type configurations for HTML components
const HTML_FILE_CONFIGS = {
  html: {
    filename: "index.html",
    label: "index.html",
    lang: "language-html",
  },
  css: {
    filename: "style.css",
    label: "style.css",
    lang: "language-css",
  },
  js: {
    filename: "script.js",
    label: "script.js",
    lang: "language-javascript",
  },
};

type FileType = "html" | "css" | "js";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      // src prop overrides both name and fileName.
      const { value: srcPath } =
        (getNodeAttributeByName(node, "src") as {
          name: string;
          value?: string;
          type?: string;
        }) || {};

      if (node.name === "ComponentSource") {
        const name = getNodeAttributeByName(node, "name")?.value as string;
        const fileName = getNodeAttributeByName(node, "fileName")?.value as
          | string
          | undefined;

        // Check for HTML/CSS/JS files for HTML Components
        const fileType = getNodeAttributeByName(node, "file")
          ?.value as FileType;

        if (!name && !srcPath) {
          return null;
        }

        try {
          // If fileType is specified, look up in HTML registry
          if (fileType) {
            const entry = [...htmlRegistry, ...htmlExamplesRegistry].find(
              (item) => item.name === name
            );

            if (!entry?.files?.[0]?.path) {
              console.error(`HTML component "${name}" not found in registry`);
              return null;
            }

            const firstFilePath = entry.files[0].path as string;
            const componentDir = path.join(
              process.cwd(),
              "registry",
              path.dirname(firstFilePath)
            );

            const config = HTML_FILE_CONFIGS[fileType];
            const filePath = path.join(componentDir, config.filename);

            if (!fs.existsSync(filePath)) {
              console.error(`File not found: ${filePath}`);
              return null;
            }

            const source = fs.readFileSync(filePath, "utf8");

            // Add code as children so that rehype can take over at build time.
            node.children?.push(
              u("element", {
                tagName: "pre",
                properties: {
                  __src__: filePath,
                  __file_label__: config.label,
                },
                children: [
                  u("element", {
                    tagName: "code",
                    properties: {
                      className: [config.lang],
                    },
                    children: [
                      {
                        type: "text",
                        value: source,
                      },
                    ],
                  }),
                ],
              })
            );
            return;
          }

          let src: string;

          if (srcPath) {
            src = path.join(process.cwd(), srcPath);
          } else {
            const component = registry.items.find(
              (item: any) => item.name === name
            );
            src = fileName
              ? component.files.find((file: unknown) => {
                  if (typeof file === "string") {
                    return (
                      file.endsWith(`${fileName}.tsx`) ||
                      file.endsWith(`${fileName}.ts`)
                    );
                  }
                  return false;
                }) || component.files[0]?.path
              : component.files[0]?.path;
          }

          // Read the source file.
          const filePath = path.isAbsolute(src)
            ? src
            : path.join(process.cwd(), src);

          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(
            `@/registry/react/atlasui/`,
            "@/components/"
          );
          source = source.replaceAll("export default", "export");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (node.name === "ComponentPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          const component = registry.items.find(
            (item: any) => item.name === name
          );
          const fileEntry = component.files[0];
          const src = path.join(process.cwd(), fileEntry.path);

          // Read the source file.
          const filePath = path.isAbsolute(src)
            ? src
            : path.join(process.cwd(), src);

          let source = fs.readFileSync(filePath, "utf8");

          // Replace imports.
          // TODO: Use @swc/core and a visitor to replace this.
          // For now a simple regex should do.
          source = source.replaceAll(
            `@/registry/react/atlasui/`,
            "@/components/"
          );
          source = source.replaceAll("export default", "export");

          // Add code as children so that rehype can take over at build time.
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  children: [
                    {
                      type: "text",
                      value: source,
                    },
                  ],
                }),
              ],
            })
          );
        } catch (error) {
          console.error(error);
        }
      }

      if (node.name === "HtmlPreview") {
        const name = getNodeAttributeByName(node, "name")?.value as string;

        if (!name) {
          return null;
        }

        try {
          const entry = [...htmlRegistry, ...htmlExamplesRegistry].find(
            (item: any) => item.name === name
          );

          let componentDir: string;
          if (entry?.files?.[0]?.path) {
            const firstFilePath = entry.files[0].path as string;
            componentDir = path.join(
              process.cwd(),
              "registry",
              path.dirname(firstFilePath)
            );
          } else {
            // Fallback for entries without file paths
            const folderName = name.replace(/-html$/, "");
            componentDir = path.join(
              process.cwd(),
              "registry",
              "html",
              folderName
            );
          }

          const fileConfigs = [
            {
              filename: "index.html",
              label: "index.html",
              lang: "language-html",
            },
            {
              filename: "style.css",
              label: "style.css",
              lang: "language-css",
            },
            {
              filename: "script.js",
              label: "script.js",
              lang: "language-javascript",
            },
          ];

          for (const { filename, label, lang } of fileConfigs) {
            const filePath = path.join(componentDir, filename);
            if (fs.existsSync(filePath)) {
              const source = fs.readFileSync(filePath, "utf8");

              // Add code as children so that rehype can take over at build time.
              node.children?.push(
                u("element", {
                  tagName: "pre",
                  properties: {
                    __src__: filePath,
                    __file_label__: label,
                  },
                  children: [
                    u("element", {
                      tagName: "code",
                      properties: {
                        className: [lang],
                      },
                      children: [
                        {
                          type: "text",
                          value: source,
                        },
                      ],
                    }),
                  ],
                })
              );
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };
}

function getNodeAttributeByName(node: UnistNode, name: string) {
  return node.attributes?.find((attribute) => attribute.name === name);
}
