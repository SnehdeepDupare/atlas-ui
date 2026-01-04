import {
  registryIndexSchema,
  RegistryItem,
  type Registry,
} from "shadcn/schema";

import { examples } from "@/registry/registry-examples";
import { ui } from "@/registry/registry-ui";
import { js } from "@/registry/registry-js";
import { lib } from "@/registry/registry-lib";

const DEPRECATED_ITEMS = [""];

const DEFAULT: RegistryItem = {
  name: "index",
  type: "registry:style",
  dependencies: ["motion"],
  devDependencies: [],
  registryDependencies: ["utils"],
  cssVars: {},
  files: [],
};

export const registry = {
  name: "atlas-ui",
  homepage: "https://atlasui.vercel.app",
  items: registryIndexSchema.parse(
    [DEFAULT, ...ui, ...examples, ...js, ...lib].filter((item) => {
      return !DEPRECATED_ITEMS.includes(item.name);
    }),
  ),
} satisfies Registry;
