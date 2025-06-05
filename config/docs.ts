import { MainNavItem, SidebarNavItem } from "@/types/nav";

export interface DocsConfig {
  mainNav: MainNavItem[];
  sidebarNav: SidebarNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Components",
      href: "/docs/components/animated-mobile-navbar",
    },
  ],
  sidebarNav: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          href: "/docs",
          items: [],
        },
        {
          title: "Installation",
          href: "/docs/installation",
          items: [],
        },
      ],
    },
    // {
    //   title: "Installation",
    //   items: [
    //     {
    //       title: "Next.js",
    //       href: "/docs/installation/next",
    //       items: [],
    //     },
    //     {
    //       title: "Javascript",
    //       href: "/docs/installation/javascript",
    //       items: [],
    //     },
    //   ],
    // },
    {
      title: "Components",
      items: [
        {
          title: "Animated Mobile Navbar",
          href: "/docs/components/animated-mobile-navbar",
          items: [],
        },
        {
          title: "Project Gallery",
          href: "/docs/components/project-gallery",
          items: [],
          label: "Updated",
        },
        {
          title: "Parallax Sections",
          href: "/docs/components/parallax-sections",
          items: [],
        },
        {
          title: "Shiny Button",
          href: "/docs/components/shiny-button",
          items: [],
        },
      ],
    },
    {
      title: "Mouse Trailers",
      items: [
        {
          title: "Dot and Circle",
          href: "/docs/components/dot-and-circle-mouse-trailer",
          items: [],
        },
        {
          title: "Blob Mouse Trailer",
          href: "/docs/components/blob-mouse-trailer",
          items: [],
        },
        {
          title: "Blend Mouse Trailer",
          href: "/docs/components/blend-mouse-trailer",
          items: [],
        },
      ],
    },
    {
      title: "Text Animations",
      items: [
        {
          title: "Loki Text Effect",
          href: "/docs/components/loki-text-effect",
          items: [],
          label: "New",
        },
        {
          title: "Hacker Text",
          href: "/docs/components/hacker-text",
          items: [],
        },
        {
          title: "Reveal Effect",
          href: "/docs/components/reveal-effect",
          items: [],
        },
        {
          title: "Scroll Based Text Reveal",
          href: "/docs/components/scroll-based-text-reveal",
          items: [],
        },
        {
          title: "Scroll Based Word Reveal",
          href: "/docs/components/scroll-based-word-reveal",
          items: [],
        },
        {
          title: "Scroll Based Character Reveal",
          href: "/docs/components/scroll-based-character-reveal",
          items: [],
        },
      ],
    },
  ],
};
