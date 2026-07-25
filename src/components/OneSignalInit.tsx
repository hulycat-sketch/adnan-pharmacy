"use client";

import { useEffect } from "react";
import { initOneSignalOnce } from "@/lib/onesignal";

/**
 * بيهيّئ OneSignal بمجرد تحميل أي صفحة بالموقع (مركّب بالـroot layout)، بدون
 * عرض أي شي — الهدف إنه الـService Worker وتتبّع الاشتراك يشتغلوا بغض النظر
 * عن الصفحة اللي دخل منها الزائر، حتى لو الصفحة الرئيسية (اللي فيها بطاقة
 * طلب الإذن) مش أول صفحة زارها.
 */
export default function OneSignalInit() {
  useEffect(() => {
    initOneSignalOnce().catch(() => {
      // فشل التهيئة (مثلاً App ID غير مضبوط أو غير صالح) — بدون أي تأثير ظاهر
    });
  }, []);

  return null;
}
