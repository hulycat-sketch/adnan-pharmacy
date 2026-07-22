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
import styles from "./TrustedBrandsMarquee.module.css";

type Brand = {
  name: string;
  logo: string;
  /** تصحيح شامل (ديسكتوب + موبايل) — لملف مصدره غير مقصوص فيه هامش
     شفاف داخلي حقيقي (بخلاف باقي ملفات "-trimmed.png") */
  scale?: number;
  /** تصحيح إضافي خاص بالموبايل فقط، فوق scale لو موجود */
  visualScale?: number;
};

type TrustedBrandsMarqueeProps = {
  /** اختياري — بتنعرض بس لو القسم مش مسبوق بعنوان مطابق (متل صفحة الخدمات حاليًا) */
  title?: string;
  description?: string;
  brands: readonly Brand[];
  /** بكسل/ثانية — سرعة الانزلاق المستمر */
  speed?: number;
};

const MIN_TILES_PER_LOOP = 14;
const RESUME_DELAY_MS = 3000;
const KEYBOARD_NUDGE_PX = 150;

export default function TrustedBrandsMarquee({
  title,
  description,
  brands,
  speed = 40,
}: TrustedBrandsMarqueeProps) {
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

  // استئناف فوري — يلغي أي مؤقّت استئناف مؤجَّل وينهي الإيقاف فورًا. بنستخدمها
  // عند رفع الإصبع/الماوس فعليًا، بدل الاعتماد بس على مؤقّت الـ3 ثوانٍ اللي
  // انضبط لحظة الضغط (وهذا بالضبط سبب "علوق" الشريط بحالة إيقاف بعد رفع
  // الإصبع لو الضغطة كانت أطول من 3 ثوانٍ أو حصل تفاعل إضافي بعدها)
  const resumeNow = useCallback(() => {
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    isPausedRef.current = false;
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

  // قياس عرض نسخة واحدة من الشعارات — يُعاد حسابه تلقائيًا لو تغيّر عدد
  // العلامات لاحقًا (بدون ما يأثر على سلاسة الحركة، لأن السرعة ثابتة
  // بالبكسل/ثانية مش مدة إجمالية ثابتة)
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
  }, [brands]);

  // الانزلاق المستمر بسرعة ثابتة (بكسل/ثانية) — بدون Snapping أو قفزة مرئية
  useEffect(() => {
    if (reducedMotion) return;

    let lastTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!isPausedRef.current && !isDraggingRef.current && lastTime !== null) {
        const deltaSeconds = (timestamp - lastTime) / 1000;
        positionRef.current += speed * deltaSeconds;
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
  }, [reducedMotion, speed, wrapPosition, applyTransform]);

  // سحب بالماوس أو اللمس — بيحرّك نفس متغيّر الموضع (positionRef) مباشرة،
  // فما في أي إعادة مزامنة أو قفزة لحظة الإفلات (نفس المصدر دايمًا)
  const handlePointerDown = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      pauseAndScheduleResume();
      isDraggingRef.current = true;
      dragStartXRef.current = event.clientX;
      dragStartPositionRef.current = positionRef.current;
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    [pauseAndScheduleResume]
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

  // pointerup / pointercancel — انتهى التفاعل فعليًا (إصبع اتّرفع أو انلغى)،
  // فبيستأنف فورًا بدون انتظار أي مؤقّت
  const endDrag = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = false;
      const viewport = event.currentTarget;
      if (viewport.hasPointerCapture(event.pointerId)) {
        viewport.releasePointerCapture(event.pointerId);
      }
      resumeNow();
    },
    [resumeNow]
  );

  // pointerleave — بيستأنف بس لو ما في سحب فعليًا شغّال حاليًا (لو الإصبع
  // خرج من حدود العنصر بينما لسا مضغوط تحت Pointer Capture، منسيب الأمر
  // لـpointerup/pointercancel اللي رح توصل لاحقًا لتنضيف الحالة صح)
  const handlePointerLeave = useCallback(() => {
    if (isDraggingRef.current) return;
    resumeNow();
  }, [resumeNow]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        pauseAndScheduleResume();
        positionRef.current -= KEYBOARD_NUDGE_PX;
        wrapPosition();
        applyTransform();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        pauseAndScheduleResume();
        positionRef.current += KEYBOARD_NUDGE_PX;
        wrapPosition();
        applyTransform();
      }
    },
    [pauseAndScheduleResume, wrapPosition, applyTransform]
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

        <div
          className={styles.viewport}
          role="region"
          aria-label={title ?? "العلامات التجارية الموثوقة"}
          tabIndex={0}
          onMouseEnter={pauseAndScheduleResume}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={endDrag}
          onPointerLeave={handlePointerLeave}
          onPointerCancel={endDrag}
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
                  draggable={false}
                  className={styles.logo}
                  style={
                    {
                      ...(brand.scale ? { "--scale": brand.scale } : {}),
                      ...(brand.visualScale ? { "--visual-scale": brand.visualScale } : {}),
                    } as CSSProperties
                  }
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
