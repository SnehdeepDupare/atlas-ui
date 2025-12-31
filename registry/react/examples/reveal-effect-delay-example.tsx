import { RevealEffect } from "@/registry/react/atlasui/reveal-effect";

export const RevealEffectDelayExample = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <RevealEffect speed="fast">
        <p className="font-semibold text-xl">I&apos;m First.</p>
      </RevealEffect>

      <RevealEffect delay={0.2}>
        <p className="font-semibold text-xl">I was delayed by 0.2 seconds.</p>
      </RevealEffect>

      <RevealEffect delay={0.5}>
        <p className="font-semibold text-xl">I was delayed by 0.5 seconds.</p>
      </RevealEffect>
    </div>
  );
};
