import { type Registry } from "shadcn/schema";

export const ui: Registry["items"] = [
  {
    name: "animated-mobile-navbar",
    type: "registry:component",
    title: "Animated Mobile Navbar",
    description: "A simple animated mobile navbar component.",
    dependencies: ["motion", "lucide-react"],
    registryDependencies: ["button"],
    files: [
      {
        path: "react/atlasui/animated-mobile-navbar.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "project-gallery",
    type: "registry:component",
    title: "Project Gallery",
    description: "A Project Gallery with an interactive modal.",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/project-gallery.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "parallax-sections",
    type: "registry:component",
    title: "Parallax Sections",
    description: "A simple Parallax effect using Motion.",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/parallax-sections.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "shiny-button",
    type: "registry:ui",
    title: "Shiny Button",
    description: "A shiny button with a sleek animation effect.",
    dependencies: ["motion"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "react/atlasui/shiny-button.tsx",
        type: "registry:ui",
      },
    ],
    css: {
      ".radial-gradient": {
        background:
          "radial-gradient(circle at 50% 0%, rgba(250, 250, 250, 0.05) 0%, transparent 60%), rgba(15, 15, 15, 1)",
      },
      ".linear-mask": {
        "mask-image":
          "linear-gradient(-75deg, white calc(var(--x) + 20%), transparent calc(var(--x) + 30%), white calc(var(--x) + 100%))",
      },
      ".linear-overlay": {
        "background-image":
          "linear-gradient(-75deg, rgba(255,255,255,0.1) calc(var(--x) + 20%), rgba(255,255,255,0.5) calc(var(--x) + 25%), rgba(255,255,255,0.1) calc(var(--x) + 100%))",
        mask: "linear-gradient(black, black) content-box, linear-gradient(black, black)",
        "mask-composite": "exclude",
      },
    },
  },
  {
    name: "dot-and-circle-mouse-trailer",
    type: "registry:component",
    title: "Dot And Circle Mouse Trailer",
    description: "A simple Lazy Dot and Circle Mouse Trailer",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/dot-and-circle-mouse-trailer.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "blob-mouse-trailer",
    type: "registry:component",
    title: "Blob Mouse Trailer",
    description: "A simple Lazy Blob Mouse Trailer",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/blob-mouse-trailer.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "blend-mouse-trailer",
    type: "registry:component",
    title: "Blend Mouse Trailer",
    description:
      "A simple Lazy Mouse Trailer which blends with the content on hover.",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/blend-mouse-trailer.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "hacker-text",
    type: "registry:component",
    title: "Hacker Text",
    description:
      "A text animation that scrambles letters before revealing the final text.",
    dependencies: [],
    registryDependencies: ["utils"],
    files: [
      {
        path: "react/atlasui/hacker-text.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scroll-based-text-reveal",
    type: "registry:component",
    title: "Scroll Based Text Reveal",
    description:
      "A text reveal effect which animates the opacity of the text as you scroll.",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/scroll-based-text-reveal.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scroll-based-word-reveal",
    type: "registry:component",
    title: "Scroll Based Word Reveal",
    description:
      "A text reveal effect which progressively reveals text word by word as you scroll.",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/scroll-based-word-reveal.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "scroll-based-character-reveal",
    type: "registry:component",
    title: "Scroll Based Character Reveal",
    description:
      "A text reveal effect which progressively reveals text character by character as you scroll.",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/scroll-based-character-reveal.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "reveal-effect",
    type: "registry:component",
    title: "Reveal Effect",
    description:
      "Animates content into view with a vertical slide, blur fade-in, and clipping reveal effect.",
    dependencies: ["motion"],
    files: [
      {
        path: "react/atlasui/reveal-effect.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "loki-text-effect",
    type: "registry:component",
    title: "Loki Text Effect",
    description: "The iconic text animation from the Loki series intro.",
    dependencies: ["motion"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "react/atlasui/loki-text-effect.tsx",
        type: "registry:component",
      },
      {
        path: "fonts/font.ts",
        type: "registry:file",
        target: "~/fonts/font.ts",
      },
      {
        path: "fonts/fontOne.woff2",
        type: "registry:file",
        target: "app/fonts/fontOne.woff2",
      },
      {
        path: "fonts/fontTwo.woff2",
        type: "registry:file",
        target: "app/fonts/fontTwo.woff2",
      },
      {
        path: "fonts/fontThree.woff2",
        type: "registry:file",
        target: "app/fonts/fontThree.woff2",
      },
      {
        path: "fonts/fontFour.woff2",
        type: "registry:file",
        target: "app/fonts/fontFour.woff2",
      },
      {
        path: "fonts/fontFive.woff2",
        type: "registry:file",
        target: "app/fonts/fontFive.woff2",
      },
      {
        path: "fonts/fontSix.woff2",
        type: "registry:file",
        target: "app/fonts/fontSix.woff2",
      },
      {
        path: "fonts/fontSeven.woff2",
        type: "registry:file",
        target: "app/fonts/fontSeven.woff2",
      },
    ],
  },
  {
    name: "box-reveal",
    type: "registry:component",
    title: "Box Reveal",
    description:
      "A smooth reveal animation that slides a colored overlay away to introduce content as it enters the viewport.",
    dependencies: ["motion"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "react/atlasui/box-reveal.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "notch-nav",
    type: "registry:component",
    title: "Notch Nav",
    description:
      "A Notch style trigger that reveals the navigation menu from above.",
    dependencies: ["motion"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "react/atlasui/notch-nav.tsx",
        type: "registry:component",
      },
    ],
  },
  {
    name: "morph-navbar",
    type: "registry:component",
    title: "Morph Navbar",
    description:
      "A polished navigation bar with a fluid, morphing pill that tracks the active link and hover state.",
    dependencies: ["motion"],
    registryDependencies: ["utils"],
    files: [
      {
        path: "react/atlasui/morph-navbar.tsx",
        type: "registry:component",
      },
    ],
  },
];
