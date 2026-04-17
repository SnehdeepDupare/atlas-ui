import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { allDocs } from "contentlayer/generated";

import { Contribute } from "@/components/contribute";
import { DocGridPattern } from "@/components/doc-grid-pattern";
import { DocsBaseSwitcher } from "@/components/docs-base-switcher";
import { DocsCopyPage } from "@/components/docs-copy-page";
import { DocsPager } from "@/components/docs-pagination";
import { Mdx } from "@/components/mdx-components";
import { ScrollToTop } from "@/components/scroll-to-top";
import { DashboardTableOfContents } from "@/components/toc";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { processMdxContent } from "@/lib/llm";
import { getTableOfContents } from "@/lib/toc";
import { absoluteUrl } from "@/lib/utils";

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
            doc.title
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
            doc.title
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

  const segments = doc.slug
    .split("/")
    .filter((item) => item !== "" && item !== "docs");

  const isReactOrHtml =
    segments[0] === "components" &&
    (segments[1] === "react" || segments[1] === "html");

  const breadcrumbItems = segments
    .map((item, index, arr) => ({
      item,
      href: `/docs/${arr.slice(0, index + 1).join("/")}`,
      isLast: index === arr.length - 1,
    }))
    .filter((_, index) => !(isReactOrHtml && index === 1));

  return (
    <>
      <DocGridPattern />
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full max-w-4xl min-w-0">
          <Breadcrumb>
            <BreadcrumbList className="mb-4 text-base">
              <BreadcrumbItem>
                <BreadcrumbLink href="/docs">Docs</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />

              {breadcrumbItems.length === 0 ? (
                <BreadcrumbItem>
                  <BreadcrumbPage>{doc.title}</BreadcrumbPage>
                </BreadcrumbItem>
              ) : (
                breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;

                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <BreadcrumbItem>
                        {item.isLast ? (
                          <BreadcrumbPage>{doc.title}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink
                            href={item.href}
                            className="capitalize"
                          >
                            {item.item}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </div>
                  );
                })
              )}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-2">
            <h2 className="text-3xl font-bold">{doc?.title}</h2>
            <p className="text-muted-foreground">{doc?.description}</p>
            <DocsCopyPage
              page={await processMdxContent(doc.body.raw)}
              url={absoluteUrl(doc.slug)}
            />
          </div>

          <div className="pt-8 pb-12">
            {params.slug &&
              params.slug[0] === "components" &&
              params.slug[1] &&
              params.slug[2] && (
                <DocsBaseSwitcher
                  base={params.slug[1]}
                  component={params.slug[2]}
                />
              )}
            <Mdx code={doc.body.code} />
          </div>

          <DocsPager doc={doc} />
        </div>
        <div className="hidden text-sm xl:block">
          <div className="sticky top-20 -mt-6 h-[calc(100vh-3.5rem)] pt-4">
            <div className="no-scrollbar h-full space-y-2 overflow-auto pb-10">
              {doc.toc && <DashboardTableOfContents toc={toc} />}
              <Contribute doc={doc} />
              <ScrollToTop />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DocPage;
