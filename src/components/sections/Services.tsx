import Link from "next/link";
import {
  ShoppingBag,
  Shield,
  MessageCircle,
  Activity,
  Scan,
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
  MessageCircle,
  Activity,
  Scan,
};

function ServiceIcon({ name }: { name: string }) {
  const Icon = ICONS[name] ?? Sparkles; // Sparkles = fallback لو الاسم غير معروف

  return <Icon className={styles.icon} width={28} height={28} aria-hidden="true" />;
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

        <div className={styles.grid}>
          {SERVICES.map((service) => (
            <article key={service.id} className={styles.card}>
              <div className={styles.iconWrapper}>
                <ServiceIcon name={service.icon} />
              </div>

              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>

              <Link href={service.href} className={styles.cardLink}>
                المزيد
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                  className={styles.cardLinkIcon}
                >
                  <path
                    d="M19 12H5M5 12L11 6M5 12L11 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}