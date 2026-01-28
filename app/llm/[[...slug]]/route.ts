import { notFound } from "next/navigation";
import { type NextRequest, NextResponse } from "next/server";

import { allDocs } from "@/.contentlayer/generated";
import { processMdxContent } from "@/lib/llm";

export const revalidate = false;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;

  const slugPath = !slug || slug.length === 0 ? "" : slug.join("/");

  const doc = allDocs.find((doc) => doc.slugAsParams === slugPath);

  if (!doc) {
    notFound();
  }

  let mdx = doc.body.raw;

  // Replace component tags with actual source code
  mdx = await processMdxContent(mdx);

  // Add frontmatter at the top
  const frontmatter = `---
title: ${doc.title}
description: ${doc.description}
---
`;

  const fullContent = frontmatter + mdx;

  return new NextResponse(fullContent, {
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
