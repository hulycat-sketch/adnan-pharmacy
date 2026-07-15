import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ServicesHero from "@/components/sections/ServicesHero";

export const metadata: Metadata = generatePageMetadata({
  title: "خدماتنا",
  path: "/services",
});

export default function ServicesPage() {
  return <ServicesHero />;
}
