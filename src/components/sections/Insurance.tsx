"use client";

import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import {
  INSURANCE_CATEGORIES,
  INSURANCE_COMPANIES,
  INSURANCE_SECTION,
} from "@/lib/constants";
import styles from "./Insurance.module.css";

type CategoryId = (typeof INSURANCE_CATEGORIES)[number]["id"];

export default function Insurance() {
  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    INSURANCE_CATEGORIES[0].id
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const visibleCompanies = useMemo(
    () => INSURANCE_COMPANIES.filter((company) => company.category === activeCategory),
    [activeCategory]
  );

  // فئة تحوي عددًا قليلًا من الشعارات (3 فأقل، متل النقابات حاليًا) — بتاخد
  // تكبيرًا خاصًا بما إنها بتبقى وسط بطاقة واسعة بمساحة فاضية كتير غيرها
  const isSparse = visibleCompanies.length <= 3;
  const isUniversities = activeCategory === "universities";

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
    setActiveCategory(nextCategory.id);
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
                onClick={() => setActiveCategory(category.id)}
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
          <div
            className={`${styles.grid} ${isSparse ? styles.sparse : ""} ${
              isUniversities ? styles.universities : ""
            }`}
          >
            {visibleCompanies.map((company) => {
              // بعض الشعارات المصدر فيها هوامش فارغة أكتر من الباقي، فبتبين
              // أصغر بصريًا رغم نفس صندوق العرض — scale اختياري بيعوّض عن هيك
              const scale = "scale" in company ? company.scale : undefined;

              return (
                <div key={company.name} className={styles.logoTile}>
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={240}
                    height={80}
                    className={styles.logoImage}
                    style={{
                      height: "100%",
                      width: "100%",
                      ...(scale ? { transform: `scale(${scale})` } : {}),
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
