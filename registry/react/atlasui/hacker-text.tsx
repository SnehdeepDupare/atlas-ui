"use client";

import { Bebas_Neue } from "next/font/google";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

const bebas = Bebas_Neue({ subsets: ["latin"], weight: ["400"] });

export const HackerText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    const textElement = document.getElementById("text");
    let interval: NodeJS.Timeout | null = null;
    let timeout: NodeJS.Timeout | null = null;

    const scrambleText = (target: HTMLElement) => {
      let iteration = 0;

      clearInterval(interval as NodeJS.Timeout);

      interval = setInterval(() => {
        if (!target.dataset.value) return;

        target.innerText = target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return target.dataset.value![index];
            }
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= target.dataset.value.length) {
          clearInterval(interval as NodeJS.Timeout);
        }

        iteration += 1 / 3;
      }, 30);
    };

    const applyEffect = () => {
      if (window.matchMedia("(min-width: 768px)").matches) {
        // For non-mobile devices
        if (textElement) {
          textElement.addEventListener("mouseover", (event) => {
            const target = event.target as HTMLElement;
            scrambleText(target);
          });
        }
      }
      // Run the effect after 600ms on page load for all devices
      if (textElement) {
        timeout = setTimeout(() => {
          scrambleText(textElement);
        }, 600);
      }
    };

    applyEffect();

    return () => {
      if (textElement && window.matchMedia("(min-width: 768px)").matches) {
        textElement.removeEventListener("mouseover", (event) => {
          const target = event.target as HTMLElement;
          scrambleText(target);
        });
      }
      if (interval) {
        clearInterval(interval);
      }
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [letters]);
  return (
    <span
      id="text"
      data-value={text}
      className={cn("text-4xl uppercase", bebas.className, className)}
    >
      {text}
    </span>
  );
};
