"use client";

import React, { useEffect, useRef } from "react";

import {
  animate,
  cubicBezier,
  inView,
  stagger,
  useReducedMotion,
} from "motion/react";

interface CascadeTextProps {
  children: React.ReactNode;
  animateOnScroll?: boolean;
  delay?: number;
}

type PreparedElement = {
  element: HTMLElement;
  originalHTML: string;
  originalTextIndent: string;
  lines: HTMLElement[];
};

const getTargetElements = (container: HTMLElement): HTMLElement[] => {
  if (container.hasAttribute("data-cascade-text")) {
    return Array.from(container.children) as HTMLElement[];
  }

  return [container];
};

const splitIntoLines = (
  element: HTMLElement,
  reduceMotion: boolean
): HTMLElement[] => {
  const text = (element.textContent ?? "").trim();

  if (!text) {
    element.textContent = "";
    return [];
  }

  const words = text.split(/\s+/).filter(Boolean);
  const fragment = document.createDocumentFragment();
  const wordSpans: HTMLSpanElement[] = [];

  for (let index = 0; index < words.length; index += 1) {
    const span = document.createElement("span");
    span.textContent = words[index];
    span.style.display = "inline-block";

    wordSpans.push(span);
    fragment.appendChild(span);

    if (index < words.length - 1) {
      fragment.appendChild(document.createTextNode(" "));
    }
  }

  element.textContent = "";
  element.appendChild(fragment);

  const linesText: string[] = [];
  let currentTop: number | null = null;
  let currentWords: string[] = [];

  wordSpans.forEach((span) => {
    const top = span.offsetTop;
    const value = span.textContent ?? "";

    if (currentTop === null) {
      currentTop = top;
      currentWords.push(value);
      return;
    }

    if (top !== currentTop) {
      linesText.push(currentWords.join(" "));
      currentWords = [value];
      currentTop = top;
      return;
    }

    currentWords.push(value);
  });

  if (currentWords.length > 0) {
    linesText.push(currentWords.join(" "));
  }

  element.textContent = "";

  const lines: HTMLElement[] = [];

  linesText.forEach((lineText) => {
    const mask = document.createElement("span");
    mask.style.display = "block";
    mask.style.overflow = "hidden";

    const line = document.createElement("span");
    line.textContent = lineText;
    line.style.display = "block";
    line.style.willChange = reduceMotion ? "opacity" : "transform";

    if (reduceMotion) {
      line.style.opacity = "0";
    } else {
      line.style.transform = "translateY(100%)";
    }

    mask.appendChild(line);
    element.appendChild(mask);
    lines.push(line);
  });

  return lines;
};

const prepareElement = (
  element: HTMLElement,
  reduceMotion: boolean
): PreparedElement => {
  const originalHTML = element.innerHTML;
  const originalTextIndent = element.style.textIndent;
  const lines = splitIntoLines(element, reduceMotion);
  const computedIndent = window.getComputedStyle(element).textIndent;

  if (computedIndent !== "0px" && lines.length > 0) {
    lines[0].style.paddingLeft = computedIndent;
    element.style.textIndent = "0";
  }

  return {
    element,
    originalHTML,
    originalTextIndent,
    lines,
  };
};

const animateLines = (
  lines: HTMLElement[],
  delay: number,
  reduceMotion: boolean
) => {
  if (lines.length === 0) {
    return;
  }

  return reduceMotion
    ? animate(
        lines,
        { opacity: [0, 1] },
        {
          duration: 0.28,
          delay: stagger(0.06, { startDelay: delay }),
          ease: "easeOut",
        }
      )
    : animate(
        lines,
        { y: ["100%", "0%"] },
        {
          duration: 1,
          delay: stagger(0.1, { startDelay: delay }),
          ease: cubicBezier(0.165, 0.84, 0.44, 1),
        }
      );
};

const restoreElements = (preparedElements: PreparedElement[]) => {
  preparedElements.forEach(({ element, originalHTML, originalTextIndent }) => {
    element.innerHTML = originalHTML;
    element.style.textIndent = originalTextIndent;
  });
};

export const CascadeText = ({
  children,
  animateOnScroll = true,
  delay = 0,
}: CascadeTextProps) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const preparedElements = getTargetElements(container).map((element) =>
      prepareElement(element, reduceMotion)
    );
    const lines = preparedElements.flatMap((item) => item.lines);

    let stopInView: (() => void) | undefined;
    const controls = {
      current: undefined as ReturnType<typeof animate> | undefined,
    };

    const runAnimation = () => {
      controls.current = animateLines(lines, delay, reduceMotion);
    };

    if (animateOnScroll) {
      stopInView = inView(
        container,
        () => {
          runAnimation();
          stopInView?.();
        },
        { margin: "0px 0px -25% 0px" }
      );
    } else {
      runAnimation();
    }

    return () => {
      stopInView?.();
      controls.current?.stop();
      restoreElements(preparedElements);
    };
  }, [animateOnScroll, delay, reduceMotion]);

  /* eslint-disable react-hooks/refs */
  if (React.Children.count(children) === 1) {
    return React.cloneElement(
      children as React.ReactElement<{ ref?: React.Ref<HTMLElement> }>,
      {
        ref: containerRef,
      }
    );
  }
  /* eslint-enable react-hooks/refs */

  return (
    <div
      ref={containerRef as React.RefObject<HTMLDivElement>}
      data-cascade-text="true"
    >
      {children}
    </div>
  );
};
