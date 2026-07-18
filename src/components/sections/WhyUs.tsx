import Image from "next/image";
import {
  Calendar,
  Stethoscope,
  Users,
  ShieldCheck,
  HeartHandshake,
  PillBottle,
  Check,
  Heart,
  type LucideIcon,
} from "lucide-react";
import {
  WHY_US_SECTION,
  WHY_US_POINTS,
  WHY_US_STAT,
  INSURANCE_COMPANIES,
} from "@/lib/constants";
import styles from "./WhyUs.module.css";

// خريطة الأيقونات: المفتاح هون لازم يطابق حرفيًا القيمة المكتوبة
// بحقل icon داخل WHY_US_POINTS في constants.ts (أسماء مكونات lucide-react).
const ICONS: Record<string, LucideIcon> = {
  Calendar,
  Stethoscope,
  Users,
  ShieldCheck,
  HeartHandshake,
  PillBottle,
};

export default function WhyUs() {
  const accreditedCount = INSURANCE_COMPANIES.length;

  return (
    <section className={styles.whyUs} aria-labelledby="why-us-heading">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="why-us-heading" className={styles.title}>
            {WHY_US_SECTION.title}
          </h2>
          <span className={styles.underline} aria-hidden="true" />
          <p className={styles.subtitle}>{WHY_US_SECTION.subtitle}</p>
        </div>

        <div className={styles.grid}>
          <div className={styles.pointsCol}>
            {WHY_US_POINTS.map((point) => {
              const Icon = ICONS[point.icon];

              return (
                <div key={point.id} className={styles.pointCard}>
                  <span className={styles.pointIcon} aria-hidden="true">
                    <Icon width={22} height={22} />
                  </span>

                  <div className={styles.pointText}>
                    <h3 className={styles.pointTitle}>{point.title}</h3>
                    <p className={styles.pointDescription}>{point.description}</p>
                  </div>

                  <span className={styles.pointCheck} aria-hidden="true">
                    <Check width={14} height={14} strokeWidth={3} />
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.statCol}>
            <div className={styles.statCard}>
              <div className={styles.illustrationWrapper} aria-hidden="true">
                <Image
                  src="/images/pharmacy-line-art-trimmed.png"
                  alt=""
                  fill
                  quality={90}
                  className={styles.illustration}
                />
              </div>

              <p className={styles.statNumber}>{accreditedCount}+</p>
              <p className={styles.statLabel}>{WHY_US_STAT.label}</p>
              <p className={styles.statSubLabel}>{WHY_US_STAT.sublabel}</p>

              <span className={styles.divider} aria-hidden="true">
                <span className={styles.dividerLine} />
                <span className={styles.dividerIcon}>
                  <Heart width={13} height={13} fill="currentColor" />
                </span>
                <span className={styles.dividerLine} />
              </span>

              <p className={styles.statMessage}>{WHY_US_STAT.message}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
