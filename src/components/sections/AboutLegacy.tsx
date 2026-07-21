import { Calendar, Clock, MapPin, type LucideIcon } from "lucide-react";
import { ABOUT_LEGACY } from "@/lib/constants";
import styles from "./AboutLegacy.module.css";

const ICONS: Record<string, LucideIcon> = {
  Calendar,
  Clock,
  MapPin,
};

export default function AboutLegacy() {
  return (
    <section className={styles.section} aria-labelledby="about-legacy-heading">
      <div className="container">
        <div className={styles.heading}>
          <h2 id="about-legacy-heading" className={styles.title}>
            {ABOUT_LEGACY.title}
          </h2>
          <p className={styles.description}>{ABOUT_LEGACY.description}</p>
        </div>

        <ul className={styles.facts}>
          {ABOUT_LEGACY.facts.map((fact) => {
            const Icon = ICONS[fact.icon];
            const mobileValue = "mobileValue" in fact ? fact.mobileValue : fact.value;
            const mobileLabel = "mobileLabel" in fact ? fact.mobileLabel : fact.label;

            return (
              <li key={fact.label} className={styles.fact}>
                <Icon width={25} height={25} strokeWidth={1.75} className={styles.factIcon} aria-hidden="true" />

                <span className={`${styles.factValue} ${styles.mobileOnly} ${styles.numeric}`}>
                  {mobileValue}
                </span>
                <span className={`${styles.factLabel} ${styles.mobileOnly}`}>{mobileLabel}</span>

                <span className={`${styles.factValue} ${styles.desktopOnly}`}>{fact.value}</span>
                <span className={`${styles.factLabel} ${styles.desktopOnly}`}>{fact.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
