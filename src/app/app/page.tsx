import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import AppInstallPage from "@/components/sections/AppInstallPage";

export const metadata: Metadata = generatePageMetadata({
  title: "ثبّت صيدلية عدنان على هاتفك",
  description:
    "احصل على وصول أسرع إلى خدماتنا ومقالاتنا الصحية مباشرة من الشاشة الرئيسية لهاتفك.",
  path: "/app",
});

export default function Page() {
  return <AppInstallPage />;
}
