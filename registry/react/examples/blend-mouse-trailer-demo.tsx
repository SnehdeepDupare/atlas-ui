"use client";

import { useState } from "react";

import { BlendMouseTrailer } from "@/registry/react/atlasui/blend-mouse-trailer";

export const BlendMouseTrailerDemo = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-center">
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-center text-5xl text-balance"
      >
        AtlasUI is an open-source library offering a suite of prebuilt animated
        components for React, Next.js, and Vanilla JS.
      </h1>

      <BlendMouseTrailer isHovered={isHovered} />
    </div>
  );
};
