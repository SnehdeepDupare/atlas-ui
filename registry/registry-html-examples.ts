import { type Registry } from "shadcn/schema";

export const htmlExamples: Registry["items"] = [
  {
    name: "warp-slider-horizontal-html-demo",
    type: "registry:example",
    title: "Warp Slider Horizontal Demo",
    description: "Example of Warp Slider component in horizontal orientation.",
    meta: {
      framework: "html",
    },
    dependencies: ["three"],
    registryDependencies: ["https://atlasui.dev/r/warp-slider-html.json"],
    files: [
      {
        path: "html/examples/warp-slider-horizontal-demo/index.html",
        type: "registry:example",
      },
      {
        path: "html/examples/warp-slider-horizontal-demo/style.css",
        type: "registry:example",
      },
      {
        path: "html/examples/warp-slider-horizontal-demo/script.js",
        type: "registry:example",
      },
    ],
  },
  {
    name: "reveal-effect-speed-html-example",
    type: "registry:example",
    title: "Reveal Effect HTML Example 1",
    description: "Example of Reveal Effect with a custom speed.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/examples/reveal-effect-speed-html-example/index.html",
        type: "registry:example",
      },
      {
        path: "html/examples/reveal-effect-speed-html-example/style.css",
        type: "registry:example",
      },
      {
        path: "html/examples/reveal-effect-speed-html-example/script.js",
        type: "registry:example",
      },
    ],
  },
  {
    name: "reveal-effect-delay-html-example",
    type: "registry:example",
    title: "Reveal Effect HTML Example 2",
    description: "Example of Reveal Effect with a custom delay.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/examples/reveal-effect-delay-html-example/index.html",
        type: "registry:example",
      },
      {
        path: "html/examples/reveal-effect-delay-html-example/style.css",
        type: "registry:example",
      },
      {
        path: "html/examples/reveal-effect-delay-html-example/script.js",
        type: "registry:example",
      },
    ],
  },
  {
    name: "reveal-effect-translate-y-html-example",
    type: "registry:example",
    title: "Reveal Effect HTML Example 3",
    description: "Example of Reveal Effect with a custom translate-y.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/examples/reveal-effect-translate-y-html-example/index.html",
        type: "registry:example",
      },
      {
        path: "html/examples/reveal-effect-translate-y-html-example/style.css",
        type: "registry:example",
      },
      {
        path: "html/examples/reveal-effect-translate-y-html-example/script.js",
        type: "registry:example",
      },
    ],
  },
];
