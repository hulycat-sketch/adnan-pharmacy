import { Users } from "lucide-react";
import { ABOUT_MEDICAL_FAMILY } from "@/lib/constants";
import styles from "./AboutMedicalFamily.module.css";

export default function AboutMedicalFamily() {
  return (
    <section
      className={styles.section}
      aria-labelledby="about-medical-family-heading"
    >
      <div className="container">
        <div className={styles.content}>
          <span className={styles.iconCircle} aria-hidden="true">
            <Users width={28} height={28} strokeWidth={1.75} />
          </span>

          <h2 id="about-medical-family-heading" className={styles.title}>
            {ABOUT_MEDICAL_FAMILY.title}
          </h2>

          <p className={styles.description}>{ABOUT_MEDICAL_FAMILY.description}</p>
        </div>
      </div>
    </section>
  );
}
