import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { ABOUT_FOUNDER, ABOUT_TODAY } from "@/lib/constants";
import AboutHero from "@/components/sections/AboutHero";
import ServiceSection from "@/components/sections/ServiceSection";
import AboutMedicalFamily from "@/components/sections/AboutMedicalFamily";
import AboutLegacy from "@/components/sections/AboutLegacy";

export const metadata: Metadata = generatePageMetadata({
  title: "نبذة عنا",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <ServiceSection
        title={ABOUT_FOUNDER.title}
        description={ABOUT_FOUNDER.description}
        image={ABOUT_FOUNDER.image}
        imageAlt={`${ABOUT_FOUNDER.caption} — صورة تاريخية`}
        imagePosition="left"
        badge={ABOUT_FOUNDER.badge}
        caption={ABOUT_FOUNDER.caption}
        firstAfterHero
        compactTitle
      />

      <AboutMedicalFamily />

      <ServiceSection
        title={ABOUT_TODAY.title}
        description={ABOUT_TODAY.description}
        image={ABOUT_TODAY.image}
        imageAlt="واجهة صيدلية عدنان اليوم"
        imagePosition="right"
        badge={ABOUT_TODAY.badge}
        imageNatural
        imageWidth={ABOUT_TODAY.imageWidth}
        imageHeight={ABOUT_TODAY.imageHeight}
        compactTitle
      />

      <AboutLegacy />
    </>
  );
}
