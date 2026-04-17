import { Metadata } from "next";

import { Index } from "@/registry/__index__";
import { html as htmlRegistry } from "@/registry/registry-html";
import { htmlExamples as htmlExamplesRegistry } from "@/registry/registry-html-examples";

interface PreviewPageProps {
  params: Promise<{ "component-name": string }>;
}

export async function generateMetadata(
  props: PreviewPageProps
): Promise<Metadata> {
  const { "component-name": name } = await props.params;

  const isHtmlComponent =
    name.endsWith("-html") ||
    name.endsWith("-html-example") ||
    name.endsWith("-html-demo");

  const componentData = isHtmlComponent
    ? [...htmlRegistry, ...htmlExamplesRegistry].find(
        (component) => component.name === name
      )
    : Index[name];

  if (!componentData) {
    return {};
  }

  const componentName = componentData.name.replaceAll("-", " ");
  const title = componentName.replace(/\b\w/g, (c: string) => c.toUpperCase());

  return {
    title: title,
    description: componentData.description,
  };
}

const Page = async (props: PreviewPageProps) => {
  const { "component-name": name } = await props.params;
  const iframeSrc = `/api/html-preview/${name}`;

  if (
    name.endsWith("-html") ||
    name.endsWith("-html-example") ||
    name.endsWith("-html-demo")
  ) {
    return (
      <div className="relative flex min-h-svh w-full flex-1 items-center justify-center">
        <iframe
          src={iframeSrc}
          title={`${name} preview`}
          sandbox="allow-scripts allow-same-origin"
          className="h-full w-full"
        />
      </div>
    );
  }

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
