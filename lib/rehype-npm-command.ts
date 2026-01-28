import { visit } from "unist-util-visit";

import { UnistNode, UnistTree } from "@/types/unist";

export function rehypeNpmCommand() {
  return (tree: UnistTree) => {
    visit(tree, (node: UnistNode) => {
      if (node.type !== "element" || node?.tagName !== "pre") {
        return;
      }

      // npm install.
      if (node.properties?.["__rawString__"]?.startsWith("npm install")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npm__"] = npmCommand;
        node.properties["__yarn__"] = npmCommand.replace(
          "npm install",
          "yarn add"
        );
        node.properties["__pnpm__"] = npmCommand.replace(
          "npm install",
          "pnpm add"
        );
        node.properties["__bun__"] = npmCommand.replace(
          "npm install",
          "bun add"
        );
      }

      // npx create-.
      if (node.properties?.["__rawString__"]?.startsWith("npx create-")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npm__"] = npmCommand;
        node.properties["__yarn__"] = npmCommand.replace(
          "npx create-",
          "yarn create "
        );
        node.properties["__pnpm__"] = npmCommand.replace(
          "npx create-",
          "pnpm create "
        );
        node.properties["__bun__"] = npmCommand.replace("npx", "bunx --bun");
      }

      // npm create.
      if (node.properties?.["__rawString__"]?.startsWith("npm create")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npm__"] = npmCommand;
        node.properties["__yarn__"] = npmCommand.replace(
          "npm create",
          "yarn create"
        );
        node.properties["__pnpm__"] = npmCommand.replace(
          "npm create",
          "pnpm create"
        );
        node.properties["__bun__"] = npmCommand.replace(
          "npm create",
          "bun create"
        );
      }

      // npx.
      if (
        node.properties?.["__rawString__"]?.startsWith("npx") &&
        !node.properties?.["__rawString__"]?.startsWith("npx create-")
      ) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npm__"] = npmCommand;
        node.properties["__yarn__"] = npmCommand.replace("npx", "yarn");
        node.properties["__pnpm__"] = npmCommand.replace("npx", "pnpm dlx");
        node.properties["__bun__"] = npmCommand.replace("npx", "bunx --bun");
      }

      // npm run.
      if (node.properties?.["__rawString__"]?.startsWith("npm run")) {
        const npmCommand = node.properties?.["__rawString__"];
        node.properties["__npm__"] = npmCommand;
        node.properties["__yarn__"] = npmCommand.replace("npm run", "yarn");
        node.properties["__pnpm__"] = npmCommand.replace("npm run", "pnpm");
        node.properties["__bun__"] = npmCommand.replace("npm run", "bun");
      }

      // npm init.
      if (node.properties?.["__rawString__"]?.startsWith("npm init")) {
        const npmCommand = node.properties["__rawString__"];

        const hasYesFlag =
          npmCommand.includes(" -y") || npmCommand.includes(" --yes");

        node.properties["__npm__"] = npmCommand;
        node.properties["__yarn__"] = hasYesFlag ? "yarn init -y" : "yarn init";
        node.properties["__pnpm__"] = "pnpm init";
        node.properties["__bun__"] = hasYesFlag ? "bun init -y" : "bun init";
      }
    });
  };
}
