"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

interface NavbarContextValue {
  registerItem: (href: string, el: HTMLDivElement | null) => void;
  previewItem: (el: HTMLDivElement) => void;
  clearPreview: () => void;
  activeHref: string;
}

export const MorphNavbarContext =
  React.createContext<NavbarContextValue | null>(null);

export function MorphNavbar({
  children,
  activeHref,
}: {
  children: React.ReactNode;
  activeHref: string;
}) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Registry of nav items by href
  const itemRegistry = React.useRef<Record<string, HTMLDivElement | null>>({});

  const lastActivePosition = React.useRef<{
    left: string;
    width: string;
  } | null>(null);

  const [activePill, setActivePill] = React.useState({
    left: "4px",
    width: "0px",
  });

  const [hoverPill, setHoverPill] = React.useState({
    left: "4px",
    width: "calc(100% - 8px)",
  });

  function measureItem(el: HTMLDivElement) {
    if (!containerRef.current) return null;

    const itemRect = el.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();

    return {
      left: `${itemRect.left - containerRect.left}px`,
      width: `${itemRect.width}px`,
    };
  }

  function updateActivePill(next: { left: string; width: string }) {
    // Avoid unnecessary state updates (prevents render loops)
    if (
      lastActivePosition.current &&
      lastActivePosition.current.left === next.left &&
      lastActivePosition.current.width === next.width
    ) {
      return;
    }

    lastActivePosition.current = next;
    setActivePill(next);
  }

  const contextValue: NavbarContextValue = {
    registerItem(href, el) {
      itemRegistry.current[href] = el;

      // Only position the active pill for the active route
      if (!el || href !== activeHref) return;

      const pos = measureItem(el);
      if (pos) updateActivePill(pos);
    },

    previewItem(el) {
      const pos = measureItem(el);
      if (pos) setHoverPill(pos);
    },

    clearPreview() {
      setHoverPill({
        left: "4px",
        width: "calc(100% - 8px)",
      });
    },

    activeHref,
  };

  return (
    <MorphNavbarContext.Provider value={contextValue}>
      <nav
        aria-label="Main Navigation"
        className="relative mx-auto flex h-14 max-w-fit rounded-full bg-linear-to-b from-neutral-700 to-neutral-800 p-1 text-white shadow-[0_8px_32px_rgba(0,0,0,0.6),0_2px_8px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_2px_rgba(0,0,0,0.5)] md:h-16"
      >
        <div
          ref={containerRef}
          className="relative flex h-full w-full gap-x-1 rounded-full bg-linear-to-b from-neutral-800 to-neutral-900 p-1 shadow-[inset_0_2px_4px_rgba(0,0,0,0.8),inset_0_-1px_2px_rgba(255,255,255,0.05)]"
        >
          {/* Active pill */}
          <motion.span
            className="absolute z-5 h-10 rounded-full bg-linear-to-b from-[#E8E8E8] via-[#C0C0C0] to-[#A0A0A0] shadow-[0_2px_8px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.3),inset_0_2px_0_rgba(255,255,255,0.5),inset_0_-2px_0_rgba(255,255,255,0.3),inset_0_-8px_16px_rgba(255,255,255,0.2),inset_0_0_0_1px_rgba(255,255,255,0.4),inset_0_1px_4px_rgba(0,0,0,0.1)] md:h-12"
            style={{ top: "4px" }}
            animate={activePill}
            transition={{ type: "spring", stiffness: 400, damping: 33 }}
            aria-hidden="true"
          />

          {/* Hover pill */}
          <motion.span
            className="absolute h-10 rounded-full bg-linear-to-b from-white/10 to-white/5 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] backdrop-blur-sm md:h-12"
            style={{ top: "4px" }}
            animate={hoverPill}
            transition={{ type: "spring", stiffness: 400, damping: 33 }}
            aria-hidden="true"
          />

          {children}
        </div>
      </nav>
    </MorphNavbarContext.Provider>
  );
}

interface MorphNavbarItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function MorphNavbarItem({
  href,
  children,
  className,
}: MorphNavbarItemProps) {
  const ctx = React.useContext(MorphNavbarContext);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current || !ctx) return;
    ctx.registerItem(href, ref.current);
  }, [ctx, href]);

  if (!ctx) return null;

  const isActive = href === ctx.activeHref;

  return (
    <div
      ref={ref}
      onMouseEnter={() => ref.current && ctx.previewItem(ref.current)}
      onMouseLeave={ctx.clearPreview}
      className="relative z-20 flex items-center justify-center"
    >
      <Link
        href={href}
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex items-center justify-center rounded-full px-4 py-3 font-sans text-xs font-medium transition-colors md:px-7 md:text-base",
          isActive ? "text-neutral-900" : "text-white",
          className,
        )}
      >
        {children}
      </Link>
    </div>
  );
}
