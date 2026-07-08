import Image from "next/image";
import { INSURANCE_COMPANIES } from "@/lib/constants";
// عدّلي المسار أعلاه ليطابق مكان constants.ts الفعلي عندك

import styles from "./Insurance.module.css";

export default function Insurance() {
  // نكرر المصفوفة مرتين لصنع تأثير حركة لا نهائية سلسة (marquee)
  // بدون أي JavaScript — الأنيميشن بالكامل CSS، فهذا Server Component نظيف.
  const track = [...INSURANCE_COMPANIES, ...INSURANCE_COMPANIES];

  return (
    <section
      id="insurance"
      className={styles.insurance}
      aria-labelledby="insurance-heading"
    >
      <div className={styles.container}>
        <div className={styles.heading}>
          <h2 id="insurance-heading" className={styles.title}>
            شركات التأمين التي نتعامل معها
          </h2>
          <span className={styles.underline} aria-hidden="true" />
        </div>

        <div className={styles.marqueeViewport}>
          <ul className={styles.marqueeTrack} aria-label="شركاء التأمين">
            {track.map((company, index) => (
              <li
                key={`${company.id}-${index}`}
                className={styles.logoTile}
                aria-hidden={index >= INSURANCE_COMPANIES.length}
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  fill
                  sizes="160px"
                  className={styles.logoImage}
                />
              </li>
            ))}
          </ul>
            </div>
      </div>
    </section>
  );
}