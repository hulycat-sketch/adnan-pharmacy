import Link from "next/link";
import {
  ShoppingBag,
  Shield,
  Pill,
  HeartPulse,
  ScanFace,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { SERVICES } from "@/lib/constants";
// عدّلي المسار أعلاه ليطابق مكان constants.ts الفعلي عندك

import styles from "./Services.module.css";

// خريطة الأيقونات: المفتاح هنا لازم يطابق حرفيًا القيمة المكتوبة
// بحقل icon داخل SERVICES في constants.ts (أسماء مكونات lucide-react).
// لو أضفتي خدمة جديدة بأيقونة غير موجودة هون، استوردي المكوّن من
// lucide-react وأضيفيه لهذا الكائن.
const ICONS: Record<string, LucideIcon> = {
  ShoppingBag,
  Shield,
  Pill,
  HeartPulse,
  ScanFace,
};

function ServiceIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Sparkles; // Sparkles = fallback لو الاسم غير معروف

  return <Icon className={styles.icon} width={size} height={size} aria-hidden="true" />;
}

// ترتيب/اختيار الخدمات الأربع المميّزة بشبكة الموبايل المضغوطة —
// باقي الخدمات (اليوم: علامات تجارية موثوقة) تبقى بالمشروع وتُكشف
// عبر زر "عرض جميع الخدمات" بدل حذفها.
const MOBILE_HIGHLIGHT_IDS: readonly string[] = [
  "consultation",
  "skin-check",
  "blood-pressure",
  "insurance",
];

export default function Services() {
  const highlightedServices = MOBILE_HIGHLIGHT_IDS.map((id) =>
    SERVICES.find((service) => service.id === id)
  ).filter((service): service is (typeof SERVICES)[number] => Boolean(service));

  return (
    <section className={styles.services} aria-labelledby="services-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="services-heading" className={styles.title}>
            خدماتنا
          </h2>
          <span className={styles.underline} aria-hidden="true" />
        </div>

        {/* شبكة الـDesktop/Tablet — بدون أي تغيير، تُخفى بـCSS على الموبايل فقط */}
        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <Link key={service.id} href={service.href} className={styles.card}>
              <div className={styles.iconWrapper}>
                <ServiceIcon name={service.icon} />
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </Link>
          ))}
        </div>

        {/* شبكة الموبايل المضغوطة (عمودين) — تظهر فقط عند 768px فأقل */}
        <div className={styles.mobileGrid}>
          {highlightedServices.map((service) => (
            <Link key={service.id} href={service.href} className={styles.cardCompact}>
              <div className={styles.iconWrapperCompact}>
                <ServiceIcon name={service.icon} size={20} />
              </div>

              <h3 className={styles.cardTitleCompact}>{service.title}</h3>
              <p className={styles.cardDescriptionCompact}>{service.description}</p>
            </Link>
          ))}
        </div>

        <div className={styles.viewAllWrap}>
          <Link href="/services" className={styles.viewAllBtn}>
            عرض جميع الخدمات
          </Link>
        </div>
      </div>
    </section>
  );
}
