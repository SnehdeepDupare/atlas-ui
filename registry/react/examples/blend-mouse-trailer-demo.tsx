"use client";

import { useState } from "react";
import { BlendMouseTrailer } from "@/registry/react/atlasui/blend-mouse-trailer";

export const BlendMouseTrailerDemo = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="h-full">
      <h1
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="text-5xl text-center"
      >
        AtlasUI is an open-source library offering a suite of prebuilt animated
        components for React, Next.js, and Vanilla JS.
      </h1>

      <BlendMouseTrailer isHovered={isHovered} />
    </div>
  );
};
