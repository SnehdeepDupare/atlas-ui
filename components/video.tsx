"use client";

import Link from "next/link";

interface VideoProps {
  src: string;
  href: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  autoPlay?: boolean;
}

export const Video = ({
  src,
  href,
  width = "100%",
  height = "auto",
  className = "",
  autoPlay = true,
}: VideoProps) => {
  return (
    <Link href={href}>
      <video
        style={{ width, height }}
        className={`${className} cursor-pointer`}
        muted
        loop
        playsInline
        autoPlay={autoPlay}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </Link>
  );
};
