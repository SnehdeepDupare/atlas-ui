"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, stagger, type Variants } from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface NotchNavContextValue {
  open: boolean;
  toggle: () => void;
  contentRef: React.RefObject<HTMLDivElement | null>;
  contentHeight: number;
  offsetY: number;
  setOffsetY: (y: number) => void;
}

const NotchNavContext = createContext<NotchNavContextValue | null>(null);

const useNotchNav = () => {
  const ctx = useContext(NotchNavContext);
  if (!ctx) {
    throw new Error("NotchNav components must be used within <NotchNav />");
  }
  return ctx;
};

const NotchNavContentContext = createContext<boolean | null>(null);

const useNotchNavContent = () => {
  const ctx = useContext(NotchNavContentContext);
  if (!ctx) {
    throw new Error("<NotchNavItem /> must be used within <NotchNavContent />");
  }
  return ctx;
};

const NotchNav = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((p) => !p);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  const [offsetY, setOffsetY] = useState(20);

  useEffect(() => {
    if (!open || !contentRef.current) return;

    const { height } = contentRef.current.getBoundingClientRect();
    setContentHeight((prev) => (prev !== height ? height : prev));
  }, [open]);

  return (
    <NotchNavContext.Provider
      value={{ open, toggle, contentRef, contentHeight, offsetY, setOffsetY }}
    >
      <div className="relative flex flex-col items-center">{children}</div>
    </NotchNavContext.Provider>
  );
};

interface PathProps {
  d?: string;
  variants: Variants;
  transition?: { duration: number };
}

const Path = (props: PathProps) => (
  <motion.path
    fill="transparent"
    strokeWidth="1"
    stroke="#171717"
    strokeLinecap="round"
    {...props}
  />
);

const NotchNavTrigger = ({ className }: { className?: string }) => {
  const { open, toggle, contentHeight, offsetY } = useNotchNav();

  return (
    <motion.button
      type="button"
      aria-expanded={open}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      initial={{ y: 0 }}
      animate={{ y: open ? contentHeight + offsetY : 0 }}
      transition={{
        type: "spring",
        mass: 0.9,
        damping: 20,
        stiffness: 300,
        delay: 0.2,
      }}
      className={cn(
        "absolute top-0 w-48 h-12 rounded-b-4xl bg-[#b3eb14] text-neutral-900 flex items-center justify-center",
        "before:content-[''] before:absolute before:top-0 before:-left-[14px] before:w-[30px] before:h-[15.5px] before:bg-no-repeat before:bg-size-[50%_100%] before:bg-[radial-gradient(circle_at_0_100%,transparent_14px,#b3eb14_15px)]",
        "after:content-[''] after:absolute after:top-0 after:left-full after:w-[30px] after:h-[15px] after:bg-no-repeat after:bg-size-[50%_100%] after:bg-[radial-gradient(circle_at_100%_100%,transparent_15px,#b3eb14_15px)]",
        open && "-top-px",
        className,
      )}
    >
      <motion.svg
        animate={open ? "open" : "closed"}
        width="23"
        height="23"
        viewBox="0 0 23 23"
      >
        <Path
          variants={{
            closed: { d: "M 2 2.5 L 20 2.5" },
            open: { d: "M 3 16.5 L 17 2.5" },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: "M 2 16.346 L 20 16.346" },
            open: { d: "M 3 2.5 L 17 16.346" },
          }}
        />
      </motion.svg>
    </motion.button>
  );
};

interface NotchNavContentProps {
  children: ReactNode;
  offsetY?: number;
  className?: string;
}

const NotchNavContent = ({
  children,
  offsetY = 20,
  className,
}: NotchNavContentProps) => {
  const { open, contentRef, setOffsetY } = useNotchNav();

  useEffect(() => {
    setOffsetY(offsetY);
  }, [offsetY, setOffsetY]);

  const contentVariants = {
    closed: {
      y: "-100%",
      transition: {
        delayChildren: stagger(0.05, { from: "last" }),
        delay: 0.2,
      },
    },
    open: {
      y: offsetY,
      transition: {
        type: "spring",
        mass: 0.9,
        damping: 20,
        stiffness: 300,
        delay: 0.2,
        delayChildren: stagger(0.1, { startDelay: 0.3 }),
      } as const,
    },
  };

  return (
    <NotchNavContentContext.Provider value={true}>
      <AnimatePresence>
        <motion.div
          ref={contentRef}
          variants={contentVariants}
          initial="closed"
          animate={open ? "open" : "closed"}
          className={cn(
            "bg-[#b3eb14] w-[90svw] max-w-96 rounded-4xl py-8 px-6 flex flex-col gap-2",
            className,
          )}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </NotchNavContentContext.Provider>
  );
};

interface NotchNavItemProps {
  href: string;
  children: ReactNode;
  className?: string;
}

const NotchNavItem = ({ href, children, className }: NotchNavItemProps) => {
  useNotchNavContent();

  const itemVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 as number, ease: "easeOut" },
    } as const,
  };

  return (
    <motion.a
      href={href}
      variants={itemVariants}
      className={cn(
        "relative h-8 overflow-hidden uppercase border-b p-1 flex flex-col justify-center text-neutral-900 border-neutral-900/50 group",
        className,
      )}
    >
      <span className="sr-only">{children}</span>

      <span
        aria-hidden
        className="absolute top-0 group-hover:-top-full transition-all duration-300 ease-out"
      >
        {children}
      </span>

      <span
        aria-hidden
        className="absolute top-full group-hover:top-0 transition-all duration-300 ease-out italic font-medium"
      >
        {children}
      </span>
    </motion.a>
  );
};

export { NotchNav, NotchNavContent, NotchNavItem, NotchNavTrigger };
