"use client";

import { useState } from "react";

import {
  MorphNavbar,
  MorphNavbarItem,
} from "@/registry/react/atlasui/morph-navbar";

export const MorphNavbarDemo = () => {
  // This useState is used only for demo purposes. Kindly use usePathname() hook for Next.js or equivalent for other frameworks.
  const [activeHref, setActiveHref] = useState("#");

  const items = [
    {
      label: "Home",
      href: "#",
    },
    {
      label: "About",
      href: "#about",
    },
    {
      label: "Contact",
      href: "#contact",
    },
    {
      label: "Projects",
      href: "#projects",
    },
  ];

  return (
    <MorphNavbar activeHref={activeHref}>
      {items.map((item, index) => (
        <div key={index} onClick={() => setActiveHref(item.href)}>
          <MorphNavbarItem href={item.href}>{item.label}</MorphNavbarItem>
        </div>
      ))}
    </MorphNavbar>
  );
};
