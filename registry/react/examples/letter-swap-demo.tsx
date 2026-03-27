import { LetterSwap } from "@/registry/react/atlasui/letter-swap";

export const LetterSwapDemo = () => {
  return (
    <div className="flex flex-col gap-6 p-10">
      <LetterSwap text="Hover me!" className="text-3xl font-medium" />

      <LetterSwap
        text="Feature, not a bug"
        className="text-3xl font-medium"
        reverse
      />

      <LetterSwap
        text="Elegant chaos in production"
        className="text-3xl font-medium italic"
        reverse
        staggerFrom="last"
      />

      <LetterSwap
        text="Fast, fragile, fantastic"
        className="text-3xl font-medium"
        staggerFrom="center"
      />

      <LetterSwap
        text="Deploy now, panic later"
        className="font-mono text-3xl font-medium"
        staggerDuration={0}
      />
    </div>
  );
};
