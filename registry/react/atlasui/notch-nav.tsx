"use client";

import { cn } from "@/lib/utils";
import { MenuIcon, XIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Team", href: "/team" },
  { name: "Product", href: "/product" },
  { name: "Solution", href: "/solution" },
];

export const NotchNav = () => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (!open || !contentRef.current) return;

    const { height } = contentRef.current.getBoundingClientRect();

    setContentHeight((prev) => (prev !== height ? height : prev));
  }, [open]);

  return (
    <div className="flex flex-col items-center relative">
      <AnimatePresence>
        {open && (
          <motion.div
            ref={contentRef}
            initial={{ y: -300 }}
            animate={{ y: 0 }}
            transition={{
              type: "spring",
              mass: 1.1,
              damping: 20,
              stiffness: 300,
            }}
            className="bg-[#b3eb14] w-96 rounded-4xl py-8 px-6 flex flex-col gap-2"
          >
            {links.map((link, index) => (
              <motion.a
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ease: "easeOut",
                  duration: 0.3,
                  delay: index * 0.1,
                }}
                whileHover="hover"
                key={link.name}
                href={link.href}
                className="uppercase border-b p-1 text-neutral-900 border-neutral-900 relative overflow-hidden h-8"
              >
                <span className="sr-only">{link.name}</span>
                <motion.span
                  className="flex items-center"
                  variants={{
                    initial: { y: 0 },
                    hover: { y: "-100%" },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  aria-hidden={true}
                >
                  {link.name}
                </motion.span>

                <motion.span
                  className="absolute flex items-center italic font-medium "
                  variants={{
                    initial: { y: 0 },
                    hover: { y: "-100%" },
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  aria-hidden={true}
                >
                  {link.name}
                </motion.span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ y: 0 }}
        animate={{ y: open ? contentHeight : 0 }}
        transition={{
          type: "spring",
          mass: 1.1,
          damping: 20,
          stiffness: 300,
        }}
        className={cn(
          "absolute top-0 left-1/2 -translate-x-1/2 w-52 h-10.5 rounded-b-4xl bg-[#b3eb14] text-neutral-900 flex items-center justify-center",
          "before:content-[''] before:absolute before:-top-px before:-left-[14px] before:w-[30px] before:h-[15.5px] before:bg-no-repeat before:bg-size-[50%_100%] before:bg-[radial-gradient(circle_at_0_100%,transparent_14px,#b3eb14_15px)]",
          "after:content-[''] after:absolute after:top-0 after:left-full after:w-[30px] after:h-[15px] after:bg-no-repeat after:bg-size-[50%_100%] after:bg-[radial-gradient(circle_at_100%_100%,transparent_15px,#b3eb14_15px)]",
        )}
        onClick={toggle}
        style={{}}
      >
        {open ? <XIcon /> : <MenuIcon />}
      </motion.div>
    </div>
  );
};
