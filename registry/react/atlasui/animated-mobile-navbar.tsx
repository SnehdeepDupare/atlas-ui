"use client";

import { createContext, useContext, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { Button } from "@/components/ui/button";

interface AnimatedMobileNavbarContextProps {
  open: boolean;
  toggle: () => void;
}

const AnimatedMobileNavbarContext =
  createContext<AnimatedMobileNavbarContextProps | null>(null);

export const useAnimatedMobileNavbar = () => {
  const context = useContext(AnimatedMobileNavbarContext);
  if (!context) {
    throw new Error(
      "useAnimatedMobileNavbar must be used within an AnimatedMobileNavbar"
    );
  }
  return context;
};

const AnimatedMobileNavbar = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <AnimatedMobileNavbarContext.Provider value={{ open, toggle }}>
      {children}
    </AnimatedMobileNavbarContext.Provider>
  );
};

const AnimatedMobileNavbarTrigger = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toggle } = useAnimatedMobileNavbar();

  return <div onClick={toggle}>{children}</div>;
};

const AnimatedMobileNavbarContent = ({
  children,
  side = "top",
}: {
  children: React.ReactNode;
  side?: "left" | "right" | "top";
}) => {
  const { open, toggle } = useAnimatedMobileNavbar();

  const menuVariants = {
    initial: {
      scaleY: side === "top" ? 0 : 1,
      scaleX: side === "left" || side === "right" ? 0 : 1,
      x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
    },
    animate: {
      scaleY: 1,
      scaleX: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: (side === "top" ? [0.12, 0, 0.39, 0] : [0, 0.55, 0.45, 1]) as [
          number,
          number,
          number,
          number,
        ],
      },
    },
    exit: {
      scaleY: side === "top" ? 0 : 1,
      scaleX: side === "left" || side === "right" ? 0 : 1,
      x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: (side === "top" ? [0.22, 1, 0.36, 1] : [0.61, 1, 0.88, 1]) as [
          number,
          number,
          number,
          number,
        ],
      },
    },
  };

  const containerVariants = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delay: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className={`bg-primary-foreground fixed top-0 left-0 z-50 h-screen w-full origin-top px-5 py-10 ${
            side === "left"
              ? "origin-left"
              : side === "right"
                ? "origin-right"
                : "origin-top"
          }`}
          variants={menuVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="text-foreground absolute top-5 right-5"
          >
            <XIcon />
          </Button>

          <motion.div
            className="mt-16 flex flex-col items-center justify-center space-y-8"
            variants={containerVariants}
            initial="initial"
            animate="open"
            exit="initial"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedMobileNavbarLink = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive =
    (pathname?.includes(href) && href.length > 1) || pathname === href;

  const linkVariants = {
    initial: {
      y: "30vh",
      transition: {
        duration: 0.5,
        ease: [0.37, 0, 0.36, 1] as [number, number, number, number],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0, 0.55, 0.45, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <motion.div variants={linkVariants}>
        <Link
          href={href}
          className={`hover:text-primary text-muted-foreground relative mx-4 text-lg font-bold uppercase hover:after:scale-x-125 ${
            isActive ? "text-primary" : "text-muted-foreground"
          } after:bg-primary after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:scale-x-0 after:duration-300 after:content-['']`}
          onClick={onClick}
        >
          {label}
        </Link>
      </motion.div>
    </div>
  );
};

export {
  AnimatedMobileNavbar,
  AnimatedMobileNavbarTrigger,
  AnimatedMobileNavbarContent,
  AnimatedMobileNavbarLink,
};
