import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import ContactPage from "@/components/sections/ContactPage";
import ScrollToTopOnMount from "@/components/sections/ScrollToTopOnMount";

export const metadata: Metadata = generatePageMetadata({
  title: "تواصل معنا",
  description:
    "تواصلوا مع صيدلية عدنان عبر واتساب أو الهاتف أو البريد الإلكتروني، أو تعرّفوا على موقعنا وساعات العمل.",
  path: "/contact",
});

export default function Page() {
  return (
    <>
      <ScrollToTopOnMount />
      <ContactPage />
    </>
  );
}
