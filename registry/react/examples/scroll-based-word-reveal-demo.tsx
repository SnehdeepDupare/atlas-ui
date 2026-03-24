import { ScrollBasedWordReveal } from "@/registry/react/atlasui/scroll-based-word-reveal";

export const ScrollBasedWordRevealDemo = () => {
  return (
    <div>
      <div className="flex h-svh items-center justify-center text-xl font-medium">
        Scroll to see magic :)
      </div>

      <ScrollBasedWordReveal text="AtlasUI is an open-source library offering a suite of prebuilt animated components for React, Next.js, and Vanilla JS." />

      <div className="flex h-svh items-center justify-center text-xl font-medium">
        Loved it? Star us on GitHub!
      </div>
    </div>
  );
};
