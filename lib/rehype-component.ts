import { visit } from "unist-util-visit";
import { u } from "unist-builder";
import type { UnistNode, UnistTree } from "@/types/unist";

import { demoComponents } from "@/config/demo-components";
import fs from "fs";

export function rehypeComponent() {
  return async (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.name === "ComponentPreview" || node.name === "ComponentSource") {
        const name = node.attributes?.find(
          (attribute) => attribute.name === "name"
        )?.value as string;
        if (!name) return null;

        try {
          const demo = demoComponents[name];
          const src = demo?.path;

          const source = fs.readFileSync(src, "utf8");
          node.children?.push(
            u("element", {
              tagName: "pre",
              properties: {
                __src__: src,
                __rawString__: source,
              },
              children: [
                u("element", {
                  tagName: "code",
                  properties: {
                    className: ["language-tsx"],
                  },
                  data: {
                    meta: `event="copy_source_code"`,
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
    });
  };
}
