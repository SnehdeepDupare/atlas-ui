import { RevealEffect } from "@/registry/react/atlasui/reveal-effect";

export const RevealEffectSpeedExample = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <RevealEffect speed="fast">
        <p className="text-xl font-semibold">I&apos;m fast as heck.</p>
      </RevealEffect>

      <RevealEffect>
        <p className="text-center text-xl font-semibold">
          This is medium speed, which is the default.
        </p>
      </RevealEffect>

      <RevealEffect speed="slow">
        <p className="text-xl font-semibold">I&apos;m slow as molasses.</p>
      </RevealEffect>
    </div>
  );
};
