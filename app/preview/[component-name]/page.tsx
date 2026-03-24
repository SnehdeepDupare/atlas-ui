import { Index } from "@/registry/__index__";

interface PreviewPageProps {
  params: Promise<{ "component-name": string }>;
}

const Page = async (props: PreviewPageProps) => {
  const { "component-name": name } = await props.params;

  const Component = Index[name]?.component;

  if (!Component) {
    return (
      <p className="text-muted-foreground text-sm">
        Component{" "}
        <code className="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm">
          {name}
        </code>{" "}
        not found in registry.
      </p>
    );
  }

  return (
    <div className="relative flex min-h-svh w-full flex-1 items-center justify-center">
      <Component />
    </div>
  );
};

export default Page;
