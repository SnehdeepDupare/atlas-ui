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
}

const ProjectGallery = ({ children }: ProjectGalleryProps) => {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div>
      {children &&
        React.Children.map(children, (child, index) => {
          if (React.isValidElement<BaseProjectProps>(child)) {
            return React.cloneElement(
              child as React.ReactElement<InternalProjectProps>,
              {
                index,
                setModal,
              }
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
        className="flex items-center justify-between w-full p-24 border-t border-primary cursor-pointer group hover:opacity-40 transition-all duration-200 ease-linear"
        onMouseEnter={() => setModal?.({ active: true, index })}
        onMouseLeave={() => setModal?.({ active: false, index })}
      >
        <h2 className="font-normal text-6xl group-hover:-translate-x-3 transition-all duration-200 ease-linear">
          {title}
        </h2>
        <p className="font-light group-hover:translate-x-3 transition-all duration-200 ease-linear">
          {subtitle}
        </p>
      </div>
    </Link>
  );
};

const Modal = ({ modal, projects }: ModalProps) => {
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
    const { clientX, clientY } = e;
    console.log("Mouse position:", e.clientX, e.clientY);
    mouse.x.set(clientX);
    mouse.y.set(clientY + window.scrollY);
  };

  const cursorMove = (e: any) => {
    const { clientX, clientY } = e;
    cursor._x.set(clientX);
    cursor._y.set(clientY + window.scrollY);
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
        ease: [0.76, 0, 0.24, 1],
      },
    },
    closed: {
      scale: 0,
      x: "-50%",
      y: "-50%",
      transition: {
        duration: 0.4,
        ease: [0.32, 0, 0.67, 0],
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
        className="h-[350px] w-[400px] flex items-center justify-center absolute overflow-hidden pointer-events-none"
        style={{
          left: smoothMouse.x,
          top: smoothMouse.y,
        }}
      >
        <div
          className="h-full w-full absolute transition-[top] duration-500 ease-[cubic-bezier(0.76, 0, 0.24, 1)]"
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
                className="relative h-full flex items-center justify-center"
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
        className="h-20 w-20 flex items-center justify-center rounded-full absolute pointer-events-none bg-blue-600 "
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
        className="h-20 w-20 flex items-center justify-center rounded-full absolute pointer-events-none bg-transparent text-primary"
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
