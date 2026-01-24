import { allDocs } from "@/.contentlayer/generated";
import { getRegistryItem } from "@/lib/registry";

const getComponentList = async () => {
  const components = allDocs.filter((doc) =>
    doc.slugAsParams?.startsWith("components/"),
  );

  if (components.length === 0) {
    return;
  }

  return components
    .map(
      (component) =>
        `- [${component.title}](https://atlasui.vercel.app${component.slug})`,
    )
    .join("\n");
};

export const processMdxContent = async (content: string) => {
  // Replace <ComponentsList /> with a markdown list of components.
  const componentsListRegex = /<ComponentsList\s*\/>/g;
  const componentListReplacement = await getComponentList();
  content = content.replace(
    componentsListRegex,
    componentListReplacement || "",
  );

  const componentRegex =
    /<(ComponentSource|ComponentPreview)[\s\S]*?name="([^"]+)"[\s\S]*?\/>/g;

  const matches = [...content.matchAll(componentRegex)];

  for (const [fullMatch, type, name] of matches) {
    const component = await getRegistryItem(name);

    if (!component?.files?.[0]?.content) {
      continue;
    }

    const sourceCode = component.files[0].content;

    if (type === "ComponentSource" || type === "ComponentPreview") {
      const replacement = `\`\`\`tsx\n${sourceCode}\n\`\`\``;
      content = content.replace(fullMatch, replacement);
      content = content.replaceAll("@/registry/react/atlasui", "@/components");
    }
  }

  return content;
};
