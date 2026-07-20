import Link from "next/link";
import {
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
  Shield,
  Pill,
  HeartPulse,
  ScanFace,
};

function ServiceIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = ICONS[name] ?? Sparkles; // Sparkles = fallback لو الاسم غير معروف

  return <Icon className={styles.icon} width={size} height={size} aria-hidden="true" />;
}

// بيعرض العنوان عاديًا، إلا لو الخدمة معها titleHighlight (متل "مجاني" بفحص
// البشرة والشعر) — عندها بيلوّن الكلمة المحدَّدة بس بالأخضر، وباقي العنوان
// يضل بلون العنوان الافتراضي (كحلي).
function ServiceTitle({ service }: { service: (typeof SERVICES)[number] }) {
  const highlight = "titleHighlight" in service ? service.titleHighlight : undefined;
  if (!highlight) return <>{service.title}</>;

  const index = service.title.indexOf(highlight);
  if (index === -1) return <>{service.title}</>;

  const before = service.title.slice(0, index);
  const after = service.title.slice(index + highlight.length);

  return (
    <>
      {before}
      <span className={styles.titleAccent}>{highlight}</span>
      {after}
    </>
  );
}

export default function Services() {
  return (
    <section className={styles.services} aria-labelledby="services-heading">
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="services-heading" className={styles.title}>
            خدماتنا
          </h2>
          <span className={styles.underline} aria-hidden="true" />
        </div>

        {/* شبكة الـDesktop/Tablet — تُخفى بـCSS على الموبايل فقط */}
        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <Link key={service.id} href={service.href} className={styles.card}>
              <div className={styles.iconWrapper}>
                <ServiceIcon name={service.icon} />
              </div>

              <h3 className={styles.cardTitle}>
                <ServiceTitle service={service} />
              </h3>
              <p className={styles.cardDescription}>{service.description}</p>
            </Link>
          ))}
        </div>

        {/* شبكة الموبايل المضغوطة (عمودين) — تظهر فقط عند 768px فأقل */}
        <div className={styles.mobileGrid}>
          {SERVICES.map((service) => (
            <Link key={service.id} href={service.href} className={styles.cardCompact}>
              <div className={styles.iconWrapperCompact}>
                <ServiceIcon name={service.icon} size={20} />
              </div>

              <h3 className={styles.cardTitleCompact}>
                <ServiceTitle service={service} />
              </h3>
              <p className={styles.cardDescriptionCompact}>{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
