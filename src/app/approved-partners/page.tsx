import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ApprovedPartnersPage from "@/components/sections/ApprovedPartnersPage";
import ScrollToTopOnMount from "@/components/sections/ScrollToTopOnMount";

export const metadata: Metadata = generatePageMetadata({
  title: "الجهات المعتمدة",
  description:
    "تعرّفوا على جميع شركات التأمين والبنوك والجامعات والنقابات المعتمدة لدى صيدلية عدنان.",
  path: "/approved-partners",
});

export default function Page() {
  return (
    <>
      <ScrollToTopOnMount />
      <ApprovedPartnersPage />
    </>
  );
}
