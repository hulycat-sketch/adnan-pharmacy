import { type ComponentType, type CSSProperties } from "react";
import Image from "next/image";
import { GraduationCap, Landmark, Shield, Users } from "lucide-react";
import { INSURANCE_CATEGORIES, INSURANCE_COMPANIES, INSURANCE_SECTION } from "@/lib/constants";
import styles from "./ApprovedPartnersPage.module.css";

type Company = (typeof INSURANCE_COMPANIES)[number];

// نفس خريطة أيقونات الفئات المستخدمة بملخص الصفحة الرئيسية (Insurance.tsx)
const CATEGORY_ICONS: Record<string, ComponentType<{ width?: number; height?: number; strokeWidth?: number; className?: string }>> = {
  insurance: Shield,
  banks: Landmark,
  universities: GraduationCap,
  syndicates: Users,
};

const SHAPE_CLASS: Record<string, string> = {
  wide: styles.logoImageWide,
  medium: styles.logoImageMedium,
  square: styles.logoImageSquare,
};

function LogoTile({ company }: { company: Company }) {
  // نفس منطق scale/visualScale المستخدم أصلًا بقسم الصفحة الرئيسية —
  // منقول هون بدون أي تعديل حتى ما نفقد أي ضبط خاص بشعار معيّن
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

export default function ApprovedPartnersPage() {
  return (
    <section className={styles.page} aria-labelledby="approved-partners-heading">
      <div className="container">
        <div className={styles.header}>
          <h1 id="approved-partners-heading" className={styles.title}>
            {INSURANCE_SECTION.title}
          </h1>
          <p className={styles.subtitle}>{INSURANCE_SECTION.subtitle}</p>
        </div>

        {INSURANCE_CATEGORIES.map((category, index) => {
          const Icon = CATEGORY_ICONS[category.id];
          const companies = INSURANCE_COMPANIES.filter((company) => company.category === category.id);
          const isSparse = companies.length <= 3;
          const isUniversities = category.id === "universities";
          const isBanks = category.id === "banks";
          const isLast = index === INSURANCE_CATEGORIES.length - 1;

          return (
            <section
              key={category.id}
              className={styles.categorySection}
              aria-labelledby={`category-${category.id}-heading`}
            >
              <div className={styles.categoryHeading}>
                <Icon width={24} height={24} strokeWidth={1.75} className={styles.categoryIcon} aria-hidden="true" />
                <h2 id={`category-${category.id}-heading`} className={styles.categoryTitle}>
                  {category.label}
                </h2>
              </div>

              <div
                className={`${styles.logoGrid} ${isSparse ? styles.sparse : ""} ${
                  isUniversities ? styles.universities : ""
                } ${isBanks ? styles.banks : ""}`}
              >
                {companies.map((company) => (
                  <LogoTile key={company.name} company={company} />
                ))}
              </div>

              {!isLast && <div className={styles.divider} aria-hidden="true" />}
            </section>
          );
        })}
      </div>
    </section>
  );
}
