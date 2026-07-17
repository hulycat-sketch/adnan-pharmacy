"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMarqueeScroll } from "@/lib/useMarqueeScroll";
import styles from "./TrustedBrandsMarquee.module.css";

type Brand = {
  name: string;
  logo: string;
  scale?: number;
};

type TrustedBrandsMarqueeProps = {
  /** اختياري — بتنعرض بس لو القسم مش مسبوق بعنوان مطابق (متل صفحة الخدمات حاليًا) */
  title?: string;
  description?: string;
  brands: readonly Brand[];
  /** بكسل/ثانية — سرعة السحب التلقائي (افتراضيًا 36، بطيئة وهادئة) */
  speed?: number;
};

const MIN_TILES_PER_LOOP = 14;
// نفس القيم المستخدمة بالضبط بشريط "الجهات المعتمدة" — للحفاظ على سلوك مطابق
const TILES_PER_JUMP_DESKTOP = 2;
const TILES_PER_JUMP_MOBILE = 1;
const MOBILE_QUERY = "(max-width: 639px)";
// تصغير بصري عام لكل الشعارات (~12%) — بيتضرب مع scale كل علامة على حدة
// فبيحافظ على نفس الفروقات النسبية بينهم بالضبط، بس بحجم إجمالي أخف وأهدأ
const GLOBAL_LOGO_SCALE = 0.88;

export default function TrustedBrandsMarquee({
  title,
  description,
  brands,
  speed = 36,
}: TrustedBrandsMarqueeProps) {
  const { viewportRef, pauseAndScheduleResume } = useMarqueeScroll(speed);
  const trackRef = useRef<HTMLUListElement>(null);

  // قفزة السهم: نفس منطق شريط "الجهات المعتمدة" بالضبط — تُحسب ديناميكيًا
  // من عرض بلاطة واحدة فعلية + الفراغ الحقيقي بينها
  const scrollByTiles = useCallback(
    (direction: 1 | -1) => {
      const viewport = viewportRef.current;
      const trackEl = trackRef.current;
      if (!viewport || !trackEl) return;

      const firstTile = trackEl.firstElementChild as HTMLElement | null;
      const tileWidth = firstTile?.getBoundingClientRect().width ?? 150;
      const gapPx = parseFloat(getComputedStyle(trackEl).columnGap || "0") || 0;

      const isMobile = window.matchMedia(MOBILE_QUERY).matches;
      const tilesPerJump = isMobile ? TILES_PER_JUMP_MOBILE : TILES_PER_JUMP_DESKTOP;
      const step = tilesPerJump * (tileWidth + gapPx);

      pauseAndScheduleResume();
      viewport.scrollBy({ left: direction * step, behavior: "smooth" });
    },
    [viewportRef, pauseAndScheduleResume]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollByTiles(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollByTiles(-1);
      }
    },
    [scrollByTiles]
  );

  if (brands.length === 0) return null;

  const repeatFactor = Math.max(1, Math.ceil(MIN_TILES_PER_LOOP / brands.length));
  const loopUnit = Array.from({ length: repeatFactor }).flatMap(() => brands);
  const track = [...loopUnit, ...loopUnit];

  return (
    <section className={styles.section} aria-label={title ?? "العلامات التجارية الموثوقة"}>
      <div className="container">
        {title && (
          <div className={styles.heading}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.underline} aria-hidden="true" />
            {description && <p className={styles.description}>{description}</p>}
          </div>
        )}

        <div className={styles.marqueeRow}>
          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.arrowLeft}`}
            aria-label="الشعار السابق"
            onClick={() => scrollByTiles(-1)}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>

          <div
            ref={viewportRef}
            className={styles.viewport}
            role="region"
            aria-label={title ?? "العلامات التجارية الموثوقة"}
            tabIndex={0}
            onMouseEnter={pauseAndScheduleResume}
            onPointerDown={pauseAndScheduleResume}
            onFocus={pauseAndScheduleResume}
            onKeyDown={handleKeyDown}
          >
            <ul ref={trackRef} className={styles.track}>
              {track.map((brand, index) => (
                <li
                  key={`${brand.name}-${index}`}
                  className={styles.tile}
                  aria-hidden={index >= loopUnit.length}
                >
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    width={220}
                    height={90}
                    className={styles.logo}
                    style={{ transform: `scale(${(brand.scale ?? 1) * GLOBAL_LOGO_SCALE})` }}
                  />
                </li>
              ))}
            </ul>
          </div>

          <button
            type="button"
            className={`${styles.arrowBtn} ${styles.arrowRight}`}
            aria-label="الشعار التالي"
            onClick={() => scrollByTiles(1)}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
