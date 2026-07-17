"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// نفس منطق شريط "الجهات المعتمدة" بالضبط — مستخرج هون كـHook مشترك
// حتى أي شريط شعارات جديد (زي TrustedBrandsMarquee) يشتغل بنفس السلوك
// المُثبَت تمامًا، بدل ما نعيد كتابة نفس المنطق مرتين وينحرفوا عن بعض.

const RESUME_DELAY_MS = 3000;

export function useMarqueeScroll(speed: number) {
  const viewportRef = useRef<HTMLDivElement>(null);
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
  // (تلقائي، أسهم، سحب باللمس، عجلة الماوس/Trackpad)
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

  return { viewportRef, pauseAndScheduleResume };
}
