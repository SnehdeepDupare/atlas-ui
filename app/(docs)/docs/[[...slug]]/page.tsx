import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import "@/styles/mdx.css";

import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { DocsPager } from "@/components/docs-pagination";

interface DocPageProps {
  params: {
    slug: string[];
  };
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) notFound();

  return doc;
}

const DocPage = async ({ params }: DocPageProps) => {
  const doc = await getDocFromParams({ params });

  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 ">
      <div className="mx-auto w-full max-w-4xl">
        <div className="flex items-center space-x-2 mb-4">
          <p className="text-muted-foreground">Docs</p>
          <ChevronRight className="h-4 w-4" />
          <p className="text-primary"> {doc?.title}</p>
        </div>

        <div className="space-y-2 ">
          <h2 className="font-bold text-3xl">{doc?.title}</h2>
          <p className="text-muted-foreground">{doc?.description}</p>
        </div>

        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>

        <DocsPager doc={doc} />
      </div>
    </main>
  );
};

export default DocPage;
