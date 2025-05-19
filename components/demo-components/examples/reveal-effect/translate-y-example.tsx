import { RevealEffect } from "@/components/atlas_ui/(react)/reveal-effect";

export const RevealEffectTranslateExample = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <RevealEffect translateY={5}>
        <h1 className="font-bold text-5xl">Atlas UI</h1>
      </RevealEffect>

      <RevealEffect delay={0.2} translateY={10}>
        <p className="font-semibold text-xl text-center">
          An open-source library of prebuilt components.
        </p>
      </RevealEffect>

      <RevealEffect delay={0.4} translateY={15}>
        <p className="font-semibold text-xl text-center">
          Built to save time, inspire creativity, and elevate your UI
        </p>
      </RevealEffect>
    </div>
  );
};
