import { CascadeText } from "@/registry/react/atlasui/cascade-text";

export const CascadeTextDemo = () => {
  return (
    <div className="flex flex-col gap-4 p-5">
      <CascadeText>
        <h1 className="text-[2.5rem] font-medium tracking-tighter">
          Seen This on Awwwards? Same Energy.
        </h1>
      </CascadeText>

      <CascadeText delay={0.2}>
        <p className="text-muted-foreground text-base font-medium">
          You could reveal everything instantly. You could also microwave a
          steak. We chose patience. Because good interfaces, like good food,
          deserve a little timing and a little respect.
        </p>
      </CascadeText>

      <CascadeText delay={0.4}>
        <p className="text-muted-foreground text-base font-medium">
          Cascade Text brings in each line with just enough drama to feel
          intentional, and just enough restraint to keep it classy. No
          attention-seeking theatrics. Just a steady, confident rise that feels
          composed from start to finish.
        </p>
      </CascadeText>

      <CascadeText delay={0.6}>
        <p className="text-muted-foreground text-base font-medium">
          It&apos;s smooth. It&apos;s subtle. It doesn&apos;t beg for attention.
          It just quietly says, &ldquo;Yeah… this UI knows what it&apos;s
          doing.&rdquo; Because when motion is done right, users don&apos;t
          notice the animation. They notice how effortless everything feels. And
          that quiet effortlessness? That&apos;s the whole point.
        </p>
      </CascadeText>

      <CascadeText delay={0.8}>
        <p className="text-muted-foreground text-base font-medium">
          I&apos;m quite surprised that you are still reading this. But I&apos;m
          glad you made it this far. So go ahead and explore the rest of the
          Atlas UI components.
        </p>
      </CascadeText>
    </div>
  );
};
