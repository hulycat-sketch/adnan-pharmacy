import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Insurance from "@/components/sections/Insurance";
import TrustedBrandsMarquee from "@/components/sections/TrustedBrandsMarquee";
import { TRUSTED_BRANDS } from "@/lib/constants";
export default function Home() {
  return (
    <>
      <Hero />
      <Services />
    <Insurance />
      <WhyUs />
      <TrustedBrandsMarquee
        title="العلامات التجارية الموثوقة"
        description="نوفر مجموعة مختارة من أفضل العلامات التجارية العالمية في العناية الصحية والتجميل."
        brands={TRUSTED_BRANDS}
      />
    </>
  );
}