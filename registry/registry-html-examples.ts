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
];
