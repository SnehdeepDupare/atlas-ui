import Link from "next/link";

import { allDocs } from "contentlayer/generated";

export const ComponentsList = () => {
  const components = allDocs.filter((doc) =>
    doc.slugAsParams?.startsWith("components/"),
  );

  if (components.length === 0) {
    return;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:gap-y-6">
      {components.map((component) => (
        <Link
          key={component._id}
          href={component.slug}
          className="text-base font-medium underline-offset-4 hover:underline"
        >
          {component.title}
        </Link>
      ))}
    </div>
  );
};
