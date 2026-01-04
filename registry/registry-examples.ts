import { type Registry } from "shadcn/schema";

export const examples: Registry["items"] = [
  {
    name: "animated-mobile-navbar-demo",
    type: "registry:example",
    title: "Animated Mobile Navbar Demo",
    description: "Example showcasing the Animated Mobile Navbar component.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/animated-mobile-navbar.json",
    ],
    files: [
      {
        path: "react/examples/animated-mobile-navbar-demo.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "animated-mobile-navbar-side-example",
    type: "registry:example",
    title: "Animated Mobile Navbar Side Example",
    description: "Example showcasing the Mobile Navbar emerging from the side.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/animated-mobile-navbar.json",
    ],
    files: [
      {
        path: "react/examples/animated-mobile-navbar-side-example.tsx",
        type: "registry:example",
      },
    ],
  },
  {
    name: "project-gallery-demo",
    type: "registry:example",
    title: "Project Gallery Demo",
    description: "Example of Project Gallery with an interactive modal.",
    registryDependencies: ["https://atlasui.vercel.app/r/project-gallery.json"],
    files: [
      {
        path: "react/examples/project-gallery-demo.tsx",
        type: "registry:example",
        target: "components/project-gallery-demo.tsx",
      },
    ],
  },
  {
    name: "parallax-sections-demo",
    type: "registry:example",
    title: "Parallax Sections Demo",
    description: "Example of Parallax Sections component.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/parallax-sections.json",
    ],
    files: [
      {
        path: "react/examples/parallax-sections-demo.tsx",
        type: "registry:example",
        target: "components/parallax-sections-demo.tsx",
      },
    ],
  },
  {
    name: "shiny-button-demo",
    type: "registry:example",
    title: "Shiny Button Demo",
    description: "Example of Shiny Button with a sleek animation effect.",
    registryDependencies: ["https://atlasui.vercel.app/r/shiny-button.json"],
    files: [
      {
        path: "react/examples/shiny-button-demo.tsx",
        type: "registry:example",
        target: "components/shiny-button-demo.tsx",
      },
    ],
  },
  {
    name: "dot-and-circle-mouse-trailer-demo",
    type: "registry:example",
    title: "Dot and Circle Mouse Trailer Demo",
    description:
      "Example showing the lazy dot and circle that follows the mouse cursor.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/dot-and-circle-mouse-trailer.json",
    ],
    files: [
      {
        path: "react/examples/dot-and-circle-mouse-trailer-demo.tsx",
        type: "registry:example",
        target: "components/dot-and-circle-mouse-trailer-demo.tsx",
      },
    ],
  },
  {
    name: "blob-mouse-trailer-demo",
    type: "registry:example",
    title: "Blob Mouse Trailer Demo",
    description: "Example showing the lazy blob that follows the mouse cursor.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/blob-mouse-trailer.json",
    ],
    files: [
      {
        path: "react/examples/blob-mouse-trailer-demo.tsx",
        type: "registry:example",
        target: "components/blob-mouse-trailer-demo.tsx",
      },
    ],
  },
  {
    name: "blend-mouse-trailer-demo",
    type: "registry:example",
    title: "Blend Mouse Trailer Demo",
    description:
      "Example showing the lazy mouse trailer which blends with the content on hover.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/blend-mouse-trailer.json",
    ],
    files: [
      {
        path: "react/examples/blend-mouse-trailer-demo.tsx",
        type: "registry:example",
        target: "components/blend-mouse-trailer-demo.tsx",
      },
    ],
  },
  {
    name: "hacker-text-demo",
    type: "registry:example",
    title: "Hacker Text Demo",
    description:
      "Example showcasing text animation that scrambles letters before revealing the final text",
    registryDependencies: ["https://atlasui.vercel.app/r/hacker-text.json"],
    files: [
      {
        path: "react/examples/hacker-text-demo.tsx",
        type: "registry:example",
        target: "components/hacker-text-demo.tsx",
      },
    ],
  },
  {
    name: "scroll-based-text-reveal-demo",
    type: "registry:example",
    title: "Scroll Based Text Reveal Demo",
    description:
      "Example showcasing a text reveal effect which animates the opacity of the text as you scroll.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/scroll-based-text-reveal.json",
    ],
    files: [
      {
        path: "react/examples/scroll-based-text-reveal-demo.tsx",
        type: "registry:example",
        target: "components/scroll-based-text-reveal-demo.tsx",
      },
    ],
  },
  {
    name: "scroll-based-word-reveal-demo",
    type: "registry:example",
    title: "Scroll Based Word Reveal Demo",
    description:
      "Example showcasing a word reveal effect which animates the opacity of the word as you scroll.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/scroll-based-word-reveal.json",
    ],
    files: [
      {
        path: "react/examples/scroll-based-word-reveal-demo.tsx",
        type: "registry:example",
        target: "components/scroll-based-word-reveal-demo.tsx",
      },
    ],
  },
  {
    name: "scroll-based-character-reveal-demo",
    type: "registry:example",
    title: "Scroll Based Character Reveal Demo",
    description:
      "Example showcasing a character reveal effect which animates the opacity of the character as you scroll.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/scroll-based-character-reveal.json",
    ],
    files: [
      {
        path: "react/examples/scroll-based-character-reveal-demo.tsx",
        type: "registry:example",
        target: "components/scroll-based-character-reveal-demo.tsx",
      },
    ],
  },
  {
    name: "reveal-effect-demo",
    type: "registry:example",
    title: "Reveal Effect Demo",
    description:
      "Example of Reveal Effect with a vertical slide, blur fade-in, and clipping reveal effect.",
    registryDependencies: ["https://atlasui.vercel.app/r/reveal-effect.json"],
    files: [
      {
        path: "react/examples/reveal-effect-demo.tsx",
        type: "registry:example",
        target: "components/reveal-effect-demo.tsx",
      },
    ],
  },
  {
    name: "reveal-effect-speed-example",
    type: "registry:example",
    title: "Reveal Effect Example 1",
    description: "Example of Reveal Effect with a custom speed.",
    registryDependencies: ["https://atlasui.vercel.app/r/reveal-effect.json"],
    files: [
      {
        path: "react/examples/reveal-effect-speed-example.tsx",
        type: "registry:example",
        target: "components/reveal-effect-speed-example.tsx",
      },
    ],
  },
  {
    name: "reveal-effect-delay-example",
    type: "registry:example",
    title: "Reveal Effect Example 2",
    description: "Example of Reveal Effect with a custom delay.",
    registryDependencies: ["https://atlasui.vercel.app/r/reveal-effect.json"],
    files: [
      {
        path: "react/examples/reveal-effect-delay-example.tsx",
        type: "registry:example",
        target: "components/reveal-effect-delay-example.tsx",
      },
    ],
  },
  {
    name: "reveal-effect-translate-y-example",
    type: "registry:example",
    title: "Reveal Effect Example 3",
    description: "Example of Reveal Effect with a custom translate-y.",
    registryDependencies: ["https://atlasui.vercel.app/r/reveal-effect.json"],
    files: [
      {
        path: "react/examples/reveal-effect-translate-y-example.tsx",
        type: "registry:example",
        target: "components/reveal-effect-translate-y-example.tsx",
      },
    ],
  },
  {
    name: "loki-text-effect-demo",
    type: "registry:example",
    title: "Loki Text Effect Demo",
    description:
      "Example showcasing the iconic animation from the Loki series intro.",
    registryDependencies: [
      "https://atlasui.vercel.app/r/loki-text-effect.json",
    ],
    files: [
      {
        path: "react/examples/loki-text-effect-demo.tsx",
        type: "registry:example",
        target: "components/loki-text-effect-demo.tsx",
      },
    ],
  },
  {
    name: "box-reveal-demo",
    type: "registry:example",
    title: "Box Reveal Demo",
    description:
      "Example of Box Reveal that has a smooth reveal animation that slides a colored overlay away to introduce content as it enters the viewport.",
    registryDependencies: ["https://atlasui.vercel.app/r/box-reveal.json"],
    files: [
      {
        path: "react/examples/box-reveal-demo.tsx",
        type: "registry:example",
        target: "components/box-reveal-demo.tsx",
      },
    ],
  },
];
