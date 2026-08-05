"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { ArrowLeft, GraduationCap, Landmark, Shield, Users } from "lucide-react";
import { INSURANCE_CATEGORIES, INSURANCE_SECTION, APPROVED_PARTNERS_MARQUEE_LOGOS } from "@/lib/constants";
import InsuranceMarquee from "./InsuranceMarquee";
import styles from "./Insurance.module.css";

// خريطة أيقونات الفئات — المفتاح لازم يطابق id داخل INSURANCE_CATEGORIES
const CATEGORY_ICONS: Record<string, ComponentType<{ strokeWidth?: number; className?: string; "aria-hidden"?: boolean | "true" | "false" }>> = {
  insurance: Shield,
  banks: Landmark,
  universities: GraduationCap,
  syndicates: Users,
};

// أنكر القسم المطابق بصفحة /approved-partners — "unions" مختلف عمدًا عن
// id الفئة الداخلي "syndicates" (المستخدم بباقي بيانات constants.ts)،
// بناءً على تسمية أنكر محدّدة صراحة. نفس الخريطة بالضبط لازم تنعكس
// بـApprovedPartnersPage.tsx (id القسم المقابل هناك)
const CATEGORY_ANCHOR: Record<string, string> = {
  insurance: "insurance",
  banks: "banks",
  universities: "universities",
  syndicates: "unions",
};

export default function Insurance() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // نفس نظام الحركة المستخدم بباقي أقسام الصفحة الرئيسية — يشتغل مرة
  // وحدة بس، وموبايل وديسكتوب معًا
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

  const sectionClassName = `${styles.insurance} ${isVisible ? styles.visible : ""}`;

  return (
    // id="insurance" محجوز لبطاقة "خدمات التأمين" بقسم خدماتنا (href: "/#insurance") — لا تُحذف
    <section id="insurance" ref={sectionRef} className={sectionClassName} aria-labelledby="insurance-heading">
      {/* بدون JavaScript ما في IntersectionObserver يشتغل، فهاد الفولباك
          بيفرض ظهور العنوان/الوصف فورًا بدل ما تضل مخفية للأبد */}
      <noscript>
        <style>{`
          .${styles.title}, .${styles.subtitle} {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="insurance-heading" className={styles.title}>
            {INSURANCE_SECTION.title}
          </h2>
          <span className={styles.underline} aria-hidden="true" />
          <p className={styles.subtitle}>{INSURANCE_SECTION.subtitle}</p>
        </div>

        {/* اختصارات تنقّل مضغوطة (مش بطاقات فلترة داخل الصفحة) — كل وحدة
            بتوصل مباشرة لقسمها المُعلَّم بأنكر ثابت بصفحة /approved-partners
            (شوفي CATEGORY_ANCHOR فوق و ApprovedPartnersPage.tsx). رابط
            حقيقي (<Link>) مش زر، لأنه بيغيّر الـURL فعليًا */}
        <div className={styles.categoryGrid}>
          {INSURANCE_CATEGORIES.map((category) => {
            const Icon = CATEGORY_ICONS[category.id];
            const isPrimary = category.id === "insurance";
            return (
              <Link
                key={category.id}
                href={`/approved-partners#${CATEGORY_ANCHOR[category.id]}`}
                className={`${styles.categoryCard} ${isPrimary ? styles.categoryCardPrimary : ""}`}
              >
                <Icon strokeWidth={2} className={styles.categoryIcon} aria-hidden="true" />
                <span className={styles.categoryLabel}>{category.label}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.marqueeWrap}>
          <InsuranceMarquee logos={APPROVED_PARTNERS_MARQUEE_LOGOS} ariaLabel="شعارات الجهات المعتمدة" />
        </div>

        <div className={styles.ctaWrap}>
          <Link href="/approved-partners" className={styles.ctaBtn}>
            عرض جميع الجهات المعتمدة
            <ArrowLeft width={18} height={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
