import { DocsNav } from "@/components/docs-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { docsConfig } from "@/config/docs";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container-wrapper">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
        <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 border-r md:sticky md:block md:mask-b-from-90%">
          <ScrollArea className="h-full">
            <div className="h-full pr-4 py-6 md:pt-8 md:pb-10 overflow-auto">
              <DocsNav config={docsConfig} />
            </div>
          </ScrollArea>
        </aside>
        {children}
      </div>
    </div>
  );
}
