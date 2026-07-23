"use client";

import { useEffect } from "react";

/**
 * بيضمن فتح الصفحة من الأعلى دومًا عند الوصول إليها، بغض النظر عن نقطة
 * الدخول (رابط الفوتر، الهيدر، تنقّل خلفي...). لازم لأنه scroll-behavior:
 * smooth العام على html بيخلي إعادة الضبط التلقائية لأعلى الصفحة بعد
 * التنقّل من جانب العميل حركة سلسة قابلة للمقاطعة، فأحيانًا ما توصل
 * فعليًا للقمة. behavior: "instant" هون بيتجاوز الخاصية العامة لهذه
 * القفزة تحديدًا بس، بدون أي تأثير على أي سلوك scroll سلس ثاني بالموقع.
 */
export default function ScrollToTopOnMount() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
