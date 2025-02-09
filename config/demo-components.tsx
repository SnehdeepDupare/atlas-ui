import { lazy } from "react";

export const demoComponents: Record<string, any> = {
  "animated-mobile-navbar-demo": {
    component: lazy(async () => ({
      default: (
        await import(
          "components/demo-components/react/animated-mobile-navbar-demo"
        )
      ).AnimatedMobileNavbarDemo,
    })),
    path: "components/demo-components/react/animated-mobile-navbar-demo.tsx",
  },
  "animated-mobile-navbar": {
    component: lazy(async () => ({
      default: (
        await import("components/atlas_ui/(react)/animated-mobile-navbar")
      ).AnimatedMobileNavbar,
    })),
    path: "components/atlas_ui/(react)/animated-mobile-navbar.tsx",
  },
  "parallax-sections-demo": {
    component: lazy(async () => ({
      default: (
        await import("components/demo-components/react/parallax-section-demo")
      ).ParallaxSectionDemo,
    })),
    path: "components/demo-components/react/parallax-section-demo.tsx",
  },
  "parallax-sections": {
    component: lazy(async () => ({
      default: (await import("@/components/atlas_ui/(react)/parallax-sections"))
        .ParallaxSections,
    })),
    path: "components/atlas_ui/(react)/parallax-sections.tsx",
  },
  "shiny-button-demo": {
    component: lazy(async () => ({
      default: (
        await import("components/demo-components/react/shiny-button-demo")
      ).ShinyButtonDemo,
    })),
    path: "components/demo-components/react/shiny-button-demo.tsx",
  },
  "shiny-button": {
    component: lazy(async () => ({
      default: (await import("components/atlas_ui/(react)/shiny-button"))
        .ShinyButton,
    })),
    path: "components/atlas_ui/(react)/shiny-button.tsx",
  },
  "dot-and-circle-mouse-trailer-demo": {
    component: lazy(async () => ({
      default: (
        await import(
          "components/demo-components/react/dot-and-circle-mouse-trailer-demo"
        )
      ).DotAndCircleMouseTrailerDemo,
    })),
    path: "components/demo-components/react/dot-and-circle-mouse-trailer-demo.tsx",
  },
  "dot-and-circle-mouse-trailer": {
    component: lazy(async () => ({
      default: (
        await import("components/atlas_ui/(react)/dot-and-circle-mouse-trailer")
      ).DotAndCircleMouseTrailer,
    })),
    path: "components/atlas_ui/(react)/dot-and-circle-mouse-trailer.tsx",
  },
  "blob-mouse-trailer-demo": {
    component: lazy(async () => ({
      default: (
        await import("components/demo-components/react/blob-mouse-trailer-demo")
      ).BlobMouseTrailerDemo,
    })),
    path: "components/demo-components/react/blob-mouse-trailer-demo.tsx",
  },
  "blob-mouse-trailer": {
    component: lazy(async () => ({
      default: (await import("components/atlas_ui/(react)/blob-mouse-trailer"))
        .BlobMouseTrailer,
    })),
    path: "components/atlas_ui/(react)/blob-mouse-trailer.tsx",
  },
  "blend-mouse-trailer-demo": {
    component: lazy(async () => ({
      default: (
        await import(
          "components/demo-components/react/blend-mouse-trailer-demo"
        )
      ).BlendMouseTrailerDemo,
    })),
    path: "components/demo-components/react/blend-mouse-trailer-demo.tsx",
  },
  "blend-mouse-trailer": {
    component: lazy(async () => ({
      default: (await import("components/atlas_ui/(react)/blend-mouse-trailer"))
        .BlendMouseTrailer,
    })),
    path: "components/atlas_ui/(react)/blend-mouse-trailer.tsx",
  },
  "hacker-text-demo": {
    component: lazy(async () => ({
      default: (
        await import("components/demo-components/react/hacker-text-demo")
      ).HackerTextDemo,
    })),
    path: "components/demo-components/react/hacker-text-demo.tsx",
  },
  "hacker-text": {
    component: lazy(async () => ({
      default: (await import("components/atlas_ui/(react)/hacker-text"))
        .HackerText,
    })),
    path: "components/atlas_ui/(react)/hacker-text.tsx",
  },
  "scroll-based-text-reveal-demo": {
    component: lazy(async () => ({
      default: (
        await import(
          "components/demo-components/react/scroll-based-text-reveal-demo"
        )
      ).ScrollBasedTextRevealDemo,
    })),
    path: "components/demo-components/react/scroll-based-text-reveal-demo.tsx",
  },
  "scroll-based-text-reveal": {
    component: lazy(async () => ({
      default: (
        await import("components/atlas_ui/(react)/scroll-based-text-reveal")
      ).ScrollBasedTextReveal,
    })),
    path: "components/atlas_ui/(react)/scroll-based-text-reveal.tsx",
  },
  "scroll-based-word-reveal-demo": {
    component: lazy(async () => ({
      default: (
        await import(
          "components/demo-components/react/scroll-based-word-reveal-demo"
        )
      ).ScrollBasedWordRevealDemo,
    })),
    path: "components/demo-components/react/scroll-based-word-reveal-demo.tsx",
  },
  "scroll-based-word-reveal": {
    component: lazy(async () => ({
      default: (
        await import("components/atlas_ui/(react)/scroll-based-word-reveal")
      ).ScrollBasedWordReveal,
    })),
    path: "components/atlas_ui/(react)/scroll-based-word-reveal.tsx",
  },
  "scroll-based-character-reveal-demo": {
    component: lazy(async () => ({
      default: (
        await import(
          "components/demo-components/react/scroll-based-character-reveal-demo"
        )
      ).ScrollBasedCharacterRevealDemo,
    })),
    path: "components/demo-components/react/scroll-based-character-reveal-demo.tsx",
  },
  "scroll-based-character-reveal": {
    component: lazy(async () => ({
      default: (
        await import(
          "components/atlas_ui/(react)/scroll-based-character-reveal"
        )
      ).ScrollBasedCharacterReveal,
    })),
    path: "components/atlas_ui/(react)/scroll-based-character-reveal.tsx",
  },
};
