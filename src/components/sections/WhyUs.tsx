import Image from "next/image";
import {
  Calendar,
  ShieldCheck,
  UserRound,
  Heart,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { WHY_US_SECTION, WHY_US_POINTS } from "@/lib/constants";
import styles from "./WhyUs.module.css";

// خريطة الأيقونات: المفتاح هون لازم يطابق حرفيًا القيمة المكتوبة
// بحقل icon داخل WHY_US_POINTS في constants.ts (أسماء مكونات lucide-react).
const ICONS: Record<string, LucideIcon> = {
  Calendar,
  ShieldCheck,
  UserRound,
  Heart,
};

export default function WhyUs() {
  return (
    <section className={styles.whyUs} aria-labelledby="why-us-heading">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="why-us-heading" className={styles.title}>
            لماذا صيدلية <span className={styles.titleAccent}>عدنان</span>؟
          </h2>

          <span className={styles.divider} aria-hidden="true">
            <span className={styles.dividerLine} />
            <Leaf width={16} height={16} className={styles.dividerIcon} />
            <span className={styles.dividerLine} />
          </span>
        </div>

        <div className={styles.grid}>
          <div className={styles.imageCol}>
            <div className={styles.imageWrapper}>
              <Image
                src="/images/pharmacy-interior.webp"
                alt="داخل صيدلية عدنان"
                fill
                quality={90}
                sizes="(max-width: 1023px) 100vw, 50vw"
                className={styles.image}
              />
            </div>
          </div>

          <div className={styles.pointsCol}>
            {WHY_US_POINTS.map((point) => {
              const Icon = ICONS[point.icon];

              return (
                <div key={point.id} className={styles.pointItem}>
                  <span className={styles.pointIcon} aria-hidden="true">
                    <Icon width={42} height={42} strokeWidth={1.75} />
                  </span>
                  <h3 className={styles.pointTitle}>{point.title}</h3>
                  <p className={styles.pointDescription}>{point.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
