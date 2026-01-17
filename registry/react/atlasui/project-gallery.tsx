"use client";

import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";

interface ProjectGalleryProps {
  children: ReactNode;
}

interface BaseProjectProps {
  title: string;
  subtitle: string;
  href: string;
  imgSrc: string;
  color: string;
}

interface InternalProjectProps extends BaseProjectProps {
  index: number;
  setModal: Dispatch<SetStateAction<{ active: boolean; index: number }>>;
}

interface ModalProps {
  modal: { active: boolean; index: number };
  projects: BaseProjectProps[];
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ProjectGallery = ({ children }: ProjectGalleryProps) => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative grid grid-cols-1 sm:grid-cols-2 md:block"
    >
      {children &&
        React.Children.map(children, (child, index) => {
          if (React.isValidElement<BaseProjectProps>(child)) {
            return React.cloneElement(
              child as React.ReactElement<InternalProjectProps>,
              {
                index,
                setModal,
              },
            );
          }
          return child;
        })}
      <Modal
        modal={modal}
        projects={React.Children.toArray(children)
          .map((child) => {
            if (React.isValidElement<BaseProjectProps>(child)) {
              const { title, subtitle, imgSrc, color, href } = child.props;
              return { title, subtitle, imgSrc, color, href };
            }
            return null;
          })
          .filter((project): project is BaseProjectProps => project !== null)}
        containerRef={containerRef}
      />
    </div>
  );
};

const Project = (props: BaseProjectProps | InternalProjectProps) => {
  const { title, subtitle, href, imgSrc, color, index, setModal } =
    props as InternalProjectProps;

  return (
    <Link href={href}>
      <div
        className="border-primary group flex w-full cursor-pointer flex-col justify-between p-4 transition-all duration-200 ease-linear md:flex-row md:items-center md:border-t md:p-24 md:hover:opacity-40"
        onMouseEnter={() => setModal?.({ active: true, index })}
        onMouseLeave={() => setModal?.({ active: false, index })}
      >
        <div
          style={{ backgroundColor: color }}
          className="relative mb-4 aspect-4/3 w-full overflow-hidden rounded-lg md:hidden"
        >
          <Image
            src={imgSrc}
            alt={title}
            fill
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw"
          />
        </div>

        <h2 className="text-2xl font-bold transition-all duration-200 ease-linear md:text-6xl md:font-normal md:group-hover:-translate-x-3">
          {title}
        </h2>
        <p className="text-muted-foreground md:text-foreground text-xs font-light transition-all duration-200 ease-linear md:text-base md:group-hover:translate-x-3">
          {subtitle}
        </p>
      </div>
    </Link>
  );
};

const Modal = ({ modal, projects, containerRef }: ModalProps) => {
  const { index, active } = modal;
  const modalRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);

  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const cursor = {
    _x: useMotionValue(0),
    _y: useMotionValue(0),
  };

  const mouseMove = (e: any) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const styles = getComputedStyle(containerRef.current);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingTop = parseFloat(styles.paddingTop) || 0;
      const borderLeftWidth = parseFloat(styles.borderLeftWidth) || 0;
      const borderTopWidth = parseFloat(styles.borderTopWidth) || 0;
      const x = e.clientX - rect.left - paddingLeft - borderLeftWidth;
      const y = e.clientY - rect.top - paddingTop - borderTopWidth;
      mouse.x.set(x);
      mouse.y.set(y);
    }
  };

  const cursorMove = (e: any) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const styles = getComputedStyle(containerRef.current);
      const paddingLeft = parseFloat(styles.paddingLeft) || 0;
      const paddingTop = parseFloat(styles.paddingTop) || 0;
      const borderLeftWidth = parseFloat(styles.borderLeftWidth) || 0;
      const borderTopWidth = parseFloat(styles.borderTopWidth) || 0;
      const x = e.clientX - rect.left - paddingLeft - borderLeftWidth;
      const y = e.clientY - rect.top - paddingTop - borderTopWidth;
      cursor._x.set(x);
      cursor._y.set(y);
    }
  };

  const smoothOptions = {
    damping: 40,
    stiffness: 300,
    mass: 0.5,
  };

  const cursorMoveSmoothOptions = {
    damping: 20,
    stiffness: 300,
    mass: 0.5,
  };

  const smoothMouse = {
    x: useSpring(mouse.x, smoothOptions),
    y: useSpring(mouse.y, smoothOptions),
  };

  const smoothCursor = {
    _x: useSpring(cursor._x, cursorMoveSmoothOptions),
    _y: useSpring(cursor._y, cursorMoveSmoothOptions),
  };

  useEffect(() => {
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mousemove", cursorMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousemove", cursorMove);
    };
  }, []);

  const scaleAnimation = {
    initial: {
      scale: 0,
      x: "-50%",
      y: "-50%",
    },
    open: {
      scale: 1,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.4,
        ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.4,
        ease: [0.32, 0, 0.67, 0] as [number, number, number, number],
      },
    },
  };

  return (
    <>
      <motion.div
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        ref={modalRef}
        className="pointer-events-none absolute hidden h-87.5 w-100 items-center justify-center overflow-hidden md:flex"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
        }}
      >
        <div
          className="ease-[cubic-bezier(0.76, 0, 0.24, 1)] absolute h-full w-full transition-[top] duration-500"
          style={{
            top: index * -100 + "%",
          }}
        >
          {projects.map((project, i) => {
            const { title, color, imgSrc } = project;
            return (
              <div
                key={i}
                style={{
                  backgroundColor: color,
                }}
                className="relative flex h-full items-center justify-center"
              >
                <Image
                  src={imgSrc}
                  width={350}
                  height={0}
                  alt={title}
                  className="h-auto"
                />
              </div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        ref={cursorRef}
        className="pointer-events-none absolute hidden h-20 w-20 items-center justify-center rounded-full bg-blue-600 md:flex"
        style={{
          left: smoothCursor._x,
          top: smoothCursor._y,
        }}
      />
      <motion.div
        variants={scaleAnimation}
        initial={"initial"}
        animate={active ? "open" : "closed"}
        ref={cursorLabelRef}
        className="text-primary pointer-events-none absolute hidden h-20 w-20 items-center justify-center rounded-full bg-transparent md:flex"
        style={{
          left: smoothCursor._x,
          top: smoothCursor._y,
        }}
      >
        View
      </motion.div>
    </>
  );
};

export { ProjectGallery, Project };
