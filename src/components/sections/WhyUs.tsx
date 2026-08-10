"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Calendar,
  ShieldCheck,
  UserRound,
  Heart,
  Leaf,
  ArrowLeft,
  type LucideIcon,
} from "lucide-react";
import { WHY_US_POINTS, WHY_US_STATS } from "@/lib/constants";
import styles from "./WhyUs.module.css";

// خريطة الأيقونات: المفتاح هون لازم يطابق حرفيًا القيمة المكتوبة
// بحقل icon داخل WHY_US_POINTS في constants.ts (أسماء مكونات lucide-react).
const ICONS: Record<string, LucideIcon> = {
  Calendar,
  ShieldCheck,
  UserRound,
  Heart,
};

const COUNT_UP_DURATION_MS = 1400;

// عداد تصاعدي (0 → target) بيشتغل مرة وحدة بس لما shouldStart يصير true
// (نفس isVisible العام تبع القسم، عبر IntersectionObserver موجود أصلًا) —
// startedRef بيمنع أي إعادة تشغيل لو shouldStart رجع اهتز، وprefers-reduced-motion
// بيقفز للقيمة النهائية فورًا بدون أي رسوم متحركة
function useCountUp(target: number, shouldStart: boolean): number {
  const [value, setValue] = useState(target);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || startedRef.current) return;
    startedRef.current = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* eslint-disable-next-line react-hooks/set-state-in-effect -- مزامنة
         مقصودة مع واقع المتصفح (prefers-reduced-motion) بعد أول رندر ثابت،
         مش قيمة كان ممكن تُحسب أثناء الرندر نفسه (نفس نمط PwaInstall.tsx) */
      setValue(target);
      return;
    }

    let rafId: number;
    const startTime = performance.now();

    setValue(0);

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / COUNT_UP_DURATION_MS, 1);
      // easeOutCubic — إحساس أنعم قرب النهاية بدل توقف مفاجئ خطي
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [shouldStart, target]);

  return value;
}

function StatItem({
  stat,
  shouldAnimate,
}: {
  stat: (typeof WHY_US_STATS)[number];
  shouldAnimate: boolean;
}) {
  const animatedValue = useCountUp(stat.value, shouldAnimate);

  return (
    <div className={styles.statItem}>
      <span className={styles.statValue} aria-live="off">
        {stat.prefix && <span className={styles.statPrefix}>{stat.prefix}</span>}
        <span className={styles.statNumber}>{animatedValue.toLocaleString("en-US")}</span>
      </span>
      <span className={styles.statLabel}>{stat.label}</span>
    </div>
  );
}

export default function WhyUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // حركات الدخول (والعداد التصاعدي) تشتغل مرة وحدة بس أول ما القسم يبين
  // عالشاشة (IntersectionObserver) — threshold 0.15 يعني الحركة بتبلش لما
  // يبين ~15% من القسم، وبعد أول ظهور منقطع المراقبة فورًا فما بترجع تشتغل
  // لو المستخدم مرّر لفوق وتحت
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
          بيفرض ظهور العنوان/الإحصاءات/النقاط فورًا بدل ما تضل مخفية للأبد.
          العداد التصاعدي نفسه بحاجة JS أصلًا (بدونه القيم بتضل 0)، فمكتوب
          الرقم النهائي مباشرة بالـHTML الأساسي (شوفي StatItem) — noscript
          هون بس لعناصر CSS-only (opacity/transform) */}
      <noscript>
        <style>{`
          .${styles.title}, .${styles.statsRow}, .${styles.pointItem} {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

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

        <div className={styles.statsRow}>
          {WHY_US_STATS.map((stat) => (
            <StatItem key={stat.id} stat={stat} shouldAnimate={isVisible} />
          ))}
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

        <div className={styles.ctaWrap}>
          <Link href="/about" className={styles.ctaBtn}>
            عن صيدلية عدنان
            <ArrowLeft width={15} height={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
