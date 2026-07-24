import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { BLOG_SECTION } from "@/lib/constants";
import BlogExplorer from "@/components/sections/BlogExplorer";
import BlogConsultationCta from "@/components/sections/BlogConsultationCta";
import ScrollToTopOnMount from "@/components/sections/ScrollToTopOnMount";

export const metadata: Metadata = generatePageMetadata({
  title: BLOG_SECTION.title,
  description: BLOG_SECTION.description,
  path: "/blog",
});

export default function BlogPage() {
  return (
    <>
      <ScrollToTopOnMount />
      <BlogExplorer />
      <BlogConsultationCta />
    </>
  );
}
