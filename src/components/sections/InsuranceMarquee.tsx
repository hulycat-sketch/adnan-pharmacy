"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Image from "next/image";
import styles from "./InsuranceMarquee.module.css";

type InsuranceLogo = {
  name: string;
  logo: string;
  type?: "wide" | "compact" | "vertical" | "circular";
  scale?: number;
  visualScale?: number;
};

type InsuranceMarqueeProps = {
  logos: readonly InsuranceLogo[];
  ariaLabel: string;
};

const LOGO_TYPE_CLASS: Record<NonNullable<InsuranceLogo["type"]>, string> = {
  wide: styles.logoWide,
  compact: styles.logoCompact,
  vertical: styles.logoVertical,
  circular: styles.logoCircular,
};

const MIN_TILES_PER_LOOP = 14;
// المدة بين انتهاء السحب واستئناف الحركة التلقائية — 600-1000ms حتى ما
// يحس المستخدم إنه الشريط "منتزع" من إيده فورًا
const RESUME_DELAY_MS = 800;
// سرعة بصرية ثابتة (بكسل/ثانية) — 28-34px/s
const SPEED_PX_PER_SEC = 30;
const KEYBOARD_NUDGE_PX = 150;

export default function InsuranceMarquee({ logos, ariaLabel }: InsuranceMarqueeProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const rafRef = useRef<number | null>(null);
  const resumeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPositionRef = useRef(0);
  // موضع الانزلاق الحالي (بكسل) — المصدر الوحيد للحقيقة، سواء تغيّر
  // بالحركة التلقائية أو بالسحب اليدوي، فما في أي Resync أو قفزة عند التبديل بينهم
  const positionRef = useRef(0);
  // عرض نسخة واحدة من الشعارات (نصف عرض المسار المضاعف) — أساس اللفّة اللانهائية
  const loopWidthRef = useRef(0);
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const pauseImmediately = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  }, []);

  // استئناف مؤجَّل (RESUME_DELAY_MS) — يُستدعى بعد رفع الإصبع/الماوس أو
  // مغادرة المؤشر أو فقدان التركيز، أبدًا فورًا
  const scheduleResume = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const applyTransform = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transform = `translateX(${-positionRef.current}px)`;
  }, []);

  // لفّة لا نهائية سلسة تمامًا: طرح/إضافة عرض نسخة واحدة بالضبط عند تجاوز
  // الحدّ — بما إن المسار مضاعف (نسختان متطابقتان)، هذا التصحيح ما بيغيّر
  // شكل الشريط المرئي إطلاقًا، فما في أي قفزة أو Snapping محسوس
  const wrapPosition = useCallback(() => {
    const loopWidth = loopWidthRef.current;
    if (loopWidth <= 0) return;
    if (positionRef.current >= loopWidth) {
      positionRef.current -= loopWidth;
    } else if (positionRef.current < 0) {
      positionRef.current += loopWidth;
    }
  }, []);

  // قياس عرض نسخة واحدة من الشعارات (شامل الـgap) — يُعاد حسابه تلقائيًا
  // لو تغيّر عدد الشعارات أو عرض الشاشة لاحقًا
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      loopWidthRef.current = track.scrollWidth / 2;
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(track);
    return () => resizeObserver.disconnect();
  }, [logos]);

  // الانزلاق المستمر بسرعة ثابتة (بكسل/ثانية)، linear بدون ease — بدون
  // Snapping أو قفزة مرئية
  useEffect(() => {
    if (reducedMotion) return;

    let lastTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!isPausedRef.current && !isDraggingRef.current && lastTime !== null) {
        const deltaSeconds = (timestamp - lastTime) / 1000;
        positionRef.current += SPEED_PX_PER_SEC * deltaSeconds;
        wrapPosition();
        applyTransform();
      }
      lastTime = isPausedRef.current || isDraggingRef.current ? null : timestamp;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, wrapPosition, applyTransform]);

  // سحب بالماوس أو اللمس — بيحرّك نفس متغيّر الموضع (positionRef) مباشرة
  // بنفس مقدار حركة الإصبع/الماوس (1:1)، فما في أي إعادة مزامنة لحظة الإفلات
  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      pauseImmediately();
      isDraggingRef.current = true;
      dragStartXRef.current = event.clientX;
      dragStartPositionRef.current = positionRef.current;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [pauseImmediately]
  );

  const handlePointerMove = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      const delta = event.clientX - dragStartXRef.current;
      positionRef.current = dragStartPositionRef.current - delta;
      wrapPosition();
      applyTransform();
    },
    [wrapPosition, applyTransform]
  );

  // pointerup / pointercancel — انتهى السحب فعليًا، بنجدول استئناف مؤجَّل
  // (مش فوري) حتى ما يحس المستخدم إنه الشريط "منتزع" من إيده
  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = false;
      const viewport = event.currentTarget;
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      scheduleResume();
    },
    [scheduleResume]
  );

  // pointerleave — بيجدول استئناف بس لو ما في سحب فعليًا شغّال حاليًا (لو
  // الإصبع خرج من حدود العنصر بينما لسا مضغوط تحت Pointer Capture، منسيب
  // الأمر لـpointerup/pointercancel اللي رح توصل لاحقًا لتنضيف الحالة صح)
  const handlePointerLeave = useCallback(() => {
    if (isDraggingRef.current) return;
    scheduleResume();
  }, [scheduleResume]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        pauseImmediately();
        positionRef.current -= KEYBOARD_NUDGE_PX;
        wrapPosition();
        applyTransform();
        scheduleResume();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        pauseImmediately();
        positionRef.current += KEYBOARD_NUDGE_PX;
        wrapPosition();
        applyTransform();
        scheduleResume();
      }
    },
    [pauseImmediately, scheduleResume, wrapPosition, applyTransform]
  );

  if (logos.length === 0) return null;

  const repeatFactor = Math.max(1, Math.ceil(MIN_TILES_PER_LOOP / logos.length));
  const loopUnit = Array.from({ length: repeatFactor }).flatMap(() => logos);
  const track = [...loopUnit, ...loopUnit];

  return (
    <div
      className={styles.viewport}
      role="region"
      aria-label={ariaLabel}
      tabIndex={0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={endDrag}
      onPointerLeave={handlePointerLeave}
      onPointerCancel={endDrag}
      onFocus={pauseImmediately}
      onBlur={scheduleResume}
      onKeyDown={handleKeyDown}
    >
      <ul ref={trackRef} className={styles.track}>
        {track.map((item, index) => {
          const typeClassName = item.type ? LOGO_TYPE_CLASS[item.type] : "";
          return (
            <li
              key={`${item.name}-${index}`}
              className={styles.tile}
              aria-hidden={index >= loopUnit.length}
            >
              <Image
                src={item.logo}
                alt={item.name}
                width={220}
                height={90}
                draggable={false}
                className={`${styles.logo} ${typeClassName}`}
                style={
                  {
                    ...(item.scale ? { "--scale": item.scale } : {}),
                    ...(item.visualScale ? { "--visual-scale": item.visualScale } : {}),
                  } as CSSProperties
                }
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
