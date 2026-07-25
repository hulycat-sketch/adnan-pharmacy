import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import PrivacyPolicyPage from "@/components/sections/PrivacyPolicyPage";
import ScrollToTopOnMount from "@/components/sections/ScrollToTopOnMount";

export const metadata: Metadata = generatePageMetadata({
  title: "سياسة الخصوصية",
  description:
    "كيف تتعامل صيدلية عدنان مع اشتراكات الإشعارات، وما البيانات التي تُجمع، وكيف يمكنكم إلغاء الاشتراك في أي وقت.",
  path: "/privacy-policy",
});

export default function Page() {
  return (
    <>
      <ScrollToTopOnMount />
      <PrivacyPolicyPage />
    </>
  );
}
