import { type Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "animated-mobile-navbar",
    type: "registry:ui",
    title: "Animated Mobile Navbar",
    description: "",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "react/atlasui/animated-mobile-navbar.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "project-gallery",
    type: "registry:ui",
    title: "Project Gallery",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/project-gallery.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "parallax-sections",
    type: "registry:ui",
    title: "Parallax Sections",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/parallax-sections.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "shiny-button",
    type: "registry:ui",
    title: "Shiny Button",
    description: "",
    dependencies: ["motion"],
    registryDependencies: ["button"],
    files: [
      {
        path: "react/atlasui/shiny-button.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "dot-and-circle-mouse-trailer",
    type: "registry:ui",
    title: "Dot And Circle Mouse Trailer",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/dot-and-circle-mouse-trailer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "blob-mouse-trailer",
    type: "registry:ui",
    title: "Blob Mouse Trailer",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/blob-mouse-trailer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "blend-mouse-trailer",
    type: "registry:ui",
    title: "Blend Mouse Trailer",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/blend-mouse-trailer.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "hacker-text",
    type: "registry:ui",
    title: "Hacker Text",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/hacker-text.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-based-text-reveal",
    type: "registry:ui",
    title: "Scroll Based Text Reveal",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/scroll-based-text-reveal.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-based-word-reveal",
    type: "registry:ui",
    title: "Scroll Based Word Reveal",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/scroll-based-word-reveal.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "scroll-based-character-reveal",
    type: "registry:ui",
    title: "Scroll Based Character Reveal",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/scroll-based-character-reveal.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "reveal-effect",
    type: "registry:ui",
    title: "Reveal Effect",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/reveal-effect.tsx",
        type: "registry:ui",
      },
    ],
  },
  {
    name: "loki-text-effect",
    type: "registry:ui",
    title: "Loki Text Effect",
    description: "",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/loki-text-effect.tsx",
        type: "registry:ui",
      },
    ],
  },
];
