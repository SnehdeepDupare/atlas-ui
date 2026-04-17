import { type Registry } from "shadcn/schema";

export const html: Registry["items"] = [
  {
    name: "animated-mobile-navbar-html",
    type: "registry:component",
    title: "Animated Mobile Navbar",
    description:
      "A simple animated mobile navbar component in HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    registryDependencies: [],
    files: [
      {
        path: "html/atlasui/animated-mobile-navbar/index.html",
        type: "registry:file",
        target: "~/animated-mobile-navbar/index.html",
      },
      {
        path: "html/atlasui/animated-mobile-navbar/style.css",
        type: "registry:file",
        target: "~/animated-mobile-navbar/style.css",
      },
      {
        path: "html/atlasui/animated-mobile-navbar/script.js",
        type: "registry:file",
        target: "~/animated-mobile-navbar/script.js",
      },
    ],
  },
  {
    name: "project-gallery-html",
    type: "registry:component",
    title: "Project Gallery",
    description:
      "A Project Gallery with an interactive modal using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/project-gallery/index.html",
        type: "registry:file",
        target: "~/project-gallery/index.html",
      },
      {
        path: "html/atlasui/project-gallery/style.css",
        type: "registry:file",
        target: "~/project-gallery/style.css",
      },
      {
        path: "html/atlasui/project-gallery/script.js",
        type: "registry:file",
        target: "~/project-gallery/script.js",
      },
    ],
  },
  {
    name: "parallax-sections-html",
    type: "registry:component",
    title: "Parallax Sections",
    description:
      "A simple Parallax effect using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/parallax-sections/index.html",
        type: "registry:file",
        target: "~/parallax-sections/index.html",
      },
      {
        path: "html/atlasui/parallax-sections/style.css",
        type: "registry:file",
        target: "~/parallax-sections/style.css",
      },
      {
        path: "html/atlasui/parallax-sections/script.js",
        type: "registry:file",
        target: "~/parallax-sections/script.js",
      },
    ],
  },
  {
    name: "shiny-button-html",
    type: "registry:component",
    title: "Shiny Button",
    description:
      "A shiny button with a sleek animation effect using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/shiny-button/index.html",
        type: "registry:file",
        target: "~/shiny-button/index.html",
      },
      {
        path: "html/atlasui/shiny-button/style.css",
        type: "registry:file",
        target: "~/shiny-button/style.css",
      },
      {
        path: "html/atlasui/shiny-button/script.js",
        type: "registry:file",
        target: "~/shiny-button/script.js",
      },
    ],
  },
  {
    name: "dot-and-circle-mouse-trailer-html",
    type: "registry:component",
    title: "Dot And Circle Mouse Trailer",
    description:
      "A simple Lazy Dot and Circle Mouse Trailer using HTML, CSS and JavaScript.",
    meta: {
      framework: "html",
    },
    dependencies: [],
    files: [
      {
        path: "html/atlasui/dot-and-circle-mouse-trailer/index.html",
        type: "registry:file",
        target: "~/dot-and-circle-mouse-trailer/index.html",
      },
      {
        path: "html/atlasui/dot-and-circle-mouse-trailer/style.css",
        type: "registry:file",
        target: "~/dot-and-circle-mouse-trailer/style.css",
      },
      {
        path: "html/atlasui/dot-and-circle-mouse-trailer/script.js",
        type: "registry:file",
        target: "~/dot-and-circle-mouse-trailer/script.js",
      },
    ],
  },
  {
    name: "blob-mouse-trailer-html",
    type: "registry:component",
    title: "Blob Mouse Trailer",
    description:
      "A simple Lazy Blob Mouse Trailer using HTML, CSS and JavaScript.",
    meta: {
      framework: "html",
    },
    dependencies: [],
    files: [
      {
        path: "html/atlasui/blob-mouse-trailer/index.html",
        type: "registry:file",
        target: "~/blob-mouse-trailer/index.html",
      },
      {
        path: "html/atlasui/blob-mouse-trailer/style.css",
        type: "registry:file",
        target: "~/blob-mouse-trailer/style.css",
      },
      {
        path: "html/atlasui/blob-mouse-trailer/script.js",
        type: "registry:file",
        target: "~/blob-mouse-trailer/script.js",
      },
    ],
  },
  {
    name: "blend-mouse-trailer-html",
    type: "registry:component",
    title: "Blend Mouse Trailer",
    description:
      "A simple Lazy Mouse Trailer which blends with the content on hover using HTML, CSS and JavaScript.",
    meta: {
      framework: "html",
    },
    dependencies: [],
    files: [
      {
        path: "html/atlasui/blend-mouse-trailer/index.html",
        type: "registry:file",
        target: "~/blend-mouse-trailer/index.html",
      },
      {
        path: "html/atlasui/blend-mouse-trailer/style.css",
        type: "registry:file",
        target: "~/blend-mouse-trailer/style.css",
      },
      {
        path: "html/atlasui/blend-mouse-trailer/script.js",
        type: "registry:file",
        target: "~/blend-mouse-trailer/script.js",
      },
    ],
  },
  {
    name: "hacker-text-html",
    type: "registry:component",
    title: "Hacker Text",
    description:
      "A text animation that scrambles letters before revealing the final text using HTML, CSS and JavaScript.",
    meta: {
      framework: "html",
    },
    dependencies: [],
    files: [
      {
        path: "html/atlasui/hacker-text/index.html",
        type: "registry:file",
        target: "~/hacker-text/index.html",
      },
      {
        path: "html/atlasui/hacker-text/style.css",
        type: "registry:file",
        target: "~/hacker-text/style.css",
      },
      {
        path: "html/atlasui/hacker-text/script.js",
        type: "registry:file",
        target: "~/hacker-text/script.js",
      },
    ],
  },
  {
    name: "scroll-based-text-reveal-html",
    type: "registry:component",
    title: "Scroll Based Text Reveal",
    description:
      "A text reveal effect which animates the opacity of the text as you scroll using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/scroll-based-text-reveal/index.html",
        type: "registry:file",
        target: "~/scroll-based-text-reveal/index.html",
      },
      {
        path: "html/atlasui/scroll-based-text-reveal/style.css",
        type: "registry:file",
        target: "~/scroll-based-text-reveal/style.css",
      },
      {
        path: "html/atlasui/scroll-based-text-reveal/script.js",
        type: "registry:file",
        target: "~/scroll-based-text-reveal/script.js",
      },
    ],
  },
  {
    name: "scroll-based-word-reveal-html",
    type: "registry:component",
    title: "Scroll Based Word Reveal",
    description:
      "A text reveal effect which progressively reveals text word by word as you scroll using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/scroll-based-word-reveal/index.html",
        type: "registry:file",
        target: "~/scroll-based-word-reveal/index.html",
      },
      {
        path: "html/atlasui/scroll-based-word-reveal/style.css",
        type: "registry:file",
        target: "~/scroll-based-word-reveal/style.css",
      },
      {
        path: "html/atlasui/scroll-based-word-reveal/script.js",
        type: "registry:file",
        target: "~/scroll-based-word-reveal/script.js",
      },
    ],
  },
  {
    name: "scroll-based-character-reveal-html",
    type: "registry:component",
    title: "Scroll Based Character Reveal",
    description:
      "A text reveal effect which progressively reveals text character by character as you scroll using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/scroll-based-character-reveal/index.html",
        type: "registry:file",
        target: "~/scroll-based-character-reveal/index.html",
      },
      {
        path: "html/atlasui/scroll-based-character-reveal/style.css",
        type: "registry:file",
        target: "~/scroll-based-character-reveal/style.css",
      },
      {
        path: "html/atlasui/scroll-based-character-reveal/script.js",
        type: "registry:file",
        target: "~/scroll-based-character-reveal/script.js",
      },
    ],
  },
  {
    name: "reveal-effect-html",
    type: "registry:component",
    title: "Reveal Effect",
    description:
      "Animates content into view with a vertical slide, blur fade-in, and clipping reveal effect using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/reveal-effect/index.html",
        type: "registry:file",
        target: "~/reveal-effect/index.html",
      },
      {
        path: "html/atlasui/reveal-effect/style.css",
        type: "registry:file",
        target: "~/reveal-effect/style.css",
      },
      {
        path: "html/atlasui/reveal-effect/script.js",
        type: "registry:file",
        target: "~/reveal-effect/script.js",
      },
    ],
  },
  {
    name: "loki-text-effect-html",
    type: "registry:component",
    title: "Loki Text Effect",
    description:
      "The iconic text animation from the Loki series intro using HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/loki-text-effect/index.html",
        type: "registry:file",
        target: "~/loki-text-effect/index.html",
      },
      {
        path: "html/atlasui/loki-text-effect/style.css",
        type: "registry:file",
        target: "~/loki-text-effect/style.css",
      },
      {
        path: "html/atlasui/loki-text-effect/script.js",
        type: "registry:file",
        target: "~/loki-text-effect/script.js",
      },
      {
        path: "fonts/fontOne.woff2",
        type: "registry:file",
        target: "~/fonts/fontOne.woff2",
      },
      {
        path: "fonts/fontTwo.woff2",
        type: "registry:file",
        target: "~/fonts/fontTwo.woff2",
      },
      {
        path: "fonts/fontThree.woff2",
        type: "registry:file",
        target: "~/fonts/fontThree.woff2",
      },
      {
        path: "fonts/fontFour.woff2",
        type: "registry:file",
        target: "~/fonts/fontFour.woff2",
      },
      {
        path: "fonts/fontFive.woff2",
        type: "registry:file",
        target: "~/fonts/fontFive.woff2",
      },
      {
        path: "fonts/fontSix.woff2",
        type: "registry:file",
        target: "~/fonts/fontSix.woff2",
      },
      {
        path: "fonts/fontSeven.woff2",
        type: "registry:file",
        target: "~/fonts/fontSeven.woff2",
      },
    ],
  },
  {
    name: "box-reveal-html",
    type: "registry:component",
    title: "Box Reveal",
    description:
      "A smooth reveal animation that slides a colored overlay away to introduce content as it enters the viewport.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/box-reveal/index.html",
        type: "registry:file",
        target: "~/box-reveal/index.html",
      },
      {
        path: "html/atlasui/box-reveal/style.css",
        type: "registry:file",
        target: "~/box-reveal/style.css",
      },
      {
        path: "html/atlasui/box-reveal/script.js",
        type: "registry:file",
        target: "~/box-reveal/script.js",
      },
    ],
  },
  {
    name: "notch-nav-html",
    type: "registry:component",
    title: "Notch Nav",
    description:
      "A Notch style trigger that reveals the navigation menu from above built with HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/notch-nav/index.html",
        type: "registry:file",
        target: "~/notch-nav/index.html",
      },
      {
        path: "html/atlasui/notch-nav/style.css",
        type: "registry:file",
        target: "~/notch-nav/style.css",
      },
      {
        path: "html/atlasui/notch-nav/script.js",
        type: "registry:file",
        target: "~/notch-nav/script.js",
      },
    ],
  },
  {
    name: "morph-navbar-html",
    type: "registry:component",
    title: "Morph Navbar",
    description:
      "A polished navigation bar with a fluid, morphing pill that tracks the active link and hover state built with HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/morph-navbar/index.html",
        type: "registry:file",
        target: "~/morph-navbar/index.html",
      },
      {
        path: "html/atlasui/morph-navbar/style.css",
        type: "registry:file",
        target: "~/morph-navbar/style.css",
      },
      {
        path: "html/atlasui/morph-navbar/script.js",
        type: "registry:file",
        target: "~/morph-navbar/script.js",
      },
    ],
  },
  {
    name: "cascade-text-html",
    type: "registry:component",
    title: "Cascade Text",
    description:
      "A smooth line-by-line text reveal animation built with HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/cascade-text/index.html",
        type: "registry:file",
        target: "~/cascade-text/index.html",
      },
      {
        path: "html/atlasui/cascade-text/style.css",
        type: "registry:file",
        target: "~/cascade-text/style.css",
      },
      {
        path: "html/atlasui/cascade-text/script.js",
        type: "registry:file",
        target: "~/cascade-text/script.js",
      },
    ],
  },
  {
    name: "letter-swap-html",
    type: "registry:component",
    title: "Letter Swap",
    description:
      "A text animation that swaps the letters vertically on hover, built with HTML, CSS, JavaScript and Motion.",
    meta: {
      framework: "html",
    },
    dependencies: ["motion"],
    files: [
      {
        path: "html/atlasui/letter-swap/index.html",
        type: "registry:file",
        target: "~/letter-swap/index.html",
      },
      {
        path: "html/atlasui/letter-swap/style.css",
        type: "registry:file",
        target: "~/letter-swap/style.css",
      },
      {
        path: "html/atlasui/letter-swap/script.js",
        type: "registry:file",
        target: "~/letter-swap/script.js",
      },
    ],
  },
  {
    name: "warp-slider-html",
    type: "registry:component",
    title: "Warp Slider",
    description:
      "A smooth, infinite slider with dynamic warp distortion and momentum based scrolling built with HTML, CSS, JavaScript and Three.js.",
    meta: {
      framework: "html",
    },
    dependencies: ["three"],
    files: [
      {
        path: "html/atlasui/warp-slider/index.html",
        type: "registry:file",
        target: "~/warp-slider/index.html",
      },
      {
        path: "html/atlasui/warp-slider/style.css",
        type: "registry:file",
        target: "~/warp-slider/style.css",
      },
      {
        path: "html/atlasui/warp-slider/script.js",
        type: "registry:file",
        target: "~/warp-slider/script.js",
      },
    ],
  },
];
