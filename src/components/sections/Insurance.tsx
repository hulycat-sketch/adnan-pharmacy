import Link from "next/link";
import Image from "next/image";
import { INSURANCE_COMPANIES } from "@/lib/constants";
// عدّلي المسار أعلاه ليطابق مكان constants.ts الفعلي عندك

import styles from "./Insurance.module.css";

// نضمن إن "الوحدة الواحدة" (نصف الشريط) تحتوي دايمًا على عدد كافٍ
// من الشعارات بحيث عرضها يتجاوز أي شاشة ممكنة، بغض النظر عن عدد
// الشركات الفعلي بـ constants.ts (6 اليوم، أو 27 لاحقًا).
// المعادلة: لو عندنا شركات كتير أصلًا (16+)، ما بنكرر شي.
// لو قليلين، بنكررهم لحد ما نوصل 16 بلاطة بالوحدة الواحدة على الأقل.
const MIN_TILES_PER_LOOP = 16;
const repeatFactor = Math.max(
  1,
  Math.ceil(MIN_TILES_PER_LOOP / INSURANCE_COMPANIES.length)
);

const loopUnit = Array.from({ length: repeatFactor }).flatMap(
  () => INSURANCE_COMPANIES
);

// الشريط الكامل = نسختان متطابقتان تمامًا من نفس الوحدة —
// هذا وحده يضمن إن translateX(-50%) بالـ CSS يلف بسلاسة 100%
// بدون أي فراغ، ودون أي حاجة لتغيير رقم الـ keyframe مستقبلًا.
const track = [...loopUnit, ...loopUnit];

// مدة الحركة تتغيّر تلقائيًا مع عدد البلاطات، بحيث تضل السرعة
// البصرية (بكسل/ثانية) ثابتة دايمًا — سواء كان عندنا 6 شركات
// اليوم أو 27 لاحقًا، ما رح تصير الحركة أسرع أو أبطأ بالغلط.
const SECONDS_PER_TILE = 3.8;
const animationDurationSeconds = loopUnit.length * SECONDS_PER_TILE;

export default function Insurance() {
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
          <ul
            className={styles.marqueeTrack}
            style={{ animationDuration: `${animationDurationSeconds}s` }}
            aria-label="شركاء التأمين"
          >
            {track.map((company, index) => (
              <li
                key={`${company.name}-${index}`}
                className={styles.logoTile}
                aria-hidden={index >= loopUnit.length}
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

        <div className={styles.actions}>
          <Link href="#insurance" className={styles.viewAllBtn}>
            عرض جميع شركات التأمين
          </Link>
        </div>
      </div>
    </section>
  );
}