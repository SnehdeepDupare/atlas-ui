"use client";

import Link from "next/link";

import { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { XIcon } from "lucide-react";

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
        ease: side === "top" ? [0.12, 0, 0.39, 0] : [0, 0.55, 0.45, 1],
      },
    },
    exit: {
      scaleY: side === "top" ? 0 : 1,
      scaleX: side === "left" || side === "right" ? 0 : 1,
      x: side === "left" ? "-100%" : side === "right" ? "100%" : 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: side === "top" ? [0.22, 1, 0.36, 1] : [0.61, 1, 0.88, 1],
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
          className={`fixed bg-primary-foreground h-screen w-full left-0 top-0 z-50 py-10 px-5 origin-top ${
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
            className="absolute top-5 right-5 text-foreground"
          >
            <XIcon />
          </Button>

          <motion.div
            className="flex flex-col items-center justify-center space-y-8 mt-16"
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
        ease: [0.37, 0, 0.36, 1],
      },
    },
    open: {
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0, 0.55, 0.45, 1],
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <motion.div variants={linkVariants}>
        <Link
          href={href}
          className={`mx-4 relative hover:after:scale-x-125 hover:text-primary text-lg uppercase font-bold text-muted-foreground ${
            isActive ? "text-primary" : "text-muted-foreground"
          } after:content-[''] after:absolute after:bg-primary after:h-px after:w-full after:left-0 after:-bottom-0.5 after:scale-x-0 after:duration-300`}
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
