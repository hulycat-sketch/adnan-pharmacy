"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Calendar,
  ShieldCheck,
  UserRound,
  Heart,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { WHY_US_POINTS } from "@/lib/constants";
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
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // حركات الدخول تشتغل مرة وحدة بس أول ما القسم يبين عالشاشة (نفس نظام
  // IntersectionObserver المستخدم أصلًا بـServiceSection) — threshold 0.15
  // يعني الحركة بتبلش لما يبين ~15% من القسم، وبعد أول ظهور منقطع
  // المراقبة فورًا فما بترجع تشتغل لو المستخدم مرّر لفوق وتحت
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const sectionClassName = `${styles.whyUs} ${isVisible ? styles.visible : ""}`;

  return (
    <section ref={sectionRef} className={sectionClassName} aria-labelledby="why-us-heading">
      {/* بدون JavaScript ما في IntersectionObserver يشتغل، فهاد الفولباك
          بيفرض ظهور العنوان/الصورة/النقاط فورًا بدل ما تضل مخفية للأبد */}
      <noscript>
        <style>{`
          .${styles.title}, .${styles.imageWrapper}, .${styles.pointItem} {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

      {/* علامة مائية زخرفية بحتة — رمز الحبة الدائري بس (بدون الاسم/الشعار
          الكامل)، بشفافية خفيفة جدًا. aria-hidden وpointer-events:none
          حتى ما تتدخل بالمحتوى أو تُقرأ من قارئات الشاشة إطلاقًا */}
      <Image
        src="/images/footer-logo.png"
        alt=""
        aria-hidden="true"
        width={800}
        height={800}
        className={styles.watermark}
      />

      <div className={`container ${styles.contentLayer}`}>
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
                    <Icon width={42} height={42} strokeWidth={1.75} className={styles.pointIconSvg} />
                  </span>
                  <div className={styles.pointText}>
                    <h3 className={styles.pointTitle}>{point.title}</h3>
                    <p className={styles.pointDescription}>{point.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
