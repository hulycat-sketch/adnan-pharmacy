"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { INSURANCE_COMPANIES, INSURANCE_SECTION } from "@/lib/constants";
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
// هذا وحده يضمن إمكانية "القفزة الخفية" عند منتصف عرض التمرير
// (scrollWidth / 2) بدون أي فراغ مرئي، بغض النظر عن عدد الشركات.
const track = [...loopUnit, ...loopUnit];

const AUTO_SCROLL_PX_PER_SECOND = 40; // بطيء وهادئ
const RESUME_DELAY_MS = 3000;
const TILES_PER_JUMP_DESKTOP = 2;
const TILES_PER_JUMP_MOBILE = 1;
const MOBILE_QUERY = "(max-width: 639px)";

export default function Insurance() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const rafRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // رصد تفضيل تقليل الحركة، والاستجابة لتغييره الحي
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // إيقاف مؤقت للحركة التلقائية + استئناف تلقائي بعد 3 ثوانٍ من آخر تفاعل
  const pauseAndScheduleResume = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // شبكة أمان اللف اللانهائي — تعمل دائمًا بغض النظر عن مصدر التمرير
  // (تلقائي، أسهم، سحب باللمس)، وتمدّد نافذة الإيقاف أثناء أي سحب مستمر
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const handleScroll = () => {
      if (isPausedRef.current) {
        pauseAndScheduleResume();
      }

      const half = viewport.scrollWidth / 2;
      if (half <= 0) return;

      if (viewport.scrollLeft >= half) {
        viewport.scrollLeft -= half;
      } else if (viewport.scrollLeft < 0) {
        viewport.scrollLeft += half;
      }
    };

    viewport.addEventListener("scroll", handleScroll, { passive: true });
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [pauseAndScheduleResume]);

  // الحركة التلقائية البطيئة والهادئة — تُعطَّل كليًا مع prefers-reduced-motion
  useEffect(() => {
    if (reducedMotion) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    let lastTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!isPausedRef.current && lastTime !== null) {
        const deltaSeconds = (timestamp - lastTime) / 1000;
        viewport.scrollLeft += AUTO_SCROLL_PX_PER_SECOND * deltaSeconds;
      }
      lastTime = isPausedRef.current ? null : timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion]);

  // قفزة السهم: تُحسب ديناميكيًا من عرض بلاطة واحدة فعلية + الفراغ الحقيقي بينها
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
    [pauseAndScheduleResume]
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
            className={styles.marqueeViewport}
            role="region"
            aria-label="شركاء التأمين"
            tabIndex={0}
            onMouseEnter={pauseAndScheduleResume}
            onPointerDown={pauseAndScheduleResume}
            onFocus={pauseAndScheduleResume}
            onKeyDown={handleKeyDown}
          >
            <ul ref={trackRef} className={styles.marqueeTrack}>
              {track.map((company, index) => (
                <li
                  key={`${company.name}-${index}`}
                  className={styles.logoTile}
                  aria-hidden={index >= loopUnit.length}
                >
                  <Image
                    src={company.logo}
                    alt={company.name}
                    width={240}
                    height={80}
                    className={styles.logoImage}
                    style={{ height: "100%", width: "100%" }}
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

        <div className={styles.actions}>
          <Link href="#insurance" className={styles.viewAllBtn}>
            {INSURANCE_SECTION.viewAllLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
