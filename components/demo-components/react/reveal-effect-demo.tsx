import { RevealEffect } from "@/components/atlas_ui/(react)/reveal-effect";

export const RevealEffectDemo = () => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <RevealEffect>
        <h1 className="font-bold text-5xl">Atlas UI</h1>
      </RevealEffect>

      <RevealEffect delay={0.2} translateY={15}>
        <p className="font-semibold text-xl text-center">
          This is the same effect you saw on the homepage ;)
        </p>
      </RevealEffect>
    </div>
  );
};
