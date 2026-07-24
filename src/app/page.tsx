import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Insurance from "@/components/sections/Insurance";
import TrustedBrandsMarquee from "@/components/sections/TrustedBrandsMarquee";
import ScrollToTopOnMount from "@/components/sections/ScrollToTopOnMount";
import { TRUSTED_BRANDS, SITE } from "@/lib/constants";

export const metadata: Metadata = {
  alternates: { canonical: SITE.url },
};

export default function Home() {
  return (
    <>
      <ScrollToTopOnMount />
      <Hero />
      <Services />
    <Insurance />
      <WhyUs />
      <TrustedBrandsMarquee
        title="العلامات التجارية الموثوقة"
        description="نوفر مجموعة مختارة من أبرز العلامات العالمية في العناية بالبشرة والصحة والجمال."
        brands={TRUSTED_BRANDS}
      />
    </>
  );
}