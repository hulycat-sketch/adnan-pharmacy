"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
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
const RESUME_DELAY_MS = 3000;

export default function TrustedBrandsMarquee({
  title,
  description,
  brands,
  speed = 36,
}: TrustedBrandsMarqueeProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const pauseAndScheduleResume = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  // شبكة أمان اللف اللانهائي — تشتغل بغض النظر عن مصدر التمرير
  // (تلقائي أو سحب باللمس/الماوس)
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

  // الحركة التلقائية البطيئة والمستمرة — مُعطَّلة كليًا مع prefers-reduced-motion
  useEffect(() => {
    if (reducedMotion) return;
    const viewport = viewportRef.current;
    if (!viewport) return;

    let lastTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!isPausedRef.current && lastTime !== null) {
        const deltaSeconds = (timestamp - lastTime) / 1000;
        viewport.scrollLeft += speed * deltaSeconds;
      }
      lastTime = isPausedRef.current ? null : timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, speed]);

  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    if (event.key === "ArrowRight") {
      event.preventDefault();
      pauseAndScheduleResume();
      viewport.scrollBy({ left: 150, behavior: "smooth" });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      pauseAndScheduleResume();
      viewport.scrollBy({ left: -150, behavior: "smooth" });
    }
  }, [pauseAndScheduleResume]);

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
          <ul className={styles.track}>
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
                  style={{ transform: `scale(${brand.scale ?? 1})` }}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
