import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";

import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { DocsPager } from "@/components/docs-pagination";
import { DashboardTableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { DocGridPattern } from "@/components/doc-grid-pattern";
import { Contribute } from "@/components/contribute";
import { absoluteUrl } from "@/lib/utils";
import type { Metadata } from "next";

interface DocPageProps {
  params: Promise<{ slug: string[] }>;
}

async function getDocFromParams(params: { slug: string[] }) {
  const slug = params.slug?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) notFound();

  return doc;
}

export async function generateMetadata(props: DocPageProps): Promise<Metadata> {
  const params = await props.params;
  const doc = await getDocFromParams(params);

  if (!doc) {
    return {};
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: "article",
      url: absoluteUrl(doc.slug),
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: doc.title,
      description: doc.description,
      images: [
        {
          url: `/og?title=${encodeURIComponent(
            doc.title,
          )}&description=${encodeURIComponent(doc.description)}`,
        },
      ],
      creator: "@Snehdeep__",
    },
  };
}

export async function generateStaticParams(): Promise<{ slug: string[] }[]> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}

const DocPage = async (props: DocPageProps) => {
  const params = await props.params;
  const doc = await getDocFromParams(params);

  if (!doc) {
    notFound();
  }

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <>
      <DocGridPattern />
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0 max-w-4xl">
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
        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
            <div className="no-scrollbar h-full overflow-auto pb-10 space-y-4">
              {doc.toc && <DashboardTableOfContents toc={toc} />}
              <Contribute doc={doc} />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DocPage;
