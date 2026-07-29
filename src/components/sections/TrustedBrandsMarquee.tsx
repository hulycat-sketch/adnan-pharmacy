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
  /** تصحيح بصري خاص بسياق الشريط المتحرك فقط (نفس القيمة بالموبايل
     والديسكتوب معًا) — منفصل تمامًا عن scale/visualScale يلي انضبطوا
     أصلًا لصندوق صفحة "/approved-partners" الكامل (أكبر بكتير من صندوق
     الشريط). لو محدَّدة، بتحل محل scale/visualScale بالكامل لهالشعار
     (بدون أي ضرب فيهم) — القيمة الافتراضية 1 لو مو محدَّدة. الشريط
     الأصلي (العلامات التجارية) ما بيستخدمها إطلاقًا فبيضل يعتمد على
     scale/visualScale متل ما كان تمامًا. */
  marqueeScale?: number;
  /** true لشعارات الفئات الأصغر عددًا (متل الجامعات/النقابات بشريط الجهات
     المعتمدة) — الخانة بتاخد عرضها من محتواها فعليًا (auto) بدل الصندوق
     الموحّد الأعرض، فما تضل مسافة فاضية كبيرة حوالين شعار مربّع أو ضيّق.
     ما بيأثر على حجم الشعار نفسه إطلاقًا (الحدود القصوى للصورة ما تغيّرت)،
     فقط عرض الخانة المحيطة فيه. اختياري، الشريط الأصلي (العلامات
     التجارية) ما بيستخدمه إطلاقًا */
  compact?: boolean;
  /** true بس للمجموعات يلي المفروض تتقارب من بعضها بصريًا كـ"عنقود" واحد
     (متل شعارات الجامعات الأربعة) — بيفعّل هامش سالب إضافي بس بين خانتين
     متتاليتين من نفس المجموعة، فوق تضييق .compact العادي. الشعارات
     المضغوطة (compact) الجديدة يلي مش جزء من عنقود مقصود (متل بعض شعارات
     شركات التأمين يلي بس بتاخد صندوق أضيق حتى تملي خانتها بشكل أفضل)
     ما بتفعّل هالهامش الإضافي، فبتضل عالفجوة العادية الموحّدة بس بصندوق
     أضيق — هيك الفجوة البصرية بينها وبين جارتها بتطابق باقي الشريط. */
  tightCluster?: boolean;
};

type TrustedBrandsMarqueeProps = {
  /** اختياري — بتنعرض بس لو القسم مش مسبوق بعنوان مطابق (متل صفحة الخدمات حاليًا) */
  title?: string;
  description?: string;
  brands: readonly Brand[];
  /** بكسل/ثانية — سرعة الانزلاق المستمر */
  speed?: number;
  /** aria-label للقسم/الشريط لو ما في title مرئي (افتراضيًا بيرجع لنفس نص
     "العلامات التجارية الموثوقة" القديم لو ما تحدد شي — القسم الأصلي ما تأثر) */
  ariaLabel?: string;
  /** false = القسم مدمج جوا قسم ثاني (بدون خلفية/padding خاصين فيه، الأب
     هو يلي بيتحكم بالمسافة حواليه). الافتراضي true بيحافظ على القسم
     الأصلي (العلامات التجارية) بدون أي تغيير بصري */
  standalone?: boolean;
};

const MIN_TILES_PER_LOOP = 14;
const RESUME_DELAY_MS = 3000;
const KEYBOARD_NUDGE_PX = 150;

export default function TrustedBrandsMarquee({
  title,
  description,
  brands,
  speed = 40,
  ariaLabel,
  standalone = true,
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
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  // نفس نظام الحركة المستخدم بقسم "لماذا صيدلية عدنان" — يشتغل مرة وحدة
  // بس، وموبايل فقط (شوفي TrustedBrandsMarquee.module.css) — التابلت/
  // الديسكتوب ما بيتأثروا إطلاقًا. حركة العنوان/الوصف هاي منفصلة تمامًا
  // عن reducedMotion فوق (يلي بيتحكم بانزلاق الشريط اللانهائي بس)
  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
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

  const resolvedAriaLabel = ariaLabel ?? title ?? "العلامات التجارية الموثوقة";
  const sectionClassName = `${styles.section} ${standalone ? "" : styles.embedded} ${isVisible ? styles.visible : ""}`;

  return (
    <section ref={sectionRef} className={sectionClassName} aria-label={resolvedAriaLabel}>
      {/* بدون JavaScript ما في IntersectionObserver يشتغل، فهاد الفولباك
          بيفرض ظهور العنوان/الوصف فورًا بدل ما تضل مخفية للأبد */}
      <noscript>
        <style>{`
          .${styles.title}, .${styles.description} {
            opacity: 1 !important;
            transform: none !important;
          }
        `}</style>
      </noscript>

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
          aria-label={resolvedAriaLabel}
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
            {track.map((brand, index) => {
              // خانتين "عنقود" ورا بعض (متل شعارات الجامعات الأربعة) —
              // بيسحبوا لبعض شوي (margin سالب) لتخفيف الفراغ بينهم تحديدًا،
              // بدون ما يأثر على الفجوة العادية مع الجيران (بنك قبلهم أو
              // نقابة بعدهم). محصور بـtightCluster فقط — الخانات المضغوطة
              // الجديدة يلي مش عنقود مقصود ما بتفعّله، فتضل عالفجوة الموحّدة
              const isCompactAdjacent = brand.tightCluster && index > 0 && track[index - 1]?.tightCluster;
              return (
              <li
                key={`${brand.name}-${index}`}
                className={`${styles.tile} ${brand.compact ? styles.tileCompact : ""} ${isCompactAdjacent ? styles.tileCompactAdjacent : ""}`}
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
                    (brand.marqueeScale !== undefined
                      ? { "--scale": brand.marqueeScale }
                      : {
                          ...(brand.scale ? { "--scale": brand.scale } : {}),
                          ...(brand.visualScale ? { "--visual-scale": brand.visualScale } : {}),
                        }) as CSSProperties
                  }
                />
              </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
