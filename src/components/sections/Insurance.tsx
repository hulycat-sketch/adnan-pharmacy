"use client";

import { useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  INSURANCE_CATEGORIES,
  INSURANCE_COMPANIES,
  INSURANCE_SECTION,
} from "@/lib/constants";
import styles from "./Insurance.module.css";

type CategoryId = (typeof INSURANCE_CATEGORIES)[number]["id"];
type Company = (typeof INSURANCE_COMPANIES)[number];

// عدد الشعارات الظاهرة افتراضيًا على الموبايل بفئة "شركات التأمين" قبل
// الضغط على "عرض جميع شركات التأمين" — باقي الفئات (بنوك/جامعات/نقابات)
// بتظهر كاملة دايمًا، ما إلها علاقة بهاد الرقم
const MOBILE_COLLAPSED_COUNT = 8;

const SHAPE_CLASS: Record<string, string> = {
  wide: styles.logoImageWide,
  medium: styles.logoImageMedium,
  square: styles.logoImageSquare,
};

function LogoTile({ company }: { company: Company }) {
  // بعض الشعارات المصدر فيها هوامش فارغة أكتر من الباقي، فبتبين أصغر
  // بصريًا رغم نفس صندوق العرض — scale (شامل) وvisualScale (موبايل فقط)
  // بيعوّضوا عن هيك، وبيتجمعوا مع بعض عبر CSS custom properties تحت
  const scale = "scale" in company ? company.scale : undefined;
  const visualScale = "visualScale" in company ? company.visualScale : undefined;
  const shapeClass = "shape" in company ? SHAPE_CLASS[company.shape] : "";

  const style: CSSProperties = {
    height: "100%",
    width: "100%",
    ...(scale ? { "--scale": scale } : {}),
    ...(visualScale ? { "--visual-scale": visualScale } : {}),
  } as CSSProperties;

  return (
    <div className={styles.logoTile}>
      <Image
        src={company.logo}
        alt={company.name}
        width={240}
        height={80}
        className={`${styles.logoImage} ${shapeClass}`}
        style={style}
      />
    </div>
  );
}

export default function Insurance() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    INSURANCE_CATEGORIES[0].id
  );
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visibleCompanies = useMemo(
    () => INSURANCE_COMPANIES.filter((company) => company.category === activeCategory),
    [activeCategory]
  );

  // فئة تحوي عددًا قليلًا من الشعارات (3 فأقل، متل النقابات حاليًا) — بتاخد
  // تكبيرًا خاصًا بما إنها بتبقى وسط بطاقة واسعة بمساحة فاضية كتير غيرها
  const isSparse = visibleCompanies.length <= 3;
  const isUniversities = activeCategory === "universities";

  // زر "عرض جميع شركات التأمين" حصرًا لفئة شركات التأمين على الموبايل —
  // باقي الفئات (بنوك/جامعات/نقابات) بتظهر كاملة دايمًا بدون هالزر
  const hasMobileToggle =
    activeCategory === "insurance" && visibleCompanies.length > MOBILE_COLLAPSED_COUNT;
  const firstCompanies = hasMobileToggle
    ? visibleCompanies.slice(0, MOBILE_COLLAPSED_COUNT)
    : visibleCompanies;
  const restCompanies = hasMobileToggle
    ? visibleCompanies.slice(MOBILE_COLLAPSED_COUNT)
    : [];

  const switchCategory = (id: CategoryId) => {
    setActiveCategory(id);
    setIsMobileExpanded(false);
  };

  // تنقّل لوحة مفاتيح كامل بين التبويبات (نمط WAI-ARIA Tabs — تفعيل تلقائي):
  // الأسهم يمين/يسار تنقل التركيز وتفعّل التبويب فورًا، Home/End للطرفين
  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") nextIndex = (index + 1) % INSURANCE_CATEGORIES.length;
    else if (event.key === "ArrowLeft")
      nextIndex = (index - 1 + INSURANCE_CATEGORIES.length) % INSURANCE_CATEGORIES.length;
    else if (event.key === "Home") nextIndex = 0;
    else if (event.key === "End") nextIndex = INSURANCE_CATEGORIES.length - 1;

    if (nextIndex === null) return;

    event.preventDefault();
    const nextCategory = INSURANCE_CATEGORIES[nextIndex];
    switchCategory(nextCategory.id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <section
      id="insurance"
      className={styles.insurance}
      aria-labelledby="insurance-heading"
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="insurance-heading" className={styles.title}>
            {INSURANCE_SECTION.title}
          </h2>
          <span className={styles.underline} aria-hidden="true" />
          <p className={styles.subtitle}>{INSURANCE_SECTION.subtitle}</p>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="تصنيف الجهات المعتمدة">
          {INSURANCE_CATEGORIES.map((category, index) => {
            const isActive = category.id === activeCategory;

            return (
              <button
                key={category.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`insurance-tab-${category.id}`}
                aria-selected={isActive}
                aria-controls="insurance-panel"
                tabIndex={isActive ? 0 : -1}
                className={`${styles.tab} ${isActive ? styles.tabActive : ""}`}
                onClick={() => switchCategory(category.id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
              >
                {category.label}
              </button>
            );
          })}
        </div>

        <div
          key={activeCategory}
          id="insurance-panel"
          role="tabpanel"
          aria-labelledby={`insurance-tab-${activeCategory}`}
          className={styles.panelWrap}
        >
          <div className={styles.card}>
            <div
              className={`${styles.grid} ${isSparse ? styles.sparse : ""} ${
                isUniversities ? styles.universities : ""
              }`}
            >
              {firstCompanies.map((company) => (
                <LogoTile key={company.name} company={company} />
              ))}
            </div>

            {hasMobileToggle && (
              <>
                <div
                  id="insurance-mobile-more"
                  className={`${styles.expandable} ${
                    isMobileExpanded ? styles.expandableOpen : ""
                  }`}
                >
                  <div className={styles.expandableInner}>
                    <div className={`${styles.grid} ${styles.expandableGrid}`}>
                      {restCompanies.map((company) => (
                        <LogoTile key={company.name} company={company} />
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className={styles.expandBtn}
                  aria-expanded={isMobileExpanded}
                  aria-controls="insurance-mobile-more"
                  onClick={() => setIsMobileExpanded((value) => !value)}
                >
                  {isMobileExpanded ? "عرض أقل" : "عرض جميع شركات التأمين"}
                  {isMobileExpanded ? (
                    <ChevronUp width={16} height={16} aria-hidden="true" />
                  ) : (
                    <ChevronDown width={16} height={16} aria-hidden="true" />
                  )}
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
