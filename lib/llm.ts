import { getRegistryItem } from "@/lib/registry";

export const processMdxContent = async (content: string) => {
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
    }
  }

  return content;
};
