import { RevealEffect } from "@/registry/react/atlasui/reveal-effect";

export const RevealEffectTranslateExample = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <RevealEffect translateY={5}>
        <h1 className="text-5xl font-bold">Atlas UI</h1>
      </RevealEffect>

      <RevealEffect delay={0.2} translateY={10}>
        <p className="text-center text-xl font-semibold">
          An open-source library of prebuilt components.
        </p>
      </RevealEffect>

      <RevealEffect delay={0.4} translateY={15}>
        <p className="text-center text-xl font-semibold">
          Built to save time, inspire creativity, and elevate your UI
        </p>
      </RevealEffect>
    </div>
  );
};
