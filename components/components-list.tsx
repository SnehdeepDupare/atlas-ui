import Link from "next/link";

import { docsConfig } from "@/config/docs";

export const ComponentsList = () => {
  const components = docsConfig.sidebarNav.flatMap(
    (item) =>
      item.items?.filter(
        (subItem) =>
          subItem.href?.startsWith("/docs/components") &&
          subItem.href !== "/docs/components"
      ) || []
  );

  if (components.length === 0) {
    return;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-6 lg:gap-y-6">
      {components.map((component, index) => (
        <Link
          key={index}
          href={component.href!}
          className="group text-base font-medium"
        >
          <span className="underline-offset-4 group-hover:underline">
            {component.title}
          </span>

          {component.label && (
            <span className="ml-2 rounded-md bg-[#adfa1d] px-1.5 py-0.5 text-xs leading-none font-normal text-[#000000] no-underline group-hover:no-underline">
              {component.label}
            </span>
          )}
        </Link>
      ))}
    </div>
  );
};
