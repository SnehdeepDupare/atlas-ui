import { ScrollBasedCharacterReveal } from "@/registry/react/atlasui/scroll-based-character-reveal";

export const ScrollBasedCharacterRevealDemo = () => {
  return (
    <div>
      <div className="flex h-svh items-center justify-center text-xl font-medium">
        Scroll to see magic :)
      </div>

      <ScrollBasedCharacterReveal text="AtlasUI is an open-source library offering a suite of prebuilt animated components for React, Next.js, and Vanilla JS." />

      <div className="flex h-svh items-center justify-center text-xl font-medium">
        Loved it? Star us on GitHub!
      </div>
    </div>
  );
};
