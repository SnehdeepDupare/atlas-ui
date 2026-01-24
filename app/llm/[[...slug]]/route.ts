import { notFound } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";

import { processMdxContent } from "@/lib/llm";
import { allDocs } from "@/.contentlayer/generated";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> },
) {
  const slug = (await params).slug;
  const doc = allDocs.find((doc) => doc.slugAsParams === slug?.join("/"));

  if (!doc) {
    notFound();
  }

  let mdx = doc.body.raw;

  // Replace component tags with actual source code
  mdx = await processMdxContent(mdx);

  return new NextResponse(mdx, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}

export function generateStaticParams() {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split("/"),
  }));
}
