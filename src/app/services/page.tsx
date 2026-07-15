import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { SERVICE_DETAILS, TRUSTED_BRANDS } from "@/lib/constants";
import ServicesHero from "@/components/sections/ServicesHero";
import ServiceSection from "@/components/sections/ServiceSection";
import TrustedBrandsMarquee from "@/components/sections/TrustedBrandsMarquee";

export const metadata: Metadata = generatePageMetadata({
  title: "خدماتنا",
  path: "/services",
});

export default function ServicesPage() {
  const skinHair = SERVICE_DETAILS.find((service) => service.id === "skin-hair-check")!;
  const consultation = SERVICE_DETAILS.find(
    (service) => service.id === "pharmaceutical-consultation"
  )!;
  const healthMonitoring = SERVICE_DETAILS.find(
    (service) => service.id === "health-monitoring"
  )!;
  const insurance = SERVICE_DETAILS.find(
    (service) => service.id === "insurance-services"
  )!;
  const trustedBrands = SERVICE_DETAILS.find(
    (service) => service.id === "trusted-brands"
  )!;

  return (
    <>
      <ServicesHero />

      <ServiceSection
        title={skinHair.title}
        description={skinHair.description}
        bullets={skinHair.bullets}
        image={skinHair.image}
        imageAlt={skinHair.title}
        imagePosition="left"
        firstAfterHero
      />

      <ServiceSection
        title={consultation.title}
        description={consultation.description}
        bullets={consultation.bullets}
        image={consultation.image}
        imageAlt={consultation.title}
        imagePosition="right"
      />

      <ServiceSection
        title={healthMonitoring.title}
        description={healthMonitoring.description}
        bullets={healthMonitoring.bullets}
        image={healthMonitoring.image}
        imageAlt={healthMonitoring.title}
        imagePosition="left"
      />

      <ServiceSection
        title={insurance.title}
        description={insurance.description}
        bullets={insurance.bullets}
        image={insurance.image}
        imageAlt={insurance.title}
        imagePosition="right"
        cta={{ label: "استعرض جميع الجهات المعتمدة", href: "/partners" }}
      />

      <ServiceSection
        title={trustedBrands.title}
        description={trustedBrands.description}
        bullets={trustedBrands.bullets}
        image={trustedBrands.image}
        imageAlt={trustedBrands.title}
        imagePosition="left"
        lastBeforeMarquee
      />

      <TrustedBrandsMarquee brands={TRUSTED_BRANDS} />
    </>
  );
}
