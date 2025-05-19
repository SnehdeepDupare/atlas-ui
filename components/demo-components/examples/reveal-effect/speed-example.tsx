import { RevealEffect } from "@/components/atlas_ui/(react)/reveal-effect";

export const RevealEffectSpeedExample = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <RevealEffect speed="fast">
        <p className="font-semibold text-xl">I'm fast as heck.</p>
      </RevealEffect>

      <RevealEffect>
        <p className="font-semibold text-xl text-center">
          This is medium speed, which is the default.
        </p>
      </RevealEffect>

      <RevealEffect speed="slow">
        <p className="font-semibold text-xl">I'm slow as molasses.</p>
      </RevealEffect>
    </div>
  );
};
