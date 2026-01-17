import { RevealEffect } from "@/registry/react/atlasui/reveal-effect";

export const RevealEffectDemo = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <RevealEffect>
        <h1 className="text-5xl font-bold">Atlas UI</h1>
      </RevealEffect>

      <RevealEffect delay={0.2} translateY={15}>
        <p className="text-center text-xl font-semibold">
          This is the same effect you saw on the homepage ;)
        </p>
      </RevealEffect>
    </div>
  );
};
