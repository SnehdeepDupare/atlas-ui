import { BoxReveal } from "@/registry/react/atlasui/box-reveal";

export const BoxRevealDemo = () => {
  return (
    <div className="flex flex-col gap-1">
      <BoxReveal>
        <h1 className="text-5xl font-bold">Atlas UI</h1>
      </BoxReveal>

      <BoxReveal>
        <p className="text-lg font-semibold">
          Because your content deserves a dramatic entrance, not a simple
          fade-in ;)
        </p>
      </BoxReveal>
    </div>
  );
};
